/*
This process of assigning variable declarations a default value of undefined
during the creation phase is called Hoisting.

Hoisting is JavaScript's default behavior of moving all declarations to the top
 of the current scope (to the top of the current script or the current function)

In JavaScript, an undeclared variable is assigned the value undefined at
 execution and is also of type undefined.


In JavaScript, a ReferenceError is thrown when trying to access a previously
undeclared variable.

console.log('name: ', name) // name: undefined
console.log('handle: ', handle) // handle: undefined
console.log('getUser :', getUser) // getUser: ƒ getUser () {}

var name = 'Tyler'
var handle = '@tylermcginnis'

function getUser () {
  return {
    name: name,
    handle: handle
  }
}

*/