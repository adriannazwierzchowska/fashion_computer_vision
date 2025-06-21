from PIL import Image
import base64
from io import BytesIO
from ultralytics import YOLO

model = YOLO("model/best.pt")

def run_model(image_path):
    results = model(image_path)
    result = results[0]

    class_ids = result.boxes.cls.cpu().numpy().astype(int)
    class_names = [model.names[int(c)] for c in class_ids]
    unique_labels = list(set(class_names))

    annotated_frame = result.plot()

    buffered = BytesIO()
    img = Image.fromarray(annotated_frame)
    img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return unique_labels, img_str
