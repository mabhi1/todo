from django.http import JsonResponse
from .models import TodoList, Item
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def handle_todo(request, id):
    if request.method == "GET":
        ls = TodoList.objects.get(id=id)
        items = list(ls.item_set.all().values())
        for item in items:
            item.pop("todolist_id")
        data = {"name": ls.name, "id": id}
        data['items'] = items
        return JsonResponse(data)

    elif request.method == "POST":
        ls = TodoList.objects.get(id=id)
        item = json.loads(request.body)
        ls.item_set.create(text=item['text'], complete=False)
        return JsonResponse({"message": "Todo created successfully"})

    elif request.method == "PUT":
        item_info = json.loads(request.body)
        item = Item.objects.get(id=item_info['id'])
        if 'text' in item_info:
            item.text = item_info['text']
        if 'complete' in item_info:
            item.complete = item_info['complete']
        item.save()
        return JsonResponse({"message": "Todo updated successfully"})

    elif request.method == "DELETE":
        item_info = json.loads(request.body)
        item = Item.objects.get(id=item_info['id'])
        item.delete()
        return JsonResponse({"message": "Todo deleted successfully"})

    else:
        return JsonResponse({"message": "Page not found"}, status=404)
