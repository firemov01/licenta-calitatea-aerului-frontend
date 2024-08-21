# Starter Template

This is a starter template for a vite react-typescript SCSS app.

<br>

## Starting App

---

You can download as zip or Create a new repo from the template and then clone that new repo down locally.

Once you have this locally on your machine open a terminal, navigate into the root directory of this project and run `npm install` or `npm i`

Once the dependencies have all installed you can run `npm run dev` to start the dev server. Follow the link to see your project in a browser. Most likely it will be `http://127.0.0.1:5173/` but check the terminal as yours could be different.

<br>

## Building App

---

Once you are ready to build the project for production run `npm run build` to create a dist folder with your production files.

You can run `npm run preview` to see your build files locally.
`http://127.0.0.1:4173/` is the default vite uses for the build server but yours could be different depending on what ports were available.

<br>

## Eslint and Prettier

---

This template uses airbnb linting rules and prettier formatting.

This should keep the project styling consistent across the project even when worked on my multiple developers.

Settings can be changed in the .eslintrc.cjs and .prettierrc.cjs files.

<br>

## Styling

---

This template includes starter scss files resembling a 7-1 architecture as well as starter files, functions, and mixins, and utiltiy classes to get your project going sooner.

src/styles contains all your scss folders and files.

Postcss is included with the `postcss-preset-env` and `@fullhuman/postcss-purgecss` plugins installed and configured.

With these plugins you will get autoprefixing, experimental or unsupported CSS feature polyfills (some complex polyfills will require additional plugins), and removal of all css classes not used in our project allowing us to create plenty of utility classes or bring in css libraries like Bootstrap without worrying about large css files.

It will also minify our css files.

A browserlist is included in the package.json that tells our project what browsers and versions we want to support when it compiles our project.
The broswerlist settings you want to use will vary by project so change this to suit your needs.

Note: vite compiles and hot reloads our dev environment in the background so you won't be able to see your compiled Javascript or CSS when running dev. If you want to know what your compiled css looks like you will need to run a build and open dist/assets/index-_randomstring_.css.

Initally this file will be minified. Resaving it should reformat it.

You can delete this dist folder after you are finished and rebuild it when needed.

<br>

## Routing

---

To handle routing the template is preinstalled with react-router-dom@6. You will find some basic routing logic already in App.tsx with a Home and NotFound route. The folder containing these route files is called views, other common names for this folder is pages or containers. Feel free to rename this folder if you (your team) prefers something else.

BrowserRouter is used by default to wrap App, but this can easily be swapped out to HashRouter if that is preferred for your project.

<br>

## Unit Testing

---

Unit testing is handled with vitest and react testing library.

A setupTests.ts file is in the src folder. This file runs before all tests.

The code inside of it allows us to use jest-dom assertions in our tests.

An App.test.tsx file is included with some basic tests.

Running your test suite can be done with `npm test`
This will watch your project and rerun your tests whenever changes are saved.

Vitest UI is installed if you would prefer to see your tests in a dashboard on your browser.

This can be done with the `npm run testui`

This will automatically open a browser window with the test dashboard.

A test coverage report can be ran using `npm run coverage`

An html report will be created in testcoverage/unit/.

## Additional Packages

___

List of packages that could be useful for your project

- Zod - typescript schema validation library

- MSW (Mock service worker) - setting up a mock server for testing

- Tanstack Query - http requests

- react-chartjs-2 - ChartJs react library