/*

There are two important things to note before we get started.
First, what we’re going to talk about is just a pattern.
It’s not even a React thing as much as it is a component architecture thing.
Second, this isn’t required knowledge to build a React app. You could skip this post,
never learn what we’re about to talk about, and still build fine React applications.
However, just like building anything, the more tools you have available,
the better the outcome will be. If you write React apps, you’d be doing
yourself a disservice by not having this in your “toolbox”.

You can’t get very far into studying software development before you hear the 
(almost cultish) mantra of Don't Repeat Yourself or D.R.Y. Sometimes it can be 
taken a bit too far, but for the most part, it’s a worthwhile goal. In this post
we’re going to look at the most popular pattern for accomplishing DRY in a 
React codebase, Higher-Order Components. However before we can explore the 
solution, we must first fully understand the problem.


Let’s say we were in charge of recreating a dashboard similar to Stripe’s.
As most projects go, everything goes great until the very end.
Just when you think you’re about to be done, you notice that the dashboard has
a bunch of different tooltips that need to appear when certain elements are hovered over.
https://ui.dev/post-images/tips.gif

There are a few ways to approach this. The one you decide to go with is to
detect the hover state of the individual components and from that state,
show or not show the tooltip. There are three components you need to add this
hover detection functionality to - Info, TrendChart and DailyChart.

In JavaScript, functions are “first-class objects”. What that means is that just
like objects/arrays/strings can be assigned to a variable, passed as an argument
to a function, or returned from a function, so too can other functions.
*/

function add(x, y) {
    return x + y
}

function addFive(x, addReference) {
    return addReference(x, 5)
}

addFive(10, add) // 15

/*
Your brain might have got a little weird on this one if you’re not used to it.
We pass the add function as an argument to the addFive function, rename it
addReference, and then we invoke it.

When you do this, the function you’re passing as an argument is called a 
callback function and the function you’re passing the callback function to is 
called a higher-order function.

Because vocabulary is important, here’s the same code with the variables 
re-named to match the concepts they’re demonstrating.
*/

function add(x, y) {
    return x + y
}

function higherOrderFunction(x, callback) {
    return callback(x, 5)
}

higherOrderFunction(10, add)

/*
This pattern should look familiar; it’s everywhere. If you’ve ever used any of 
the JavaScript Array methods, jQuery, or a library like lodash, you’ve used both
higher-order functions and callbacks.
*/

[1, 2, 3].map((i) => i + 5)

_.filter([1, 2, 3, 4], (n) => n % 2 === 0);

$('#btn').on('click', () =>
    console.log('Callbacks are everywhere')
)

/*
Let’s go back to our example. What if instead of just creating an addFive 
function, we also wanted an addTen function, addTwenty function, etc. With our 
current implementation, we’d have to duplicate a lot of our logic whenever we 
needed a new function.
*/

function add(x, y) {
    return x + y
}

function addFive(x, addReference) {
    return addReference(x, 5)
}

function addTen(x, addReference) {
    return addReference(x, 10)
}

function addTwenty(x, addReference) {
    return addReference(x, 20)
}

addFive(10, add) // 15
addTen(10, add) // 20
addTwenty(10, add) // 30

/*
Again, this isn’t terrible, but we’re repeating a lot of the same logic. 
The goal here is to be able to create as many “adder” functions 
(addFive, addTen, addTwenty, etc) as we need while minimizing code duplication. 
To accomplish this, what if we create a makeAdder function? This function can 
take in a number and a reference to the original add function. 
Because the goal of this function is to make a new adder function, we can have 
it return a brand new function that accepts the number to add. 
That was a lot of words. Let’s see some code.
*/
function add(x, y) {
    return x + y
}

function makeAdder(x, addReference) {
    return function (y) {
        return addReference(x, y)
    }
}

const addFive = makeAdder(5, add)
const addTen = makeAdder(10, add)
const addTwenty = makeAdder(20, add)

addFive(10) // 15
addTen(10) // 20
addTwenty(10) // 30

/*
Cool. Now we can make as many “adder” functions as we need while minimizing
the duplicate code we have to write.

If you care, this concept of having a function with multiple parameters
return a new function with fewer parameters is called
“Partial Application” and it’s a functional programming technique.
JavaScript’s “.bind” method is a common example of this.



Alright, but what does this have to do with React and the problem we saw
earlier of duplicating our hover logic anytime a new component needs it? Well
just as creating our makeAdder higher-order function allowed us to minimize
code duplication, so too can making a similar “higher-order component” help us
in the same way. However, instead of the higher-order function returning a new
function that invokes the callback, the higher-order component can return a new
component that renders the “callback” component 🤯.

That was a lot. Let’s break it down.

(Our) Higher-Order Function
- Is a function
- Takes in a callback function as an argument
- Returns a new function
- The function it returns can invoke the original callback function
  that was passed in

*/

function higherOrderFunction(callback) {
    return function () {
        return callback()
    }
}

/*
(Our) Higher-Order Component
- Is a component
- Takes in a component as an argument
- Returns a new component
- The component it returns can render the original component that was passed in

*/
function higherOrderComponent(Component) {
    return class extends React.Component {
        render() {
            return <Component />
        }
    }
}

/*

So now that we have the basic idea of what a higher-order component does, let’s start building ours out.
If you’ll remember, the problem earlier was that we were duplicating all of our hover logic amongst
all of the component that needed that functionality.
*/
state = { hovering: false }
mouseOver = () => this.setState({ hovering: true })
mouseOut = () => this.setState({ hovering: false })
/*
With that in mind, we want our higher-order component (which we’ll call withHover) to be 
able to encapsulate that hover logic in itself and then pass the hovering state to the component that it renders.
That will allow us to prevent duplicating all the hover logic and instead, put it into a single location (withHover).

Ultimately, here’s the end goal. Whenever we want a component that is aware of it’s hovering state,
we can pass the original component to our withHover higher-order component.
*/
const InfoWithHover = withHover(Info)
const TrendChartWithHover = withHover(TrendChart)
const DailyChartWithHover = withHover(DailyChart)
/*
Then, whenever any of the components that withHover returns are rendered, they’ll
render the original component, passing it a hovering prop.
*/
function Info({ hovering, height }) {
    return (
        <>
            {hovering === true
                ? <Tooltip id='info' />
                : null}
            <svg
                className="Icon-svg Icon--hoverable-svg"
                height={height}
                viewBox="0 0 16 16" width="16">
                <path d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
        </>
    )
}
/*
Now the last thing we need to do is actually implement withHover. As we saw above, it needs to do three things.

- Take in a “Component” argument.
- Return a new component
- Render the “Component” argument passing it a “hovering” prop.

Take in a “Component” argument:
*/
function withHover(Component) {

}
/*
Return a new component:
*/
function withHover(Component) {
    return class WithHover extends React.Component {

    }
}
/*
Render the “Component” argument passing it a “hovering” prop.
Now the question becomes, how do we get the hovering state? Well, we already have
the code for that that we build earlier. We just need to add it to the new component
and then pass the hovering state as a prop when we render the argument Component.
*/
function withHover(Component) {
    return class WithHover extends React.Component {
        state = { hovering: false }
        mouseOver = () => this.setState({ hovering: true })
        mouseOut = () => this.setState({ hovering: false })
        render() {
            return (
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    <Component hovering={this.state.hovering} />
                </div>
            );
        }
    }
}
/*
The way I like to think about it (and how it’s mentioned in the React docs) is a
component transforms props into UI, a higher-order component transforms a component into another component.
In our case, we’re transforming our Info, TrendChart, and DailyChart components
into new components which are aware of their hover state via a hovering prop.

At this point, we’ve covered all of the fundamentals of Higher-Order Components.
There are still a few more important items to discuss though.

If you look back at our withHover HOC, one weakness it has is it assumes that the
consumer of it is fine with receiving a prop named hovering.
For the most part this is probably fine but there are certain use cases where it wouldn’t be.
For example, what if the component already had a prop named hovering? We’d have a naming collision.
One change we can make is to allow the consumer of our withHover HOC to specify
what they want the name of the hovering state to be when it’s passed to their component as a prop.
Because withHover is just a function, let’s change it up to accept a second argument
which specifies the name of the prop that we’ll pass to the component.
*/
function withHover(Component, propName = 'hovering') {
    return class WithHover extends React.Component {
        state = { hovering: false }
        mouseOver = () => this.setState({ hovering: true })
        mouseOut = () => this.setState({ hovering: false })
        render() {
            const props = {
                [propName]: this.state.hovering
            }

            return (
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    <Component {...props} />
                </div>
            );
        }
    }
}
/*
Now we’ve set the default prop name to hovering (via ES6’s default parameters),
but if the consumer of withHover wants to change that, they can by passing in the
new prop name as the second argument.
*/
function withHover(Component, propName = 'hovering') {
    return class WithHover extends React.Component {
        state = { hovering: false }
        mouseOver = () => this.setState({ hovering: true })
        mouseOut = () => this.setState({ hovering: false })
        render() {
            const props = {
                [propName]: this.state.hovering
            }

            return (
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    <Component {...props} />
                </div>
            );
        }
    }
}

function Info({ showTooltip, height }) {
    return (
        <>
            {showTooltip === true
                ? <Tooltip id='info' />
                : null}
            <svg
                className="Icon-svg Icon--hoverable-svg"
                height={height}
                viewBox="0 0 16 16" width="16">
                <path d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
        </>
    )
}

const InfoWithHover = withHover(Info, 'showTooltip')
/*
You may have noticed another problem with our withHover implementation as well.
Looking at our Info component, you’ll notice that it should also take in a height property.
With the current way we’ve set it up, height is going to be undefined.
The reason for that is because our withHover component is the one rendering the Component.
Currently, how we’ve set it up, we’re not passing any props to <Component />
besides the hovering prop that we created.
*/
const InfoWithHover = withHover(Info)

// ...

return <InfoWithHover height="16px" />
/*
The height prop gets passed to the InfoWithHover component. But what exactly is that component?
It’s the component that we’re returning from withHover.
*/
function withHover(Component, propName = 'hovering') {
    return class WithHover extends React.Component {
        state = { hovering: false }
        mouseOver = () => this.setState({ hovering: true })
        mouseOut = () => this.setState({ hovering: false })
        render() {
            console.log(this.props) // { height: "16px" }
            const props = {
                [propName]: this.state.hovering
            }
            return (
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    <Component {...props} />
                </div>
            );
        }
    }
}
/*
Inside of the WithHover component this.props.height is 16px but from there we don’t do anything with it.
We need to make sure that we pass that through to the Component argument that we’re rendering.
*/
render() {
    const props = {
        [propName]: this.state.hovering,
        ...this.props,
    }

    return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
            <Component {...props} />
        </div>
    );
}
/*

At this point, we’ve seen the benefits of using Higher-Order Components to 
reuse component logic amongst various components without duplicating code. 
But, does it have any pitfalls? It does, and we’ve already seen it.

When using a HOC, there’s an inversion of control happening. Imagine we were 
using a third part HOC like React Router’s withRouter HOC. According to their 
docs, "withRouter will pass match, location, and history props to the wrapped 
component whenever it renders."

*/
class Game extends React.Component {
    render() {
        const { match, location, history } = this.props // From React Router

        // ...
    }
}

export default withRouter(Game)
/*
Notice we’re not the ones creating the Game element (i.e. <Game />).
We’re handing over our component entirely to React Router and we’re trusting
them to not only render it but also pass it the correct props.
We saw this problem earlier when we talked about naming collisions with hovering.
To fix that we decided to let the consumer of our withHover HOC pass in a second
argument to configure what the prop name was going to be. With the 3rd party
withRouter HOC, we don’t have that option. If our Game component is already
using match, location, or history, we’re out of luck. We’d either have to modify
those names in our component or we’d have to stop using the withRouter HOC.
*/
