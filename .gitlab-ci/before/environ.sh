set -e
set -o pipefail
set -x

export LANG="C.UTF-8"
export DEBIAN_FRONTEND="noninteractive"
export FORCE_COLOR="1"
export TERM="xterm"
export XDG_CACHE_HOME="${CI_PROJECT_DIR:-$PWD}/.cache"
