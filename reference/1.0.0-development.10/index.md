---
layout: "page"
title: "index"
parent: "1.0.0-development.10"
has_toc: false
grand_parent: "API - Reference"
has_children: false
nav_order: 1
---

# Module: index

## Table of contents

### References

- [JekyllTheme](../wiki/index#jekylltheme)
- [JekyllThemeOptionsReader](../wiki/index#jekyllthemeoptionsreader)
- [fail](../wiki/index#fail)
- [load](../wiki/index#load)

### Functions

- [success](../wiki/index#success)

## References

### JekyllTheme

Re-exports [JekyllTheme](../wiki/typedoc-jekyll-theme.jekyll-theme.JekyllTheme)

___

### JekyllThemeOptionsReader

Re-exports [JekyllThemeOptionsReader](../wiki/typedoc-jekyll-theme.jekyll-theme-options-reader.JekyllThemeOptionsReader)

___

### fail

Re-exports [fail](../wiki/semantic-release-plugin.fail#fail)

___

### load

Re-exports [load](../wiki/typedoc-jekyll-theme.load#load)

## Functions

### success

▸ **success**(`_`, `context`): `void`

Called when the release succeeds.
Outputs variables to be used by other GitHub actions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_` | `unknown` | semantic-release configuration (unused) |
| `context` | `Object` | semantic-release context |
| `context.nextRelease` | `Object` | - |
| `context.nextRelease.version` | `string` | - |

#### Returns

`void`

#### Defined in

[src/main/ts/semantic-release-plugin/success.ts:10](https://github.com/ikari-engine/plugouts/blob/5deff94/src/main/ts/semantic-release-plugin/success.ts#L10)
