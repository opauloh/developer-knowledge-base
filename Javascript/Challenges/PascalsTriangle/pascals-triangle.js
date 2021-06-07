const generateTriangleTemplate = (rowsQty) => {
  return [...Array(rowsQty)].reduce((prev, _, idx) => {
    const row = [...Array(idx + 1)];
    row[0] = row[idx] = 1;
    return (prev = prev.concat([row]));
  }, []);
};

const computePascalTriangle = (triangle) => {
  for (let rIdx = 0; rIdx < triangle.length; rIdx++) {
    triangle[rIdx] = triangle[rIdx].map((col, cIdx) =>
      col ? col : triangle[rIdx - 1][cIdx - 1] + triangle[rIdx - 1][cIdx]
    );
  }

  return triangle;
};
export const rows = (rowsQty = 0) => {
  if (rowsQty === 0) return [];

  return computePascalTriangle(generateTriangleTemplate(rowsQty));
};
