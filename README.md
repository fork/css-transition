# CSSTransition

Apply a CSS class for each stage of a CSS transition.

This is basically a react-free rip-off of [react-transition-group](https://github.com/reactjs/react-transition-group).

It is super useful to make CSS transitions from `display: none;` to `display: whatever;`.

## Demo

There is a simple usage demo which can be run as follows:

    yarn
    yarn start

## Creating a release

Certain steps need to be done in order to create a new release:

1. Decide on a [semver](https://semver.org/spec/v2.0.0.html) version number
1. Start a new release using `git flow release start [version number]`
1. Update the `package.json` version
1. Update the `CHANGELOG.md`
1. Run `yarn build` to update `dist/index.js`
1. Commit changes: `git commit -a -m "Prepare release [version number]"`
1. Finish release using `git flow release finish`
1. Push all changes: `git push origin --all`
