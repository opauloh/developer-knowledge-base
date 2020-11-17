The project can be found here:
[jest-cypress-react-babel-webpack](https://github.com/opauloh/jest-cypress-react-babel-webpack)

### notes

- window object are available when you define your environment in jest.config.js
  as `testEnvironment : 'jest-environment-jsdom'`, its a browser environment
  simulated provided by jest
- If importing css like common using loader, jest may point an error, because he
  tries to load using common JS, and it is just a css file, to work around this,
  we can use the moduleNameMapper option in jest.config.js, and this way, it
  will require this style-mock file, whenever the file ending matches .css

```
moduleNameMapper: {
  '\\.css$' : require.resolve('./test/style-mock.js')
}
```

- You can debug a component in jest by using the following:

```
test('renders', () => {
  const {debug} =  render(<AutoScalingText />)
  debug()
})
```

- Snapshots are good, but consider thinking about put them inline instead of
  creating a new file, because the files can become very long and unreadable

- Snapshots can be useful to test components, because they can test the render
  of the elements, I should add here that when you're using
  toMatchInlineSnapshot(), you are required to have Prettier installed in your
  project because jest is updating the code in your test file and it wants to
  make sure that it doesn't change more than it has to with regard to your
  formatting. If you don't have Prettier installed, then you have to use
  toMatchSnapshot()

- We can configure webpack to resolve specific folders, so we can include
  everything in these folders without specifing all the relative imports, this
  is useful to speed up development

```
resolve: {
    modules: ['node_modules', path.join(__dirname, 'src'), 'shared'],
}
// ...
import CalculatorDisplay from 'calculator-display' // this file is on the shared folder, but can be used anywhere
```

- We can configure jest to resolve the same modules as in webpack with the
  "moduleDirectories" option:

```
moduleDirectories: ['node_modules', path.join(__dirname, 'src'), 'shared']
```

- When handling DOM assertions we can use @testing-library/jest-dom library, and
  there is even a option pre-built for extend the expect assertion from jest
  with @testing-library/jest-dom/extend-expect, also we can configure it
  directly in jest.config.js to always load this file, using the
  setupFilesAfterEnv of jest config

```
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
```

- We can use node --inspect-brk to run our codes with debugger from the chrome
  engine of our browser

- When using coverage to see how much of our code is covered by tests, we should
  specify which part of our application matters to be covered, or files like our
  utilities files will be included and obfuse our percentage. We can specify
  this in jest.config.js:

```
  collectCoverageFrom: ['**/src/**/*.js'],
```

- Also to enable coverage we add the --coverage flag on our test command in
  package.json, we don't add it to watch, or our coverage file will be confused
  with partial tests if we run partial on our watch

```
    "test": "jest --coverage",
```

- Jest knows about the coverage because it uses the plugin
  **babel-plugin-istanbul**, that transforms the code to instrument for
  coverage. And, if needed, we can disable coverage for certain parts of the
  code passing the instruction to istanbul:

```js
/* istanbul ignore next */

if (actualScale < 1) {
  return actualScale * 0.9;
}
```

- If we want our code to not decrease coverage, we can configure
  coverageThreshold on jest.config, by using:

```js
coverageThreshold: {
    global: {
      statements: 34,
      branches: 16,
      functions: 29,
      lines: 32,
    }
  }
```

In this scenario, the global threshold was configured by using the current
scenario, with 2% lower to provide some flexibility, also if we need to
configure threshold for specific files (for example files that are more
importants), we can use as follows:

```js
coverageThreshold: {
    global: {
      statements: 34,
      branches: 16,
      functions: 29,
      lines: 32,
    },
    './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  }
```

- When you have test scripts that must run on server side, Its possible to
  configure jest to choose in which environment to use, in order to do that we
  created a jest-common.js file, jest.client.js and jest.server.js file, and
  these two last files has the configurations for each environment.

- Also, we can combine these multiple configurations into jest.config.js by
  using the projects property,
  `projects: ['./test/jest.client.js', './test/jest.server.js'],`, the jest can
  be able to run multiple environments at once

- One thing about jest's watch mode is that is pluggable, and we can configure
  it in our config like that:

```js
module.exports = {
  // ...
  watchPlugins: ['jest-watch-select-projects'], //['pluginName']
};
```

- We can add pre-commit checking with husky, to run all tests our CI would run
  in the files we changed, to reduce the chances of our code breaking on CI, so
  this makes our workflow fast because we can almost always move on to another
  project once we push one feature, because we know that CI was going to pass

### identity-obj-proxy

- This library allow us to identity object using ES6 proxies. Useful for mocking
  webpack imports. For instance, you can tell Jest to mock this object as
  imported CSS modules; then all your className lookups on the imported styles
  object will be returned as-is.

### jest-emotion

- This library help to identify what part of the css actually changed between
  different snapshots, it is very useful to speed up tests

### eslint-import-resolver-jest

- We can add this library to resolve files from jest, so our eslint does not
  warning against imports that are only in the jest config, also we can write it
  on the jsconfig.js to make our editor map the files when we click over it

### is-ci-cli

- With this library we can run specific scripts for CI environments, like in
  this example we want to run coverage when in CI and watch when not in CI, to
  run with npm t

### jest-runner-eslint

- This library allows us to run eslint during tests, so the linting occurs
  naturally as part of our tests, and do not need to be run as a separated
  eslint command, and also we can specify to lint only files we are working
  with. It can be nice for bigger projects where you have tons of files that
  you're linting and you want to scope down the files that you're linting to
  just the ones that you're working with at the time you're committing your
  code.

### jest-watch-select-projects

- This is a jest watch plugin, that allows us to filter our watch mode by
  projects

### jest-watch-typeahead

- This jest watch plugin allows us to filter which files to test by filename and
  by test name

### husky

- If you have to always run a script before your commits (or other git hooks
  like push, pull), you can use husky to altomate this task for you, in this
  case was used to run our validate command

### lint-staged

- In order to prevent our lint running always in all files in the project, we
  added lint-staged, this tool allow us to run our lint just in git staged
  files, before the commit
