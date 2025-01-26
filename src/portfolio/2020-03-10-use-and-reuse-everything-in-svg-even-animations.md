---
title: "How to use and reuse everything in SVG… even animations"
description: If you are familiar with SVG and CSS animations, here are few tips to keep in mind that will help you to build, optimize, and improve your code base.
subtitle: Build and optimize SVG and CSS animations.
date: 2020-03-10
canonicalUrl: https://css-tricks.com/use-and-reuse-everything-in-svg-even-animations/
image: /assets/portfolio/blog-use-and-reuse-01.png
type: article
category: 
- svg 
- css
- tutorial
- english
---

<div class="separator" aria-hidden="true">***</div>

If you are familiar with SVG and CSS animations and starting to work with them often, here are some ideas you might want to keep in mind before jumping into the next job. This article will be about learning how to build and optimize your code with **the `<use>` element, CSS Variables and CSS animations**.

<video autoplay="" controls="" loop="" src="https://css-tricks.com/wp-content/uploads/2020/01/cubes.mp4" name="fitvid0"></video>

## Part 1: The SVG <use> element
If you are a developer that likes to keep your code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) or a big fan of Sass/CSS variables, there is a good chance that you will like this tag.

Let's say you have an element that is repeated many times in your graphic. Instead of having a complex part of your code repeated many times in your SVG, you can define this part once and then clone it somewhere else in your document with the `<use>` element. This will not only reduce an enormous amount of code but also will make your markup simpler and easier to manipulate.

To start implementing the `<use>` element, go to your SVG and follow these steps:

1. Identify the part of the code that you want to clone
2. Add an ID to that part
3. Link it inside your `<use>` tag like this: `<use xlink:href="#id"/>`

That's it! Your new clone is ready, now you can change its attributes (e.g. `x` and `y` position) to fit your needs.

### Let's dive into a very convenient example
I want to share this real case where I needed to animate a big cube made of little cube units. (Imagine the classic [Rubik's Cube](https://www.rubiks.com/en-us/).)

We'll start by drawing the cube unit in SVG using basic shapes and transforms:

```html
<svg viewBox="-130 -20 300 100">   
 <g id="cube">     
  <rect width="21" height="24" transform="skewY(30)"/>     
  <rect width="21" height="24" transform="skewY(-30) translate(21 24.3)"/>     
  <rect width="21" height="21"  transform="scale(1.41,.81)   rotate(45) translate(0 -21)"/>   
 </g> 
</svg>
```

<iframe width="100%" height="300" scrolling="no" title="1. Cube unit with SVG shapes and transforms" src="https://codepen.io/marianab/embed/XWWQbYP?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/marianab/pen/XWWQbYP'>1. Cube unit with SVG shapes and transforms</a> by Mariana
  (<a href='https://codepen.io/marianab'>@marianab</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Note that the shapes are grouped in a `<g>` element so we can add the `ID` to the whole figure.

Next, let's build a bigger cube cloning this unit. First, we need to wrap the cube from the previous example inside the `<defs>` tag inside the SVG. In the `<defs>` element we can put whatever we want to reuse, which could be a single shape, a group, a gradient.. almost any SVG element. They won't render anywhere unless we use them outside this tag.

Then we can link the unit as many times as we want using its ID and change the `x` and `y` position on every clone like this:

```html
<use xlink:href="#cube" x="142" y="124"/> 
<use xlink:href="#cube" x="100" y="124"/> 
<!-- ... -->
```

<iframe width="100%" height="300" scrolling="no" title="2. Big cube reusing content SVG &lt;use&gt;" src="https://codepen.io/marianab/embed/wvvZXqG?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/marianab/pen/wvvZXqG'>2. Big cube reusing content SVG &lt;use&gt;</a> by Mariana
  (<a href='https://codepen.io/marianab'>@marianab</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


Now we have to position every cube remembering that the last element will appear at the front, after that, we'll have our first big cube ready!

> *`xlink:href` is deprecated since SVG2, but it is better to use it for compatibility purposes. In modern browsers, you can just use `href` but I tested it on Safari and at the time of writing is not working there. If you use `xlink:href` make sure you include this namespace in your SVG tag: `xmlns:xlink="http://www.w3.org/1999/xlink"` (you won't need it if you decide to use `href`).*


<div class="separator" aria-hidden="true">***</div>

## Part 2: Using CSS variables to apply different styles to your reused graphic
I chose a main color for the cube, which is a lighter and a darker shade for the sides and a stroke color. But what if we want to make a second cube a different color?

We can replace the fills and strokes with CSS variables to make these attributes more flexible. That way, we'll be able to reuse the same cube unit with another palette (instead of defining a second unit with different colors for a second cube).

Why not add a class to the new cube and change the fill color with CSS? We'll do that, but first, try to inspect a `<use>` element. You'll notice it renders in the Shadow DOM, which means it is not vulnerable to scripts and styles, like elements in the normal DOM. Whatever values you define in the figure inside `<defs>` will be inherited by all its instances and you won't be able to rewrite those with CSS. But if you replace those values with variables, then you'll be able to [control them in CSS](https://tympanus.net/codrops/2015/07/16/styling-svg-use-content-css/).

In our cube unit, we'll go through each side and replace the fill and stroke values with semantic variable names.

For example, this:

```html
<rect fill="#00affa" stroke="#0079ad" />
```

…can be replaced with this:

```html
<rect fill="var(--mainColor)" stroke="var(--strokeColor)" />
```

From here, we must duplicate the SVG to build a second cube. However, we don't need to duplicate `<defs>` if we are keeping both in the same document. We can add a class to each SVG and control the color palette through CSS, redefining the values of the variable.

Let's create a palette for the blue cube and another one for the pink cube:

```css
.blue-cube {   
 --mainColor: #009CDE;   
 --strokeColor: #0079ad;   
 --lightColor: #00affa;   
 --darkColor: #008bc7; 
}  
.pink-cube {   
 --mainColor: #de0063;   
 --strokeColor: #ad004e;   
 --lightColor: #fa0070;   
 --darkColor: #c7005a; 
}
```

<iframe width="100%" height="300" scrolling="no" title="3. Duplicating big cube with SVG &lt;use&gt; and CSS variables" src="https://codepen.io/marianab/embed/gOOJQmw?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/marianab/pen/gOOJQmw'>3. Duplicating big cube with SVG &lt;use&gt; and CSS variables</a> by Mariana
  (<a href='https://codepen.io/marianab'>@marianab</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

This way, we can add as many cubes as we want and change all colors from one place.

<div class="separator" aria-hidden="true">***</div>

## Part 3: Reusing animations
The idea for this instance is to break the cubes on hover - something like an exploded view so some pieces will move away from the center when we place the cursor over the cubes.

<iframe width="100%" height="300" scrolling="no" title="4. Big cubes animation with SVG &lt;use&gt; and CSS variables" src="https://codepen.io/marianab/embed/KKKYdxE?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/marianab/pen/KKKYdxE'>4. Big cubes animation with SVG &lt;use&gt; and CSS variables</a> by Mariana
  (<a href='https://codepen.io/marianab'>@marianab</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Let's start by defining two movements, one for each axis: `move Y` and `move X`. By dividing the animations into movements, we'll be able to reuse them in every cube. The animations will consist of moving the cube from its initial position to 30px or 50px away in one direction. We can use a transform translate (`X` or `Y` ) to achieve that. 

For example:

```css
@keyframes moveX {   
 to { transform: translateX(-35px); } 
}
```

But if we want to be able to reuse this animation, it's better to replace the numeric value with a variable, like this:

```css
@keyframes moveX {   
 to { transform: translateX(var(--translate, 35px)); } 
}
```

If the variable is not defined, the default value will be 35px.

Now we need at least one class to bind to the animation. In this case, though, we need two classes to move cubes in the x-axis: `.m-left` and `.m-right`.


```css
.m-left, .m-right {    
 animation: 2s moveX alternate infinite;  
}
```

For the cube to move left, we need a negative value, but we can also declare a different number. We can define our variable like this inside the `.m-left` class:


```css
.m-left { --translate: -50px; }
```

What's happening here is we're declaring that when we add the class `.m-left` to one element, this will play the animation `moveX` (the one defined in the `@keyframes`) which will last two seconds to translate in the x-axis and reach a new position that is -50px left. Then, the animation alternates directions so that it moves from the last position and take two more seconds to go to its original state. And so on, because it's an infinite loop.

We can declare another variable to the `.m-right` class but if we don't, remember that it will take the 35px we declared at the beginning.

The default `animation-play-state` value is `running` but maybe we don't want the cubes to move all the time. It would be very distracting and annoying to use on a site with some nearby content. So, let's try to play the animation only on hover by adding this:


```css
svg:hover .m-left {
 animation: 2s moveX alternate infinite; 
}
```

You can try it by yourself and will find that the animation is jumping super fast to the initial state every time we place the cursor out of the cube. To avoid it, we can add the value `paused` at the end of the animation shorthand:


```css
.m-left {   
 animation: 2s moveX alternate infinite paused; 
}
```

Now the animation is paused but will be running on hover by adding this line of CSS:


```css
svg:hover * {
 animation-play-state: running;
}
```

We can apply each class to different elements in the SVG. In the first blue cube, we are moving single cubes; in the second one, we're applying those classes to groups of cubes.


### One last thing…
It wasn't until later that I realized I could reuse a single unit to build them all. I worked on the small cube to make it isometric enough so it could align easily with the other ones next to it. At this point, my unit was a `<path>` but I decided to replace it with SVG shapes to reduce the code and get cleaner markup.

I learned that it is better to take some time to analyze what can be done with SVG before drawing every single shape and dealing with a huge amount of code. It might take more time in the beginning but will save you a lot of time and effort in the long run.

> This article was first published on [CSS-Tricks](https://css-tricks.com/use-and-reuse-everything-in-svg-even-animations/) with edits from [Chris Coyier](https://chriscoyier.net/) and [Geoff Graham](https://geoffgraham.me/)