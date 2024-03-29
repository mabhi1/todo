from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
import json
from django.core import serializers


@csrf_exempt
def create_user(request):
    if request.method == "POST":
        user = json.loads(request.body)
        user['email'] = user['email'].lower()
        user['username'] = user['username'].lower()
        if User.objects.filter(email=user['email']) or User.objects.filter(username=user['username']):
            return JsonResponse({"message": "User already exist"}, status=400)
        newUser = User.objects.create_user(
            username=user["username"],
            email=user["email"],
            password=user["password"],
            first_name=user["first_name"],
            last_name=user["last_name"]
        )
        newUser.save()
        return JsonResponse({"message": "User created successfully"})
    elif request.method == "GET" and request.user.is_authenticated:
        ls = User.objects.get(username=request.user.username)
        current_user = {
            "username": ls.username,
            "first_name": ls.first_name,
            "last_name": ls.last_name,
            "email": ls.email
        }
        items = list(ls.item_set.all().values())
        for item in items:
            item.pop("user_id")
        current_user['items'] = [*items]
        return JsonResponse({"username": ls.username, "data": current_user})
    else:
        return JsonResponse({"message": "Page not found"}, status=404)


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            return JsonResponse({"message": "User already logged in"}, status=400)
        user_info = json.loads(request.body)
        user_info['username'] = user_info['username'].lower()
        user = authenticate(
            request, username=user_info['username'], password=user_info['password'])
        if user:
            login(request, user)
            return JsonResponse({"message": "User logged in", "username": user_info['username']})
        else:
            return JsonResponse({"message": "Invalid user"}, status=404)
    else:
        return JsonResponse({"message": "Page not found"}, status=404)


@csrf_exempt
def logout_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({"message": "User not logged in"}, status=400)
    logout(request)
    return JsonResponse({"message": "User logged out"}, status=404)


@csrf_exempt
def edit_user(request, username):
    if request.method == "PUT" and request.user.is_authenticated and request.user.username == username:
        user = User.objects.get(username=username)
        user_info = json.loads(request.body)
        user_info['email'] = user_info['email'].lower()
        if user_info['email'] != user.email and User.objects.filter(email=user_info['email']):
            return JsonResponse({"message": "Email already taken"}, status=400)
        if "first_name" in user_info:
            user.first_name = user_info['first_name']
        if "last_name" in user_info:
            user.last_name = user_info['last_name']
        if "email" in user_info:
            user.email = user_info['email']
        if "password" in user_info:
            user.set_password(user_info['password'])
        user.save()
        return JsonResponse({"message": "User Updated"})
    else:
        return JsonResponse({"message": "Page not found"}, status=404)
