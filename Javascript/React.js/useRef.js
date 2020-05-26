/*
The marketing pitch for useState is that it allows you to add state to function 
components. This is true, but we can break it down even further. Fundamentally, 
the useState Hook gives you two things - a value that will persist across 
renders and an API to update that value and trigger a re-render.
*/
const [value, setValueAndReRender] = React.useState(
  'initial value'
)
/*
When building UI, both are necessary. Without the ability to persist the value 
across renders, you’d lose the ability to have dynamic data in your app. Without 
the ability to update the value and trigger a re-render, the UI would never update.

Now, what if you had a use case where you weren’t dealing with any UI, so you 
didn’t care about re-rendering, but you did need to persist a value across 
renders? In this scenario, it’s like you need the half of useState that lets you 
persist a value across renders but not the other half that triggers a re-render 
— Something like this.
*/
function usePersistentValue(initialValue) {
  return React.useState({
    current: initialValue
  })[0]
}
/*
Alright, stick with me here. Remember, useState returns an array with the first
element being a value that will persist across renders and the second element
being the updater function which will trigger a re-render. Since we only care
about the first element, the value, we append [0] to the invocation. Now,
whenever we invoke usePersistentValue, what we’ll get is an object with a
current property that will persist across renders.

If it’s still fuzzy, looking at an actual example may help.

If you’re not familiar with the native browser APIs setInterval and 
clearInterval, you can read about them here before continuing on.

Let’s say we were tasked to build an app that had a counter that incremented by 
1 every second and a button to stop the counter. How would you approach this? 
Here’s what one implementation might look like.
*/
function Counter() {
  const [count, setCount] = React.useState(0)

  let id

  const clear = () => {
    window.clearInterval(id)
  }

  React.useEffect(() => {
    id = window.setInterval(() => {
      setCount(c => c + 1)
    }, 1000)

    return clear
  }, [])

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={clear}>Stop</button>
    </div>
  )
}
/*
id is created inside of useEffect but we need to access it inside of the clear 
event handler to stop the interval. To do that, we move the declaration of id 
up to the main scope and then initialize it with the id when the effect runs.

All good, right? Sadly, no. The reason for this is because id doesn’t persist 
across renders. As soon as our count state variable changes, React will 
re-render Counter, re-declaring id setting it back to undefined.

What we need is a way to persist the id across renders 😏. Luckily for us, we 
have our usePersistentValue Hook we created earlier. Let’s try it out.
*/
function usePersistentValue(initialValue) {
  return React.useState({
    current: initialValue
  })[0]
}

function Counter() {
  const [count, setCount] = React.useState(0)
  const id = usePersistentValue(null)

  const clearInterval = () => {
    window.clearInterval(id.current)
  }

  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setCount(c => c + 1)
    }, 1000)

    return clearInterval
  }, [])

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={clearInterval}>Stop</button>
    </div>
  )
}
/*
Admittedly, it’s a bit hacky but it gets the job done. Now instead of id being 
re-declared on every render, because it’s really a value coming from useState, 
React will persist it across renders.

As you probably guessed by now, the ability to persist a value across renders 
without causing a re-render is so fundamental that React comes with a built-in 
Hook for it called useRef. It is, quite literally, the same as our 
usePersistentValue Hook that we created. To prove this, here’s the exact same 
code as before except with useRef instead of usePersistentValue.
*/
function Counter() {
  const [count, setCount] = React.useState(0)
  const id = React.useRef(null)

  const clearInterval = () => {
    window.clearInterval(id.current)
  }

  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setCount(c => c + 1)
    }, 1000)

    return clearInterval
  }, [])

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={clearInterval}>Stop</button>
    </div>
  )
}
/*
💻 Play with the code.

useRef follows the same API we created earlier. It accepts an initial value as 
its first argument and it returns an object that has a current property 
(which will initially be set to whatever the initial value was). 
From there, anything you add to current will be persisted across renders.

The most popular use case for useRef is getting access to DOM nodes. If you 
pass the value you get from useRef as a ref prop on any React element, React 
will set the current property to the corresponding DOM. This allows you to do 
things like grab input values or set focus.
*/
function Form() {
  const nameRef = React.useRef()
  const emailRef = React.useRef()
  const passwordRef = React.useRef()

  const handleSubmit = e => {
    e.preventDefault()

    const name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value

    console.log(name, email, password)
  }

  return (
    <React.Fragment>
      <label>
        Name:
        <input
          placeholder="name"
          type="text"
          ref={nameRef}
        />
      </label>
      <label>
        Email:
        <input
          placeholder="email"
          type="text"
          ref={emailRef}
        />
      </label>
      <label>
        Password:
        <input
          placeholder="password"
          type="text"
          ref={passwordRef}
        />
      </label>

      <hr />

      <button onClick={() => nameRef.current.focus()}>
        Focus Name Input
      </button>
      <button onClick={() => emailRef.current.focus()}>
        Focus Email Input
      </button>
      <button onClick={() => passwordRef.current.focus()}>
        Focus Password Input
      </button>

      <hr />

      <button onClick={handleSubmit}>Submit</button>
    </React.Fragment>
  )
}
/*
If you want to add state to your component that persists across renders and
can trigger a re-render when it’s updated, go with useState or useReducer.

If you want to add state to your component that persists across renders but
doesn’t trigger a re-render when it’s updated, go with useRef.


What will ref be?
*/

function Foo() {
  const bar = React.useRef()

  return (
    <button ref={bar}>Click</button>
  )
}
/*
An object with a current property which references the button DOM node

What does useRef allow you to do?
Persist a value across renders

*/