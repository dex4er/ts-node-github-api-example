mkdir -p node_modules
rm -rf node_modules/*

yarn install --non-interactive

npm pack

yarn lint
yarn test:script

. .gitlab-ci/helpers/test-audit.sh

yarn clean

. .gitlab-ci/helpers/git-diff.sh
