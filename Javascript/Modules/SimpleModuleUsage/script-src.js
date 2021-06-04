import { appendDiv } from './append-div.js';
import * as colors from 'https://unpkg.com/d3-color@2.0.0/src/color.js?module';

appendDiv('Hello from external script');
console.log(colors);

import('./go.js').then(
  (moduleExports) => {
    moduleExports.go();
  },
  (error) => {
    console.error('there was an error loading the script!');
    throw error;
  }
);
