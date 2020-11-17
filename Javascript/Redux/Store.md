The project can be found here: [store](https://github.com/opauloh/store)

# store

The best way to learn about redux, is to create my own store library, based on
redux concepts

This library is for educatinal purposes, to learn about and understand reducers

### Benefits of putting your state into a single state tree:

- Shared cache
- Predictable state changes
- Improved developer tooling
- Pure functions
- Server rendering

### What makes up the "Store":

- The state tree
- A way to get state from the state tree
- A way to listen to updates on the state tree
- A way to update the state tree

### What is an action?

An object which describes what sort of transformation you want to make to your
state

### What does Redux Middleware allow you to do?

Hook into the moment after dispatching an action but before that action reaches
the reducer.

### What means "connect":

To Render any component, passing that component any data it needs from the
store, and assuming it will re-render when it changes

### 01-our-custom-store

Here we built the "store", covering from these concepts:

- Default store structure: (getState, listen, update)
- Actions
- Action creator
- Middleware

### 02-using-redux

We realized that the store and also the custom middleware, has the same
structure that the "redux", so we added redux and used it instead our store.js,
concepts covered:

- "redux" library
- Combining reducers
- Applying middlewares

### 03-using-react

In this section we added react, and see how one state management library can
help to handle more predictable state change, concepts covered:

- "react" library
- Use of React's forceUpdate() method
- Loading initial data from API
- Handling success and errors from API
- Optimistically user actions
- Thunk (function that is returned by another function)

### 04-using-redux-thunk

After demystifying thunk, we added the library "redux-thunk", the main objective
was to let the actionCreators handle the necessary side effects that they need,
freeing the UI to concern just about the UI, not needing to worry about the
logic to handle API calls, and their success or errors. Also we used Context to
allow components to subscribe to the store, not needing to pass down over all
the children the store from the root component. Also the concept of connect
components with store

- "redux-thunk" library
- Context Provider
- Connect

### 05-using-react-redux

After everything we learned, we realized that the famous library "react-redux"
does the "dirty" work of building the connect for us, and now we know better
about each library responsibility, and the best practices of using redux in
production, and using redux with react, an amazing combination, when did
properly

### 06-create-react-app

Time to put things all together in a more "real world" react project, using CRA
for the sake of facility

### 07-using-hooks

Refactoring project to hooks while applying two important hooks that comes with
react-redux, useDispatch and useSelector, they allowed for a much cleaner
version
