/*
Structural typing is beneficial when you're writing tests. Say you have a function 
that runs a query on a database and processes the results:
*/

interface Author {
  first: string;
  last: string;
}

function getAuthorsA(database: PostgresDB): Author[] {
  const authorRows = database.runQuery('SELECT FIRST, LAST FROM AUTHORS');
  return authorRows.map((row) => ({
    first: row[0],
    last: row[1],
  }));
}

/*
To test this, you could createa mock PostgresDB. But a better approach is to use
structural typing and define a narrower interface:
*/
interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthorsB(database: DB): Author[] {
  const authorRows = database.runQuery('SELECT FIRST, LAST FROM AUTHORS');
  return authorRows.map((row) => ({
    first: row[0],
    last: row[1],
  }));
}

/*
You can still pass getAuthors a PostgresDB in production since it has a runQuery method.
Because of structural typing, the postgresDB doesn't need to say that it implements DB.
Typescript Will figure out that it does
*/

test('getAuthors', () => {
  const authors = getAuthorsB({
    runQuery(sql: string) {
      return [
        ['Toni', 'Morrison'],
        ['Luni', 'Luri'],
      ];
    },
  });
  expect(authors).toEqual([
    { first: 'Toni', last: 'Morrison' },
    { first: 'Luni', last: 'Luri' },
  ]);
});
/*
Typescript will verify that our test DB conforms to the interface.
And your tests don't need to know anything about your production database: no mocking
libraries necessary! By introducing an abstraction (DB), we've freed our logic (and tests)
from the details of a specific implementation (PostgresDB)
*/
