<h1 align="center">
ScrollTrackingGroup
</h1>

<div align="center">
<img src="https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white" height="18">
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" height="18">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" height="18">
</div>

<div align="center">

![ScrollTrackingGroupExample](https://user-images.githubusercontent.com/7894022/189544389-d0717e13-4a18-45b3-a526-a716afa1c8a9.gif)

</div>

## Introduction

This is a React Component that tracks the currently scrolled to section out of a group of sections, useful for things like Single Page Applications.

To install:

```cli
npm i @deathright/react-scrolltrackinggroup
```

## Composition

There are 3 components that make up the ScrollTrackingGroup:

- Container
  - This houses all other components
- Window
  - The window is used to capture the currently scrolled to section by triggering `onScrolledToChange`
  - Only a Section that overlaps with the Window can trigger the onScrolledToChange event
  - There can only be one Window in a Container
- Section
  - Sections are pieces of content, and there can be any number of them

Example:

```jsx
<ScrollTrackingGroup.Container>
  <ScrollTrackingGroup.Window />
  <ScrollTrackingGroup.Section id="s1">
    {...content}
  </ScrollTrackingGroup.Section>
  <ScrollTrackingGroup.Section id="s2">
    {...content}
  </ScrollTrackingGroup.Section>
</ScrollTrackingGroup.Container>
```

## Documentation

For in-depth documentation please see the Storybook over at the [GitHub Page](https://deathright.github.io/ScrollTrackingGroup).

I also try to keep plenty of documentation directly in the source code, which can be found [here](https://github.com/DeathRight/ScrollTrackingGroup/tree/main/src/ScrollTrackingGroup/src).
