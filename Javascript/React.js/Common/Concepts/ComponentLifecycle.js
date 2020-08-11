/*
The Component Lifecycle

With React, it’s all about components. In their most basic form, components can
manage their own state, receive data via props, and describe their UI.
Unfortunately, when building complex applications, components have to take on a
few more responsibilities. Things like Ajax requests, setting and removing listeners,
and reacting to new props are all tasks that fall within the component’s responsibility.
In this post, we’re going to look at how we can hook into different moments in a
component’s lifecycle in order to accomplish these tasks.

The Component Lifecycle
Every time your React app runs, all of your components go through a specific lifecycle.
You can break down that lifecycle into three parts.

When the component gets added to the DOM (mounting).
When the component updates its state or receives new data via props (updating).
When the component gets removed from the DOM (unmounting).

1. Mounting
For a moment, I want you to think about everything that may need to occur in a
typical application during and when a component is mounted to the DOM.

Here are the most common ones (in order in which they occur).

- Set the component’s initial state
- Render a DOM node
- Make an Ajax request
- Set up listeners (i.e. via Websockets or Firebase)
- Now let’s take that list, and look at which lifecycle methods of a component we’d
use to accomplish each one.

Set the component’s initial state
To set the initial state of the component, you’ll use the constructor method.
constructor is the first lifecycle method that will be invoked.

constructor is part of the ES6 class spec; it’s not React specific.
*/
class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Tyler'
    }
  }
  render() {
    return (
      <h1>Hello, {this.state.name}</h1>
    )
  }
}
/*
Render a DOM node
Once the initial state of the component is set using constructor, the next lifecycle
method to be called is render. Though you’re not exactly rendering a DOM node yourself,
you’ll use the render lifecycle method in order to describe (using JSX) the type
of DOM node you want to render.

It’s important that render is a pure function. It shouldn’t do anything other than
examine the component’s state and props and return a description of the UI.
*/
class Badge extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.name}</h1>
        <p>{this.props.profile}</p>
      </React.Fragment>
    )
  }
}
/*
Make an Ajax request
If constructor is used to set the initial state of a component and render needs to
be a pure function, where do we make Ajax requests? This brings us to our next
React specific lifecycle method, componentDidMount.

componentDidMount is invoked only one time when the component is first mounted to the DOM.
Because of this, it’s a great place to make an Ajax request.
*/
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }
  componentDidMount() {
    fetchUser(this.props.username)
      .then((user) => {
        this.setState({ user })
      })
  }
  render() {
    if (user === null) {
      return <Loading />
    }

    return <Dashboard data={this.state.user} />
  }
}
/*
Set up listeners
Similar to making an Ajax request, we want to set up any listeners once the component
has been mounted to the DOM, i.e., in componentDidMount.

At this point we’ve seen how we can use constructor, render, and componentDidMount
to accomplish tasks for during and after a component is mounted to the DOM.
Next is when the component gets updated with new props.

2. Updating
Like we did above, can you think of a real example for when we’d want to hook into
when a component updates its state or receives new data via props?

Here’s my list.

- Re-render the UI with the updated state or props
- Re-fetching data
- Re-setting a listener
- Re-render

We saw earlier how render allowed us to describe our UI. It’s important to note that
render will be invoked not only when the component is first added to the DOM, but
also any time after that when its state changes (via setState) or when it receives new,
updated props. This is the reason we say that in React, your View is a function of your State.
You just worry about how your state and props update and React will take care of
re-rendering and updating the DOM.

Re-fetching data
Earlier we used componentDidMount to make an initial Ajax request.
We learned that componentDidMount is only invoked once right after the component is
mounted to the DOM. It’s common to need to re-fetch data without having to re-mount the component.
This is where another React specific lifecycle method can help us out, componentDidUpdate.

componentDidUpdate is invoked after the component’s local state changes or after it
receives new props - but it’s not invoked on the initial render. It’s passed two arguments,
the component’s previous props and the component’s previous state.
This allows you to compare the previous props/state to the current props/state so you
can decide if you need to do anything.

Imagine we were using the Github API to fetch the popular repositories for whatever
props.language was. We’d want to make our initial request inside of componentDidMount
and then anytime props.language changed, we’d want to re-fetch the popular repositories.
This would be a perfect use case for componentDidUpdate.
*/
class Repos extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      repos: null
    }
  }
  componentDidMount() {
    fetchRepos(this.props.language)
      .then((repos) => {
        this.setState({ repos })
      })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({ repos: null })

      fetchRepos(this.props.language)
        .then((repos) => {
          this.setState({ repos })
        })
    }
  }
  render() {
    if (this.state.repos === null) {
      return <Loading />
    }

    return <Grid data={this.state.repos} />
  }
}
/*
Re-setting a Listener
Similar to re-fetching data, you’d use componentDidUpdate to listen for prop/state
changes in order to re-set a listener.

At this point we’ve seen how we can use constructor, render, and componentDidMount
to accomplish tasks for during and after a component is mounted to the DOM.
We’ve also seen how we can use componentDidUpdate to accomplish tasks for when a
component’s state changes or it receives new props. Next is when the component
gets removed from the DOM.

Unmounting
Can you think of anything we’d want to do when a component gets removed from the DOM?
Typically, this is where you’ll do some “cleanup”. For example, if you set up a
listener inside of componentDidMount or componentDidUpdate, you’ll want to make sure
you remove that listener once the component has been removed from the DOM.
If you don’t, hello memory leaks. To do this, you can hook into React’s
componentWillUnmount lifecycle method. It’ll be called when the component is
about to be removed from the DOM.
*/
class Repos extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      repos: null
    }
  }
  componentDidMount() {
    this.removeListener = listenToRepos(this.props.language, (repos) => {
      this.setState({ repos })
    })
  }
  componentWillUnmount() {
    this.removeListener()
  }
  render() {
    if (this.state.repos === null) {
      return <Loading />
    }

    return <Grid data={this.state.repos} />
  }
}
/*
Here’s an overview of the methods we covered.
*/
class App extends React.Component {
  constructor(props) {
    // Good for establishing the initial state of a component
    super(props)
    this.state = {}
  }
  componentDidMount() {
    // Invoked once the component is mounted to the DOM.
    // Good for making AJAX requests.
  }
  componentDidUpdate() {
    // Invoked immediately after updating occurs.
    // Good for AJAX requests based on changing props or DOM operations.
  }
  componentWillUnmount() {
    // Called right before a component is unmounted.
    // Good for cleaning up listeners.
  }
  render() {
    // return ...
  }
}
/*
There are a few other lifecycle methods that are available to you.
However, they’re rare, and you’ll almost always be just fine using the ones we covered.
If you’re curious, they are getDerivedStateFromProps, shouldComponentUpdate, getSnapshotBeforeUpdate.

If it helps you, here’s a great lifecycle diagram built by Dan.

https://pbs.twimg.com/media/Dc2YU2aWsAAVbmk.jpg

*/
