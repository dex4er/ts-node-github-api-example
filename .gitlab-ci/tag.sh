version=$(jq -r .version package.json)

test -n "$version" || exit 1

. .gitlab-ci/helpers/git-clone.sh

$git_work checkout $branch || $git_work checkout -b $branch || exit 1

if $git_work rev-parse --quiet --verify $version; then
    $git_work tag -d $version
    $git_work fetch --tags
fi

if ! $git_work rev-parse --quiet --verify $version; then
    $git_work tag $version
    $git_work push --tags
fi
