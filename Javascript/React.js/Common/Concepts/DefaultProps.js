/*
Default Props
There are times when you’ll want to set default props for a component. 
For example, say we were building a “Star Rating” component that rendered the following UI.

Star rating component

The gold color for the stars is nice, but that’s an option we’d want to give the 
consumer of our component the ability to customize. We can do that by adding a color prop.
*/
(<StarRating color='#ff0000' />)
  /*
  Now, what would happen if they used our component without passing it a color prop?
  */
  (<StarRating />)
/*
Well, it would depend on the implementation of StarRating but the most likely scenario
would be that the backgroundColor of the star is set to this.props.color, which is now undefined.

What we want is a way to allow the consumer of our component to specify a color prop,
but if they don’t, have a reasonable default in place (i.e., a gold color).
There are different ways to accomplish this depending on if you’re using a class component or a function component.

Class component - Default Props
If you’re using a class component, you’ll add a static property of defaultProps to your class.
defaultProps is an object whose keys represent the props being passed to the
component and whose values are the default values for those props.
In our example, we want color to have a default value of #ECB244.
*/
class StarRating extends React.Component {
  // ...
}

StarRating.defaultProps = {
  color: '#ECB244'
}
/*  
Now, if someone consumes our StarRating component without passing in a color prop,
props.color will default to #ECB244.

Function Component - Default Props
ES6 introduced a new feature called Default Parameters. Default Parameters allow
you to set default values for any arguments that are undefined when a function is invoked.
Because function components are just functions, we can use Default Parameters
(along with destructuring) to set a default value for any props that are passed to our function component.
*/
function StarRating({ color = '#ECB244' }) {
  // ...
}
/*
Now, if someone consumes our StarRating component without passing in a color prop,
color will default to #ECB244.
*/
