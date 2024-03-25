# Utility Types

See Documentation: [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## ReturnType

Use [ReturnType](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype) type to construct a type consisting of the return type of the function type Type.

```typescript
type MyFunctionType = () => number;
type MyReturnType = ReturnType<MyFunctionType>; // number
```

## Parameters

Use [Parameters](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype) type to construct a tuple type from the types used in the parameters of a function type Type.

**Tip**: To access the tupple properties, use the index notation `[]` to access the properties.

```typescript
type MyFunctionType = (a: number, b: string) => void;
type MyParameters = Parameters<MyFunctionType>; // [number, string]
type FirstParameter = MyParameters[0]; // number
type SecondParameter = MyParameters[1]; // string
```

## Awaited

Use [Awaited](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype) type to obtain the type of the awaited value of a promise-like type.

```typescript

const getUser = () => {
  return Promise.resolve({
    id: "123",
    name: "John",
    email: "john@example.com",
  });
};

type ReturnValue = Awaited<ReturnType<typeof getUser>>; // { id: string, name: string, email: string }
```