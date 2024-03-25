// Can you guess what is the problem with this sorting?

const people = [
  { firstName: 'Aaron', lastName: 'Smith' },
  { firstName: 'Émile', lastName: 'Zola' },
  { firstName: 'Charlotte', lastName: 'Brown' },
  { firstName: 'Beyoncé', lastName: 'Knowles' },
  { firstName: 'Ólafur', lastName: 'Arnalds' },
  { firstName: 'David', lastName: 'Jones' },
  { firstName: 'Zoë', lastName: 'Deschanel' },
];

function sortAlphabetically(arr) {
  return arr.sort((a, b) => {
    if (a.firstName < b.firstName) {
      return -1;
    }

    if (a.firstName > b.firstName) {
      return 1;
    }

    return 0;
  });
}

sortAlphabetically(people);

// The problem is, By default, string comparison in JavaScript
// is not language-sensitive (meaning it doesn’t take into account
// language-specific rules or special characters like accents),
// which results in the sorted list not being in the correct order.

// output:
// [
//   {
//       "firstName": "Aaron",
//       "lastName": "Smith"
//   },
//   {
//       "firstName": "Beyoncé",
//       "lastName": "Knowles"
//   },
//   {
//       "firstName": "Charlotte",
//       "lastName": "Brown"
//   },
//   {
//       "firstName": "David",
//       "lastName": "Jones"
//   },
//   {
//       "firstName": "Zoë",
//       "lastName": "Deschanel"
//   },
//   {
//       "firstName": "Émile",
//       "lastName": "Zola"
//   },
//   {
//       "firstName": "Ólafur",
//       "lastName": "Arnalds"
//   }
// ]

// The solution is to leverage Intl.Collator which enables
//  language-sensitive string comparison.

function sortAlphabetically(arr) {
  const collator = new Intl.Collator('en', { sensitivity: 'base' });
  return arr.sort((a, b) => collator.compare(a.firstName, b.firstName));
}

sortAlphabetically(people);
