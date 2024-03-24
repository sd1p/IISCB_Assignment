import torch
import cv2
from PIL import Image
import io

# Load YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', './yolov5s.pt')

# Define vehicle classes
vehicle_classes = ['car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat']


def detect_annotate_objects(image_arr):
    # Perform inference
    results = model(image_arr)

    # Get detections
    detections = results.pred[0]

    # Initialize count dictionary
    class_count = {class_label: 0 for class_label in vehicle_classes}

    # Annotate image with detected vehicle classes and count occurrences
    for detection in detections:
        class_id, confidence, bbox = int(detection[5]), detection[4], detection[:4].tolist()
        class_label = model.module.names[class_id] if hasattr(model, 'module') else model.names[class_id]
        if class_label in vehicle_classes:
            x1, y1, x2, y2 = map(int, bbox)
            cv2.rectangle(image_arr, (x1, y1), (x2, y2), (0, 0, 255), 2)
            cv2.putText(image_arr, f'{class_label} {confidence:.2f}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
            # Increment class count
            class_count[class_label] += 1

    annotated_image = Image.fromarray(cv2.cvtColor(image_arr, cv2.COLOR_BGR2RGB))
    
    # Convert annotated image to bytes
    annotated_image_bytes = io.BytesIO()
    annotated_image.save(annotated_image_bytes, format='JPEG')
    annotated_image_bytes.seek(0)

    return annotated_image_bytes, class_count
