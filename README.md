8# CSXD Capstone Project

This web application is for the fulfillment of the subject Capstone Project in Computer Science at the Adamson University Midyear Term, 2024.

Created by:
* SANTOS, Hose Marco (@jmarkst)
* ALVARO, Maki Andre (@Hellr1c)
* LACSON, David Isaac (@savestate1)
* PASTRO, Josh Vincent (@jvincent2703) 

This web app is built using Flask, and uses the publicly available models provided by Ultralytics. While the COCO dataset has 80 classes, this project, for the purposes of the research, is restricted to identify only food items, specifically fruits and vegetables.

Depending on hardware, the processing time could take ten seconds to up to two full minutes.

This is an ongoing project.

# Instructions

To run this web app on your machine, please install Python version 3.9.11 first.

run the python installer and choose custom install

after pressing custom install, this screen will show just press next.

<img src="./test/Pythonnext.png"/>

after pressing next, check the boxes need in order for the website to run.

<img src="./test/Pythoncheckbox.png"/>

After installing, type this on the terminal to check if python is recognized

```
python
```
if not recognized restart your system, then type it again in the terminal to check.

after installing, install these libraries:

```
pip install ultralytics flask waitress pillow
```

**Ultralytics** - provides functionalities for using YOLO models.
**Flask** - this project's backend.
**Waitress** - used to serve Flask apps.
**Pillow** - imaging library.

To run the project, navigate to the location of the project (using `cd`), then type this on your CLI:

```
python main.py
```

Then go to your web browser, and type the URL `localhost:8080`. Depending on the speed of your machine, the actual page could take a while to be loaded.

Once loaded, upload an image. Processing time will depend on your machine.

**To test, please use the following classes:** banana, apple, sandwich, orange, broccoli, carrot, hotdog, pizza, donut, cake.

## How to use

Upload an image by clicking the button `Upload file`, then wait for a few moments. Once the message disappear, and the image still won't load, please click (or double click) the canvas to force refresh. Click `Enable zoom (experimental)` to enable zoom and pan functionality. Use mouse to move and mouse wheel to zoom.
