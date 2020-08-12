/*
Children in React
As you’ve seen, props are how you pass data into components.
You pass data to components just like you’d set attributes on regular HTML elements.
*/
(<a href='/' class='link'>Home</a>)

  (<Clock time='12:49' period='AM' />)
  /*
  Now thinking more about regular HTML elements (span, div, etc),
  is there any other way that we’re able to pass information to the element?
  What about the text Home in our a tag above? As part of the API for almost
  every HTML element, you can pass data via the opening and closing tag of the element.
  */
  (
    <>
      <h1>You can have text between tags.</h1>

      <div>
        <h1>You can also have</h1>
        <p>elements between tags</p>
      </div>
    </>
  )
  /*
  Now, what if instead of those being regular HTML elements, they were React components?
  */
  (
    <>
      <Header>You can have text between tags.</Header>

      <Container>
        <h1>You can also have</h1>
        <p>elements between tags</p>
      </Container>
    </>
  )
/*
Now, instead of passing data (props) into the component via setting attributes as
we usually would, we’re passing data into the components via the opening and closing tags.
How would we go about implementing those? And more specifically,
how would we get access to the data inside of the opening and closing tag of the element?
React makes this simple. Whatever is between the opening and closing tag of an element
will be accessible inside of the component via props.children.
*/
function Header({ children }) {
  return (
    <h1 className='header'>
      {children}
    </h1>
  )
}

function Container({ children }) {
  return (
    <div>
      <Logo />
      {children}
    </div>
  )
}
/*
As you can see with both of our implementations, this API is nice as it allows
you to abstract common UI / functionality into its own reusable component.
*/
