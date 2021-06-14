console.log('worker');
this.onmessage = (e) => {
  console.log(`worker received message`, e.data);
  this.postMessage('Hey main');
};
