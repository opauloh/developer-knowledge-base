TL;DR When you have Jest as your test runner, passing the --maxWorkers=50%
option will make the tests faster in most cases. For watch mode, use
--maxWorkers=25%, and for CI disable Jest workers with --runInBand. You can
experiment with the percentage and fine-tune for your particular setup.

```js
// package.json
{
  "scripts": {
    // standalone Jest
    "test": "jest --maxWorkers=50%",
    "test:watch": "jest --watch --maxWorkers=25%",
    "test:ci": "jest --runInBand",

    // or with Create React App
    "test": "react-scripts test --watchAll=false --maxWorkers=50%",
    "test:watch": "react-scripts test --maxWorkers=25%",
    "test:ci": "react-scripts test --watchAll=false --runInBand"
  }
}
```
