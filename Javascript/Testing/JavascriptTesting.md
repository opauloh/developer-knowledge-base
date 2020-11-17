The project can be found here:
[javascript-testing](https://github.com/opauloh/javascript-testing)

# javascript-testing

The best way to learn about testing in Javascript, is to create my own assertion
library, based on jest concepts

This project is for educatinal purposes, to learn about and understand how
testing works under Javascript world

## notes

### eslint

- If you are migrating an existent project to use eslint, and probably with
  Continuous Integration, you will might want to set your .eslist rules to
  "warn", instead of "error"
- If you are using no-undef, you will probably want to set your env to use
  browser, configure it with:

```
"env": {
  "browser": true
}
```

- Instead of configure each rule on eslint, we can extend it from the
  recommended, and then override what we want to change, we can extend with the
  following:

```
"extends": [
  "eslint:recommended"
]
```

- Its a good practice to ignore the same files on .gitignore (like node_modules,
  dist), then we can use this flag: eslint --ignore-path .gitignore, and eslint
  will ignore the pathes that are on .gitignore file
- Its possible to improve use of eslint alongside prettier, by using the
  extension eslint-config-prettier, then you can go to the .eslintrc file and
  extend eslint to take configs from prettier, by using:

```
  "extends": ["eslint:recommended", "eslint-config-prettier"]
```

### lint-staged

- In order to prevent our lint running always in all files in the project, we
  added lint-staged, this tool allow us to run our lint just in git staged
  files, before the commit

### npm-run-all

- In order to run all commands in parallel we can make of npm-run-all library
  (it works with yarn as well, also this can be used when we want to run
  multiple commands in Windows)

### husky

- If you have to always run a script before your commits (or other git hooks
  like push, pull), you can use husky to altomate this task for you, in this
  case was used to run a validate command

### fun facts

rc suffix (like in .babelrc and .eslintrc) stands for "run commands", Thus, it
would seem that the "rc" part stands for "runcom", which I believe can be
expanded to "run commands". In fact, this is exactly what the file contains,
commands that bash should run.
