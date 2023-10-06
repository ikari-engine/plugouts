---
layout: "page"
title: "semantic-release-plugin"
parent: "1.0.0-development.10"
has_toc: false
grand_parent: "API - Reference"
has_children: false
nav_order: 2
---

# Module: semantic-release-plugin

## Table of contents

### References

- [fail](../wiki/semantic-release-plugin#fail)

### Variables

- [default](../wiki/semantic-release-plugin#default)

### Functions

- [success](../wiki/semantic-release-plugin#success)

## References

### fail

Re-exports [fail](../wiki/semantic-release-plugin.fail#fail)

## Variables

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fail` | () => `void` |
| `success` | (`_`: `unknown`, `context`: { `nextRelease`: { `version`: `string`  }  }) => `void` |

#### Defined in

[src/main/ts/semantic-release-plugin/index.ts:7](https://github.com/ikari-engine/plugouts/blob/5deff94/src/main/ts/semantic-release-plugin/index.ts#L7)

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
