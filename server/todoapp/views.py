from django.http import JsonResponse
from .models import TodoList, Item
from django.views.decorators.csrf import csrf_exempt
import json


def get_todo(request, id):
    try:
        ls = TodoList.objects.get(id=id)
        items = list(ls.item_set.all().values())
        data = {"name": ls.name}
        data['items'] = items
        return JsonResponse(data)
    except:
        return JsonResponse({"message": "Resource not found"}, status=404)


@csrf_exempt
def create_todo(request, id):
    if request.method == "POST":
        ls = TodoList.objects.get(id=id)
        item = json.loads(request.body)
        ls.item_set.create(text=item['text'], complete=False)
        return JsonResponse({"message": "Todo created successfully"})
    else:
        return JsonResponse({"message": "Page not found"}, status=404)


# @csrf_exempt
# def update_todo(request, id):
#     if request.method == "POST":
#         ls = TodoList.objects.get(id=id)
#         item_info = json.loads(request.body)
#         item = ls.item_set.get(id=item_info.id)
#         item.text = ""
#         return JsonResponse({"message": "Todo created successfully"})
#     else:
#         return JsonResponse({"message": "Page not found"}, status=404)
