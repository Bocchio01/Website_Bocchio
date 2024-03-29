---
title: The code of the site
description: "All the evolution that this site has undergone during its construction: the experiments, the choices made and therefore the technologies currently used."
paragraph: ["A mixture of story telling and technicalities about the code of this site and its database.",
"Starting from the first experiments with vanilla HTML and CSS, to the discovery of FrameworkJS and their potential.",
"Final touch given by the 'barbatrucchi' hidden behind the scenes :)"]
img:
  src: /v1647994993/Articoli/Il%20codice%20del%20sito/Nuxt_MySQL_logo_2.png
  alt: The code of the site
tag: [Programming]

createdAt: 2022-03-25T23:48:00Z
updatedAt: 2022-05-06T23:48:00Z
---

# The code of the site

<CMedia :s="img.src" :a="img.src"></CMedia>

## The starting knowledge

From the outset, this site was a great online laboratory for me where I could experiment with and test many of the languages, techniques and issues involved in modern web development.

To sum up briefly, it can be said that, thanks to continuous development and my incessant desire to improve, I went from having a decidedly limited knowledge of HTML and CSS, to having a much more comprehensive view of Web architectures, Frameworks, and server/client data manipulation.

**The biggest leap was definitely the move from using _'vanilla'_ languages, to the use of more structured technologies such as JavaScript frameworks, which are currently the backbone of the site.**

## First experiments

### March 2021

The first experiments had the simple aim of doing a general brush-up of the few notions I had learnt at school. For this I created simple static pages with pure HTML and CSS so to have a quick remind on the main _<\tag>_ and style attributes, as well as the correct structure to give to the DOM (Document Object Model).

```html
<html>
  <head>
    <style>
      h1 {
        text-align: center;
        background-color: orange;
        padding: 0.3em;
      }
      p.logo > a:hover {
        color: green;
        font-size: larger;
      }
    </style>
    <title>Example page</title>
  </head>

  <body>
    <h1>Tommaso's Test</h1>
    <p class="logo">
      <a href="/">Go to the home page!</a>
    </p>
  </body>
</html>
```

### April 2021

I then began trying to create what could already have been the template of the final site, even though I had not yet defined the type of content I wanted to include or the graphic layout to follow.
Obviously up to this point I have always tried as far as possible to limit myself to simple things but to build them without the help of external libraries such as JQuery or similar, thus using simple _JavaScript vanilla_. This was therefore the first approach to JS, since I had never had the opportunity to use it until now.
I then started to implement some simple database functionality as well. Fortunately, the hosting where I uploaded these experiments offered me the possibility of developing with PHP, being an Apache server. I then tried to implement a very simple forum and add a few test articles.

### June 2021

After two months of testing, I had managed to obtain a site which, although it looked like it was working 'decently', in reality I was not at all satisfied with the code side. I then tried to replace the simple vanilla JS with the potential of JQuery, which in fact brought a slight improvement in the ease of managing pages and content in general.
Apart from this small positive note, **the rest of the code had some profound criticalities due mainly to my inexperience with this type of programming and the succession of countless micro-corrections due to a project that was poorly defined from the start**.
But I knew that this was still simply a pure testing phase and that the final result was still a long way off.

The first draft of the site, the result of the experiments so far, is still online and [visible at the following link](https://bocchio.altervista.org/) as is [its repository](https://github.com/Bocchio01/Personal_web_site).

<CMedia s="/v1655593847/Articoli/Il%20codice%20del%20sito/Gif_old_site.gif" c="Welcome page of the first version"></CMedia>

So, to summarise the main criticalities/limitations encountered:

- Inability to develop the site in a modular manner;
- Not so straight process for creating new content;
- Disproportionate use of HTML, CSS, and JS, also in relation to the site's low complexity.

**I then decided to restart from scratch, but now had a clearer idea of the direction to take, both in terms of graphical style and in terms of the final goal to be given to the whole project**.

## The approach to Vue and NuxtJS

### September 2021

After the summer, I began to seriously consider using a FrameworkJS (unknown to me up to that point).
I almost automatically chose to try [VueJS](https://vuejs.org/) since even without knowing it, I could easily move around within the projects and repositories provided as examples. Its simplicity proved astounding even later in the project. After about a month of experimentation on minor projects, I came across [NuxtJS](https://v3.nuxtjs.org/) which was recommended precisely for creating websites. As soon as I downloaded it, I realised it was the most suitable framework for my needs and **began to re-develop my website from scratch**.

<CMedia s="https://www.youtube.com/embed/nhBVL41-_Cw" c="Vue Framework Overview" type="iframe"></CMedia>

### October 2021

As I was quite satisfied with the graphics already from the first version, I decided to transfer the style as it was, but restructured it now into [SCSS](https://sass-lang.com/) files. This simple change of approach led to the elimination of much of the redundant style and optimised its possible subsequent modifications. I then took advantage of the conveniences offered by the framework, to **focus more on content creation and management, using the NuxtContent module**.

### December 2021

Having then recreated all the functionality previously integrated into the first version of the site, I now began to experiment again by adding [a real database](#the-database). Having already some knowledge of PHP, I chose to create a MySQL database, taking advantage of the free hosting provided by AlterVista. In no time then **I wrote the logic and tables needed to manage authentication and analytics for each page**.

### January 2022

I began to consistently upload after each writing session, the code and updated files to the [Netlify host](https://www.netlify.com/). At a certain point, while checking that everything always worked fine, I realised that on the refresh of each article, the site breaks and an error appears in the console that seemed to be related to the actual core of the NuxtContent module. After days spent looking for unuseful information online on how to try and fix it, and knowing that the error only appeared in the version published online and never in the local version, I started going crazy. It was quite an annoying bug as it was blocking the entire site and not allowing access.
I then started to try more or less everything, until I renamed one of the article files from 'gorlu the printer.md' to 'gorlu-the-printer.md'. The bug disappeared... I'd better not comment 😡.

Having solved the fateful bug, **I thought it would have been nice to have the site multilingual** and so, taking advantage of the i18n module, I manually created the translation of each page.

### February 2022

By now satisfied with the project, I decided not to make any further changes and began to test each of the functionalities created and then launched it online.

### May 2022

After months of waiting for various reasons, I finally bought the domain name! **Bocchio.dev was officially online**.

<CMedia s="/v1657554206/Articoli/Il%20codice%20del%20sito/FuochiArtificioBocchio.png" c="Accurate representation of my state of mind :)"></CMedia>

## Main modules

Obviously **none of this structure would have been possible without the use of external resources created by other developers**. What in the field of C programming were called libraries, in the field of Web development are called modules, and among the main ones used on the site are:

- [NuxtContent](https://content.nuxtjs.org/): takes care of sorting, listing and then retrieving the content on the site when required. All the pages of the 'articles' and 'mix' sections are in fact simple markdown (.md) files which are interpreted every time needed, transformed into javascript object notation (.json) files, and then injected inside the DOM. This module is therefore of fundamental importance given the **internal content-delivery functionality** it performs.

- [NuxtImage](https://image.nuxtjs.org/): takes care of **optimising the loading of multimedia files from the external provider**. Each multimedia file (image or short video) is in fact uploaded to Cloudinary's external platform. The module then takes over the request and optimises it according to the screen size of the device. All this is operationally done by applying parameters in the url calling the resource, so that the provider returns the file resized and in the best format for the web (.webp).

- [Nuxti18n](https://i18n.nuxtjs.org/): module specially created for multilingual translation. It takes care of correctly loading all static content from the 'lang.json' file according to the selected language. It also handles the correct redirection of internal links.

- [NuxtPWA](https://pwa.nuxtjs.org/): creates a ServiceWorker file and thus offers the possibility of installing the site as a real app on both mobile and desktop. In addition, it optimises the use of cache memory, thus bringing performance to the entire project.

## The organisation of the repository

The repository is strongly influenced, as far as the organisation of the files is concerned, by the structure imposed by NuxtJS. Each folder has a specific name and purpose. Moreover, having chosen to rely on a framework that uses the logic of _component pages_, it is possible to distinguish broadly between two categories of files in the code:

The first category includes:

- The contents of the folders: _/assets - /static - /content - /i18n_
- All files in the root of the repository, and in particular the file: _nuxt.config.js_

Among those listed above, it is therefore possible to identify configuration files (needed to declare the framework setup parameters according to own preferences), style files (both .scss and classic .css), as well as static resources such as images or documents. **Particular attention should be given to the _/content_ folder, which precisely contains all the .md files relating to articles and mix pages.** As explained above, in fact, the NuxtContent module draws precisely from this folder to load the content of the various pages. This article is actually also a file saved inside the _/content_ folder.

<CMedia s="/v1657558786/Articoli/Il%20codice%20del%20sito/Repository.png" c="Project Root"></CMedia>

The second category includes the contents of the folders: _/components - /pages_

The _/components_ folder is of particular importance since it constitutes the essence of the project's skeleton as well as encapsulating the logic and motivation behind the use of a WebFramework. In fact, in the way they are structured and designed, they work in a modular manner and each page can be broken down into primary blocks, i.e. components. **Web components are blocks of code that enclose the internal structure of HTML elements, including CSS and JavaScript, and allow their related code to be applied in any position within the web page.** Each page is in fact the union of several repeated components but loaded with different content. The structure therefore remains the same (hence the modularity of the design), but the framework takes over the task of injecting the content required by the specific element each time.

## The database

**Because I also planned to activate a forum**, I needed to store data permanently and be able to retrieve it easily and immediately. In the first version of the site, I had solved this problem by saving the data on .json files which were read and written by a PHP script. Since the site, as mentioned above, is hosted on an Apache server, I was able to make changes to the files directly from the script. In this way, however, despite the fact that everything was highly automated, it was difficult to have a clear view of the contents of the forums, since the posts were not on a single file but subdivided in the various subfolders of the repo.

<CMedia s="/v1657622148/Articoli/Il%20codice%20del%20sito/MySQL-Logo.jpg" c="MySQL Logo"></CMedia>

Having started over with the entire project, I've now decided to solve the problem by using a more appropriate and suitable solution. I thus began to play with databases, and in particular with what can be considered the first step for exploring this field, namely a MySQL DB. **The host of the first version of the site, in fact, offered the service of a simple relational database easily compatible with PHP scripts.**

### Basic functionality

Having understood the structure to be given to the backend project, I began by writing code of a simple table for storing user-related data including _nickname - email - password_.

**From there, the project definitely expanded because of the fun I had in manipulating data and learning more about the techniques of interconnecting online services.**

Although I considered the PHP language to be outdated, I began to understand its potential and decided to create a real backend server, even though it was not strictly necessary for the purposes of the site.

I therefore set up the database to contain the essential data related to the forums, and then added the various customisations of colours and fonts for the registered users. In this way I was able to further deepen the management of data in the browser, as well as the use of cookies and authentication tokens.

### Analytics

Later on, once I had built up a good base with a couple of log functions useful for debugging and more, I thought of adding an external analytics service to the site out of sheer curiosity to better understand how it worked. However, given the monetary / hosting requirements, **I decided to write from scratch a simple application that would allow me to keep track of the essential data relating to the pages on the site**.

The fundamental starting point of the entire architecture is the complete distinction of the data collected according to the displayed language. When each page is opened, a request is sent from the browser to the database host containing the url of the page being viewed. At this point, a PHP script takes over the request and updates the DB fields accordingly.

The data that are saved are then those relating to the visits of each page divided according to language and the current month. Taking advantage of the _PHPlot_ library, I created a simple interface to facilitate the use / analysis of the collected data by the help of auto-generated graphs.

<CMedia s="https://bocchioutils.altervista.org/BWS/site/analytics.php?l=en&isStatistics=1" a="Analytics page" type="iframe"></CMedia>

<a href="https://bocchioutils.altervista.org/BWS/site/analytics.php?l=en&isStatistics=1" class="button" target="_blank">Visit the Analytics page</a>

The one in the image is just an example of the informations that the application collect. You can freely visit and consult this data by clicking on the button above.

Obviously, this is a very simple version of analytics compared to those used in business, but apart from have been a lot of fun to implement, it does its job very well and above all, by not saving any user-related data, it is certainly regular with respect to privacy laws.

### The backend site

By extending the page displaying the analytics data, I created a real mini-site with a page where the data could be easily and clearly retrieved from the DB tables, as well as a couple of pages with related scripts to allow users to manage a possible change or recovery of credentials.

The backend site, or as it was dubbed after the _utilities_, can be visited at [this link](https://bocchioutils.altervista.org/BWS/site/). Given the possibility of being able to easily integrate PHP scripts with a MySQL database, it is very likely that I will be placing part of my future projects that will require data storage or simply heavy processing that can only be performed server-side on this domain.

## The hidden barbatrucchi

Among what I like to call _barbatrucchi_, i.e. the **small but effective features working behind the scenes of the main site**, there is definitely the script for the so-called _OG images_ or _OpenGraph images_. Indeed, when one tries to share a site link via any social network or simply by WhatsApp message, an image appears almost immediately with the site logo and the title of the shared page underneath.

This image is generated from time to time in a totally automated manner, exploiting what are called _serveless functions_. These are in fact small pieces of code that can be executed online without necessarily having to use a proprietary server as they are immediately sent back to Amazon's servers which execute them and output the result. Each time you share a link on the site, a request is sent to this function which **generates the image with logo and page title** as in the example below.

<CMedia s="https://bocchio.dev/.netlify/functions/og-image?title=Barbatrucco!&theme=dark" c="Image generated now by the server" provider=""></CMedia>
