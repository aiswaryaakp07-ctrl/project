# Class Distraction Detector Demo

A simple demo website that uses a Teachable Machine image model to classify attention states in class:

- `low distracted`
- `medium distracted`
- `highly distracted`

## Setup

1. Place your exported Teachable Machine model files in `my_model/` next to `index.html`.
2. The folder should contain `model.json` and `metadata.json`.
3. Open `index.html` in a browser that supports webcam access.
4. Click `Start Camera` and allow webcam permissions.

## Notes

- This is a static demo page. No backend is required.
- The page uses TensorFlow.js and the Teachable Machine image library from CDN.
