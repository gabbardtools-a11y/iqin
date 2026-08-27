#!/usr/bin/env bash
# Analyze archive size distribution
set -euo pipefail
ARCH="/home/z/my-project/download/iqin-v5.1-full-archive-20260808-033416.tar.gz"

echo "=== Top-level dirs by compressed size (MB) ==="
tar -tzvf "$ARCH" \
  | awk '{
      # bytes in $3
      path=$6; n=split(path, a, "/"); top=a[1];
      size[top]+=$3;
    }
    END { for (k in size) printf "%-30s %.2f MB\n", k, size[k]/1024/1024 | "sort -k2 -nr" }'

echo ""
echo "=== File types by total size (MB) ==="
tar -tzvf "$ARCH" \
  | awk '{
      path=$6; n=split(path, a, "."); ext=a[n];
      size[ext]+=$3;
    }
    END { for (k in size) printf "%-10s %.2f MB\n", k, size[k]/1024/1024 | "sort -k2 -nr" }'

echo ""
echo "=== Top 20 heaviest files (MB) ==="
tar -tzvf "$ARCH" \
  | sort -k3 -nr \
  | head -20 \
  | awk '{printf "%.2f MB  %s\n", $3/1024/1024, $6}'

echo ""
echo "=== Count of PNG files by directory ==="
tar -tzf "$ARCH" | grep '\.png$' \
  | awk -F/ '{ if (NF>=3) print $1"/"$2"/"$3; else print $1"/"$2 }' \
  | sort | uniq -c | sort -nr
