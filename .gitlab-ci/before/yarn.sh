curl -o- -L https://yarnpkg.com/install.sh | bash

export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

cat > .yarnrc << END
git-tag-version false
yarn-offline-mirror "./.packages"
yarn-offline-mirror-pruning true
END
