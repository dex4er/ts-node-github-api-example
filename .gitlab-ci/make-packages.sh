name=$(node -e 'p=require("./package.json");console.log(p.name)')
package=${name/\//-}
package=${package#@}
version=$(node -e 'p=require("./package.json");console.log(p.version)')

mkdir -p node_modules
rm -rf node_modules/*
rm -f yarn.lock

yarn cache clean
yarn install --non-interactive

npm pack --unsafe-perm .

cp -f yarn.lock .packages/yarn-dev.lock
cp -f $package-$version.tgz .packages/

mkdir -p .install
rm -rf .install/* .install/.??*

pushd .install

echo '{"private": true}' > package.json
cp -f ../.yarnrc .
cp -a ../.packages .

yarn cache clean
yarn add .packages/$package-$version.tgz

popd

cp -f .install/yarn.lock .packages/

npm run clean

. .gitlab-ci/helpers/git-diff.sh
