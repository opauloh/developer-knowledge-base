// To start using React.Suspense, we just need to wrap the component
// in React.Suspense, don't need to enable concurrent mode anymore.

function App() {
  return (
    <React.Suspense fallback={<h3>Loading...</h3>}>
      <Info />
    </React.Suspense>
  );
}

// The component that needs to be suspended needs to throw a promise
// in case the data is not available yet
let data;

function Info() {
  // 🐨 if there's no data yet, then throw the dataPromise
  // 💰 (no, for real. Like: `throw dataPromise`)
  if (!data) throw dataPromise;
  // if the code gets it this far, then the data variable is defined and
  // rendering can continue!
  return (
    <div>
      <div className="info__img-wrapper">
        <img src={data.image} alt={data.name} />
      </div>
      <DataView data={data} />
    </div>
  );
}

const handleSuccess = (result) => (data = result);
// 🐨 when the promise resolves, assign the "data" variable to the resolved value
// 💰 For example: somePromise.then(resolvedValue => (someValue = resolvedValue))
const dataPromise = fetchData().then(handleSuccess);

// For handling errors, we can create a variable to hold the error
let dataError;

const handleFailure = (error) => {
  dataError = error;
};

// then update our function to throw the error if there is one
function Info() {
  if (dataError) throw dataError;
  if (!data) throw dataPromise;
  return (
    <div>
      <div className="info__img-wrapper">
        <img src={data.image} alt={data.name} />
      </div>
      <DataView data={data} />
    </div>
  );
}

// to handle the error, we can use an ErrorBoundary
// 🐨 wrap the Info component in an ErrorBoundary
// 💰 <ErrorBoundary><Info /></ErrorBoundary>
function App() {
  return (
    <React.Suspense fallback={<h3>Loading...</h3>}>
      <ErrorBoundary>
        <Info />
      </ErrorBoundary>
    </React.Suspense>
  );
}

// We can use onReset and resetKeys to help the user recover from the error
// 🐨 add an onReset prop to the ErrorBoundary
// 💰 onReset={() => (dataError = null)}
// 🐨 add a resetKeys prop to the ErrorBoundary
// 💰 resetKeys={[dataError]}
function App() {
  return (
    <React.Suspense fallback={<h3>Loading...</h3>}>
      <ErrorBoundary onReset={() => (dataError = null)} resetKeys={[dataError]}>
        <Info />
      </ErrorBoundary>
    </React.Suspense>
  );
}
// resetKeys is an array of values that, when changed, will reset the error
// boundary. In this case, we're resetting the error boundary when the dataError
// variable changes.

// keep in mind that the placement of your boundaries, whether they be error boundaries or suspense boundaries, has pretty significant implications on the user's experience when they run into those boundaries.
// it's not recommended putting a React suspense boundary around every single component that's suspense,
// just like I wouldn't necessarily recommend putting a try...catch block around every line of code in your application.
// You need to be thoughtful about where you place these different boundaries.
