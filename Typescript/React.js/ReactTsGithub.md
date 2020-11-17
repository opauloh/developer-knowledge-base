The project can be found here:
[react-ts-github](https://github.com/opauloh/react-ts-github)

# react-ts-github

Create React application using TypeScript that connects to the GitHub API.

## Features

- GitHub repository search
- Profile page
- Repository list

## Requirements

User has to be able to search for a particular GitHub account name, and if there
is a match application has to display:

- User profile (profile picture, username and email, link to GitHub profile)
- Repository list (full repo name and repo description, link to GitHub repo)

User has to be able to sort repositories by name. User repositories should be
cached in order to assure immediate access of user data if the same search is
executed. Component and application styling is required

## Low-fidelity wireframe

![wireframe](https://i.imgur.com/DgvA3OF.png)

## Architectural decision

- Transpiler: Babel - We are using babel, mainly to transpile our React Code
  with shinning new ECMA6+ features to Javascript code that our target browsers
  can understand
- Data fetcher: native fetch api (For enterprise App would use a more
  appropriated library such as [SWR](https://swr.vercel.app/) or
  [React-Query](https://react-query.tanstack.com/))
- Styling: css modules with webpack loader (For enterprise App would use a CSS
  in JS library such [Styled-Components](http://styled-components.com/) or
  [Emotion](https://emotion.sh/)

## Environment variables

Rename .env.example to .env and set values to the environment variables,
currently they are:

- REACT_APP_GITHUB_AUTH_TOKEN : It's a personal token from Github Developer
  Settings, you may get this information
  [here](https://github.com/settings/tokens)

## Dependencies

- react: The aim of this project, is a JavaScript library for creating user
  interfaces and handle stage management.
- react-dom: In this project is the entry point to the DOM for React

## Dev Dependencies

- typescript : Another requirement for this project, it mades developer's life
  easier by executing javascript Type checks in development time, preventing a
  lot of unexpected runtime errors
- @babel/core: This package is core of the Babel, Babel is a compiler used to
  execute transformations on javascript, like transform ECMA 6 javascript to
  ECMA 5, for better compatibility, and support plugins to load javascript, and
  assets as well.
- @babel/preset-env: This package is used to allow Babel transpile the
  Javascript necessary accordinly to the necessary target browsers, by used
  public data from open source projects, the plugin knows if the browser is
  dead, or used by less than 0.x% of people, so it can transpile only the
  needed, used to have always the most advanced javascript running, according to
  the public target (you can specify specific browsers and versions to support
  as well).
- @babel/preset-react: This is a Babel preset, and is used to convert JSX syntax
  to React's Syntax, like from `<div>Hello</div>` to React.
- @babel/preset-typescript: This is a Babel preset, and is recommended if you
  use TypeScript, a typed superset of JavaScript. It includes the plugins
  "@babel/plugin-transform-typescript" that adds support for the syntax used by
  the TypeScript programming language. However, this plugin does not add the
  ability to type-check the JavaScript passed to it. For that, we will need to
  install and set up TypeScript
- webpack: This package is a static module bundler for Javascript Applications,
  it is responsible to map every module in the project and generate the desired
  number of bundles. (or we would have thousand of files being requested, or
  have to manually minimize them, neither option is a good deal)
- webpack-cli: This package provides a flexible set of commands for developers
  to increase speed when setting up a custom webpack project, also is needed to
  actually run the webpack in the command line.
- webpack-dev-server: It is intended to use webpack with a development server
  that provides live reloading. This should be used for development only. It
  uses webpack-dev-middleware under the hood, which provides fast in-memory
  access to the webpack assets, so it is faster, instead of rely on rewriting on
  the phisicaly on dist folder using the file system.
- html-webpack-plugin: This package is a plugins for our webpack package, and
  important to note that plugins runs after the modules of webpack resolves, we
  are using it to generate our index.html file (inside the dist folder when
  building for production) and applying a `
  <script src="[bundle_name].js"></script>` at our index.html file inside the app folder.
- babel-loader: This package allows transpiling JavaScript files using Babel and
  webpack, its totally required since we will want to transpile JSX from
  Javascript Files for development with React.js.
- css-loader: This package is commonly used with style-loader, it interprets
  @import and url() like import/require() and will resolve them. (Ex:
  `url(image.png) => require('./image.png')`)
- style-loader: This package is a loader for webpack, responsible to inject CSS
  into the DOM ex (`import './style.css';`)
- dotenv: This package allows to parse variables from a ".env" file to use on
  node on process.env
- dotenv-webpack: dotenv Plugin for webpack
- @storybook/react: Storybook is an open source tool for developing UI
  components in isolation, creating documentation out of the box, and helping
  developers to test component isolation, and this is the extension to visualize
  React components
- chromatic: Chromatic automates gathering UI feedback, visual testing, and
  documentation, so developers can iterate faster with less manual work,
  allowing to publish your Storybook to a secure cloud workspace. Stakeholders
  can review UI easier and give you feedback faster.
