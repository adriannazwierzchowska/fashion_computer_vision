from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .cv_model import run_model

@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        image = request.FILES['image']
        path = image.name

        with open(path, 'wb+') as f:
            for chunk in image.chunks():
                f.write(chunk)

        labels, output_image_base64 = run_model(path)

        return JsonResponse({
            'labels': labels,
            'output_image': f"data:image/jpeg;base64,{output_image_base64}"
        })
