git commit -a
git flow release start $@ &&
npm run build && gulp build --version=$@ &&
git add --all &&
git commit -m 'build for '$@ &&
git flow release finish $@
git push origin master &&
git push origin develop
