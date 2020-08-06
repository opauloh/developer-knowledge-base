/*
Whenever you have a system that is reliant upon composition, it’s critical that 
each piece of that system has an interface for accepting data from outside of itself.
You can see this clearly illustrated by looking at something you’re already familiar with, functions.
*/
function getProfilePic(username) {
  return 'https://photo.fb.com/' + username
}

function getProfileLink(username) {
  return 'https://www.fb.com/' + username
}

function getAvatarInfo(username) {
  return {
    pic: getProfilePic(username),
    link: getProfileLink(username)
  }
}

getAvatarInfo('tylermcginnis')
/*
We’ve seen this code before as our very soft introduction to function composition.
Without the ability to pass data, in this case username, to each of our of functions,
our composition would break down.

Similarly, because React relies heavily on composition, there needs to exist a way to pass data into components.
This brings us to our next important React concept, props.

Props are to components what arguments are to functions.

Again, the same intuition you have about functions and passing arguments to functions
can be directly applied to components and passing props to components.

There are two parts to understanding how props work. First is how to pass data into components,
and second is accessing the data once it’s been passed in.

Passing data to a component
This one should feel natural because you’ve been doing something similar ever since you learned HTML.
You pass data to a React component the same way you’d set an attribute on an HTML element.

<img src='' />

<Hello name='Tyler' />
In the example above, we’re passing in a name prop to the Hello component.

Accessing props
Now the next question is, how do you access the props that are being passed to a component?
In a class component, you can get access to props from the props key on the component’s instance (this).
*/
class Hello extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    )
  }
}

/*
Each prop that is passed to a component is added as a key on this.props.
If no props are passed to a component, this.props will be an empty object.
*/
class Hello extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.first} {this.props.last}</h1>
    )
  }
}

<Hello first='Tyler' last='McGinnis' />

/*
It’s important to note that we’re not limited to what we can pass as props to components.
Just like we can pass functions as arguments to other functions, we’re also able to pass components
(or really anything we want) as props to other components.
*/
(
  <Profile
    username='tylermcginnis'
    authed={true}
    logout={() => handleLogout()}
    header={<h1>👋</h1>}
  />
)
  // If you pass a prop without a value, that value will be set to true. These are equivalent.

  (
    <Profile authed={true} />
  )

  (
    <Profile authed />
  )
