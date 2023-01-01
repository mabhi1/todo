from django.urls import path
from . import views

urlpatterns = [
    path("", views.create_user),
    path("login/", views.login_user),
    path("logout/", views.logout_user),
    path("edit/<str:username>", views.edit_user)
]
