---
title: "Leniolabs brand & web redesign"
subtitle: Leniolabs brand & web redesign
description: The internal process of creating and developing our own site.
date: 2018-10-26
image: /assets/portfolio/blog-leniolabs-redesign.png
type: case-study
category: 
- branding
- case-study
- english
---

## Proposal
We wanted to build a site that reflects and communicates our identity in every way possible. We saw an opportunity to apply what we had learned in the last years, to make something personal, **unique, useful and accessible**. We also wanted to add a blog where anyone on our team could write interesting articles. The site would have to be alive and interactive, a modern Progressive Web App with a clear brand message.

## The problem
Like many small companies when they start, we couldn’t find the time to build our ideal website. For a long time, we had a simple template that we modified and pasted our logo into it. Templates are a nice and fast solution when you don’t have time or resources, but they carry some conceptual and communication problems, as **you end up adapting the content to the format**. We were not communicating our identity but filling the spaces that the template gave us.

**There was a lack of identity on our website:** it was not original, our personality was not there, it didn’t have our voice and we didn’t have complete control over the code. The same thing happened with our logo, there was no concept behind it, no clear message to communicate.

<figure>
    <img src="/portfolio/portfolio-leniolabs-redesign-02.jpg" alt=""/>
    <figcaption>Old site and logo.</figcaption>
</figure>


## First steps
### Synthesizing our message in a banner
How to summarize what we do in one sentence? How could we represent that idea with just one image? This task helped us to put a frame on what we do, what we have to offer. We started discussing **what kind of company we wanted to be and what kind of clients we wanted to have**. While looking for the best way to define our message, we began approaching the visual design and illustration styles, testing color palettes, fonts and patterns.

<figure>
    <img src="/portfolio/portfolio-leniolabs-redesign-03.jpg" alt=""/>
    <figcaption>First iterations of the banner.</figcaption>
</figure>


### Defining the structure
What elements should go to the homepage and what information should have its own section? The content of the homepage ends up defining the navigation. We started with just one wireframe to open the discussion with the team about our voice and tone, nav sections and their order in the site, our tagline and presentation. After making these primary decisions we were able to start coding and make the rest of the visual decisions from there.

<figure>
    <img src="/portfolio/portfolio-leniolabs-redesign-04.png" alt=""/>
    <figcaption>Homepage wireframe with notes.</figcaption>
</figure>

As web developers, the main place to show our logo is our website. With that in mind, we wanted to take advantage of the web platform and language. Working with the concepts above, we came up with a logo that is always active, ready to code, with a state for offline mode and an isotype for mobile home screen and favicon. We achieved that with SVG and CSS animations.

<figure class="flex-imgs">
    <img src="/portfolio/portfolio-leniolabs-redesign-05.jpg" alt="" width="180"/>
    <img src="/portfolio/portfolio-leniolabs-redesign-06.gif" alt="" width="320"/>
    <img src="/portfolio/portfolio-leniolabs-redesign-07.jpg" alt="" width="180"/>
    <figcaption>Isologo animation & isotypes.</figcaption>
</figure>


## Second Stage
### Designing with code
It was easy to move faster with all the previous definitions. We made the final visual decisions in this instance: with SASS, native variables and Google Fonts we were able to apply and test everything with a small amount of effort. It was convenient to actually see the final typography and color palette with all the elements interacting with each other. Starting with mobile first:

<figure>
    <img src="/portfolio/portfolio-leniolabs-redesign-09.png" alt=""/>
    <figcaption>Mobile screenshots.</figcaption>
</figure>


### PWA: setting the dino free!
Our site is a Progressive Web App: if your browser has support (and if you visit us often) you will be asked to download a **home screen icon** to your device. From then on you’ll have direct access to our site. You’ll be able to navigate the pages you’ve already visited without an internet connection, not to mention the benefits of a **very fast loading experience** and an **offline fallback page**.

<figure>
    <img src="/portfolio/portfolio-leniolabs-redesign-10.gif" alt=""/>
    <figcaption>Offline fallback page.</figcaption>
</figure>


Why not use **CSS grid**? A small part of our site was built using [layoutit.com/grid](https://grid.layoutit.com/) with a flexbox fallback for older browsers. CSS grid is great for layouts that are designed in two dimensions.

<figure>
    <img src="/portfolio/portfolio-leniolabs-redesign-11.gif" alt=""/>
    <figcaption>CSS grid layout.</figcaption>
</figure>

Keeping the site fresh was one of our primary goals, so we made an introduction to every page with a small CSS and SVG animation, including a contact form with user feedback.

<figure>
    <img src="/portfolio/portfolio-leniolabs-redesign-12.gif" alt=""/>
    <figcaption>SVG & CSS animations.</figcaption>
</figure>


<figure>
    <img src="/portfolio/portfolio-leniolabs-redesign-13.gif" alt=""/>
    <figcaption>Contact form with user feedback.</figcaption>
</figure>


### Accessibility matters
We took care of building our code with **semantic headings and structure**, **HTML5 tags**, **ARIA landmark roles**, **SVG titles and descriptions**, **alt tags**, **keyboard navigation** and **color contrast**.

### Performance
We reduced the weight of all our images for a better experience. We only kept the size we needed and applied compression to all files. We also added **WEBP format** for supported browsers reducing file sizes with minimal quality loss. This makes our website faster consuming less bandwidth. We used **optimized inline SVG** almost everywhere. We chose two Google Fonts, one for the site and one for the logo. As we only need 9 characters for the brand, those are the ones we ask for:

```html
<link href="https://fonts.googleapis.com/css?family=Roboto+Mono:700&text=Leniolabs" rel="stylesheet" type="text/css">
```

Our best tools to improve performance and accessibility were the ones that Chrome dev tools use for Audits ([Lighthouse](https://developers.google.com/web/tools/lighthouse/) and [axe](https://www.deque.com/axe/)), [Yellow Lab Tools](https://yellowlab.tools/), among others.

### Having fun
There are no rules for designing a 404 page, here we combined SVG and a bit of Javascript to make our robot move its eye following your every move. For our portfolio, we made responsive images with `scrset`.In smaller devices, you’ll find smaller files with the mobile version of our projects. These are shown in responsive silhouettes drawn with **CSS gradients**. We achieved that adding just one class to our `<img>` tag and one extra element for the laptop base, see the code [here](https://codepen.io/marianab/pen/VExgqm?editors=1100).

<figure>
    <img src="/portfolio/portfoliofolio-leniolabs-redesign-14.gif" alt=""/>
    <figcaption>404 error page.</figcaption>
</figure>


<figure>
    <img src="/portfolio/portfolio-leniolabs-redesign-15.gif" alt=""/>
    <figcaption>Changing image and device illustration with CSS and srcset.</figcaption>
</figure>


## Final touches and future plans
### Setting up the guidelines
This is a work in progress and will be for some time, we are building a section where anyone can download all assets and visual guidelines to our brand. It includes our logo in different versions and explains when to apply them, the styles of our site and all original files to build background covers, and links to Codepen templates ready to use.

<figure>
    <img src="/portfolio/portfoliofolio-leniolabs-redesign-16.jpg" alt=""/>
    <figcaption>Complete PDF version here.</figcaption>
</figure>

### The result
You can visit our new site at [leniolabs.com](https://www.leniolabs.com/), I hope you like it and if you have feedback, comment on this post or get in touch with us!