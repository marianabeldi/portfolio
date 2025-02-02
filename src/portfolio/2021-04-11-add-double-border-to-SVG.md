---
title: "How to Add a Double Border to SVG Shapes"
description:  "I’ll explore the possibilities of three different basic shapes. Pointing the ones that can keep a transparent color in the middle of the two lines.
subtitle: Exploring 7 different ways with CSS and SVG syntax."
date: 2021-04-11
canonicalUrl: https://css-tricks.com/how-to-add-a-double-border-to-svg-shapes/
image: /assets/portfolio/blog-double-border-01.png
type: article
category: 
- svg
- community
---

Let’s say someone asks you to add a double border to some random geometric SVG shapes. For some reason, you can’t use any graphic editor — they need to be generated at runtime — so you have to solve it with CSS or within the SVG syntax.

Your first question might be: Is there anything like stroke-style: double in SVG? Well, the answer is not yet and it’s not that easy. But I’ll attempt it anyway to see what methods I can uncover. I’ll explore the possibilities of three different basic shapes: circle, rectangle, and polygon. Pointing the ones that can keep a transparent color in the middle of the two lines.

> **Spoiler alert:** all the results have their downsides, at least with CSS and SVG, but let me walk you through my intents.

## The simple solutions

These don’t work with all shapes, but they are the easiest of the solutions.

### `outline` and `box-shadow`

The CSS properties `outline` and `box-shadow` only apply to the bounding box of the shape or SVG, and so both are great solutions **only for squares and rectangles**. They also allow flexible colors using custom properties.

It only takes two lines of CSS with `outline`, plus it keeps the background color visible through the shape.

- 🙁 Solution only for one shape.
- ✅ Simple code
- ✅ Borders are smooth
- ✅ Transparent background

`box-shadow` only needs one line of CSS, but we have to **make sure that each shape has its own SVG** as we can’t apply `box-shadow` directly to the shapes. Another thing to consider is that we have to apply the color of the background in the declaration.

- 🙁 Solution only for one shape
- ✅ Simple code
- ✅ Borders are smooth
- 🙁 No transparent background

<iframe height="500" style="width: 100%;" scrolling="no" title="SVG double border with CSS" src="https://codepen.io/marianab/embed/LYxLJJr?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/marianab/pen/LYxLJJr">
  SVG double border with CSS</a> by Mariana (<a href="https://codepen.io/marianab">@marianab</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### SVG gradients

SVG radial gradients only work on circles ☺️. We can directly apply the gradient on the stroke, but it’s better to use variables as we have to declare the colors many times in the code.

- 🙁 Solution only for one shape
- ✅ Simple code
- 🙁 Borders are smooth
- 🙁 No transparent background

<iframe height="450" style="width: 100%;" scrolling="no" title="SVG double border with SVG gradients" src="https://codepen.io/marianab/embed/bGgRzNE?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/marianab/pen/bGgRzNE">
  SVG double border with SVG gradients</a> by Mariana (<a href="https://codepen.io/marianab">@marianab</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Solutions for all shapes

These will work with all shapes, but the code could become bloated or complex.

### `filter: drop-shadow()`

Finally, one solution for all shapes! We must have each shape in its own `<svg>` since the `filter` won’t apply directly to the shapes. We are using one declaration in CSS and have flexible colors using variables. The downside? The borders don’t look very smooth.

- ✅ One solution for all shapes
- ✅ Simple code
- 🙁 Borders look pixelated
- 🙁 No transparent background

<iframe height="450" style="width: 100%;" scrolling="no" title="SVG double stroke with CSS filters" src="https://codepen.io/marianab/embed/eYgRxrK?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/marianab/pen/eYgRxrK">
  SVG double stroke with CSS filters</a> by Mariana (<a href="https://codepen.io/marianab">@marianab</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### SVG filters

This is a very flexible solution. We can create a filter and add it to the shapes through SVG’s `filter` attribute. The complicated part here is the filter itself. We’ll need three paintings, one for the outside border, one for the background flood, and the last one to paint the shape on the front. The result looks better than using `drop-shadow`, but the borders are still pixelated.

- ✅ One solution for all shapes
- 🙁 Complex code
- 🙁 Borders look pixelated
- 🙁 No transparent background

<iframe height="450" style="width: 100%;" scrolling="no" title="SVG double border with SVG filters" src="https://codepen.io/marianab/embed/vYgZPBG?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/marianab/pen/vYgZPBG">
  SVG double border with SVG filters</a> by Mariana (<a href="https://codepen.io/marianab">@marianab</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Reusing shapes

There are a couple of possible options here.

#### Option 1: Transforms
This solution requires transforms. We place one figure over the other, where the main figure has a fill color and a stroke color, and the other figure has no fill, a red stroke, and is scaled and repositioned to the center. We defined our shapes on the <`defs>`. The trick is to **translate half of the `viewBox` to the negative space** so that, when we scale them, we can do it from the center of the figure.

- ✅ One solution for all shapes
- 🙁 Duplicated code
- ✅ Borders are smooth
- ✅ Transparent background

<iframe height="450" style="width: 100%;" scrolling="no" title="SVG double border - use and translate" src="https://codepen.io/marianab/embed/poRwYPQ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/marianab/pen/poRwYPQ">
  SVG double border - use and translate</a> by Mariana (<a href="https://codepen.io/marianab">@marianab</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

#### Option 2: `<use>`
I found a [clever solution](http://schepers.cc/svg/double-stroke2.svg) in the [www-svg mailing list](https://lists.w3.org/Archives/Public/www-svg/2013Jan/0005.html) by Doug Schepers that uses SVG `<use>`. Again, it requires defining the shapes once and referring to them twice using `<use>`. This time the main shape has a bigger stroke. The second shape has half the stroke of the main shape, no fill, and a stroke matching the background color.

- ✅ One solution for all shapes
- 🙁 Duplicated code
- ✅ Borders are smooth
- 🙁 No transparent background

<iframe height="450" style="width: 100%;" scrolling="no" title="SVG double border - use and translate" src="https://codepen.io/marianab/embed/poRwYPQ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/marianab/pen/poRwYPQ">
  SVG double border - use and translate</a> by Mariana (<a href="https://codepen.io/marianab">@marianab</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Here are the full results!
Just so you have them all in one place. Let me know if you can think of other possible solutions!

<figure>
<table class="table-simple"><thead><tr><th>Solution</th><th>All shapes</th><th>Simple code</th><th>Smooth borders</th><th>Transparent background</th></tr></thead><tbody><tr><td><code><strong><a href="https://codepen.io/marianab/pen/LYxLJJr">outline</a></strong></code></td><td>🙁</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><code><strong><a href="https://codepen.io/marianab/pen/LYxLJJr">box-shadow</a></strong></code></td><td>🙁</td><td>✅</td><td>✅</td><td>🙁</td></tr><tr><td><strong><a href="https://codepen.io/marianab/pen/bGgRzNE">SVG gradients</a></strong></td><td>🙁</td><td>✅</td><td>🙁</td><td>🙁</td></tr><tr><td><code><strong><a href="https://codepen.io/marianab/pen/eYgRxrK">filter:&nbsp;drop-shadow()</a></strong></code></td><td>✅</td><td>✅</td><td>🙁</td><td>🙁</td></tr><tr><td><strong><a href="https://codepen.io/marianab/pen/vYgZPBG">SVG filters</a></strong></td><td>✅</td><td>🙁</td><td>🙁</td><td>🙁</td></tr><tr><td><strong><a href="https://codepen.io/marianab/pen/poRwYPQ">Reusing shapes:<br>Tranforms</a></strong></td><td>✅</td><td>🙁</td><td>✅</td><td>✅</td></tr><tr><td><strong><a href="https://codepen.io/marianab/pen/JjEJzBK">Reusing shapes:<br><code>&lt;use&gt;</code></a></strong></td><td>✅</td><td>🙁</td><td>✅</td><td>🙁</td></tr></tbody></table></figure>

> This article was first published on [CSS-Tricks](https://css-tricks.com/how-to-add-a-double-border-to-svg-shapes/) with edits from [Chris Coyier](https://chriscoyier.net/) and [Geoff Graham](https://geoffgraham.me/) ♥
