const worker = new Worker('worker.js');
worker.postMessage('Hello worker');
worker.onmessage = (e) => {
  console.log('main received message', e.data);
};
