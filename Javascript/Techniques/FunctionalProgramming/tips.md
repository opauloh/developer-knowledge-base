# filter

- Para retirar elementos da array com base na condição
- Cada vez que retorna true mantém o elem na array, caso retorne false, remove

```js
const likers = likers.filter((liker) => liker.login !== info.liker.login);
```

# find

- Encontra o elemento com base na busca
- EX: this.state.fotos.find(foto => foto.id === infoLiker.fotoId);

# findIndex

- Busca o índice de uma array de obj, aceita como parametro uma função
- EX: state.findIndex(foto => foto.id === action.fotoId);

# Object.assign()

- copia valores de um obj de origem para uma ou mais destinos

# reduce

- Reduz o valor da array para um unico valor
- EX: this.\_negociacoes.reduce((total, value) => total + value.volume, 0);

# map

- Intera sobre uma array e retorna ela alterada ou não:
- EX: negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade,
  obj.valor))

# spread Operator ...

- Pega todas as informações do props e repassa
- EX de:
  <FotoAtualizacoes foto={this.props.foto} likeService={this.props.likeService}>
  />
- para: <FotoAtualizacoes {...this.props} />

# includes

- Verifica se o elemento está na array:
- EX: approved.includes('Gustavo')

# Object prototype spread

- Faz a união do objeto dentro de um único (o spread facilita a criarmos novos
  objetos copiando apenas os valores, sem afetar o objeto original)
- EX: const newCourses = { angular, ...frameworks };

# Destructor

- Extrai somente o objeto requerido, ou extrai os restantes utilizando o spread
  operator
- EX: const { angular, ...frameworks } = courses;

# Async await

- outra forma de resolver promises, tratando erro pelo try / catch
- EX: (async () => { try { const resp = await
  fetch('https://jsonplaceholder.typicode.com/todos'); const dados = await
  resp.json(); const titles = dados.map(item => item.title);
  console.log(titles); } catch (error) { console.log(`deu dri: ${error}`); }
  finally { console.log('All right!'); } })();

# Currying

- It’s a technique that makes it possible to partially call your function to
  make a brand new function, where some of the arguments are missing to fully
  apply it on the initial call.
- EX: function add (a) { return function (b) { return a + b } }
- ES6: const add = a => b => a + b;

# Compose

- Since the entire program is made of small building blocks, we need some
  techniques to make them work together. And this is where compose comes in. I
  want you to think of compose as a way to combine two or more functions to
  create a new function.
- EX // Remove extra white space between words const trim = s => s.replace(/
  +/g, " ")

// Make first letter of string uppercase const capitalize = s => s.replace
(/^./, c => c.toUpperCase ());

// Put exclamation mark at the end of string const exclaim = s => `${s}!`;

const myString = exclaim (capitalize (trim ('an unformatted string')));

const formatString = x => exclaim (capitalize (trim (x)));

// Our simple compose function that only // works with two functions const
compose = (f, g) => x => f (g (x));

// We make our reusable function const capitalizeAndExclaim = compose (exclaim,
capitalize);

// And call it like this capitalizeAndExclaim ('hello') // Hello!

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

// Usage : compose functions right to left // compose(minus8, add10,
multiply10)(4) === 42 // // The resulting function can accept as many arguments
as the first function does // compose(add2, multiply)(4, 10) === 42

# PointFree

- Remember that the function you send to map is not executed immediately. It’s
  executed whenever we reach an item in our loop. JavaScript will then call the
  passed-in function with the item as the argument automatically. So, using the
  first version just makes your code more complex to read. It’s so much easier
  to read the second part like — we map over each item in the array and increase
  the number.
- EX: const myArray = [1, 2, 3, 4, 5]; const increase = n => n + 1;

// How many developers will use increase const myNewArray = myArray.map(item =>
increase (item)); // Result: [2, 3, 4 , 5, 6]

// How to do the same with pointfree style const myNewArray =
myArray.map(increase);
