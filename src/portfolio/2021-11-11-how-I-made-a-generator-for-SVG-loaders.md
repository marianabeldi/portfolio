---
title: "How I Made a Generator for SVG Loaders With Sass and SMIL Options"
description: "While learning Vue.js, I started building free web tools that involved the exploration of SVG, with the goal of learning something about both!
subtitle: Free customizable loader generator"
date: 2021-11-11
canonicalUrl: https://css-tricks.com/how-i-made-a-generator-for-svg-loaders-with-sass-and-smil-options/
image: /assets/portfolio/blog-loaders-01.gif
type: article
category: 
- svg
- animation
- open-source
---

While learning [Vue.js](https://vuejs.org/), I started building free web tools that involved the exploration of SVG, with the goal of learning something about both! Let’s take a look at one of those tools: [a generator that makes SVG loaders](https://holasvg.com/loaders/) and lets you choose between SMIL or Sass animation, different styles, colors, shapes, and effects. It even lets you paste in a custom path or text, and then download the final SVG, copy the code, or open a demo over at CodePen.

## How it started

Three coincidences led me to build a generator for SVG loaders.

### Coincidence 1: Sarah Drasner’s book

The first time I read about Sass loops was in Sarah Drasner’s [*SVG Animations](https://www.oreilly.com/library/view/svg-animations/9781491939697/)*. She shows how to stagger animations with a Sass function (like the does in Chapter 6, “Animating Data Visualizations”).

I was inspired by that chapter and the possibilities of Sass loops.

### Coincidence 2: A GIF

At that same point in life, I was asked to replicate a “loader” element, similar to Apple’s old classic.

<figure>
    <img src="/portfolio/portfolio-loaders-02.gif" alt="">
	<figcaption>This is a mockup of the loader I was asked to make.</figcaption>
</figure>

I referenced Sarah’s example to make it happen. This is the Sass loop code I landed on:

```css
    @for $i from 1 to 12 {
      .loader:nth-of-type(#{$i}) {
        animation: 1s $i * 0.08s opacityLoader infinite;
      }
    }

    @keyframes opacityLoader {
     to { opacity: 0; }
    }
```

This defines a variable for a number (i) from 1 to 12 that increases the delay of the animation with every :nth-child element. It was the perfect use case to animate as many elements as I wanted with only two lines of Sass, saving me CSS declarations for each of the delays I needed. This is the same animation, but written in vanilla CSS to show the difference:

```css
    .loader:nth-of-type(1) {
      animation: 1s 0.08s opacityLoader infinite;
    }
    .loader:nth-of-type(2) {
      animation: 1s 0.16s opacityLoader infinite;
    }

    ...

    .loader:nth-of-type(12) {
      animation: 1s 0.96s opacityLoader infinite;
    }
    @keyframes opacityLoader {
      to { opacity: 0; }
    }
```

### Coincidence 3: An idea

With these things going on in my head, I had an idea for a *gallery* of loaders, where each loader is made from the same Sass loop. I always struggle to find these kinds of things online, so I thought it might be useful for others, not to mention myself.

I had already built this kind of thing before as a personal project, so [I ended up building a loader generator](http://holasvg.com/loaders). Let me know if you find bugs in it!

## One loader, two outputs

I was blocked by my own developer skills while creating a generator that produces the right Sass output. I decided to try another animation approach with [SMIL animations](https://css-tricks.com/guide-svg-animations-smil/), and that’s what I wound up deciding to use.

But then I received some help (thanks, ekrof!) and got Sass to work after all.

So, I ended up adding *both* options to the generator. I found it was a challenge to make both languages return the same result. In fact, they sometimes produce *different* results.

### SMIL vs. CSS/Sass

I learned quite a bit about SMIL and CSS/Sass animations along the way. These are a few of the key takeaways that helped me on my way to making the generator:

* **SMIL doesn’t rely on any external resources.** It animates SVG via presentation attributes directly in the SVG markup. That’s something that neither CSS nor Sass can do.

* **SMIL animations are preserved when an SVG is embedded as an image or as a background image.** It is possible to add a CSS <style> block directly inside the SVG, but not so much with Sass, of course. That’s why there is an option to download the actual SVG file when selecting the SMIL option in the generator.

* **SMIL animations look a bit more fluid.** I couldn’t find the reason for this (if anyone has any deeper information here, please share!). I though it was related to GPU acceleration, but it seems they both use the same animation engine.

<figure>
    <img src="/portfolio/portfolio-loaders-03.gif" alt="">
	<figcaption>SMIL (left) and Sass (right)</figcaption>
</figure>

You might notice a difference in the *chaining* of the animations between both languages:

* I used additive="sum" in SMIL to add animations one after the other. This makes sure each new animation effect avoids overriding the previous animation.

* That said, in CSS/Sass, the [W3C points out](https://www.w3.org/TR/css-animations-1/#animation-name-property) that [when] multiple animations are attempting to modify the same property, then the animation closest to the end of the list of names wins.

That’s why the order in which animations are applied might change the Sass output.

### Working with transforms

Working with transformations in the loader’s styling was a big issue. I had applied transform: rotate inline to each shape because it’s a simple way to place them next to each other in a circle and with a face pointing toward the center.

```html
  <svg>
    ...
    <use class="loader" xlink:href="#loader" transform="rotate(0 50 50)" /> 
    <use class="loader" xlink:href="#loader" transform="rotate(30 50 50)" />
    <use class="loader" xlink:href="#loader" transform="rotate(60 50 50)" />
    ...
  </svg>
```

I could declare a type in SMIL with <animateTransform> (e.g. scale or translate) to add that specific transform to the original transformation of each shape:

``` html
  <animateTransform attributeName="transform" 
    type="translate"
    additive="sum" 
    dur="1s"
    :begin="`${i * 0.08}s`"
    repeatCount="indefinite"
    from="0 0"
    to="10"
  />
```

But instead, transform in CSS was overriding any previous transform applied to the inline SVG. In other words, the original position reset to 0 and showed a very different result from what SMIL produced. That meant the animations wound up looking identical no matter what.

<figure>
    <img src="/portfolio/portfolio-loaders-04.gif" alt="">
</figure>

The (not very pretty) solution to make the Sass similar to SMIL was to place each shape inside a group (<g>) element, and apply the inline rotation to the groups, and the animation to the shapes. This way, the inline transform isn’t affected by the animation.

```html
  <svg>
    ... 
    <g class="loader" transform="rotate(0 50 50)">
     <use xlink:href="#loader" />
    </g>
    <g class="loader" transform="rotate(30 50 50)">
     <use xlink:href="#loader" />
    </g>
    ...
  </svg>
```

Now both languages have a very similar result.

## The technology I used

I used Vue.js and Nuxt.js. Both have great documentation, but there are more specific reasons why I choose them.

I like Vue for lots of reasons:

* Vue encapsulates HTML, CSS, and JavaScript as a “[single-file component](https://github.com/marianabeldi/holasvg-loaders/blob/main/components/Codes.vue)” where all the code lives in a single file that’s easier to work with.

* The way Vue binds and dynamically updates HTML or SVG attributes is very intuitive.

* HTML and SVG don’t require any extra transformations (like making the code JSX-compatible).

As far as Nuxt goes:

* It has a quick boilerplate that helps you focus on development instead of configuration.

* There’s automatic routing and it supports auto-importing components.

* It’s a good project structure with pages, components, and layouts.

* It’s easier to optimize for SEO, thanks to meta tags.

## Let’s look at a few example loaders

What I like about the end result is that the generator isn’t a one-trick pony. There’s no one way to use it. Because it outputs both SMIL and CSS/Sass, there are several ways to integrate a loader into your own project.

### Download the SMIL SVG and use it as a background image in CSS

Like I mentioned earlier, SMIL features are preserved when an SVG is used as a background image file. So, simply download the SVG from the generator, upload it to your server, and reference it in CSS as a background image.

<iframe height="300" style="width: 100%;" data-default-tab="html,result" scrolling="no" title="Hola SVG Loader SMIL - Background image CSS" src="https://codepen.io/marianab/embed/GRmpyGd?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/marianab/pen/GRmpyGd">
  Hola SVG Loader SMIL - Background image CSS</a> by Mariana Beldi (<a href="https://codepen.io/marianab">@marianab</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Similarly, we could use the SVG as a background image of a pseudo-element:

<iframe height="300" style="width: 100%;" data-default-tab="html,result" scrolling="no" title="Hola SVG Loader - SMILL + CSS + pseudo element" src="https://codepen.io/marianab/embed/bGWqLqw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/marianab/pen/bGWqLqw">
  Hola SVG Loader - SMILL + CSS + pseudo element</a> by Mariana Beldi (<a href="https://codepen.io/marianab">@marianab</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Drop the SVG right into the HTML markup

The SVG doesn’t have to be a background image. It’s just code, after all. That means we can simply drop the code from the generator into our own markup and let SMIL do its thing.

<iframe height="300" style="width: 100%;" data-default-tab="html,result" scrolling="no" title="Hola SVG Loader SMIL - Inline HTML" src="https://codepen.io/marianab/embed/PopvqEx?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/marianab/pen/PopvqEx">
  Hola SVG Loader SMIL - Inline HTML</a> by Mariana Beldi (<a href="https://codepen.io/marianab">@marianab</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Use a Sass loop on the inline SVG

This is what I was originally inspired to do, but ran into some roadblocks. Instead of writing CSS declarations for each animation, we can use the Sass loop produced by the generator. The loop targets a .loader class that’s already applied to the outputted SVG. So, once Sass is compiled to CSS, we get a nice spinning animation.

<iframe height="300" style="width: 100%;" data-default-tab="html,result" scrolling="no" title="Hola SVG Loader SASS" src="https://codepen.io/marianab/embed/dyWvdbQ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/marianab/pen/dyWvdbQ">
  Hola SVG Loader SASS</a> by Mariana Beldi (<a href="https://codepen.io/marianab">@marianab</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## I’m still working on this

My favorite part of the generator is the custom shape option where you can add text, emojis, or any SVG element to the mix:

<figure>
    <img src="/portfolio/portfolio-loaders-04.gif" alt="">
	<figcaption>Custom text, emoji, and SVG</figcaption>
</figure>

What I would like to do is add a third option for styles to have just one element where you get to work with your own SVG element. That way, there’s less to work with, while allowing for simpler outputs.

The challenge with this project is working with custom values for so many things, like duration, direction, distance, and degrees. Another challenge for me personally is becoming more familiar with Vue because I want to go back and clean up that messy code. That said, the [project is open source](https://github.com/marianabeldi/holasvg-loaders), and pull requests are welcome! Feel free to send suggestions, feedback, or even Vue course recommendations, especially ones related to SVG or making generators.

This all started with a Sass loop that I read in a book. It isn’t the cleanest code in the world, but I’m left blown away by the power of SMIL animations. I highly recommend [Sarah Soueidan’s guide](https://css-tricks.com/guide-svg-animations-smil/) for a deeper dive into what SMIL is capable of doing.

If you’re curious about the safety of SMIL, that is for good reason. There was a time when Chrome was going to entirely deprecate SMIL ([see the opening note in MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL)). But that deprecation has been suspended and hasn’t (seemingly) been talked about in a while.

[Can I use SMIL](https://caniuse.com/?search=SMIL)?
>  This article was first published on [CSS-Tricks](https://css-tricks.com/how-i-made-a-generator-for-svg-loaders-with-sass-and-smil-options/). Thanks to the edits from [Chris Coyier](https://chriscoyier.net/) and [Geoff Graham](https://geoffgraham.me/) ♥
