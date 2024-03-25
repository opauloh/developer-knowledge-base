// There's a pattern called createResource that we can use
// that's fits well with suspense:

const createResource = (promise) => {
  let status = 'pending';
  let result = promise.then(
    (resolved) => {
      status = 'resolved';
      result = resolved;
    },
    (rejected) => {
      status = 'rejected';
      result = rejected;
    }
  );

  return {
    read() {
      if (status === 'pending' || status === 'rejected') {
        throw result;
      }
      return result;
    },
  };
};

// then we can use it like this:

let data = createResource(fetchData());

// and then we can use it like this:

function Info() {
  const data = data.read();
  return (
    <div>
      <div className="info__img-wrapper">
        <img src={data.image} alt={data.name} />
      </div>
      <DataView data={data} />
    </div>
  );
}

// wrap the Info component in an ErrorBoundary
// <ErrorBoundary><Info /></ErrorBoundary>
function App() {
  return (
    <React.Suspense fallback={<h3>Loading...</h3>}>
      <Info />
    </React.Suspense>
  );
}
