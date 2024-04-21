# Utility Types

See Documentation: [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## ReturnType

Use [ReturnType](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype) type to
construct a type consisting of the return type of the function type Type.

```typescript
type MyFunctionType = () => number;
type MyReturnType = ReturnType<MyFunctionType>; // number
```

## Parameters

Use [Parameters](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype) type to
construct a tuple type from the types used in the parameters of a function type Type.

**Tip**: To access the tupple properties, use the index notation `[]` to access the properties.

```typescript
type MyFunctionType = (a: number, b: string) => void;
type MyParameters = Parameters<MyFunctionType>; // [number, string]
type FirstParameter = MyParameters[0]; // number
type SecondParameter = MyParameters[1]; // string
```

## Awaited

Use [Awaited](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype) type to obtain the
type of the awaited value of a promise-like type.

```typescript
const getUser = () => {
  return Promise.resolve({
    id: '123',
    name: 'John',
    email: 'john@example.com',
  });
};

type ReturnValue = Awaited<ReturnType<typeof getUser>>; // { id: string, name: string, email: string }
```

## keyof

Use `keyof` type to obtain the keys of an object type.

```typescript
type MyObject = {
  id: string;
  name: string;
  email: string;
};

type MyKeys = keyof MyObject; // "id" | "name" | "email"
```

### keyof with typeof

Use `keyof` with `typeof` to obtain the keys of an object type.

```typescript
const user = {
  id: '123',
  name: 'John',
  email: 'john@mail.com',
};

type UserKeys = keyof typeof user; // "id" | "name" | "email"
```

## Extract

Use [Extract](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union) type to
obtain a subset of types from a union type.

Basic Example

```typescript
type MyUnion = 'a' | 'b' | 'c' | 'd';
type MyExtract = Extract<MyUnion, 'a' | 'b'>; // 'a' | 'b'
```

Sofisticated Example

```typescript
export type Event =
  | {
      type: 'click';
      event: MouseEvent;
    }
  | {
      type: 'focus';
      event: FocusEvent;
    }
  | {
      type: 'keydown';
      event: KeyboardEvent;
    };

type ClickEvent = Extract<Event, { type: 'click' }>;
// ClickEvent : {
//   type: 'click';
//   event: MouseEvent;
// }
```

In the above example we could also have used event to extract the type.

```typescript
type ClickEvent = Extract<Event, { event: MouseEvent }>;
// ClickEvent : {
//   type: 'click';
//   event: MouseEvent;
// }
```

## Exclude

Use [Exclude](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-union) type to
obtain a subset of types from a union type.

Basic Example

```typescript
type MyUnion = 'a' | 'b' | 'c' | 'd';
type MyExcludeCAndD = Exclude<MyUnion, 'a' | 'b'>; // 'c' | 'd'
```

Sofisticated Example

```typescript
export type Event =
  | {
      type: 'click';
      event: MouseEvent;
    }
  | {
      type: 'focus';
      event: FocusEvent;
    }
  | {
      type: 'keydown';
      event: KeyboardEvent;
    };

type NonKeyDownEvents = Exclude<Event, { type: 'keydown' }>;
// NonKeyDownEvents : {
//   type: 'click';
//   event: MouseEvent;
// } | {
//   type: 'focus';
//   event: FocusEvent;
// }
```

## Index Access Types

Use [Index Access Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#index-types) to
obtain the type of a property from an object type.

Basic Example

```typescript
type MyObject = {
  id: string;
  name: string;
  email: string;
};

type IdType = MyObject['id']; // string
```

Sofisticated Example

```typescript
export const fakeDataDefaults = {
  String: 'Default string',
  Int: 1,
  Float: 1.14,
  Boolean: true,
  ID: 'id',
  Nested: {
    String: 'Default string',
    Int: 1,
    Float: 1.14,
    Boolean: true,
    ID: 'id',
  },
};

type FakeDataDefaults = typeof fakeDataDefaults;
export type StringType = FakeDataDefaults['String'];
export type IntType = FakeDataDefaults['Int'];
export type FloatType = FakeDataDefaults['Float'];
export type BooleanType = FakeDataDefaults['Boolean'];
export type IDType = FakeDataDefaults['ID'];

export type NestedType = FakeDataDefaults['Nested'];
export type NestedID = FakeDataDefaults['Nested']['ID'];

// prettier-ignore
export type NestedIDUsingTypeOF = typeof fakeDataDefault['Nested']['ID'];
```

You can also use it to extract the type of discriminator field from a discriminated union:

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
type Shape = Square | Rectangle | Circle;

type ShapeKind = Shape['kind']; // "square" | "rectangle" | "circle"
```

## Record

Use [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype) type to create an
object type whose property keys are Keys and whose property values are Type.

```typescript
type MyRecord = Record<'a' | 'b', number>; // { a: number, b: number }
```

## Uppercase

Use [Uppercase](https://www.typescriptlang.org/docs/handbook/utility-types.html#uppercasestringtype) type to
convert a string type to uppercase.

```typescript
type MyString = 'hello';
type MyUppercase = Uppercase<MyString>; // 'HELLO'
```

### Combining Record and Uppercase

```typescript
type MyRecord = Record<'a' | 'b', string>;
type MyUppercase = Uppercase<MyRecord>; // { A: string, B: string }
```

Sofiasticated Example

```typescript
type Event = `log_in` | 'log_out' | 'sign_up';

type ObjectOfKeys = Record<Uppercase<Event>, string>;

const obj: ObjectOfKeys = {
  LOG_IN: 'blabla',
  LOG_OUT: 'testest',
  SIGN_UP: 'hello',
};
```

## Lowercase

Use [Lowercase](https://www.typescriptlang.org/docs/handbook/utility-types.html#lowercasestringtype) type to
convert a string type to lowercase.

```typescript
type MyString = 'HELLO';
type MyLowercase = Lowercase<MyString>; // 'hello'
```

### Combining Record and Lowercase

```typescript
type MyRecord = Record<'A' | 'B', string>;
type MyLowercase = Lowercase<MyRecord>; // { a: string, b: string }
```

Sofiasticated Example

```typescript
type Event = `LOG_IN` | 'LOG_OUT' | 'SIGN_UP';
const obj: Record<Lowercase<Event>, string> = {
  log_in: 'blabla',
  log_out: 'test',
  sign_up: 'hello',
};
```

## Capitalize

Use [Capitalize](https://www.typescriptlang.org/docs/handbook/utility-types.html#capitalizestringtype) type to
convert the first character of a string to uppercase.

```typescript
type MyString = 'hello';
type MyCapitalize = Capitalize<MyString>; // 'Hello'
```

### Combining Record and Capitalize

```typescript
type MyRecord = Record<'a' | 'b', string>;
type MyCapitalize = Capitalize<MyRecord>; // { A: string, B: string }
```

Sofiasticated Example

```typescript
type Event = `log_in` | 'log_out' | 'sign_up';
const obj: Record<Capitalize<Event>, string> = {
  Log_in: 'blabla',
  Log_out: 'test',
  Sign_up: 'hello',
};
```
