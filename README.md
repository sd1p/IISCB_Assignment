# Traffic Annotation

## Overview

This project is an assignment for the IISC Bangalore Summer Internship.
The website utilizes YOLOv5s, a state-of-the-art object detection
system, to detect, annotate, and count vehicles in traffic. This
technology can be instrumental in managing and analyzing traffic flow,
potentially contributing to smarter and more efficient transportation
systems.

## Documentation

### Setup Instructions

1. Clone the repository:
2. `git clone https://github.com/sd1p/IISCB_Assignment.git`
3. Install dependencies for both backend and frontend:
4. `cd backend`
5. `pip install -r requirements.txt`
6. `cd ../frontend`
7. `npm install`
8. Configure environment variables:
   - Create a `.env.local` file in the frontend directory and set the required variables.

        ```env
        NEXT_PUBLIC_BACKEND_URI=http://localhost:5000
        ```

9. Run the backend server:
10. `cd backend`
11. `python app.py`
12. Run the frontend application:
13. `cd frontend`
14. `npm run dev`
15. Run the app at `http://localhost:3000/`

### API Documentation

#### `/detect_objects`

- **Method:** POST
- **Description:** Uploads a Image file to the server.
- **Parameters:**
- `file` (multipart/form-data): The Image file to upload.
- **Response:**
- `response` (json) : Contains `fileName`, `namespace`, `URI`
  
  ```json
    {
        "annotated_image": "", // base64 image
        "class_count": "", // vehicles and counts
    }
  ```


## Demo

