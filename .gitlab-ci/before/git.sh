apt-get install ca-certificates curl gnupg

curl https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash

apt-get install git git-lfs

git --version
git lfs --version

git config --global user.email "gitlab-ci@$HOSTNAME"
git config --global user.name  "GitLab CI $CI_RUNNER_DESCRIPTION"
git config --global push.default current

git lfs install
git config --global lfs.locksverify false
