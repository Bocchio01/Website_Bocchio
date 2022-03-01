---
title: Around the globe
description: The project Around the globe, a script for calculating azimuth angle, distances and much more between two points on the earth's surface. Why has born, his functionalities and the maths that works behind scenes explained in details.
paragraph:
  [
    "A script for calculating azimuth angle, distances and much more between two points on the earth's surface.<br>",
    "When people say that math and computer sciences aren't so far away each other...",
    "Matlab's geometries, plus the interactivities given by GeoGebra will help you to easily understand the alghoritms and the mathematics used.",
  ]
img:
  src: /v1636152274/Articoli/Around%20the%20globe/Around_the_globe_icon.jpg
  alt: Around the globe
tag: [Programming, Maths]

portalurl: /portal/around_the_globe/

createdAt: 2022-02-12T21:19:00Z
updatedAt: 2022-02-25T22:36:00Z
---

# Around the globe

<CMedia :s="img.src" :a="img.src"></CMedia>

## Introduction

This simple script is born from a real need of a friend of mine: one day he told me he wanted to create a **crossroad pole with signs indicating the most important cities in the world**. So he needed to know the azimuth with which to angle the signs so that they would be directed correctly. While writing the code, other small functions were added to give the algorithm a touch of originality. But let's start with the basics.

## The basics

The main aim was to obtain, from the geographical coordinates of two points, the azimuth between them. [The azimuth](https://en.wikipedia.org/wiki/Azimuth) is the angle formed between the imaginary line joining the two points and the meridian passing through the initial point.

<CMedia s="/v1635210809/Articoli/Around%20the%20globe/Azimut.jpg" c="Example of azimuth between two people"></CMedia>

Using basic concepts of calculus 2 course, it is possible to visualize the surface of [the Earth's geoid](https://en.wikipedia.org/wiki/Geoid) through a simple system of 3 goniometric equations. Starting from any latitude-longitude pair, i.e. polar coordinates, it is easy to derive the Cartesian coordinates, i.e. the triplet of x-y-z values, of the point considered. **Using the Cartesian coordinates it is then also easy to use operations with vectors and planes**, since the system that has just been parameterized is in fact a Euclidean space formed by the trio of elementary verses I-J-K.

In particular, in order to best represent the Earth's geoid, I decided to exploit the Hayford ellipsoid, one of the first [reference ellipsoids](https://en.wikipedia.org/wiki/Reference_ellipsoid).

<CMedia s="/v1635210809/Articoli/Around%20the%20globe/Ellissoide_Matlab.png" c="The Hayford ellipsoid represented in Matlab"></CMedia>

## The mathematics behind the algorithm

Basic concepts from the course calculus 1 applied to three-dimensional space are used to calculate the azimuth. Taking advantage of the Euclidean parameterization, we know that both the scalar product and the vector product are possible, and it is therefore natural to solve the problem in these terms.

Remembering that our objective is **the angle defined as 'NORTH - Observer - Observed Object'**, representing an example applied to a 3D sphere, we obtain the situation described in the image below.

<CMedia s="/v1635210809/Articoli/Around%20the%20globe/Azimut_matlab.png" a="Azimut_matlab"></CMedia>

But then, observing that the lines connecting 'NORTH - Observer' and 'Observer - Observed object' are nothing other than the intersections of two Cartesian planes with the sphere, it appears clear that **the azimuth searched is in fact the angle formed between these two planes: the first passing through the three points 'NORTH - Observer - Centre of the sphere', while the second passing through the three points 'Observer - Observed object - Centre of the sphere'**.

Knowing that each Cartesian plane is identified by a vector normal to the plane itself, and that the angle between two vectors can be obtained trigonometrically, then the azimuth searched has value:

<CMedia s="/v1635210809/Articoli/Around%20the%20globe/Formula_finale_azimut.png" c="p1, p2 are the normal vectors to the two Cartesian planes"></CMedia>

To get a clearer and more global understanding of the problem and its solution, it is perhaps useful to look at it in a more interactive way using GeoGebra.

<CMedia type="iframe" s="https://www.geogebra.org/3d/snm5rqfd?embed" a="GeoGebra file"></CMedia>

<a href="https://www.geogebra.org/3d/snm5rqfd" class="button" rel="nofollow noopener noreferrer" target="_blank">Online Geogebra file</a>

## The algorithm

The implementation at the algorithm level of all the mathematics explained above is done using **JavaScript** and in particular the **Math.js** library. This library offers a wide range of mathematical operators and functions, from basic trigonometry to operations with vectors and matrices and more.

After saving latitude and longitude data in an array, it converts them from degrees to radians to facilitate the use of essential trigonometric functions for later deriving the Cartesian coordinates of points.

<CMedia s="/v1635210809/Articoli/Around%20the%20globe/Algoritmo_coordinate_cartesiane.png" c="The algorithm for the changing of parameterization"></CMedia>

Next, the algorithm computes the normal vectors of the two Cartesian planes needed to calculate the azimuth. To do this it calculates, as a subtraction of the coordinates of the three reference points, two vectors that belong to the plane and, using the vector product on these, **calculates the normal vector to the Cartesian plane**. The operation is then repeated for the second Cartesian plane and **finally the angle formed between the two vectors normal to the planes is calculated**, thus obtaining the azimuth wanted.

<CMedia s="/v1635210809/Articoli/Around%20the%20globe/Algoritmo_vettore_piano.png" c="Vector normal to the plane - Calculation of the angle between vectors"></CMedia>

## Test it and have fun!

The program is obviously online and free to use. It contains, as said in the introduction, many more fun and interesting functionalities like the distance calculator and much more.<br> If you want to have a look at the code you can find it of course on GitHub at this [link](https://gist.github.com/Bocchio01/78001e29f59d98b7b22bfadb905f7175), otherwise if you prefer to try it directly, just browse the section:

<nuxt-link :to="portalurl" class="button">Portal > Around_the_globe</nuxt-link>

**Haven't you ever wondered what angle of slope you need to dig a tunnel to Tokyo? And how far would you have to dig?** The program has all the answers to your questions! Enjoy using it!
