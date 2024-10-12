# For how to upload your contents for the blogs

This template should help get you started developing with Vue 3 in Vite.

## Node.js Required
The whole project requires `Node.js` to be installed. You can download it from [Node.js](https://nodejs.org/).

## Setting up your environments

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

## Modify Contents

You can refer to the `/docs` folder for the markdown files. Do not change anything in src, modify your router logics in `/docs/.vitepress/config.ts`. Your public assets can be added to  `/docs/public`.

### Compile and Hot-Reload for Development

```sh
npm run docs:dev
```

## Push your contents after modifying

```sh
# git pull your contents first
git add .
git commit -m "Your commit message"
git push
```
