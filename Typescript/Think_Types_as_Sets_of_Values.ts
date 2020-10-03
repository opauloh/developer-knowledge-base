// Thinking of types as sets of values helps you reason about operations on them.
// For example:
interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}

type PersonSpan = Person & Lifespan;

/*
When in type, The & operator apply to sets of values (not the types, because
if were the types, there would be no interseciton between person and lifespan
so a value that has the properties of both Person AND Lifespan will belong to the
interseciton type
*/

const ps: PersonSpan = {
  name: 'Homer',
  birth: new Date('2000/01/01'),
  death: new Date('2100/01/01'),
};

/*
Also, a value could gave more than thos three properties and still belong to the type

Another perhaps more common way to write the PersonSpan type would be with extends
*/
interface AnotherPerson {
  name: string;
}
interface AnotherPersonSpan extends AnotherPerson {
  birth: Date;
  death?: Date;
}
