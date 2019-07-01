apt-get install build-essential ca-certificates curl git

curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

set +x
. $HOME/.nvm/nvm.sh
nvm --version
nvm install $NODE_VERSION
set -x

node --version
npm --version

npm config set user 0
npm config set unsafe-perm true
