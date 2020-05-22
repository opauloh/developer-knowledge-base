/*
There are two important things to note before we get started. First, what we’re 
going to talk about is just a pattern. It’s not even a React thing as much as it 
is a component architecture thing. Second, this isn’t required knowledge to 
build a React app. You could skip this post, never learn what we’re about to 
talk about, and still build fine React applications. However, just like building 
anything, the more tools you have available the better the outcome will be. 

If you write React apps, you’d be doing yourself a disservice by not having this 
in your “toolbox”.

You can’t get very far into studying software development before you hear the 
(almost cultish) mantra of Don't Repeat Yourself or D.R.Y. Sometimes it can be 
taken a bit too far, but for the most part, it’s a worthwhile goal. 

In this post, we’re going to look at the most popular pattern for accomplishing
DRY in a React codebase, Higher-Order Components. However before we can explore 
the solution, we must first fully understand the problem.

Let’s say we were in charge of recreating a dashboard similar to Stripe’s. 
As most projects go, everything goes great until the very end. 
Just when you think you’re about to be done, you notice that the dashboard has 
a bunch of different tooltips that need to appear when certain elements are 
hovered over.

There are a few ways to approach this. The one you decide to go with is to 
detect the hover state of the individual components and from that state, show 
or not show the tooltip. There are three components you need to add this hover 
detection functionality to - Info, TrendChart and DailyChart.

Let’s start with Info. Right now it’s just a simple SVG icon.

*/

class Info extends React.Component {
    render() {
        return (
            <svg
                className="Icon-svg Icon--hoverable-svg"
                height={this.props.height}
                viewBox="0 0 16 16" width="16">
                <path d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
        )
    }
}
/*
Now we need to add functionality to it so it can detect whether it’s being 
hovered over or not. We can use the onMouseOver and onMouseOut mouse events that 
come with React. The function we pass to onMouseOver will be invoked when the 
component is hovered over and the function we pass to onMouseOut will be invoked 
when the component is no longer being hovered over. To do this the React way, 
we’ll add a hovering state property to our component so that we can cause a 
re-render when the hovering state changes, showing or hiding our tooltip.
*/

class Info extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            hovering: false
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
        this.setState({ hovering: true })
    }
    mouseOut() {
        this.setState({ hovering: false })
    }
    render() {
        return (
            <>
                {this.state.hovering === true
                    ? <Tooltip id={this.props.id} />
                    : null}
                <svg
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                    className="Icon-svg Icon--hoverable-svg"
                    height={this.props.height}
                    viewBox="0 0 16 16" width="16">
                    <path d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
            </>
        )
    }
}
/*

Now we need to add the same functionality to our other two components, 
TrendChart and DailyChart.If it’s not broke, don’t fix it.Our hover logic for 
Info worked great so let’s use that same code again.
*/
class TrendChart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovering: false
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
        this.setState({ hovering: true })
    }
    mouseOut() {
        this.setState({ hovering: false })
    }
    render() {
        return (
            <>
                {this.state.hovering === true
                    ? <Tooltip id={this.props.id} />
                    : null}
                <Chart
                    type='trend'
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                />
            </>
        )
    }
}
/*
You probably know the next step.We can do the same thing for our final 
DailyChart component.
*/
class DailyChart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovering: false
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
        this.setState({ hovering: true })
    }
    mouseOut() {
        this.setState({ hovering: false })
    }
    render() {
        return (
            <>
                {this.state.hovering === true
                    ? <Tooltip id={this.props.id} />
                    : null}
                <Chart
                    type='daily'
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                />
            </>
        )
    }
}
/*
And with that, we’re all finished.You may have written React like this before.
It’s not the end of the world(#shipit), but it’s not very “DRY”.As you saw, 
we’re repeating the exact same hover logic in every one of our components.

At this point, the problem should be pretty clear, we want to avoid duplicating 
our hover logic anytime a new component needs it.So what’s the solution ? Well 
before we get to that, we need to get a refresh on two fundamental aspects of 
React.They are components which don’t render UI and passing functions as props.

No UI Components
In most cases whenever you build a React component, the end goal it to show 
some UI to the screen.

View = fn(state)

However, that doesn’t always need to be the case.It’s entirely reasonable 
to have components which act as “Wrapper” components.They’re responsible for 
handling some logic, but instead of rendering their own UI, they just render 
another component passing it data.

*/

class Users extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: null
        }
    }
    componentDidMount() {
        getUsers()
            .then((users) => {
                this.setState({ users })
            })
    }
    render() {
        <Grid data={this.state.users} />
    }
}
/*
In the example above, Users is responsible for getting the users, then 
passing them to the Grid component.It doesn’t have its own UI, instead, it uses 
the UI from the Grid component.

Passing functions as props
As you know, props are part of React’s component API that allow you to pass 
data into a component.
*/

< User id='tylermcginnis' />

/*
Then inside of the User component, the props object would have an id property
referencing the string tylermcginnis.
*/
function User(props) {
    const id = props.id; // tylermcginnis
}
/*
Now, what if instead of passing a string as a prop, we passed a function?
*/
<User id={() => 'tylermcginnis'} />
/*
Now the props object still has an id property, only now instead of being a
string, it references a function.So in order to get the id, we need to
invoke the function.
*/

function User(props) {
    const id = props.id(); // tylermcginnis
}
/*
Now, what if we wanted to pass the function prop some data ?
Well, it’s just a function so we could do it just like we normally would by 
passing it an argument.
*/
function User(props) {
    const id = props.id(true) // tylermcginnis
}

<User id={(isAuthed) => isAuthed === true ? 'tylermcginnis' : null} />

/*
OK… but what do both of these have to do with the problem we saw earlier of
duplicating our hover logic anytime a new component needs it ? Well, we can
combine both of these simple concepts in order to solve our problem.

First, we want to create a “Wrapper” component which is responsible for
managing the hover state. We’ll call it, naturally, Hover and it’ll contain
all the hover logic that we had to duplicate from earlier.
*/

class Hover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovering: false
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
        this.setState({ hovering: true })
    }
    mouseOut() {
        this.setState({ hovering: false })
    }
    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>

            </div>
        )
    }
}
/*
The next question becomes, what should Hover render ? This is where are function 
prop knowledge comes into play.Let’s have Hover receive a prop called render.
This render prop is going to be a function that we can pass the hovering state 
to and it will return some UI.
*/
< Hover render={(hovering) =>
    <div>
        Is hovering? {hovering === true ? 'Yes' : 'No'}
    </div>
} />
/*
Now the last change we need to make is in our Hover component.All we need to do 
is invoke this.props.render passing it this.state.hover.
*/
class Hover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovering: false
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
        this.setState({ hovering: true })
    }
    mouseOut() {
        this.setState({ hovering: false })
    }
    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                {this.props.render(this.state.hovering)}
            </div>
        )
    }
}
/*
Well, would you look at that ? Now that we have our Hover component, any time
we need a component to be aware of its hover state, we just wrap it inside of a
Hovers render prop.

Finally, let’s head back to the original code we had and see how we no 
longer have to duplicate all the hover logic since we have our Hover component.

This is what we had before.
*/
class Info extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovering: false
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
        this.setState({ hovering: true })
    }
    mouseOut() {
        this.setState({ hovering: false })
    }
    render() {
        return (
            <>
                {this.state.hovering === true
                    ? <Tooltip id={this.props.id} />
                    : null}
                <svg
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                    className="Icon-svg Icon--hoverable-svg"
                    height={this.props.height}
                    viewBox="0 0 16 16" width="16">
                    <path d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
            </>
        )
    }
}

class TrendChart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovering: false
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
        this.setState({ hovering: true })
    }
    mouseOut() {
        this.setState({ hovering: false })
    }
    render() {
        return (
            <>
                {this.state.hovering === true
                    ? <Tooltip id={this.props.id} />
                    : null}
                <Chart
                    type='trend'
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                />
            </>
        )
    }
}

class DailyChart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovering: false
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
        this.setState({ hovering: true })
    }
    mouseOut() {
        this.setState({ hovering: false })
    }
    render() {
        return (
            <>
                {this.state.hovering === true
                    ? <Tooltip id={this.props.id} />
                    : null}
                <Chart
                    type='daily'
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                />
            </>
        )
    }
}

function App() {
    return (
        <>
            <Info />
            <TrendChart />
            <DailyChart />
        </>
    )
}
/*
And now with our Hover component, instead of each component having to duplicate 
the hover logic, we can wrap each one inside of the render prop we pass to Hover 
and then pass down the hovering argument as a prop.
*/

function Info(props) {
    return (
        <>
            {props.hovering === true
                ? <Tooltip id={this.props.id} />
                : null}
            <svg
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                className="Icon-svg Icon--hoverable-svg"
                height={this.props.height}
                viewBox="0 0 16 16" width="16">
                <path d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
        </>
    )
}

function TrendChart(props) {
    return (
        <>
            {props.hovering === true
                ? <Tooltip id={this.props.id} />
                : null}
            <Chart
                type='trend'
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
            />
        </>
    )
}


function DailyChart(props) {
    return (
        <>
            {props.hovering === true
                ? <Tooltip id={this.props.id} />
                : null}
            <Chart
                type='daily'
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
            />
        </>
    )
}

function App() {
    return (
        <>
            <Hover render={(hovering) =>
                <Info hovering={hovering} />
            } />

            <Hover render={(hovering) =>
                <TrendChart hovering={hovering} />
            } />

            <Hover render={(hovering) =>
                <DailyChart hovering={hovering} />
            } />
        </>
    )
}
/*
This pattern, as you probably guessed by now, is called Render Props.Summarized 
in the React docs, “the term render prop refers to a technique for sharing code 
between React components using a prop whose value is a function”.

Another way to utilize the render props pattern is with React’s children prop.
If you’ve never used props.children before, it’s just like any other prop.
However, instead of you passing it explicitly to the component, React 
automatically does it for you and it references whatever between the opening 
and closing tags of the component.
*/

function User(props) {
    return (
        <div>
            {props.children}
        </div>
    )
}

<User>
    This is props.children
</User>
/*
In the example above, what’s going to get rendered to the UI is a div with the 
words This is props.children inside of it.

Now what if instead of having props.children be a string, it was a function?
Just as we saw earlier, we’d need to invoke it to get the value.
*/

function User(props) {
    return (
        <div>
            {props.children()}
        </div>
    )
}

<User>
    {() => 'This is props.children'}
</User>
/*
With our newly formed knowledge of props.children, let’s update our examples 
from earlier.Now instead of Hover having a render prop, let’s get rid of that 
all together and use props.children instead.
*/
function App() {
    return (
        <>
            <Hover>
                {(hovering) => <Info hovering={hovering} />}
            </Hover>

            <Hover>
                {(hovering) => <TrendChart hovering={hovering} />}
            </Hover>

            <Hover>
                {(hovering) => <DailyChart hovering={hovering} />}
            </Hover>
        </>
    )
}
/*
Now we need to update Hover so instead of invoking this.props.render, it invokes
this.props.children.
*/
class Hover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovering: false
        }
        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
        this.setState({ hovering: true })
    }
    mouseOut() {
        this.setState({ hovering: false })
    }
    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                {this.props.children(this.state.hovering)}
            </div>
        )
    }
}
/*
Nice.Is this better ? Not really, it’s just different.I prefer it, but there’s
nothing objectively better about it.

If you read our post about Higher Order Components, you’ll be familiar with how
HOCs have some pitfalls.The biggest one was with inversion of control and naming
collisions.Because you have to pass your component over to the
Higher - Order component, you have no control over how it’s rendered.
We looked at an example with React Router’s withRouter HOC.withRouter will pass
match, location, and history props to the wrapped component whenever it renders.
*/
class Game extends React.Component {
    render() {
        const { match, location, history } = this.props // From React Router

        // ...
    }
}

export default withRouter(Game);
/*
If our Game component is already receiving match, location, or history as a 
prop, we’re going to have a naming collision and it’s going to be a hard bug 
to track down.
 
Does this same pitfall occur with Render Props ? Nope.Instead of handing over 
the component, we hand over a function.Then, when that function is invoked, 
it’ll be passed the data we need — no inversion of control and no naming 
collisions since we can decide how the component is rendered.
*/
<Hover>
    {(hovering) => {
        // We can do whatever we want here.
        // We decide how and when to render the component
        return <Info anyNameWeWant={hovering} />
    }}
</Hover >
/*
Now the big question is, should you use Render Props or Higher Order Components
? Well, that’s up to you.You now know how to use them both which means you have
enough information to make an informed decision for yourself.
*/
