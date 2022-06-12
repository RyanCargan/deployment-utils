echo "Done..."
#rsync -a --delete dist/ $STATIC_DEST_DIR
# Note: Missing env vars referenced with a trailing slash seem to count as the root folder (shouldn't be any risk unless you run as root for some reason but FYI just in case)
