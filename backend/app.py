from flask import Flask, request, jsonify
from PIL import Image
import cv2
import numpy as np
import base64
from libs.image_proccessing import detect_annotate_objects
app = Flask(__name__)


@app.route('/detect_objects', methods=['POST'])
def detect_objects():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        # Reading the file and convert to numpy array
        image = Image.open(file)
        image_arr = np.array(image)

        # If the image is not grayscale, convert it to BGR (because OpenCV uses BGR instead of RGB)
        if len(image_arr.shape) == 3:
            image_arr = cv2.cvtColor(image_arr, cv2.COLOR_RGB2BGR)

        # Performing object detection and annotation
        annotated_image_bytes, class_count = detect_annotate_objects(image_arr)

        # Converting annotated image bytes to base64 string
        annotated_image_base64 = base64.b64encode(annotated_image_bytes.read()).decode('utf-8')

        return jsonify({'annotated_image': annotated_image_base64, 'class_count': class_count})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
