# react-json-beautify

[![Build Status](https://travis-ci.org/leezng/vue-json-pretty.svg?branch=master)](https://travis-ci.org/leezng/vue-json-pretty)
[![npm package](https://img.shields.io/npm/v/react-json-beautify.svg)](https://www.npmjs.org/package/react-json-beautify)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/leezng/vue-json-pretty/blob/master/LICENSE)

A react component for rendering JSON data as a tree structure.

- As a JSON Formatter
- Get item data from JSON

## Links

- [Demo](https://leezng.github.io/vue-json-pretty)
- [Github](https://github.com/leezng/vue-json-pretty)
- [NPM](https://www.npmjs.com/package/react-json-beautify)
- [中文文档](./README.zh-CN.md)

## Install

```bash
yarn add react-json-beautify
```

## Usage

```jsx
import ReactJsonBeautify from 'react-json-beautify';
import 'react-json-beautify/styles.css';

ReactDOM.render(<ReactJsonBeautify {...props} />, mountNode);
```

## Example
```
<ReactJsonBeautify
  data={data}
  deep={options.deep}
  showDoubleQuotes={options.showDoubleQuotes}
  showLength={options.showLength}
  showLine={options.showLine}
  highlightMouseoverNode={options.highlightMouseoverNode}
  collapsedOnClickBrackets={options.collapsedOnClickBrackets}
  onClick={handleClick}
/>
```

## Props

- If you are using only the normal features (JSON pretty), just focus on the `base` properties.
- If you are using higher features (Get data), you can use `base` and `higher` attributes.

| Attribute | Level | Description | Type | Default |
|-------- |-------- |-------- |-------- | -------- |
| data | normal | json data | JSON object | - |
| deep | normal | data depth, data larger than this depth will not be expanded | number | Infinity |
| showLength | normal | whether to show the length when closed | boolean | false |
| showLine | normal | whether to show the line | boolean | true |
| showDoubleQuotes | normal | whether to show doublequotes on key | boolean | true |
| highlightMouseoverNode | normal | highlight current node when mouseover | boolean | false |
| collapsedOnClickBrackets | normal | collapse control | boolean | true |
| v-model | higher | defines value when the tree can be selected | string|string[] | -, [] |
| path | higher | root data path | string | root |
| pathChecked | higher | defines the selected data path | array | [] |
| pathSelectable | higher | defines whether a data path supports selection | Function(itemPath, itemData) | - |
| selectableType | higher | defines the selected type, this feature is not supported by default | enum: multiple, single  | - |
| showSelectController | higher | whether to show the select controller at left | boolean | false |
| selectOnClickNode | higher | whether to change selected value when click node | boolean | true |
| highlightSelectedNode | higher | highlight current node when selected | boolean | true |
| onClick  | - | triggered when a data item is clicked | Function(path, data) | - |
| onChange  | - | triggered when the selected value changed (only the selectableType not null) | Function(newVal, oldVal) | - |
