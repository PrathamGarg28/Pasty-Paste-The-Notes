#!/usr/bin/env bash

LOG_FILE="/home/ubuntu/validate.log"
echo "Starting validation..." > $LOG_FILE

# Wait for the application to initialize
sleep 30

PORT=3000  # Update if using a different port
echo "Checking service on port $PORT..." >> $LOG_FILE

# Retry validation a few times
for i in {1..5}; do
  if curl -s http://127.0.0.1:$PORT > /dev/null; then
    echo "Service is running successfully on port $PORT." >> $LOG_FILE
    exit 0
  fi
  echo "Retrying... ($i/5)" >> $LOG_FILE
  sleep 10
done

echo "Validation failed: Service not running on port $PORT." >> $LOG_FILE
exit 1