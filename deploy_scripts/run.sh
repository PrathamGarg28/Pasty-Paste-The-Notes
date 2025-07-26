#!/usr/bin/env bash

# Navigate to the application directory
cd /home/ubuntu/node

# Install dependencies
sudo npm install

# Start the application in detached mode
sudo npm run dev > /tmp/app.log 2>&1 &