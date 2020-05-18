/*
Rest parameter syntax
Did you know that you can create a function that accepts any number of arguments?
There is a special syntax called the rest parameter syntax to create such a function.
function sum(...values) {
    console.log(values);
}
sum(1);
sum(1, 2);
sum(1, 2, 3);
sum(1, 2, 3, 4);
Calling the sum functions will collect the values as an array of the parameters passed to the function.
This will print the following output.
[1]
[1, 2]
[1, 2, 3]
[1, 2, 3, 4]
We can also complete the sum function and make it calculate the sum of all the parameters passed to the function.
*/
function sum(...values) {
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }

    return sum;
}
console.log(sum(1));
console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));
