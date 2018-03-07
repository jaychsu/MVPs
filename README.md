da-selector
======

[![Build Status](https://travis-ci.org/jaychsu/da-selector.svg?branch=master)](https://travis-ci.org/jaychsu/da-selector)

## Component in different framework

| Framework | Repo | Code | Demo |
| :--- | :--- | :--- | :--- |
| React | [/react](./react) | [/react/component/da-selector.js](./react/component/da-selector.js) | [demo](https://jaychsu.github.io/da-selector/react/dist) |
| React (with no Webpack) | [/react-no-webpack](./react-no-webpack) | [/react-no-webpack/component/da-selector.js](./react-no-webpack/component/da-selector.js) | [demo](https://jaychsu.github.io/da-selector/react-no-webpack) |
| Vue | [/vue](./vue) | [/vue/component/da-selector.vue](./vue/component/da-selector.vue) | [demo](https://jaychsu.github.io/da-selector/vue/dist) |
| jQuery | [/jquery](./jquery) | [/jquery/da-selector.js](./jquery/da-selector.js) | [demo](https://jaychsu.github.io/da-selector/jquery) |
| Polymer | [/polymer](./polymer) | [/polymer/src/da-selector/index.html](./polymer/src/da-selector/index.html) | [demo](https://jaychsu.github.io/da-selector/polymer/build/es5-bundled) |

## Functionality

- The parent component can listen for changes.
- Be able to search option before choosing.
- To close panel if click on the outside component.

## End-to-end Testing

- [Spec](./cypress/integration/da_selector_spec.js)
