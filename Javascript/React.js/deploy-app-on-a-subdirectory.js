/*
Deploy App on a subdirectory
If you want to deploy App on a Subdirectory such as
https://myapp.com/directory-name

You can deploy app on a subdirectory using 2 methods

Set the base name basename

Set the app homepage in package.json

1 > Set the base name
*/
<Router basename={'/directory-name'}>
    <Route path='/' component {Home} />
  ...
</Router>
/*
Setting the basename attribute on the <Router /> component tells React Router that the app will be served from a subdirectory
*/

/*
2 > Set the app homepage in package.json
In package.json file, set the property homepage
npm run build command comes from creact-react-app and npm run build use homepage property to make sure the production build points to the correct location
By default, CRA (Create React App) products a build assuming your app is hosted at the server root

To override this, specify the homepage in your packge.json:

"homepage" : "http://mywebsite.com/relativepath"
*/
