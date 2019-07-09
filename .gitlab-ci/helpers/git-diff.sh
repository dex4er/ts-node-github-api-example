git diff --stat --exit-code

for f in $(git ls-files --others ${GIT_LS_FILES_EXCLUDE_ARGS:---exclude-standard}); do
    git diff --no-index --stat --exit-code /dev/null $f
done
