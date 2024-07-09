from ultralytics import YOLO

model = YOLO("models/yolov8m.pt")
results = model.predict("test/brocolli.jpg")

print("Testing...")
for res in results:
    for box in res.boxes:
        cords = box.xyxy[0].tolist()
        cords = [round(x) for x in cords]
        class_id = res.names[box.cls[0].item()]
        conf = round(box.conf[0].item(), 2)
        print("Object type:", class_id)
        print("Coordinates:", cords)
        print("Probability:", conf)