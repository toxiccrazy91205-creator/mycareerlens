# Deployment Guide: MERN Stack on AWS (Free & Easy Way)

This guide provides step-by-step instructions for deploying the **MyCareerLens** project to AWS using the Free Tier services.

## Prerequisites
- An AWS Account (Free Tier eligible).
- A GitHub repository with your project code.
- A MongoDB Atlas account (for a free managed database).

---

## Phase 1: Database Setup (MongoDB Atlas)
AWS's managed MongoDB (DocumentDB) is not free. We recommend **MongoDB Atlas** (Shared Tier) which is free forever.

1.  **Create a Cluster**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free M0 cluster.
2.  **Network Access**: Go to "Network Access" and click "Add IP Address". Choose **"Allow Access from Anywhere"** (0.0.0.0/0) for initial setup, or add your EC2 IP later for better security.
3.  **Database Access**: Create a database user with a username and password.
4.  **Get Connection String**: Click "Connect" -> "Drivers" -> Copy the `mongodb+srv://...` connection string.

---

## Phase 2: Backend Deployment (AWS EC2)
We will use an EC2 instance to host the Node.js/Express server.

### 1. Launch an EC2 Instance
1.  Log in to the **AWS Management Console**.
2.  Navigate to **EC2** -> **Instances** -> **Launch Instances**.
3.  **Name**: `mycareerlens-server`.
4.  **OS**: **Ubuntu Server 22.04 LTS** (Free Tier eligible).
5.  **Instance Type**: `t2.micro` (or `t3.micro` if available in your region).
6.  **Key Pair**: Create a new key pair (.pem) and download it. **Keep this safe!**
7.  **Network Settings**: Create a security group and allow:
    - SSH (Port 22) from your IP.
    - HTTP (Port 80) from Anywhere.
    - HTTPS (Port 443) from Anywhere.
    - Custom TCP (Port 5000) from Anywhere (Optional, for testing).

### 2. Connect to Instance and Install Dependencies
Open your terminal (or Git Bash) and run:
```bash
# Connect to your instance
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2
```

### 3. Clone and Setup Server
```bash
# Clone your repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/server

# Install dependencies
npm install

# Create .env file
nano .env
```
Add the following to `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CORS_ORIGIN=https://your-amplify-app-url.amplifyapp.com
```
*(Press `Ctrl+O`, `Enter`, `Ctrl+X` to save)*

### 4. Start Server with PM2
```bash
pm2 start src/index.js --name "api-server"
pm2 save
pm2 startup
```

### 5. Configure Nginx (Reverse Proxy)
To point port 80 (HTTP) to your Node app on port 5000:
```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/default
```
Replace the `location /` block with:
```nginx
location / {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```
Restart Nginx:
```bash
sudo systemctl restart nginx
```

---

## Phase 3: Frontend Deployment (AWS Amplify)
AWS Amplify is the easiest way to host React apps with free CI/CD.

1.  **Navigate to AWS Amplify** in the console.
2.  Click **New App** -> **Host web app**.
3.  Choose **GitHub** and authorize AWS.
4.  Select your repository and the `main` branch.
5.  **Build Settings**:
    - Amplify usually detects React settings, but since your frontend is in a `client/` folder, you must use a custom build command.
    - Use the following `amplify.yml` configuration:
      ```yaml
      version: 1
      applications:
        - frontend:
            phases:
              preBuild:
                commands:
                  - cd client
                  - npm install
              build:
                commands:
                  - npm run build
            artifacts:
              baseDirectory: client/build
              files:
                - '**/*'
            cache:
              paths:
                - client/node_modules/**/*
      ```
    - **Add Environment Variables**: Under "Advanced settings", add:
      - `REACT_APP_API_URL` = `http://your-ec2-public-ip/api` (or your domain).
6.  Click **Save and Deploy**.

---

## Phase 4: Connecting Everything

1.  **Update CORS**: Go back to your EC2 instance and update the `.env` file's `CORS_ORIGIN` with the generated Amplify URL (e.g., `https://main.d123.amplifyapp.com`).
2.  **Restart Server**: 
    ```bash
    pm2 restart api-server
    ```
3.  **Check Health**: Visit `http://your-ec2-public-ip/health` to ensure the backend is alive.

---

## Cost Management Tips (Staying Free)
- **EC2**: You get 750 hours/month for 12 months. This covers one instance running 24/7.
- **Amplify**: Free tier includes 1,000 build minutes/month and 5GB storage.
- **MongoDB**: Use the "Shared" (M0) tier to avoid any costs.
- **Cleanup**: If you stop using the project, remember to **Terminate** the EC2 instance and delete the Amplify app to avoid future charges after 12 months.

---

---

## Phase 5: Deployment on Render (Unified Single Service)
This is the recommended way to deploy both Frontend and Backend together on a single Render Web Service to save costs and simplify management.

### 1. Prepare for Unified Deployment
- Ensure you have the `Dockerfile` at the root of your project.
- The server is already configured to serve the `client/build` folder in production.

### 2. Create Render Web Service
1.  Go to [Render Dashboard](https://dashboard.render.com/) and click **New** -> **Web Service**.
2.  Connect your GitHub repository.
3.  **Name**: `mycareerlens-unified`
4.  **Root Directory**: `.` (leave as root)
5.  **Runtime**: **Docker**
6.  **Instance Type**: `Free`
7.  **Environment Variables**:
    - `NODE_ENV`: `production`
    - `MONGO_URI`: (Your Atlas connection string)
    - `PORT`: `5000` (Render will automatically detect this via EXPOSE)

### 3. Frontend Environment Variables
Since the frontend is built during the Docker build process, you must ensure any `REACT_APP_` variables are available at build time if they are not dynamic. In this unified setup, the frontend will communicate with the *same* origin, so you can set:
- `REACT_APP_API_URL`: `/api` (Relative path works because they share the same domain).

---

---

## Phase 6: Docker Deployment
We have provided Dockerfiles in both `client/` and `server/` directories.

### Benefits of Docker:
- **Environment Consistency**: "It works on my machine" becomes "It works everywhere".
- **Easy Cloud Migration**: Most clouds (AWS, Google, Azure, Render, Railway) support Docker images.

### How to use Docker locally:
```bash
# Build and run server
cd server
docker build -t career-server .
docker run -p 5000:5000 career-server

# Build and run client
cd client
docker build -t career-client .
docker run -p 3000:80 career-client
```

---

## Troubleshooting
- **CORS Error**: Ensure `CORS_ORIGIN` in the backend matches the frontend URL exactly (including `https://`).
- **Connection Refused**: Check if Nginx is running (`sudo systemctl status nginx`) and if Port 80 is open in EC2 Security Groups.
- **MongoDB Error**: Ensure you have whitelisted `0.0.0.0/0` in MongoDB Atlas Network Access.
- **Render Sleep**: Render's free tier Web Services go to sleep after 15 minutes of inactivity. The first request after a break might take 30-60 seconds.
