/*
Building React Apps for Production
If I had a dollar for every time I’ve seen someone post “slow” React
benchmarks only to find later that React was running in development mode rather
than in production, I’d have like, 6 dollars. Turns out, React in development
mode is significantly larger and slower than React in production
(because it includes a bunch of helpful things like warnings that you don’t
  need in production). Before you ever deploy your React app, it’s vital that you
  add a build step to build React in production. In this post, we’ll learn how to
  do that with Create React App as well as our own custom Webpack build.

Create React App

npm run build

That’s it 🤷‍♂️. That command will create you a build directory with a production
build of your app. You can then take that build directory and deploy it to production.

Custom Webpack Build
There’s one critical step when creating a production build with React and Webpack.
You need to tell Webpack to run in production mode. This will do a few things.
First, it’ll let Webpack know that it should minify your code.
Second, it’ll set process.env.NODE_ENV to production. This is React’s signal to
only include what is absolutely necessary to run the app (removing things like
  warnings, PropTypes, etc.).

Now the question is, how do you do that? All you need to do is add a mode property
to your Webpack config and set it to production.

mode: 'production'
And that’s it! Well, not quite. Now your app will always run in production mode,
even when you’re developing. Ideally what we want to do is have different
commands we can run based on the mode we want to run in. Something like this.

For development:
npm run start

For Production Build:
npm run build


To update our NPM scripts, we’ll need to update our package.json file.
*/
;({
  scripts: {
    start: 'webpack-dev-server',
    build: "NODE_ENV='production' webpack",
  },
})
/*
Windows users, use this instead: "SET NODE_ENV='production' && webpack"

Now, because we included NODE_ENV='production' when we run npm run build,
inside of our Webpack config, process.env.NODE_ENV will be set to production.
We can then use that to decide if Webpack should be in production or development mode.

// webpack.config.js

...
*/
mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
