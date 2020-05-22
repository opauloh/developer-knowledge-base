/*
Detect Route Change
For many times, you will find a needs to detect route change and do something (i.e., change the state “loading” into false whenever there is a page refresh or route change)
To detect route change in React, you need to use listen method in history property
For example,
I want to change my state expanded to false whenever there is a route change
> listen method in history property
*/
class routeChangeTestClass {
    constructor(props) {
        super(props);
        this.props.history.listen((location, action) => {
            // console.log('history changed')
            this.routeChange();
        })
    }
    // routeChange function
    routeChange = () => {
        const { BaseActions } = this.props
        BaseActions.sideBar({ expanded: false })
    }
}
