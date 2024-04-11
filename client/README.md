# Frontend 

The is the frontend for SlashDave's home page

## Technology

 * [React](https://reactjs.org/) 
 * [webpack](https://webpack.js.org/)
 * [axios](https://www.npmjs.com/package/axios)

React components are implemented using [hooks](https://reactjs.org/docs/hooks-overview.html). 
Rendering code is split using lazy loading at the routing level to improve responsiveness. 
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

Production builds are send directly to the backend directory.
To build, first remove existing files:

```
> rm -rf ../backend/public/js
```

Then build:

```
> npm run build
```

For development, it is handy to use live reloading:

```
> npm run watch
```

This above does not serve the files. For that, see the ```backend``` directory.



