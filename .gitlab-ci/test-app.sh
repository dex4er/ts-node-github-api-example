mkdir -p node_modules
rm -rf node_modules/*

yarn install --non-interactive

npm test
