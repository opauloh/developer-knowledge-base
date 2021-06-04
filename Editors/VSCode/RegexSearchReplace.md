find: d\('(.+?)', cashOfferDictionary\) replace: cashOfferDictionary.$1

from:

```js
<FormField title={d('cashOfferFeeRate', cashOfferDictionary)} required>
```

to:

```js
<FormField title={cashOfferDictionary.cashOfferFeeRate} required>
```
