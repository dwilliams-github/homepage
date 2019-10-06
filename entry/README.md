# Database Entry app

Since there is only one author for this web site, there is no reason to
saddle the public facing client with support for updating the database.

Instead, I figured it would be fun to learn how to build a JS app using electron.

## Some architecture decisions

* I'm going to stick with npm, mostly because I don't feel like sending package
information to Facebook. For more information on Yarn vs npm, see, for example:

  https://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/

* I have learned to really like ES6 and JSX, so I am going to stick with webpack,
babel, and react.

* It might have be fun to invoke mongoose directly inside the web app, but that isn't
really possible, or at least not easy, because mongoose and webpack do not mix.
Instead, run an express server in an electron thread.

* Some suggest running threads in an electron thread in a render process, but,
actually, why would we do this? Electron is a full node.js application, so just
use normal thread methods (cluster) for our data serving stuff.

* The front-end uses webpack and react, which is pretty foreign to electron.
It would be a bad idea to mix and match packages, so the front-end and electron
app have separate package directories.

* I decided to use blueprintjs in this app, just to try another css platform.
I haven't bothered to make the app very pretty, just functional.

## Todo

* Might be educational to learn to package this, eventhough it's only for personal use.
