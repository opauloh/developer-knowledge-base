/*
Reason
When handling data in a program, often some of them are used together in many
functions and for different purposes. Grouping them into a structure such an
object makes explicit the relationship between the data items. But the real
benefit of this refactoring is the flexibility it brings to a function.

Benefits
- Compact argument into a structure.
- Unordered and easy extensible list of arguments.

Implementation
- Create a well-named structure which represents the behavior.
- Replace the parameter list in the function declaration with the new structure.
*/

// =======
// Before
// =======
function locationAddress(latitude, longitude) { }
function locationCity(latitude, longitude) { }
function locationCountry(latitude, longitude) { }


// =======
// After
// =======

function locationAddress(coordinates) { }
function locationCity(coordinates) { }
function locationCountry(coordinates) { }
