git checkout test &&
git merge develop &&
npm run build-test && gulp build --version=test_$@ &&
git add . &&
git commit -m build test for $@ &&
git push origin test
