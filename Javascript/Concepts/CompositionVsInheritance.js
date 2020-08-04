/*
In our example, we abstracted the common features amongst every animal 
(name, energy, eat, sleep, and play) to an Animal base class. 
Then, whenever we wanted to create an individual type of animal (Dog, Cat, etc.),
we created a subclass for that type.
*/

class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep() {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play() {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

class Dog extends Animal {
  constructor(name, energy, breed) {
    super(name, energy)

    this.breed = breed
  }
  bark() {
    console.log('Woof Woof!')
    this.energy -= .1
  }
}

class Cat extends Animal {
  constructor(name, energy, declawed) {
    super(name, energy)

    this.declawed = declawed
  }
  meow() {
    console.log('Meow!')
    this.energy -= .1
  }
}
/*
And without the code, we can visualize our class structure like this

Animal
  name
  energy
  eat()
  sleep()
  play()

  Dog
    breed
    bark()

  Cat
    declawed
    meow()

This worked well as it allowed us to minimize code duplication and maximize code reuse.

Let’s take this a step further and pretend we’re building software for “Farm Fantasy”
- a massively multiplayer online (MMO) role-playing game where you do the exact 
same thing a farmer does, except, you know, online and you pay to do it.

Now that we’re creating an MMO, we’re going to need to have users. We can update 
our class structure now to look like this

User
  email
  username
  pets
  friends
  adopt()
  befriend()

Animal
  name
  energy
  eat()
  sleep()
  play()

  Dog
    breed
    bark()

  Cat
    declawed
    meow()

The examples above are textbook examples of classes and inheritance. Sadly, unlike
in the classroom, real-world software development isn’t always so predictable.

Let’s say 6 months after building out our initial class structure, our project
manager decides we need to change some things. Users love the app and the 
ability to pay to be a pretend farmer, but they want a more real-life experience.
Right now, only instances of Animal have the ability to eat, sleep, and play.
The users are demanding that they also have those same features.

Alright, no issue. We just need to adjust our class structure around a little bit.

... 🤔
I guess we could abstract the common properties to another parent class and have 
one more step of inheritance

FarmFantasy
  name
  play()
  sleep()
  eat()

  User
    email
    username
    pets
    friends
    adopt()
    befriend()

  Animal
    energy

    Dog
      breed
      bark()

    Cat
      declawed
      meow()

That works, but it’s incredibly fragile. There’s even a name for this anti-pattern
- God object.

And just like that, we see the biggest weakness with inheritance. With inheritance,
you structure your classes around what they are, a User, an Animal, a Dog,
a Cat - all of those words encapsulate a meaning centered around what those things are.
The problem with that is a User today will probably be different than a User in 6 months.
Inheritance makes us turn a blind eye to the inevitable fact that our class
structure will most likely change in the future, and when it does, our tightly
coupled inheritance structure is going to crumble.

The problem with object-oriented languages is they’ve got all this implicit
environment that they carry around with them. You wanted a banana but what you
got was a gorilla holding the banana and the entire jungle. - Joe Armstrong.
Creator of Erlang.

So if inheritance is such a problem, how do we get the same functionality while
minimizing some of the downsides? Rather than thinking in terms of what things are,
what if we think in terms of what things do? Let’s take a Dog for example.
A Dog is a sleeper, eater, player, and barker. A Cat is a sleeper, eater, player,
and meower. A User is a sleeper, eater, player, adopter, and friender. 
Now let’s transform all of these verbs into functions.
*/
const eater = () => ({})
const sleeper = () => ({})
const player = () => ({})
const barker = () => ({})
const meower = () => ({})
const adopter = () => ({})
const friender = () => ({})
/*
Do you see where we’re going with this? Instead of having these methods defined
(and coupled) to a particular class, if we abstract them into their own functions,
we can now compose them together with any type that needs them.

Let’s take a closer look at one of our methods again, eat.

eat(amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Notice that eat logs to the console then increases the energy property on the
instance by the amount argument. Now the question we need to answer is how we
can operate on a specific instance from a one-off function? Well, what if we
just pass it in when we invoke the function? Seems simple enough.
*/
const eater = (state) => ({
  eat(amount) {
    console.log(`${state.name} is eating.`)
    state.energy += amount
  }
})
/*
Now we can follow this same pattern for each one of our functions.

...
*/
const sleeper = (state) => ({
  sleep(length) {
    console.log(`${state.name} is sleeping.`)
    state.energy += length
  }
})

const player = (state) => ({
  play() {
    console.log(`${state.name} is playing.`)
    state.energy -= length
  }
})

const barker = (state) => ({
  bark() {
    console.log('Woof Woof!')
    state.energy -= .1
  }
})

const meower = (state) => ({
  meow() {
    console.log('Meow!')
    state.energy -= .1
  }
})

const adopter = (state) => ({
  adopt(pet) {
    state.pets.push(pet)
  }
})

const friender = (state) => ({
  befriend(friend) {
    state.friends.push(friend)
  }
})

/*
Now whenever a Dog, Cat, or User needs to add the ability to do any of the
functions above, they merge the object they get from one of the functions onto
their own object.

Let’s see what that looks like. We’ll start with a Dog. Earlier we defined a
Dog by what it does, a Dog is a sleeper, eater, player, and barker.
*/

function Dog(name, energy, breed) {
  let dog = {
    name,
    energy,
    breed,
  }

  return Object.assign(
    dog,
    eater(dog),
    sleeper(dog),
    player(dog),
    barker(dog),
  )
}

const leo = Dog('Leo', 10, 'Goldendoodle')
leo.eat(10) // Leo is eating
leo.bark() // Woof Woof!
/*
Inside of Dog, we create the “instance” using a plain old JavaScript object.
Then we use Object.assign to merge the dog’s state with all of the methods a dog
should have - each defined by what a dog does, not what it is.

Now how would we create a Cat class? Earlier we defined a Cat as a sleeper, eater,
player, and meower.
*/
function Cat(name, energy, declawed) {
  let cat = {
    name,
    energy,
    declawed,
  }

  return Object.assign(
    cat,
    eater(cat),
    sleeper(cat),
    player(cat),
    meower(cat),
  )
}
/*
Now, what about a User? Earlier we ran into issues when we needed to refactor our
class structure so that users could also sleep, eat, and play. Now that we’ve
decoupled our functions from the class hierarchy, this is trivial to do.
*/
function User(email, username) {
  let user = {
    email,
    username,
    pets: [],
    friends: []
  }

  return Object.assign(
    user,
    eater(user),
    sleeper(user),
    player(user),
    adopter(user),
    friender(user),
  )
}
/*
To really test our theory, what if we wanted to give all dogs the ability to add
friends as well. This wasn’t in our initial requirement, but with composition
it’s pretty straight forward.
*/
function Dog(name, energy, breed) {
  let dog = {
    name,
    energy,
    breed,
    friends: []
  }

  return Object.assign(
    dog,
    eater(dog),
    sleeper(dog),
    player(dog),
    barker(dog),
    friender(dog),
  )
}
/*
By favoring composition over inheritance and thinking in terms of what things do
rather than what things are, you free yourself of fragile and tightly coupled
inheritance structures.

You may have noticed I’m using what we previously referred to as the
“Functional Instantiation” pattern. This is mostly for preference since we’re not
involving the prototype at all. If for some reason you really liked the this and
new keyword, you could use the following pattern.
*/
function Cat(name, energy, declawed) {
  this.name = name
  this.energy = energy
  this.declawed = declawed

  return Object.assign(
    this,
    eater(this),
    sleeper(this),
    player(this),
    meower(this),
  )
}

const charles = new Cat('Charles', 10, false)