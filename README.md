# CSSTransition

Apply a CSS class for each stage of a CSS transition.

This is basically a react-free rip-off of [react-transition-group](https://github.com/reactjs/react-transition-group).

It is super useful to make CSS transitions from `display: none;` to `display: whatever;`.

## Demo

There is a simple usage demo which can be run as follows:

    yarn
    yarn start

## Usage

The basic idea of this library is that in order to control a CSS transition using JavaScript, you have to think of it as a three-staged process:

1. **Start:**
    - Set prerequisites for the animation, e.g. set `display: block;` and `transition: all 0.3s ease;`
1. **Active:**
    - One `requestAnimationFrame` after start
    - Change transitioning properties, e.g. set `opacity: 1;`
1. **Done:**
    - After `transitionend` or a timeout
    - Make transition changes permanent, this means usually setting the same properties as during active stage
    - During `exit`, this would be the place to set `display` back to `none`.

For a code example, please take a look at the demo.

## Tricks

-   Apply `pointer-events: none;` during `.exit` and `.exit-active` to prevent user interaction during transition
-   How to cope with the timeout warning:
    1. Make sure that a transition is happening on the element specified during instantiation, e.g. it is _not_ a parent element but the direct element on which the transitions are happening. If not, create separate `CSSTransition` instances for each element.
    1. Make sure that there is actually a transition. The instance is waiting for the first `transitionend` event.
    1. Check whether your transition takes less time than the configured timeout which is by default 500ms. If not, increase the timeout.

## Creating a release

Certain steps need to be done in order to create a new release:

1. Decide on a [semver](https://semver.org/spec/v2.0.0.html) version number
1. Start a new release using `git flow release start [version number]`
1. Update the `package.json` version
1. Run `yarn run release`
1. Commit changes: `git commit -a -m "Prepare release [version number]"`. This should automatically update `dist/index.js`
1. Finish release using `git flow release finish`
1. Push all changes: `git push origin --all && git push origin --tags`

## License

See [LICENSE](LICENSE)
