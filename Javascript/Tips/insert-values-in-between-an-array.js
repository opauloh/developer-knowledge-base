/*
Consider you have the following array of integers:
const arr = [0, 1, 2, 3, 5, 6, 7, 8];

What if we want to insert the integer 4 at index 4 of the array?

We can simply do so by using the splice function in Array’s prototype. The syntax of the splice function is:

arr.splice(index, itemsToDelete, item1ToAdd, item2ToAdd, ...)
To insert the integer 4 at index 4, we write the code:
*/
arr.splice(4, 0, 4);
/*
To insert multiple integers at an index, we can also write:
*/
arr.splice(4, 0, 100, 101, 102);
/*

Using splice will mutate the original array, not create a new one.
*/
