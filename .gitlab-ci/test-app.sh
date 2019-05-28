mkdir -p node_modules
rm -rf node_modules/*

yarn install --non-interactive

npm test

if [ "$TEST_AUDIT" == "yes" ]; then
    . .gitlab-ci/helpers/yarn-audit.sh
fi
