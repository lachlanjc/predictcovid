#!/bin/sh

set -ex

# checks if main script
if [ "$*" = "yarn rw dev api" ]; then
  # initialize db
  yarn rw prisma migrate dev
  yarn rw prisma db seed

  # hack
  echo "Scraping..."
  # start temp api server in the background
  yarn rw dev api &
  pid=$!
  sleep 15
  curl http://localhost:8911/scrape

  # kill temp server
  kill $pid
fi

# call CMD
exec "$@"
