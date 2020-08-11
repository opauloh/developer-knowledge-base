/*
PropTypes
JavaScript has seven data types, Boolean, Null, Undefined, Number, String, Symbol, 
and Object. A deceivingly large amount of bugs can be caught and prevented by 
validating the different data types that are used and passed around your application.
This isn’t a new idea; entire programming languages have been built around the ability to type check.
In recent years, tools like Flow and TypeScript have even made their way into the
JavaScript ecosystem. Though these tools are powerful, they’re a significant
commitment and often require a lot of overhead. Often times, when building a React app,
validating the props that are being passed to a component is all you need.
If you can be sure that the props being passed to a component are the right type,
for the most part, you can assume your component is going to run correctly.
More than that, if you can be sure that the props being passed to a component
aren’t the right type, you can assume your component isn’t going to run correctly.

The package we’ll use to declare types for our props is, naturally, called prop-types.

Here’s the big picture. Whenever you create a component that accepts props,
you’ll add a static propTypes property to that component. propTypes will be an
object whose keys represent the props the component accepts and whose values
represent the data types for those props. During development, if a prop being
passed to a component doesn’t match the data type specified in propTypes,
a warning will be shown in the console.

Let’s start with a simple Hello component that takes in one prop, name which is a
string and is required.
*/
import React from 'react'
import PropTypes from 'prop-types'

export default function Hello({ name }) {
  return <h1>Hello, {name}</h1>
}

Hello.propTypes = {
  name: PropTypes.string.isRequired
}
/*
A few things to note here. First, the naming conventions. PropTypes (capital P)
is what we call the object being exported from the prop-types package.
propTypes (lower case p) is the name of the static property we add to our component.
Second, is how we use the PropTypes object to declare the type of prop.
In our example, we’re saying that anytime you use the Hello component, it’s
required that you pass to it a name prop which is a string. If name is not included
as a prop or it’s not of type string, a warning will be shown in the console.

<Hello name='Tyler' /> // 👍

<Hello /> 
// Warning: Failed prop type: The prop `name` is marked as required in `Hello`,
but its value is `undefined`.

<Hello name={true}/> 
// Warning: Failed prop type: Invalid prop `name` of type `boolean` supplied to
`Hello`, expected `string`.

Class components follow the same syntax. You add propTypes as a static property
on the class itself.
*/
class Hello extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

Hello.propTypes = {
  name: PropTypes.string.isRequired
}
/*
Now that you understand how to validate strings, let’s look at the rest of the
prop-types API. For the most part, it’s straight forward. There are a few gotchas though.
To do this, we can look at every property on the PropTypes object.

Note that by default, every prop is optional. To make them required, append .isRequired
as we did above.

You don’t need to memorize all of these. In fact, I probably wouldn’t even read this whole thing.
Skim it then use it more as a reference guide if you need it.
The biggest gotchas are func and bool so check those out.

PropTypes.any
The prop being passed into the component can be of any data type.
Use this sparingly as it neglects all the benefits of using PropTypes.

PropTypes.array
The prop being passed into the component must be an array.

PropTypes.arrayOf:
The prop being passed into the component must be an array of a certain type.
For example, if you had a prop that needed to be an array of strings,
you’d use PropTypes.arrayOf(PropTypes.string).

...
*/
List.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.string)
}

  (<List friends={['Mikenzi', 'Cash', 'Jake']} />)
/*
PropTypes.bool
The prop being passed into the component must be a boolean.

PropTypes.element
The prop being passed into the component must be a React element.

...
*/
Dashboard.propTypes = {
  header: PropTypes.element
}

  (<Dashboard header={<Navbar />} />)
/*
PropTypes.exact
The prop being passed into the component must be an object with a specific shape.
Any extra properties will throw an error.

...
*/
Header.propTypes = {
  user: PropTypes.exact({
    name: PropTypes.string,
    age: PropTypes.number,
    submit: PropTypes.func,
  })
}

  (<Header
    user={{
      name: 'Tyler',
      age: 28,
      submit: () => ({})
    }}
  />)
/*
PropTypes.func
The prop being passed into the component must be a function.

PropTypes.instanceOf
The prop being passed into the component must be an instance of a certain class.
*/
class User {
  // ...
}

Header.propTypes = {
  user: PropTypes.instanceOf(User)
}

const tyler = new User('tyler')
  (< Header user={tyler} />)
/*
PropTypes.number
The prop being passed into the component must be a number.

PropTypes.object
The prop being passed into the component must be an object.

PropTypes.objectOf
The prop being passed into the component must be an object whose values are all of a certain type.

...
*/
List.propTypes = {
  scores: PropTypes.objectOf(PropTypes.number)
}

  (< List scores={{
    jake: 9,
    tyler: 5,
    mikenzi: 10
  }} />)
/*
PropTypes.oneOf
The prop being passed into the component must be one of a certain value.

...
*/
List.propTypes = {
  order: PropTypes.oneOf(['ascending', 'descending']),
  items: PropTypes.array,
}

  (< List items={users} order='ascending' />)
/*
PropTypes.oneOfType
The prop being passed into the component must be one of a certain type.

...
*/
Post.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ])
}

  (< Post date={new Date()} />)

/*
PropTypes.shape
The prop being passed into the component must have a certain shape.It’s similar to
PropTypes.exact but, unlike exact, it allows you to include extra properties.

...
*/

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    submit: PropTypes.func,
  })
}

  (< Header
    user={{
      name: 'Tyler',
      age: 28,
      submit: () => ({}),
      authed: true
    }}
  />)
/*
PropTypes.string
The prop being passed into the component must be a string.

PropTypes.symbol
The prop being passed into the component must be a symbol.
*/

