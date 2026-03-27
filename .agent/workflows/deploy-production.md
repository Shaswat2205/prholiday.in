---
description: how to deploy local changes to production
---

Follow these steps to deploy your latest local changes to the live PRHolidays server:

### 1. Save and Push Locally
On your local machine (VS Code), ensure all your changes are saved, then run:
```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

### 2. Connect to the Server
Open your terminal and SSH into the EC2 instance:
```bash
ssh -i "prholiday-key.pem" ubuntu@13.49.159.134
```

### 3. Pull the Latest Code
Navigate to the project folder and pull the changes:
```bash
cd prholiday.in
git pull origin main
```

### 4. Rebuild and Re-launch
// turbo
Run the build command to update the application with the new code:
```bash
docker-compose up -d --build
```

### 5. Verify the Site
Check `https://prholiday.in` to ensure your changes are visible!

> [!TIP]
> If you only changed small frontend files and want it to be faster, you can just run `docker-compose restart app` instead of `--build`, but `--build` is the safest way to ensure everything is updated.
