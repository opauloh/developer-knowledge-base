/*
Controlled vs Uncontrolled Components

With React, instead of having the state of your app live inside of the DOM, it lives
inside of your React components. Historically when you’re dealing with forms,
the opposite is usually true. The form state lives inside of the DOM
(specifically in an input field), and whenever you need it, you grab it from the DOM.
So assuming both of those things are true, how do you go about handling form state with React?
Should the form state live in the DOM or inside of a React component?
This question is at the heart of the difference between what are called
“Controlled Components” and “Uncontrolled Components”.

With “Controlled Components”, you do things the “React way”.
The form state lives inside of the component’s state and the value of the input
field is whatever the value on the component state is.
If you want to update the input field, you have to update the component state.

“Uncontrolled Components” are the opposite. You don’t have any component state and instead,
the form state lives inside of the DOM (or the input) field.
Then, whenever you need to get the state, you grab it from the DOM.

Let’s see some code.

Controlled Component

*/
class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  handleSubmit() {
    alert('The email is ' + this.state.email)
  }
  render() {
    return (
      <div>
        <pre>The email is {this.state.email}</pre>
        <br />
        <input
          type='text'
          placeholder='Email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}
/*
The take away here is the value prop on the input field.
Notice we’re saying that the value of input is always going to be whatever this.state.email is.
That means, in order to change the text inside of the input field, we need to update
this.state.email. This is the essence of a Controlled Component. React is in
control of the email state. When we need to access whatever the email is
(like in handleSubmit), we access it just like we would any other property
on our component’s state, by using this.state.email.

Uncontrolled Component
Now instead of having the state of our form live inside of a React component,
we’ll have it live inside of the DOM. To do this, we’ll use React’s createRef
method and pass that ref to our input. By doing this, we’ll be able to reference
the input DOM node directly to grab its value.
*/
class Form extends React.Component {
  constructor(props) {
    super(props)

    this.input = React.createRef('')
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    alert('The email is ' + this.input.current.value)
  }
  render() {
    return (
      <div>
        <input
          type='text'
          placeholder='Email'
          ref={this.input}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}
/*
The first thing you’ll notice is there’s no more state.
Instead, we create a new ref, then pass that as a ref prop to our input field.
Then, anytime when we need to access the value of our input field (like in handleSubmit),
we can grab it with this.input.current.value.

Now the big question, should you use a Controlled component or an Uncontrolled component?
In my opinion, you should favor Controlled components.
The whole point of React is to give React control of your state.
Controlled components align better with that model.

Also, you may have noticed we had to remove <pre>The email is {this.state.email}</pre>
from our Uncontrolled Component. The reason for this is because the state of email lives in the DOM,
React doesn’t re-render whenever it changes. If you want to update the UI based on a
piece of form state, you need to use Controlled components or else the UI won’t update.
*/
