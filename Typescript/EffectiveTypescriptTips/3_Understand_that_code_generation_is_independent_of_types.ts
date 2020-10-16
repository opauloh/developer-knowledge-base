/*
// 3 - Understand that Code generation is independent of types
- You cannot check typescript types at runtime
*/
interface SquareA {
  width: number;
}
interface RectangleA extends SquareA {
  height: number;
}

type ShapeA = SquareA | RectangleA;
//We can't do this:
function calculateArea_Invalid(shape: ShapeA) {
  if (shape instanceof RectangleA) {
  }
}

//Instead we can do this:
function calculateAreaA(shape: ShapeA) {
  if ('height' in shape) {
    return shape.width * shape.height; //is Rectangle
  }

  return shape.width * shape.width; //is Square
}

// Alternatively, we can introduce a "tag", to explicitly store the type in a way
// that is available at runtime
interface SquareB {
  kind: 'square';
  width: number;
}
interface RectangleB {
  kind: 'rectangle';
  width: number;
  height: number;
}

type ShapeB = SquareB | RectangleB;

function calculateAreaB(shape: ShapeB) {
  if (shape.kind === 'rectangle') {
    return shape.width * shape.height; //is Rectangle
  }

  return shape.width * shape.width;
}
// Making Square and REctangle classes would have been another way to fix the error
// Because class introduces Both a type and a value, whereas interface only
// introduces types
// IMPORTANT: The Rectangle in type Shape = Square | Rectangle refers to the type
// but Rectangle in shape instance of Rectangle refers to the value, and values are
// available at runtime
class SquareC {
  constructor(public width: number) {}
}
class RectangleC extends SquareC {
  constructor(public width: number, public height: number) {
    super(width);
  }
}

type ShapeC = SquareC | RectangleC;

function calculateArea4(shape: ShapeT) {
  if (shape instanceof RectangleC) {
    return shape.width * shape.height; //is Rectangle
  }

  return shape.width * shape.width;
}
