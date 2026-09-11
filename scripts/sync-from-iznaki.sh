#!/bin/bash
# Sync iznaki → iqin (INDEPENDENT mode) — every 12 hours via cron
set -e
LOG=/var/log/iqin-sync.log
echo "=== $(date) ===" >> $LOG

# Run Python sync script (copies images, updates data.ts, removes iznaki links)
python3 /var/www/iqin/scripts/sync_independent.py >> $LOG 2>&1
if [ $? -ne 0 ]; then
  echo "❌ SYNC FAILED" >> $LOG
  exit 1
fi

# Rebuild iqin
cd /var/www/iqin
NODE_ENV=production npm run build >> $LOG 2>&1
if [ $? -ne 0 ]; then
  echo "❌ BUILD FAILED" >> $LOG
  exit 1
fi
echo "✓ build complete" >> $LOG

# Restart PM2
pm2 restart iqin --update-env >> $LOG 2>&1
echo "✓ pm2 iqin restarted" >> $LOG
echo "=== SYNC DONE ===" >> $LOG
