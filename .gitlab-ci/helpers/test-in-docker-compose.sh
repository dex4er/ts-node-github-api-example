cd $(dirname $0)/../..

: "✳️  before_script"
. .gitlab-ci/before/environ.sh
. .gitlab-ci/before/apt.sh
. .gitlab-ci/before/gpg.sh
. .gitlab-ci/before/node.sh
. .gitlab-ci/before/yarn.sh

: "✳️  test:app"
. .gitlab-ci/test-app.sh

: "✳️  make:packages:develop"
. .gitlab-ci/make-packages.sh

: "✳️  test:packages:develop"
. .gitlab-ci/test-packages.sh

exit 0
