name=$(node -e 'p=require("./package.json");console.log(p.name)')
package=${name/\//-}
package=${package#@}
version=$(node -e 'p=require("./package.json");console.log(p.version)')

mkdir -p .install
rm -rf .install/* .install/.??*

pushd .install

echo '{"private": true}' > package.json
cp -f ../.yarnrc .
cp -a ../.packages .
cp -f ../.packages/yarn.lock .

yarn cache clean
yarn add --offline .packages/$package-$version.tgz

npx github-apiv4-viewer-query

popd
