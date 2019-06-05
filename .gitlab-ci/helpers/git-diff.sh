git diff --stat --exit-code

for f in $(git ls-files --others --exclude-standard); do
    git diff --no-index --stat --exit-code /dev/null $f
done
