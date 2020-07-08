/*
Redux Hooks

Before the advent of React Hooks, we had to invent convoluted patterns for 
composing non-visual logic. One such example of this is react-redux's connect 
component.

As you’ve seen, connect is a Higher-order component that allows you connect a 
React component to the Redux store. When using connect, that component would 
receive dispatch as well as any other state on the store that it specified.

*/
function Profile({ dispatch, user }) {
  // ...
}

export default connect((state) => {
  return {
    user: state.user
  }
})(Profile)

/*
Though manageable, connect always felt like it composed against React, rather 
than with it. Again, this wasn’t the fault of react-redux. At the time, the best 
way to compose non-visual logic was by using a Higher-order component 
(as with connect) or a Render prop. However, with the advent of React Hooks, all 
of this changed.

Instead of relying on a single connect Higher-order component to connect a 
component to the Redux store, react-redux could break out that logic into 
individual custom Hooks.

If you think about the two primary uses of connect, they are getting access to a 
certain portion of the state and getting access to dispatch. Those map nicely to 
their own custom Hooks and that’s exactly what react-redux did.

useSelector
useSelector was released as part of react-redux v7.1.0. It’s sole purpose is to 
extract data from the Redux store using a selector function.
*/

import { useSelector } from 'react-redux'

function Profile() {
  const user = useSelector((state) => state.user)
  // ...
}

/*
Oh boy - that’s nice. The function you pass to useSelector will be passed the 
state from the store. From there you can grab any value from the state by returning it.

The only caveat around useSelector has to do with selecting multiple values 
from the store. For example, say we wanted to grab user, authed, and notifications.
Your first intuition might look like this.
*/
const { user, authed, notifications } = useSelector((state) => ({
  user: state.user,
  authed: state.authed,
  notifications: state.notifications
}))
/*
Though this will work, it won’t be as performant as it could be. The reason for 
this is because under the hood, useSelector uses strict reference equality to 
decided when to re-render the component. By returning an object from useSelector,
the strict reference equality (oldReturnValue === newReturnValue) will never be
true meaning the component will always re-render. 
There are a few ways to get around this - my favorite being breaking out each 
piece of state into its own selector.

const user = useSelector((state) => state.user)
const authed = useSelector((state) => state.authed)
const notifications = useSelector((state) => state.notifications)
The reason this works is because react-redux will batch each of the selectors 
together causing only a single re-render.

“You may call useSelector() multiple times within a single function component.
Each call to useSelector() creates an individual subscription to the Redux store.
Because of the React update batching behavior used in React Redux v7, a dispatched
action that causes multiple useSelector()s in the same component to return new
values should only result in a single re-render.” - React Redux docs

Now that we know how to use useSelector to get access to the store’s state,
the next use case of connect was getting access to dispatch.

useDispatch
useDispatch returns a reference to the store’s dispatch function.
*/
import { useDispatch } from 'react-redux'

function Profile() {
  const dispatch = useDispatch()
  // ...
}
/*
Yeah, it’s that easy.

With react-redux's useSelector and useDispatch Hooks, we can now compose our
Redux store with React, rather than against it.
*/
