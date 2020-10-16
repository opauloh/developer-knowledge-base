/*
// 2 - Know which typescript options you're using
- Configure using tsconfig.json rather than command-line options
- Turn on noImplicityAny unless you are transitioning a Javascript project to Typescript
*/
// Off
function add(a, b) {
  return a + b;
}
// On
function add2(a, b) {
  //Parameter a implicity has an any number
  //Parameter b implicity has an any number
  return a + b;
}
function add3(a: number, b: number) {
  //Parameter a implicity has an any number
  //Parameter b implicity has an any number
  return a + b;
} // Ok
/*
- Use strictNullChecks to prevent "undefined is not an object" runtime error
*/
//On
const x: number = null; // Ok
// Off
const y: number = null; // Type 'null' is not assignable to type number
