---
layout: "page"
title: "semantic-release-plugin/success"
parent: "@ikari-engine/plugouts"
has_toc: false
grand_parent: "API - Reference"
has_children: false
nav_order: 4
---

# Module: semantic-release-plugin/success

## Table of contents

### References

- [default](../wiki/semantic-release-plugin.success#default)

### Functions

- [success](../wiki/semantic-release-plugin.success#success)

## References

### default

Renames and re-exports [__type](../wiki/semantic-release-plugin#__type)

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

[src/main/ts/semantic-release-plugin/success.ts:10](https://github.com/ikari-engine/plugouts/blob/b1e8c84/src/main/ts/semantic-release-plugin/success.ts#L10)
