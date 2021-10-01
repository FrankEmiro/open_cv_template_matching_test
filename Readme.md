# OpenCV template matching test in multiple computers for Lucas

## Install

Download the code in your local computer and run

```
npm install

```

once all modules are installed you can run

```
node index.js

```

you should see a result similar to:

```
[
  {
    x: 581,
    y: 55,
    pointA: Point { x: 581, y: 55 },
    pointB: Point { x: 752, y: 89 },
    center: { x: 666.5, y: 72 }
  }
]

```

Basically these are the coordinates of the template image matched in the screenshot image, both in assets folder

If the result match this you can try change the image inside the screenshot folder, replacing my screenshot of google map website with your computer screenshot of google map website, you can try both with Windows and Ubuntu.

The screesnhot is being taken from [a link like this](https://www.google.com/maps/place/The+Speakeasy+Irish+Bar/@25.0262552,121.5283144,14z/data=!4m9!1m2!2m1!1sbar!3m5!1s0x3442abc99f364691:0x2d02ee1118bfd97d!8m2!3d25.0345677!4d121.5573075!15sCgNiYXJaBSIDYmFykgEDYmFy!10m2!1e1!2e1) , is a google map result page, once you go to the link of google map click on the button with the text (in english ): _Change name or other details_ and do a screenshot.

Run again index.js and see if the reuslt are the same, both for Windows and ubuntu
