from django.http import JsonResponse
from .models import Item
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def handle_todo(request, username):
    if request.method == "GET" and request.user.is_authenticated and request.user.username == username:
        ls = User.objects.get(username=str(username))
        items = list(ls.item_set.all().values())
        for item in items:
            item.pop("user_id")
        data = {"username": ls.username, "first_name": ls.first_name}
        data['items'] = items
        return JsonResponse(data)

    elif request.method == "POST" and request.user.is_authenticated and request.user.username == username:
        ls = User.objects.get(username=username)
        item = json.loads(request.body)
        ls.item_set.create(text=item['text'], complete=False)
        return JsonResponse({"message": "Todo created successfully"})

    elif request.method == "PUT" and request.user.is_authenticated and request.user.username == username:
        item_info = json.loads(request.body)
        item = Item.objects.get(id=item_info['id'])
        if 'text' in item_info:
            item.text = item_info['text']
        if 'complete' in item_info:
            item.complete = item_info['complete']
        item.save()
        return JsonResponse({"message": "Todo updated successfully"})

    elif request.method == "DELETE" and request.user.is_authenticated and request.user.username == username:
        item_info = json.loads(request.body)
        item = Item.objects.get(id=item_info['id'])
        item.delete()
        return JsonResponse({"message": "Todo deleted successfully"})

    else:
        return JsonResponse({"message": "Page not found"}, status=404)
