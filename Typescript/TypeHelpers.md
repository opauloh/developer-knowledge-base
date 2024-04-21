# Type Helpers

## Create functions that return types

```ts
type ReturnWhatIPassIn<T> = T;

const returnNumber = (): ReturnWhatIPassIn<number> => 1;
const returnString = (): ReturnWhatIPassIn<string> => 'Hello';
const returnBoolean = (): ReturnWhatIPassIn<boolean> => true;
```

The angle brackets next to ReturnWhatIPassIn instantiate a type argument called `T`. After the equals sign, we
'return' it by using `T`.

Note that we could name T whatever we want, and the type helper would still work as expected:

```ts
type ReturnWhatIPassIn<Whatever> = Whatever;
```
