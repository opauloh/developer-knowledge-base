function render(ui, options = {}) {
  const store = createStore(reducer, options.initialState);
  return rtlRender(<Provider store={store}>{ui}</Provider>, options);
}
/* 
Let's go ahead and clean up a couple of other things. First off, these options
are actually going to rtlRender, and I don't want to pass the initialState 
option to rtlRender. What we're going to do is we'll destructure this.
*/
function render(ui, { initialState, ...options } = {}) {
  const store = createStore(reducer, initialState);
  return rtlRender(<Provider store={store}>{ui}</Provider>, options);
}
