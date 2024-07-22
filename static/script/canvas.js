// yung canvas element.
const canvas = document.getElementById("viewer");
const toggle = document.getElementById("zoomtoggle");
const context = canvas.getContext('2d');

let MODE = "upload"; // upload, takephoto, video

let isZoom = false;

// coco classes sa nutrition dataset
const coco = [ {
    'apple': 1309,
    'orange': 2337,
    'cake': 4052,
    'donut': 5489,
    'pizza': 3477,
    'hot dog': 1125,
    'carrot': 584,
    'broccoli': 532,
    'sandwich': 964,
    'banana': 613
} ]

context.imageSmoothingEnabled = false;
const img = new Image();
let file;
let boxes;

let isDragging = false;
let dragStartPosition = { x: 0, y: 0 };
let currentTransformedCursor;

function update_canvas (fl, bx) {
    file = fl;
    boxes = bx;
    img.src = URL.createObjectURL(fl);
    img.onload = () => {
        const aspectRatio = img.width / img.height;
        const maxWidth = 400; // Replace with your desired maximum width

        if (aspectRatio > 1) {
            canvas.width = maxWidth;
            canvas.height = maxWidth / aspectRatio;
        } else {
            canvas.height = maxWidth;
            canvas.width = maxWidth * aspectRatio;
        }
        drawImageToCanvas(fl, bx);
        context.save();
    }
    //enableZoom(true)
}

function drawImageToCanvas (file, boxes) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imageWidth = img.width;
    const imageHeight = img.height;

    // Calculate offsets for centering the image
    const offx = (canvasWidth - imageWidth) / 2;
    const offy = (canvasHeight - imageHeight) / 2;
    //context.drawImage(img, 0, 0);
    draw_image_and_boxes(file, boxes, offx, offy)
}

function draw_image_and_boxes (file, boxes, offsetX = 0, offsetY = 0) {
    //context.drawImage(img, 0, 0);
    context.strokeStyle = "#00FF00";
    context.lineWidth = 3;
    context.font = "18px serif";
    context.drawImage(img, 0, 0);
    context.save();
    //const currentOpacity = context.globalAlpha;
    //context.globalAlpha = currentOpacity === 1 ? 0.99 : 1;
    //context.drawImage(img, 0, 0);
    boxes.forEach(([ x1, y1, x2, y2, label ]) => {
        if (label in coco[0]) {
            console.log(label + " found.")
            x1 = Math.round(x1);
            x2 = Math.round(x2);
            y1 = Math.round(y1);
            y2 = Math.round(y2);
            context.strokeRect(x1, y1, x2 - x1, y2 - y1);
            context.fillStyle = "#00ff00";
            const width = context.measureText(label).width;
            context.fillRect(x1, y1, width + 10, 25);
            context.fillStyle = "#000000";
            context.fillText(label, x1, y1 + 18);
        } else {
            console.log(label + " found but not included")
        }
    });
    //context.globalAlpha = currentOpacity;
    context.restore();
}

function getTransformedPoint (x, y) {
    const originalPoint = new DOMPoint(x, y);
    return context.getTransform().invertSelf().transformPoint(originalPoint);
}

function onMouseDown (event) {
    isDragging = true;
    dragStartPosition = getTransformedPoint(event.offsetX, event.offsetY);
}

function onMouseMove (event) {
    currentTransformedCursor = getTransformedPoint(event.offsetX, event.offsetY);
    if (isDragging) {
        context.translate(currentTransformedCursor.x - dragStartPosition.x, currentTransformedCursor.y - dragStartPosition.y);
        drawImageToCanvas(file, boxes)
    }
}

function onMouseUp () {
    isDragging = false;
}

function onWheel (event) {
    const zoom = event.deltaY < 0 ? 1.1 : 0.9;
    context.translate(currentTransformedCursor.x, currentTransformedCursor.y);
    context.scale(zoom, zoom);
    context.translate(-currentTransformedCursor.x, - currentTransformedCursor.y);
    drawImageToCanvas(file, boxes);
    event.preventDefault();
}

function enableZoom (fromCanvas = false) {
    toggle.innerHTML = isZoom ? (fromCanvas ? "Show image" : "Enable zoom (experimental)") : "Disable zoom";
    isZoom = isZoom ? false : true;
    drawImageToCanvas(file, boxes);
}

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("wheel", onWheel);
