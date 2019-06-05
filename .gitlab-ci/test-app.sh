mkdir -p node_modules
rm -rf node_modules/*

yarn install --non-interactive

npm run compile
npm run lint
npm run test:script

. .gitlab-ci/helpers/test-audit.sh

npm run clean

. .gitlab-ci/helpers/git-diff.sh
