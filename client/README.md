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

For development, run the backend and the Vite dev server together:

```
> npm run dev
```

and browse to http://localhost:5173. Edits appear instantly (hot module
replacement). API calls and backend-hosted files (```/api```, ```/public```)
are proxied to the backend on port 8080; set ```BACKEND_URL``` to change that.

Production builds, including ```index.html```, are sent directly to the
backend directory (```../backend/public/js```), replacing whatever was there before:

```
> npm run build
```

To inspect bundle sizes (opens a treemap in the browser):

```
> npm run profile
```
