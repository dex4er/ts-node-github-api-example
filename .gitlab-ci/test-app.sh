mkdir -p node_modules
rm -rf node_modules/*

yarn install --non-interactive

npm run prepack
npm run prepublishOnly

. .gitlab-ci/helpers/test-audit.sh

npm run clean

. .gitlab-ci/helpers/git-diff.sh
