# Frontend 

The is the frontend for SlashDave's home page

## Technology

 * [React](https://react.dev/)
 * [Vite](https://vite.dev/)
 * [axios](https://www.npmjs.com/package/axios)

Some content is rendered client-side using Markdown and
the [react-markdown](https://github.com/remarkjs/react-markdown)
package.

## UI

This web page is a faithful port from various versions implemented
years ago. As such, it has it's own unique UI style, and does not
depend on any third-party css framework. Responsive web design is implemented
using some very simple media types. Icons are taken from
[font awesome](https://fontawesome.com/).

One item that has been updated is the main web font, which is now pulled
from Google's API.

## File organization

This is a relatively simple site. All jsx source files can be found
at the top level in ```src```. Static source files can be found
in various subdirectories (```css```, ```image```, ```text```).

## Building

Production builds are sent directly to the backend directory
(```../backend/public/js```), replacing whatever was there before:

```
> npm run build
```

For development, it is handy to use live reloading:

```
> npm run watch
```

This rebuilds on every change, but does not serve the files. For that, see the ```backend``` directory.

To inspect bundle sizes (opens a treemap in the browser):

```
> npm run profile
```
