/*
Whenever you’re utilizing a component architecture, as your application grows, 
the ability to share state amongst different components will inevitably become 
an issue.

Let’s pretend we had an app with the following architecture, each circle 
representing a different component.

Now let’s pretend that we had a piece of state that was needed throughout 
various levels of our application, represented here as a diamond.

The recommended solution for this problem is to move that state up to the 
nearest parent component and then pass it down via props.

https://user-images.githubusercontent.com/2933430/55271310-6e308880-5270-11e9-8295-1b928a4086dd.png

This works, and most of the time it’s the right solution. However, there are 
times when passing props through intermediate components can become overly 
redundant or downright unmanageable. Take a tool like React Router for example. 
React Router needs to have the ability to pass routing props to any component in 
the component tree, regardless of how deeply nested the components are. Because 
this is such a significant problem, React comes with a built-in API to solve 
it called Context.

Context provides a way to pass data through the component tree without having 
to pass props down manually at every level. - The React Docs

Now that we know the problem that Context solves, how do we use it?

The Context API
For our example, let’s say we’re building an app that is used by both English and
Spanish speaking countries. We want to expose a button that when it’s clicked, 
can toggle the text of our entire application between English and Spanish.

From a high level, if you think about what’s needed to solve this problem, there 
are two aspects to it.

We need a way to declare the data that we want available throughout our component
tree. In our example, that data is a locale value that will be either en or es.

We need a way for any component in the component tree that requires that data to
be able to subscribe to it.

React gives us the ability to do both of those things whenever we create a new
Context using the React.createContext method. Typically, you create a new Context
for each unique piece of data that needs to be available throughout your 
component tree. Based on our example, we’ll create a LocaleContext.
*/
const LocaleContext = React.createContext();
/*
Now if we examine our LocaleContext, you’ll notice that it has two properties, 
both of which are React components, Provider, and Consumer.

Provider allows us to “declare the data that we want available throughout our 
component tree”.

Consumer allows “any component in the component tree that needs that data to be 
able to subscribe to it”.

Provider
You use Provider just like you would any other React component. It accepts a 
value prop which is the data that you want available to any of its children who 
need to consume it.
*/
<MyContext.Provider value={data}>
    <App />
</MyContext.Provider>
/*
In our example, we want locale to be available anywhere in the component tree. 
We also want to update the UI (re-render) whenever it changes, so we’ll stick it 
on our component’s state.
*/
// LocaleContext.js
import React from "react";

const LocaleContext = React.createContext();

export default LocaleContext
import React from 'react';
import LocaleContext from './LocaleContext';

export default function App() {
    const [locale, setLocale] = React.useState('en');

    return (
        <LocaleContext.Provider value={locale}>
            <Home />
        </LocaleContext.Provider>
    )
}
/*
Now, any component in our component tree that needs the value of locale will 
have the option to subscribe to it using LocaleContext.Consumer.

Consumer
Again, the whole point of the Consumer component is it allows you to get access 
to the data that was passed as a value prop to the Context’s Provider component. 
To do this, Consumer uses a render prop.
*/
<MyContext.Consumer>
    {(data) => {
        return (
            <h1>
                The "value" prop passed to "Provider" was {data}
            </h1>
        )
    }}
</MyContext.Consumer>
/*
Now in our example, because we passed locale as the value prop to 
LocaleContext.Provider, we can get access to it by passing 
LocaleContext.Consumer a render prop.
*/
// Blog.js
import React from 'react'
import LocaleContext from './LocaleContext'

export default function Blog() {
    return (
        <LocaleContext.Consumer>
            {(locale) => <Posts locale={locale} />}
        </LocaleContext.Consumer>
    )
}
/*
At this point, we’ve seen that because we wrapped our whole app in 
<LocaleContext.Provider value={locale}>, any component in our application tree 
can get access to locale by using LocaleContext.Consumer. However, what if we 
also want to be able to toggle it (en -> es) from anywhere inside of our 
component tree?

Your first intuition might be to do something like this.
*/
export default function App() {
    const [locale, setLocale] = React.useState('en');

    const toggleLocale = () => {
        setLocale((locale) => {
            return locale === 'en' ? 'es' : 'en'
        })
    }

    return (
        <LocaleContext.Provider value={{
            locale,
            toggleLocale
        }}>
            <Home />
        </LocaleContext.Provider>
    )
}
/*
What we’ve done is added a new property to the object we pass to value. Now, 
anywhere in our component tree, using ThemeContext.Consumer, we can grab locale 
OR toggleLocale.

Sadly, the idea is right, but the execution is a little off. Can you think of 
any downsides to this approach? Hint, it has to do with performance.

Just like React re-renders with prop changes, whenever the data passed to value 
changes, React will re-render every component which used Consumer to subscribe 
to that data. The way in which React knows if the data changes is by using 
“reference identity” 
(which is kind of a fancy way of saving oldObject === newObject).

Currently with how we have it set up (value={{}}), we’re passing a new object to
value every time that App re-renders. What this means is that when React checks 
if the data passed to value has changed, it’ll always think it has since we’re 
always passing in a new object. As a result of that, every component which used 
Consumer to subscribe to that data will re-render as well, even if locale or 
toggleLocale didn’t change.

To fix this, instead of passing a new object to value every time, we want to 
give it a reference to an object it already knows about. To do this, we can use 
the useMemo Hook.
*/
export default function App() {
    const [locale, setLocale] = React.useState('en')

    const toggleLocale = () => {
        setLocale((locale) => {
            return locale === 'en' ? 'es' : 'en'
        })
    }

    const value = React.useMemo(() => ({
        locale,
        toggleLocale
    }), [locale])

    return (
        <LocaleContext.Provider value={value}>
            <Home />
        </LocaleContext.Provider>
    )
}
/*
React will make sure the value that useMemo returns stays the same unless locale 
changes. This way, any component which used Consumer to subscribe to our locale 
context will only re-render if locale changes.

Now, anywhere inside of our component tree, we can get access to the locale 
value or the ability to change it via toggleLocale.
*/
// Blog.js
import React from 'react'
import LocaleContext from './LocaleContext'

export default function Blog() {
    return (
        <LocaleContext.Consumer>
            {({ locale, toggleLocale }) => (
                <React.Fragment>
                    <Nav toggleLocal={toggleLocale} />
                    <Posts locale={locale} />
                </React.Fragment>
            )}
        </LocaleContext.Consumer>
    )
}

/*

defaultValue
Whenever you render a Consumer component, it gets its value from the value prop
of the nearest Provider component of the same Context object. However, what if
there isn’t a parent Provider of the same Context object? In that case, it’ll
get its value from the first argument that was passed to createContext when the
Context object was created.
*/

const MyContext = React.creatContext('defaultValue')
// And adapted to our example.

const LocaleContext = React.createContext('en')

/*
Now, if we use <LocaleContext.Consumer> without previously rendering a 
<LocaleContext.Provider>, the value passed to Consumer will be "en".

Here’s a very clever example my good friend chantastic came up with. I’ve 
modified it a bit, but the core idea is his.
*/
import React from 'react'
import ReactDOM from 'react-dom'

const ExpletiveContext = React.createContext('shit')

function ContextualExclamation() {
    return (
        <ExpletiveContext.Consumer>
            {(word) => <span>Oh {word}!</span>}
        </ExpletiveContext.Consumer>
    )
}

function VisitGrandmasHouse() {
    return (
        <ExpletiveContext.Provider value='poop'>
            <h1>Grandma's House 🏡</h1>
            <ContextualExclamation />
        </ExpletiveContext.Provider>
    )
}

function VisitFriendsHouse() {
    return (
        <React.Fragment>
            <h1>Friend's House 🏚</h1>
            <ContextualExclamation />
        </React.Fragment>
    )
}

function App() {
    return (
        <React.Fragment>
            <VisitFriendsHouse />
            <VisitGrandmasHouse />
        </React.Fragment>
    )
}
/*

Can you follow what’s going on? First, we create a new ExpletiveContext and
set its default value to shit. Then we render two components, VisitFriendsHouse
and VisitGrandmasHouse.

Because we’re allowed to swear at our friend’s house, VisitFriendsHouse renders
ExpletiveContext.Consumer whose value will default to shit since there’s not an
ExpletiveContext.Provider in the tree above it.

Unlike at our friends, with Grandma, we’re not allowed to swear. So instead of
just rendering ExpletiveContext.Consumer, we wrap it in ExpletiveContext.Provider
passing it a value of poop. This way when the Consumer looks for its nearest
Provider, it’ll find it and get a value of poop rather than the default value of shit.

useContext
At this point, you’ve seen that in order to get access to the data that was
passed as a value prop to the Context’s Provider component, you use Consumer as
a render prop.
*/
export default function Nav() {
    return (
        <LocaleContext.Consumer>
            {({ locale, toggleLocale }) => locale === "en"
                ? <EnglishNav toggleLocale={toggleLocale} />
                : <SpanishNav toggleLocale={toggleLocale} />}
        </LocaleContext.Consumer>
    );
}
/*
This works, but as always the render-props syntax is a little funky. The problem
gets worse if you have multiple context values you need to grab.
*/
export default function Nav() {
    return (
        <AuthedContext.Consumer>
            {({ authed }) => authed === false
                ? <Redirect to='/login' />
                : <LocaleContext.Consumer>
                    {({ locale, toggleLocale }) => locale === "en"
                        ? <EnglishNav toggleLocale={toggleLocale} />
                        : <SpanishNav toggleLocale={toggleLocale} />}
                </LocaleContext.Consumer>}
        </AuthedContext.Consumer>
    )
}
/*
Oof.Luckily for us, there’s a Hook that solves this problem - useContext.
useContext takes in a Context object as its first argument and returns whatever
was passed to the value prop of the nearest Provider component. Said differently,
it has the same use case as .Consumer but with a more composable API.
*/
export default function Nav() {
    const { locale, toggleLocale } = React.useContext(
        LocaleContext
    )

    return locale === 'en'
        ? <EnglishNav toggleLocale={toggleLocale} />
        : <SpanishNav toggleLocale={toggleLocale} />
}
/*
As always, this API really shines when you need to grab multiple values from
different Contexts.
*/
export default function Nav() {
    const { authed } = React.useContext(AuthedContext)

    if (authed === false) {
        return <Redirect to='/login' />
    }

    const { locale, toggleLocale } = React.useContext(
        LocaleContext
    )

    return locale === 'en'
        ? <EnglishNav toggleLocale={toggleLocale} />
        : <SpanishNav toggleLocale={toggleLocale} />
}
/*
Warnings
Here’s the thing, when you’re a hammer, everything looks like a nail. Typically
when you first learn about Context, it appears like it’s the solution to all
your problems. Just remember, there’s nothing wrong with passing props down
multiple levels, that’s literally how React was designed. I don’t have a universal
rule for when you should and shouldn’t use Context, just be mindful that it’s
common to overuse it.
*/
