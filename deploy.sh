cd ../workspace/monorepo/ &&
pm2 stop go_api &&
git pull &&
pm2 start go_api &&
cd projects/react-app/ &&
pnpm i &&
pnpm build &&
rsync -a --delete dist/ /var/www/static/ &&
echo "Done..."
#rsync -a --delete dist/ $STATIC_DEST_DIR
# Note: Missing env vars referenced with a trailing slash seem to count as the root folder (shouldn't be any risk unless you run as root for some reason but FYI just in case)
