/*
Managing State in React
There are a lot of advantages to using React. In my opinion, one of the biggest 
has to do with the ability of components to manage their own state.
Even just the simple mental model alone has enormous benefits.
With React, you don’t need to keep the entire application state in your head.
Instead, the surface layer of your concerns can be minimized to the state of an individual component.

In this post, there are two questions we’re going to answer.
First, how do you add state to a React component? Second, how do you update a React component’s state?

Adding State
To add state to a class component, you’ll use the constructor method.
constructor is part of the ES6 class spec and isn’t a React specific method.

If you’re new to ES6 classes, check out this post
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
“Just JavaScript”. There are a few things to note here. First, get in the habit of
calling super(props) in the constructor. super refers to the constructor method
of the class you’re extending, in this case, React.Component.
Again, this is just a JavaScript thing. You can’t use this in a constructor until after you’ve called super.
There are also reasons you have to pass props to super that are superfluous to this post.

Next, you add state to your class component by adding a state property on the component’s instance,
this. By adding state to the instance, you can now access it (via this.state) anywhere in your class.

Updating State
Now that you know how to add state to your component, the next question becomes how do you update that state?

Your first intuition might be to update the state directly.

this.state.name = 'Mikenzi'
That’s not a good idea. We’ve talked a few times how in React, your View is a function of your State.
You don’t need to worry about updating the DOM because React will do that for you
whenever the state of your component changes. If you update the state directly yourself,
React will have no idea that the component’s state changed and therefore won’t be able to update the UI.

Instead, React gives you a helper method you can use to update the state of your component (and re-render the UI).
It’s called setState and it lives on the component’s instance, this. There are two forms of setState.
The first, and most popular, accepts an object as its first argument that is merged with the current state.
*/
updateName(newName) {
  this.setState({
    name: newName
  })
}
/*
When the updateName method is invoked, React will update the name property on the
component’s state to be whatever newName is. Then, because the state changed,
React will re-invoke the render method and get a new description of the UI based on the new state.
Finally, with that new description of the UI, React will update the DOM.

Here’s a full version.
*/
class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Tyler'
    }

    this.updateName = this.updateName.bind(this)
  }
  updateName() {
    this.setState({
      name: 'Mikenzi'
    })
  }
  render() {
    return (
      <React.Fragment>
        <h1>Hello, {this.state.name}</h1>
        <button onClick={this.updateName}>Change Name</button>
      </React.Fragment>
    )
  }
}
/*
The biggest “gotcha” when dealing with updating state has to do with the this keyword.
Notice that we had to include the .bind line in our constructor.
*/
this.updateName = this.updateName.bind(this);
/*
Why is that? Well, without that, when a user clicks on the button, they’ll get an error of

TypeError: Cannot read property ‘setState’ of undefined

When figuring out what the this keyword is referencing, you first need to look at
where the function using the this keyword is invoked.
In our example, we have no idea where updateName is being invoked because we’re
passing it as a prop to onClick. That means the React internals get to decide
how and in which context it’s invoked. To remedy this, we use .bind inside of the
constructor to say “whenever updateName is invoked, always make sure it’s
invoked in the context of the current component.”

Note that when you call setState passing in an object, that object will be merged
with the current state, it won’t replace it. That means if you have other
properties on your state that you aren’t updating, they’ll remain the same.

Updating State: The Other Way
Earlier I mentioned that there are two forms of setState.
The first, and most popular is passing an object to setState as you just saw.
The second form of setState accepts a function as its first argument instead of an object.
That function is then passed the current state and the object it returns will be merged into the new state.
*/
function addFriend(newFriend) {
  this.setState((state) => {
    return {
      friends: state.friends.concat(newFriend)
    }
  })
}
/*
In the example above, addFriend is responsible for taking in a newFriend and adding it to state.friends.

Can you spot when you’d want to use the function setState over the object setState?
The key is it depends on what changes you’re making to the state.
If you’re updating the current state based on the previous state
(i.e., adding newFriend to the end of an existing friends array), use the function setState.
For everything else, use the object setState.

The reason for this is because state updates may be asynchronous.
There’s a lot of work happening under the hood when you call setState,
so for React to guarantee that the state value is what you’d expect it to be,
they have you pass them a function that receives state rather than relying on
referencing state from the component instance.
*/
