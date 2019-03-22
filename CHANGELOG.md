# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

-   Clean `dist/` before build
-   Use `plugin:prettier/recommended` for eslint
-   Cosmetic transition timeout warning change

## [1.0.0] - 2019-03-22

### Changed

-   **Breaking:** `CSSTransition` is now using an Object for configuration
-   **Breaking:** Package renamed into `@4rk/css-transition`
-   DOM helpers are now simplified and marked as private
-   Make documentation more helpful
-   Dependency update
-   Replace bili with babel for package cjs building, do not include build in repo

## [0.1.3] - 2018-11-21

### Added

-   LICENSE

### Changed

-   Do not show errors/warnings that may only occur during development when `NODE_ENV=production`
-   Updated dependencies
-   Compile dist bundle using bibli

## [0.1.2] - 2018-11-09

### Fixed

-   Enqueue `onTransitionEnd` class modifications into AnimationFrameQueue. This fixes a bug where occasionally the `exit-done`-class got set before the `exit-active`-class resulting in both being set.

## [0.1.1] - 2018-11-09

### Added

-   Release how-to in `README.md`
-   Transpiled ES5 UMD bundle as default main entry

### Fixed

-   `lint-staged` pre-commit hook now works

## 0.1.0 - 2018-11-07

### Added

-   Initial release!

[unreleased]: https://github.com/fork/css-transition/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/fork/css-transition/compare/v0.1.3...v1.0.0
[0.1.3]: https://github.com/fork/css-transition/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/fork/css-transition/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/fork/css-transition/compare/v0.1.0...v0.1.1
