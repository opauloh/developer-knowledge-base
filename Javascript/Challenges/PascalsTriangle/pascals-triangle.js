const generateTriangleTemplate = (rowsQty) => {
  return [...Array(rowsQty)]
    .reduce((prev, _, idx) => {
      prev = prev.concat([[...Array(idx + 1)]]);
      return prev;
    }, [])
    .map((row) => {
      let lastColumn = row.length - 1;
      row[0] = 1;
      row[lastColumn] = 1;
      return row;
    });
};

const computePascalTriangle = (triangle) => {
  for (let row = 0; row < triangle.length; row++) {
    for (let column = 0; column < triangle[row].length; column++) {
      let actualColumnValue = triangle[row][column];

      if (!actualColumnValue) {
        triangle[row][column] =
          triangle[row - 1][column - 1] + triangle[row - 1][column];
      }
    }
  }

  return triangle;
};
export const rows = (rowsQty = 0) => {
  if (rowsQty === 0) return [];

  const triangleShape = generateTriangleTemplate(rowsQty);
  return computePascalTriangle(triangleShape);
};
