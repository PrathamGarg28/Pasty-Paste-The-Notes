#!/usr/bin/env bash

# Install Node.js and NPM
curl -sL https://rpm.nodesource.com/setup_lts.x | bash -
yum install -y nodejs

# Install PM2 globally
# npm install -g pm2
# pm2 update

# Clean up old deployment
rm -rf /home/ubuntu/node