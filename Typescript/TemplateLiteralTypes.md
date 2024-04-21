# Template Literal Types

Docs: https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype

Template literal types are a new feature in TypeScript 4.1 that allow you to create new types by concatenating
strings.

**Basic example**

```ts
type World = 'world';
type Greeting = `hello ${World}`;
```

**Example with conditional types**

```ts
type Color = 'red' | 'blue';
type Quantity = 'one' | 'two';
type SeussFish = `${Quantity | Color} fish`;
```

**Advanced example checking if route starts with "/"**

```ts
type Route = `/${string}`;

export const goToRoute = (route: Route) => {};

// Should succeed:

goToRoute('/users');
goToRoute('/');
goToRoute('/admin/users');

// Should error:
goToRoute('users/1'); // Argument of type '"users/1"' is not assignable to parameter of type '`/${string}`'.

goToRoute('http://facebook.com'); // Argument of type '"http://facebook.com"' is not assignable to parameter of type '`/${string}`'.
```

## Using Template Literal with Extract

```ts
type Routes = '/users' | '/users/:id' | '/posts' | '/posts/:id';

// Extract all dynamic routes
type DynamicRoutes = Extract<Routes, `${string}:${string}`>;

const dymamicRoute: DynamicRoutes = '/users/:id'; // Ok
const dymamicRoute: DynamicRoutes = '/posts/:id'; // Ok
const dymamicRoute: DynamicRoutes = '/users'; // Error
```

## Passing Unions Into Template Literals

```ts
type BreadType = 'rye' | 'brown' | 'white';

type Filling = 'cheese' | 'ham' | 'salami';

type Sandwich = `${BreadType} sandwich with ${Filling}`;

// or you can also do:
type SandwichOrBaguette = `${BreadType} ${"sandwich" | "baguette"} with ${Filling}`;

const sandwiches = Sandwich[] =
[
  'rye sandwich with cheese'
  'rye sandwich with ham',
  'rye sandwich with salami',
  'brown sandwich with cheese',
  'brown sandwich with ham',
  'brown sandwich with salami',
  'white sandwich with cheese',
  'white sandwich with ham',
  'white sandwich with salami',
];
```

> > > Note: there's a limit of 10000 concatenations in a template literal type.

## Create an Object Whose Keys Are Derived From a Union

```ts
type TemplateLiteralKey = `${'user' | 'post' | 'comment'}${'Id' | 'Name'}`;

type ObjectOfKeys = Record<TemplateLiteralKey, string>;

const obj: ObjectOfKeys = {
  userId: '1',
  userName: 'test',
  postId: '1',
  postName: 'test',
  commentId: '1',
  commentName: 'test',
};
```

## Real use case

Check Mattermost
[cloud.ts](https://github.com/mattermost/mattermost-webapp/blob/e4b43847e46285335e47150b86ac436216967791/packages/types/src/cloud.ts)
types

```ts
export const TypePurchases = {
  firstSelfHostLicensePurchase: 'first_purchase',
  renewalSelfHost: 'renewal_self',
  monthlySubscription: 'monthly_subscription',
  annualSubscription: 'annual_subscription',
} as const;

// The MetadataGatherWireTransferKeys is a union type created by passing several TypePurchases into a template literal.
export type MetadataGatherWireTransferKeys = `${ValueOf<typeof TypePurchases>}_alt_payment_method`;

/* Hovering we can see:
type MetadataGatherWireTransferKeys =
  | "first_purchase_alt_payment_method"
  | "refewal_self_alt_payment_method"
  | "monthly_subscription_alt_payment_method"
  | "annual_subscription_alt_payment_method"
*/

// The CustomerMetadataGatherWireTransfer is a partial record of the MetadataGatherWireTransferKeys.
export type CustomerMetadataGatherWireTransfer = Partial<Record<MetadataGatherWireTransferKeys, string>>;

// Here’s the final product, which is then used throughout the application:
/*
type CustomerMetadataGatherWireTransfer = {
  first_purchase_alt_payment_method?: string | undefined;
  refewal_self_alt_payment_method?: string | undefined;
  monthly_subscription_alt_payment_method?: string | undefined;
  annual_subscription_alt_payment_method?: string | undefined;
};
*/
```

This is a great example of how transformation techniques can help you create useful types with minimal code
and maximum inference!
