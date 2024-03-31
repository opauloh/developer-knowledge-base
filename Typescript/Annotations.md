# Annotations

## as const

Use `as const` annotation to make an object immutable, and infer their literal types.

Example without as const:

```typescript
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

type ObjType = typeof obj;
// {
//   a: number;
//   b: number;
//   c: number;
// }
```

Example with as const:

```typescript
const obj = {
  a: 1,
  b: 2,
  c: 3,
} as const;

type ObjType = typeof obj;
// {
//   readonly a: 1;
//   readonly b: 2;
//   readonly c: 3;
// }
```

as const also prevents the object from being mutated.

```typescript
const obj = {
  a: 1,
  b: 2,
  c: 3,
} as const;

obj.a = 4; // Error: Cannot assign to 'a' because it is a read-only property.
```

Note: `as const` also works with arrays.

You could also use `Object.freeze()` to make an object immutable in the runtime.

```typescript
const obj = Object.freeze({
  a: 1,
  b: 2,
  c: 3,
});

obj.a = 4; // Error: Cannot assign to 'a' because it is a read-only property.
```

But the caveat is that `Object.freeze()` works only on the first level of the object for immutability and
inference of literal value.

```typescript
const obj = Object.freeze({
  a: 1,
  b: 2,
  c: 3,
  d: {
    e: 4,
  },
});

obj.a = 4; // Error: Cannot assign to 'a' because it is a read-only property.
obj.d.e = 5; // No Error
```
