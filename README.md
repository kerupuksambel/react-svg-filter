# React SVG Filter

## Overview
A pseudo-"filter" used to filter `<svg>` elements with more customization and (supposedly) better performance than using SVG's `<filter>`, using elements traversal and modification approach to filter the SVG elements individually.

## Features
- Grayscaling filter
- Colorizing (uniformize colors of each elements)
    - Option to omit colors (color)

## Usage
```
<SVGFilter>
    <svg...> // Your SVG files here
</SVGFilter> 

```

Supported props : 
- `grayscale` : Applying the grayscale filter to SVG
- `colorize` : Applying the color uniformization filter to SVG
- `colorProps`: Properties to be used if `colorize` filter activated
    - `color: string` : Color to be applied in `colorize` filter
    - `omittedColors: string[]` : Colors to be excluded from filtering when an element's color matched one of the color in this array

## TODO
- Publish to NPM + Yarn
- More filters (sepia, monochrome, etc.)
- Documentations
- Ability to embed external files