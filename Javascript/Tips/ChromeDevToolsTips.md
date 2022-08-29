## Chrome Dev Tools Tips

- Type `$_` in the console to use the last value outputted by the console

![](img/ChromeDevToolsTips-20220829113832.png)

- Use `$0` to `$4` to navigate between your last 5 inspected elements (`$0` is the most recent)

![](img/ChromeDevToolsTips-20220829114018.png)

- the `$` selector is a shortcut for `querySelector` (like jQuery)

> note: use two dollars for `querySelectorAll`

![](img/ChromeDevToolsTips-20220829114332.png)

- `console.table()` (or `table()`)

![](img/ChromeDevToolsTips-20220829114610.png)

- use `keys()` to get only the keys of the object

![](img/ChromeDevToolsTips-20220829114724.png)

- use `values()` to get only the values of the object

![](img/ChromeDevToolsTips-20220829114800.png)

- use `copy()` to copy anything to the clipboard

![](img/ChromeDevToolsTips-20220829114853.png)

- use `getEventListeners($0)` see all event listeners for an element

![](img/ChromeDevToolsTips-20220829114955.png)

- use `monitorEvents(element, eventType)` to monitor all events on an element, for example we log all resizes
  on the window events by using `monitorEvents(window, 'resize')`

> note: use unmonitorEvents(element) to stop monitoring events

![](img/ChromeDevToolsTips-20220829115310.png)

- use `monitor(functionReference)` to monitor all function calls of the referenced object

> note: use unmonitor(funtionReferece) to stop monitoring function calls

![](img/ChromeDevToolsTips-20220829115508.png)
