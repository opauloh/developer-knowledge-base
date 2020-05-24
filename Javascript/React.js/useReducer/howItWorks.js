/*
We’re going to start this post off exactly how you’d expect, by talking about
JavaScript’s forEach method. forEach lives on Array.prototype and every instance 
of Array has access to it. It allows you to invoke a provided function once for 
each element in an array.
*/
const friends = ['Jake', 'Mikenzi', 'Jacob']

friends.forEach((friend) => addToDOM(friend))
/*
Now, say you had an array of numbers, [2,4,6]. Using forEach to iterate through 
each number, how would you add all of the numbers together to get a single 
value, 12? One approach might look like this.
*/
const nums = [2, 4, 6]
let state = 0

function sum(value) {
    state += value
}

nums.forEach(sum)

/*
With forEach, to add up all of the values, we need to create and manage an 
intermediate value (state) and modify it on each invocation. As this 
demonstrates, not only is forEach dependent on the state of our application, 
but it’s also modifying state outside of its own scope - this makes it an 
impure function. While not always bad, it’s best to avoid impure functions 
when you can. To accomplish the same functionality with a pure function, we can
use JavaScript’s reduce method.

Reduce
Reduce (also referred to as fold, accumulate, or compress) is a functional 
programming pattern that takes a collection (an array or object) as input and 
returns a single value as output. In JavaScript, the most common use of reduce 
is the reduce method all Arrays have access to. Applying reduce to our example 
above, our input would be nums and our output would be the summation of every 
value in nums.

The key difference between reduce and forEach is that reduce is able to keep 
track of the accumulated state internally without relying upon or modifying 
state outside of its own scope - that’s what makes it a pure function. 
The way it does this is, for each element in the collection, it invokes a 
reducer function passing it two arguments, the accumulated state and the 
current element in the collection. What the reducer function returns will be 
passed as the first argument to the next invocation of the reducer and will 
eventually result in the final value.
*/
const nums = [2, 4, 6]
const initialState = 0

function reducer(state, value) {
    return state + value
}

const total = nums.reduce(reducer, initialState)

/*
The very first time the reducer function is invoked, state will be 0 and value 
will be 2. Then on the next invocation, state will be whatever the previous 
invocation returned, which was 0 + 2 and value will be the 2nd element in the 
array, 4. Then on the next invocation, state will be 6 (2 + 4) and value 
will be 6. Finally, since are no more elements in the collection to iterate 
over, the returned value will be 6 + 6 or 12. We can see this in the diagram 
below.

Initial Value: 0

First invocation:
  state: 0
  value: 2

Second invocation:
  state: 2
  value: 4

Third invocation:
  state: 6
  value: 6

No more elements in the collection, return 6 + 6 which is 12.
Here’s what we know so far - reduce is a functional programming pattern that 
takes a collection as input and returns a single value as output. The way you 
get to that single value is by invoking a reducer function for every element 
in the collection.

Now, instead of using this pattern to transform arrays, how can we apply it to 
creating better UI? What if instead of our input collection being an array, 
it was a collection of user actions that happened over time? Then, whenever a 
new user action occurred, we could invoke the reducer function which would get 
us the new state.

Assuming we had a simple UI that was a button and a counter that incremented 
every time the button was clicked, here’s what the flow might look like using 
the same reducer logic.

UI: 0 ➕

User clicks ➕, reducer is invoked:
  state: 0
  value: 1

UI: 1 ➕

User clicks ➕, reducer is invoked:
  state: 1
  value: 1

UI: 2 ➕

User clicks ➕, reducer is invoked:
  state: 2
  value: 1

UI: 3 ➕
It might seem strange, but if you think about reduce in the context of being a 
functional programming pattern, it makes sense that we can utilize it to 
create more predictable UIs. Now the question is, how?

useReducer
React comes with a built-in Hook called useReducer that allows you to add 
state to a function component but manage that state using the reducer pattern.

The API for useReducer is similar to what we saw earlier with reduce; 
however, there’s one big difference. Instead of just returning the state, as 
we mentioned earlier, we need a way for user actions to invoke our reducer 
function. Because of this, useReducer returns an array with the first element 
being the state and the second element being a dispatch function which when 
called, will invoke the reducer.
*/
const [state, dispatch] = React.useReducer(
    reducer,
    initialState
)
/*
When invoked, whatever you pass to dispatch will be passed as the second 
argument to the reducer (which we’ve been calling value). The first argument 
(which we’ve been calling state) will be passed implicitly by React and will be 
whatever the previous state value was. Putting it all together, here’s our code.
*/
function reducer(state, value) {
    return state + value
}

function Counter() {
    const [count, dispatch] = React.useReducer(
        reducer,
        0
    )

    return (
        <React.Fragment>
            <h1>{count}</h1>
            <button onClick={() => dispatch(1)}>
                +
      </button>
        </React.Fragment>
    );
}
/*
The flow is the exact same as our diagram above. Whenever the + button is 
clicked, dispatch will be invoked. That will call reducer passing it two 
arguments, state, which will come implicitly from React, and value, which will 
be whatever was passed to dispatch. What we return from reducer will become our 
new count. Finally, because count changed, React will re-render the component, 
updating the UI.

At this point, you’ve seen how useReducer works in its most basic form. 
What you haven’t seen yet is an example of useReducer that resembles anything 
close to what you’d see in the real-world. To get closer to that, let’s add a 
little bit of functionality to our app. Instead of just incrementing count by 1, 
let’s add two more buttons - one to decrement count and one to reset it to 0.

For decrementing, all we need to do is pass -1 to dispatch, because math.
*/

function reducer(state, value) {
    return state + value
}

function Counter() {
    const [count, dispatch] = React.useReducer(
        reducer,
        0
    )

    return (
        <React.Fragment>
            <h1>{count}</h1>
            <button onClick={() => dispatch(1)}>
                +
      </button>
            <button onClick={() => dispatch(-1)}>
                -
      </button>
        </React.Fragment>
    );
}
/*
For resetting the count to 0, it gets a little trickier.

Right now with how we’ve set up our reducer function, there’s no way to specify 
different types of actions that can occur to update our state. We only accept a 
value (which we get from whatever was passed to dispatch) and add that to state.
*/
function reducer(state, value) {
    return state + value
}
/*
What if instead of dispatching the value directly, we dispatch the type of 
action that occurred? That way, based on the type of action, our reducer can 
decide how to update the state.

With the current functionality of our app, we’ll have three different action 
types, increment, decrement, and reset.
*/
return (
    <React.Fragment>
        <h1>{count}</h1>
        <button onClick={() => dispatch('increment')}>
            +
    </button>
        <button onClick={() => dispatch('decrement')}>
            -
    </button>
        <button onClick={() => dispatch('reset')}>
            Reset
    </button>
    </React.Fragment>
);
/*
Now, inside of our reducer, we can change how we update the state based on those 
action types. Instead of naming our second parameter value, we’ll change it to 
action to better represent what it is.
*/

function reducer(state, action) {
    if (action === 'increment') {
        return state + 1
    } else if (action === 'decrement') {
        return state - 1
    } else if (action === 'reset') {
        return 0
    } else {
        throw new Error(`This action type isn't supported.`)
    }
}

function Counter() {
    const [count, dispatch] = React.useReducer(
        reducer,
        0
    )

    return (
        <React.Fragment>
            <h1>{count}</h1>
            <button onClick={() => dispatch('increment')}>
                +
      </button>
            <button onClick={() => dispatch('decrement')}>
                -
      </button>
            <button onClick={() => dispatch('reset')}>
                Reset
      </button>
        </React.Fragment>
    );
}
/*
This is where we start to see useReducer shine. You may not have noticed it, but 
we’ve completely decoupled the update logic of our count state from our 
component. We’re now mapping actions to state transitions. We’re able to separate 
how the state updates from the action that occurred. We’ll dive into the 
practical benefits of this later on in this post.

Let’s add another feature to our app. Instead of incrementing and decrementing 
count by 1, let’s let the user decide via a slider. Imagine we had a Slider 
component that took in 3 props, min, max, and onChange.
*/
<Slider
    min={1}
    max={10}
    onChange={(value) => ({})}
/>
/*
The way we get the value of the slider is via the Slider's onChange prop. 
Knowing this, and knowing that its the value of the slider that will decide by 
how much we increment and decrement count, what changes do we need to make to 
our reducer?

Right now the state for our reducer is an integer which represents the count. 
This worked previously, but now that we need our reducer to manage another piece 
of state for our slider value, we’ll need to modify it. Instead of being an 
integer, let’s make it an object. This way, any new pieces of state that our 
reducer needs to manage can go as a property on the object.

0 -> { count: 0, step: 1 }
Now we need to actually update our code. The first change we need to make is for 
the initial state of our reducer. Instead of 0 (representing count), it’ll be 
our state object.
*/
const [state, dispatch] = React.useReducer(
    reducer,
    { count: 0, step: 1 }
)
/*
Now, since state is no longer an integer, we’ll need to update the reducer to 
account for that.
*/
function reducer(state, action) {
    if (action === 'increment') {
        return {
            count: state.count + 1,
            step: state.step,
        }
    } else if (action === 'decrement') {
        return {
            count: state.count - 1,
            step: state.step,
        }
    } else if (action === 'reset') {
        return {
            count: 0,
            step: state.step,
        }
    } else {
        throw new Error(`This action type isn't supported.`)
    }
}
/*
Now that our reducer is updated with our new state object, the next thing we 
need to do is update step whenever the user moves the slider. If you’ll remember, 
we get access to that slider value by passing an onChange function to Slider.
*/
return (
    <Slider
        min={1}
        max={10}
        onChange={(value) => ({})}
    />
)
/*
Now the question becomes, what do we want to dispatch? Up until this point, 
we’ve been able to dispatch the type of action that occurred (increment, 
decrement, and reset). This worked fine but we’re now running into its 
limitations. Along with the action type, we also need to include some more data. 
In our case, we want to pass along the value of the slider so we can update our 
step state. To do this, instead of having our action we dispatch be a string, 
let’s change it to be an object with a type property. Now, we can still dispatch 
based on the type of action that occurred, but we can also pass along any other 
data as properties on the action object. We can see this perfectly with what we 
dispatch from our Slider.
*/
return (
    <Slider onChange={(value) => dispatch({
        type: 'updateStep',
        step: value
    })} />
)
/*
While we’re here, we also need to update all our other dispatches to pass an 
object with a type property instead of a string.
*/
return (
    <React.Fragment>
        <Slider onChange={(value) => dispatch({
            type: 'updateStep',
            step: value
        })} />
        <hr />
        <h1>{state.count}</h1>
        <button onClick={() => dispatch({
            type: 'increment',
        })}>+</button>
        <button onClick={() => dispatch({
            type: 'decrement'
        })}>-</button>
        <button onClick={() => dispatch({
            type: 'reset'
        })}>Reset</button>
    </React.Fragment>
)
/*
Finally, there are three changes we need to make to our reducer.First, we need 
to account for our new action type, updateStep.Next, we need to account for 
changing action to be an object instead of a string.Finally, we need to update 
increment and decrement to adjust the count based on the step property and not 
just 1.
*/

function reducer(state, action) {
    if (action.type === 'increment') {
        return {
            count: state.count + state.step,
            step: state.step,
        }
    } else if (action.type === 'decrement') {
        return {
            count: state.count - state.step,
            step: state.step,
        }
    } else if (action.type === 'reset') {
        return {
            count: 0,
            step: state.step,
        }
    } else if (action.type === 'updateStep') {
        return {
            count: state.count,
            step: action.step,
        }
    } else {
        throw new Error(`This action type isn't supported.`)
    }
}
/*
With that, we see another subtle but powerful benefit of useReducer you might 
have missed.Because the reducer function is passed the current state as the 
first argument, it’s simple to update one piece of state based on another 
piece of state.In fact, I’d go as far as to say whenever updating one piece 
of state depends on the value of another piece of state, reach for useReducer.
In our example, we can see this in how we’re updating count based on the value of step.

At this point, we’ve seen both how useReducer works and some of the advantages 
it gives us. Now, let’s dive a little deeper into those advantages and answer 
the question you’ve most likely been asking.

useState vs useReducer

Fundamentally, useState and useReducer accomplish the same thing - they both 
allow us to add state to function components. Now the question becomes, when 
should you use one over the other ?

Declarative state updates

Imagine we were creating a component that was responsible for handling the 
registration flow for our app. In this app, we need to collect three pieces of 
information from the user - their username, email, and password. For UX purposes, 
we’ll also need a few other pieces of state, loading, error, and registered.
Using useState, here’s one approach for how we’d accomplish this.
*/
function Register() {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [registered, setRegistered] = React.useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')

        newUser({ username, email, password })
            .then(() => {
                setLoading(false)
                setError('')
                setRegistered(true)
            }).catch((error) => {
                setLoading(false)
                setError(error)
            })
    }

    if (registered === true) {
        return <Redirect to='/dashboard' />
    }

    if (loading === true) {
        return <Loading />
    }

    return (
        <React.Fragment>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type='text'
                    placeholder='username'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <input
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type='password'
                />
                <button type='submit'>Submit</button>
            </form>
        </React.Fragment>
    )
}
/*

First, there’s nothing wrong with this code. It works just fine.However, it’s a 
pretty imperative approach to solving the problem. We’re conforming to the 
operational model of the machine by describing how we want to accomplish the 
task. Instead, what if we took a more declarative approach ? Instead of 
describing how we want to accomplish the task, let’s describe what we’re trying 
to accomplish.This declarative approach will allow us to conform closer to the 
mental model of the developer. To accomplish this, we can leverage useReducer.

The reason useReducer can be more declarative is because it allows us to map 
actions to state transitions.This means, instead of having a collection of setX 
invocations, we can simply dispatch the action type that occurred. Then our 
reducer can encapsulate the imperative, instructional code.

To see what this looks like, let’s assume we’ve already set up our registerReducer 
and we’re updating our handleSubmit function we saw above.
*/
const handleSubmit = (e) => {
    e.preventDefault()

    dispatch({ type: 'login' })

    newUser({ username, email, password })
        .then(() => dispatch({ type: 'success' }))
        .catch((error) => dispatch({
            type: 'error',
            error
        }))
}
/*
Notice that we’re describing what we want to do - login. Then, based on that 
result, success or error.

Here’s what all of the code now looks like, including our new registerReducer.
*/
function registerReducer(state, action) {
    if (action.type === 'login') {
        return {
            ...state,
            loading: true,
            error: ''
        }
    } else if (action.type === 'success') {
        return {
            ...state,
            loading: false,
            error: '',
            registered: true
        }
    } else if (action.type === 'error') {
        return {
            ...state,
            loading: false,
            error: action.error,
        }
    } else if (action.type === 'input') {
        return {
            ...state,
            [action.name]: action.value
        }
    } else {
        throw new Error(`This action type isn't supported.`)
    }
}

const initialState = {
    username: '',
    email: '',
    password: '',
    loading: false,
    error: '',
    registered: false
}

function Register() {
    const [state, dispatch] = React.useReducer(
        registerReducer,
        initialState
    )

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch({ type: 'login' })

        newUser({
            username: state.username,
            email: state.email,
            password: state.password
        })
            .then(() => dispatch({ type: 'success' }))
            .catch((error) => dispatch({
                type: 'error',
                error
            }))
    }

    if (state.registered === true) {
        return <Redirect to='/dashboard' />
    }

    if (state.loading === true) {
        return <Loading />
    }

    return (
        <React.Fragment>
            {state.error && <p>{state.error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='email'
                    onChange={(e) => dispatch({
                        type: 'input',
                        name: 'email',
                        value: e.target.value,
                    })}
                    value={state.email}
                />
                <input
                    type='text'
                    placeholder='username'
                    onChange={(e) => dispatch({
                        type: 'input',
                        name: 'username',
                        value: e.target.value,
                    })}
                    value={state.username}
                />
                <input
                    placeholder='password'
                    onChange={(e) => dispatch({
                        type: 'input',
                        name: 'password',
                        value: e.target.value,
                    })}
                    value={state.password}
                    type='password'
                />
                <button type='submit'>Submit</button>
            </form>
        </React.Fragment>
    )
}
/*
Update state based on another piece of state

We’ve already seen this one in action.From earlier, “because the reducer 
function is passed the current state as the first argument, it’s simple to 
update one piece of state based on another piece of state. In fact, I’d go as 
far as to say whenever updating one piece of state depends on the value of 
another piece of state, reach for useReducer.”

We’ll see another example of why this holds true in the next section.

Minimize Dependency Array

Part of mastering the useEffect Hook is learning how to properly manage its 
second argument, the dependency array.
*/
React.useEffect(() => {
    // side effect
}, [/* dependency array */])
/*
Leave it off and you could run into an infinite loop scenario. Forget to add 
values your effect depends on and you’ll have stale data. Add too many values 
and your effect won’t be re - invoked when it needs to be.

It may come as a surprise, but useReducer is one strategy for improving the 
management of the dependency array. The reason for this goes back to what we’ve 
mentioned a few times now, useReducer allows you to decouple how the state is 
updated from the action that triggered the update. In practical terms, because 
of this decoupling, you can exclude values from the dependency array since the 
effect only dispatches the type of action that occurred and doesn’t rely on any 
of the state values(which are encapsulated inside of the reducer). That was a 
lot of words, here’s some code.
*/
React.useEffect(() => {
    setCount(count + 1)
}, [count])

React.useEffect(() => {
    dispatch({
        type: 'increment'
    })
}, [])
/*
In the second code block, we can remove count from the dependency array since 
we’re not using it inside of the effect. When is this useful ? Take a look at 
this code.Notice anything wrong ?
*/
React.useEffect(() => {
    const id = window.setInterval(() => {
        setCount(count + 1)
    }, 1000)

    return () => window.clearInterval(id)
}, [count])
/*
Every time count changes(which is every second) our old interval is going to be 
cleared and a new interval is going to be set up. That’s not ideal.

Instead, we want the interval to be set up one time and left alone until the 
component is removed from the DOM. To do this, we have to pass an empty array as
the second argument to useEffect. Again, useReducer to the rescue.
*/
React.useEffect(() => {
    const id = window.setInterval(() => {
        dispatch({ type: 'increment' })
    }, 1000)

    return () => window.clearInterval(id)
}, [])
/*
We no longer need to access count inside of our effect since it’s encapsulated 
in the reducer. This allows us to remove it from the dependency array.

Now for the record, there is one way to fix the code above without useReducer.
You may remember that you can pass a function to the updater function useState 
gives you. When you do this, that function will be passed the current state value.
We can utilize this to clear out our dependency array without having to use 
useReducer.
*/
React.useEffect(() => {
    const id = window.setInterval(() => {
        setCount((count) => count + 1)
    }, 1000)

    return () => window.clearInterval(id)
}, [])
/*
This works fine, but there is one use case where it starts to fall apart. If 
you’ll remember back to our Counter component earlier, the final piece of 
functionality we added was the ability for the user to control the step via a 
Slider component. Here’s the workable code as a refresher. Once we added step,
count was then updated based on that step state. This is the use case where our 
code above starts to fall apart. By updating count based on step, we’ve 
introduced a new value into our effect which we have to add to our dependency array.
*/
React.useEffect(() => {
    const id = window.setInterval(() => {
        setCount((count) => count + step)
    }, 1000)

    return () => window.clearInterval(id)
}, [step])
/*
Now we’re right back to where we started. Anytime step changes, our old interval
is going to be cleared and a new interval is going to be set up. Again, not ideal.
Luckily for us, the solution is the same, useReducer.
*/
React.useEffect(() => {
    const id = window.setInterval(() => {
        dispatch({ type: 'increment' })
    }, 1000)

    return () => window.clearInterval(id)
}, [])
/*
Notice the code is still the exact same as we saw earlier. Encapsulated inside
of the increment action is the logic for count + step. Again, since we don’t
need any state values to describe what happened, we can clear everything from
our dependency array.

Summary

useState and useReducer both allow you to add state to function components.
useReducer offers a bit more flexibility since it allows you to decouple how the
state is updated from the action that triggered the update - typically leading
to more declarative state updates.

If different pieces of state update independently from one another (hovering,
selected, etc.), useState should work fine. If your state tends to be updated
together or if updating one piece of state is based on another piece of state,
go with useReducer
*/