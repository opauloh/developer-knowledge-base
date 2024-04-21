# Tools

## ts-toolbelt

ts-toolbelt is a collection of utility types for Typescript. It is a great resource for advanced typescript
users. You can find the documentation [here](https://millsp.github.io/ts-toolbelt/).

```ts
// Might come in handy!
import { S } from 'ts-toolbelt';
// https://millsp.github.io/ts-toolbelt/modules/string_split.html

import { Equal, Expect } from '../helpers/type-utils';

type Path = 'Users/John/Documents/notes.txt';

type SplitPath = S.Split<Path, '/'>;

const splittedPath: SplitPath = ['Users', 'John', 'Documents', 'notes.txt'];
```
