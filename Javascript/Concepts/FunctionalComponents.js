/*
Functional Components
If you’re using React correctly, you’re going to have a lot of components that
take in some data via props and output some UI - that is, components with just a render method.
*/
class HelloWorld extends React.Component {
  render() {
    return (
      <div>Hello {this.props.name}</div>
    )
  }
}
/*
This may seem like a lot of overhead for creating such a simple component, because it is.
There have been a few times now where we’ve mentioned how the same intuition you have
about functions and function composition can be directly applied to creating React
components with component composition.
The disconnect, however, is that to build a component we’ve been using ES6 classes.
What if, instead, we could use a regular ol’ function? It turns out you can,
but there’s one caveat, that component needs to have only a render method.
Again, if all your class component does is (optionally) take in some props and
render some UI, you can make it a functional component instead.
*/
function HelloWorld(props) {
  return (
    <div>Hello {props.name}</div>
  )
}
/*
❤️ Much better. Now instead of having to worry about the this keyword, your
component is passed props as the first argument to the function.
This is a lot cleaner and makes creating React components more natural
since you’re literally just making a function.

Recently React introduced Hooks, an addition to React which allows you to create
functional components that can create and manage their own state. Because of this,
Hooks drastically reduce the need for creating class components.
*/
