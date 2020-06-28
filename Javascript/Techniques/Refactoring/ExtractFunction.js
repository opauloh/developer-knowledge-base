/*
Reason

Often code gets difficult to understand, specially when we use less explicative
syntax. Once we realize the code is not completely easy to read, extracting
some code in a function helps to explain what that portion of code does.
When adding many responsibilities to the same function, we have already lost
control over that part of the code.


Benefits
- Shorter functions.
- More explicative names to describe the code's purpose.
- Less useless comments.

Implementation
- Create a new function and name it for what it does.
- Cut/paste the extracted code from the source code into the new function.
- Pass as a parameter the possible variables in the new function scope from the
source code.
*/

// =======
// Before
// =======

function printMenu(menu) {
    // Print menu name
    console.log('*****')
    console.log('Menu: ', menu.name);
    console.log('*****')

    // Print menu dishes
    console.log(menu.dishes[0])
    console.log(menu.dishes[1])
}

// =======
// After
// =======

function printMenu(menu) {
    printMenuName(menu)

    // Print menu dishes
    console.log(menu.dishes[0])
    console.log(menu.dishes[1])

    function printMenuName(menu) {
        console.log('*****')
        console.log('Menu: ', menu.name);
        console.log('*****')
    }
}

