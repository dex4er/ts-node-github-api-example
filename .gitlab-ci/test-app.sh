mkdir -p node_modules
rm -rf node_modules/*

yarn install --non-interactive

npm test

. .gitlab-ci/helpers/test-audit.sh

npm run clean

git add .
git diff-index --quiet HEAD