# Terminologies

## Discriminated Unions

Discriminated unions are a powerful pattern in TypeScript. They are useful when working with types that have a
common field between them. This common field is called the **discriminator**. The **discriminator** field is
used to determine which type a value belongs to.

Basic Example:

```typescript
// In this case, the `type` field is the discriminator
type UnionExample =
  | {
      type: 'a';
      thisOnlyExistsInA: number;
    }
  | {
      type: 'b';
      thisOnlyExistsInB: string;
    }
  | {
      type: 'c';
      thisOnlyExistsInC: boolean;
    };

const getValue = (input: UnionExample) => {
  // if(input.thisOnlyExistsInA) { this will thrown // Error: Property 'thisOnlyExistsInA' does not exist on type 'UnionExample'.

  if (input.type === 'a') {
    // using input.thisOnlyExistsInA is safe here
    return input.thisOnlyExistsInA;
  }

  // good usage in switch statement
  switch (input.type) {
    case 'a':
      return input.thisOnlyExistsInA;
    case 'b':
      return input.thisOnlyExistsInB;
    case 'c':
      return input.thisOnlyExistsInC;
  }
};
```

Sofisticated Example:

```typescript
// In this case, the `kind` field is the discriminator
interface Square {
  kind: 'square';
  size: number;
}
interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}

const getArea = (shape: Square | Rectangle | Circle) => {
  switch (shape.kind) {
    case 'square':
      return shape.size * shape.size;
    case 'rectangle':
      return shape.width * shape.height;
    case 'circle':
      return Math.PI * shape.radius ** 2;
  }
};
```
