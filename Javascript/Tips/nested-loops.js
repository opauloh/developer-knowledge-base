// what if we needed to coordinate nested loops? If we just used break
// or continue inside the inner loop, it wouldn’t be able to stop or
// skip the outer loop:

const numberList = [1, 2, 3, 4, 5];
for (let i = 0; i < numberList.length; i++) {
  const iNum = numberList[i];
  for (let j = 0; j < numberList.length; j++) {
    const jNum = numberList[j];
    if ((iNum * jNum) % 2 === 0) {
      // This continues the inner loop if the number is even
      continue;
    }
    console.log(iNum * jNum);
  }
}
// console output:
// 1,3,5,3,9,15,5,15,25

// To let us call continue or break on the outer loop from inside the inner
// loop, we need to apply a label to the outer loop. The label goes
// right before the for statement. Then, we can use the label with the
// continue statement. Notice how the results change once we add the label.

const numList = [1, 2, 3, 4, 5];
outerLoop: for (let i = 0; i < numList.length; i++) {
  const iNum = numList[i];
  for (let j = 0; j < numList.length; j++) {
    const jNum = numList[j];
    if ((iNum * jNum) % 2 === 0) {
      // This continues the inner loop if the number is even
      continue outerLoop;
    }
    console.log(iNum * jNum);
  }
}
// console output:
// 1,3,5
