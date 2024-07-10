# CXD Capstone Project

This web application is for the fulfillment of the subject Capstone Project in Computer Science at the Adamson University Midyear Term, 2024.

Created by:
* SANTOS, Hose Marco (@jmarkst)
* ALVARO, Maki Andrei (@Hellr1c)
* LACSON, David Isaac (@savestate1)
* PASTRO, Josh Vincent

This web app is built using Flask, and uses the publicly available models provided by Ultralytics. While the COCO dataset has 80 classes, this project, for the purposes of the research, is restricted to identify only food items, specifically fruits and vegetables.

Depending on hardware, the processing time could take ten seconds to up to two full minutes.

This is an ongoing project.

# Instructions

To run this web app on your machine, please install Python first.

After installing, install these libraries:

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
