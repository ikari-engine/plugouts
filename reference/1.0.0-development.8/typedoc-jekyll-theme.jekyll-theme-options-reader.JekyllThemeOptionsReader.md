---
layout: "page"
title: "JekyllThemeOptionsReader"
parent: "1.0.0-development.8"
has_toc: false
grand_parent: "API - Reference"
has_children: false
nav_order: 9
---

# Class: JekyllThemeOptionsReader

[typedoc-jekyll-theme/jekyll-theme-options-reader](../wiki/typedoc-jekyll-theme.jekyll-theme-options-reader).JekyllThemeOptionsReader

## Implements

- `OptionsReader`

## Table of contents

### Constructors

- [constructor](../wiki/typedoc-jekyll-theme.jekyll-theme-options-reader.JekyllThemeOptionsReader#constructor)

### Properties

- [name](../wiki/typedoc-jekyll-theme.jekyll-theme-options-reader.JekyllThemeOptionsReader#name)
- [order](../wiki/typedoc-jekyll-theme.jekyll-theme-options-reader.JekyllThemeOptionsReader#order)
- [supportsPackages](../wiki/typedoc-jekyll-theme.jekyll-theme-options-reader.JekyllThemeOptionsReader#supportspackages)
- [themeName](../wiki/typedoc-jekyll-theme.jekyll-theme-options-reader.JekyllThemeOptionsReader#themename)

### Methods

- [read](../wiki/typedoc-jekyll-theme.jekyll-theme-options-reader.JekyllThemeOptionsReader#read)

## Constructors

### constructor

• **new JekyllThemeOptionsReader**()

## Properties

### name

• **name**: `string` = `"@ikari-engine/plugouts"`

#### Implementation of

OptionsReader.name

#### Defined in

[src/main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader.ts:6](https://github.com/ikari-engine/plugouts/blob/0e7b040/src/main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader.ts#L6)

___

### order

• `Readonly` **order**: ``900``

#### Implementation of

OptionsReader.order

#### Defined in

[src/main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader.ts:7](https://github.com/ikari-engine/plugouts/blob/0e7b040/src/main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader.ts#L7)

___

### supportsPackages

• `Readonly` **supportsPackages**: ``false``

#### Implementation of

OptionsReader.supportsPackages

#### Defined in

[src/main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader.ts:8](https://github.com/ikari-engine/plugouts/blob/0e7b040/src/main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader.ts#L8)

___

### themeName

▪ `Static` `Readonly` **themeName**: ``"jekyll"``

#### Defined in

[src/main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader.ts:4](https://github.com/ikari-engine/plugouts/blob/0e7b040/src/main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader.ts#L4)

## Methods

### read

▸ **read**(`options`): `void`

Read user configuration from typedoc.json

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Options` | typedoc options |

#### Returns

`void`

#### Implementation of

OptionsReader.read

#### Defined in

[src/main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader.ts:15](https://github.com/ikari-engine/plugouts/blob/0e7b040/src/main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader.ts#L15)
