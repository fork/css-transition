# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

-   **Breaking:** `CSSTransition` is now using an Object for configuration
-   **Breaking:** Package renamed into `@4rk/css-transition`
-   DOM helpers are now simplified and marked as private
-   Make documentation more helpful
-   Dependency update

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
