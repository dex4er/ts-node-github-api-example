mkdir -p node_modules
rm -rf node_modules/*

yarn install --non-interactive

. .gitlab-ci/helpers/test-audit.sh

npm pack

yarn lint
yarn test:script

. .gitlab-ci/helpers/git-diff.sh

yarn clean

GIT_LS_FILES_EXCLUDE_ARGS="-x .cache -x .install -x .nyc_output -x .packages -x .yarnrc -x *.tgz -x /coverage -x /node_modules -x yarn.lock -x yarn-error.log"

. .gitlab-ci/helpers/git-diff.sh
