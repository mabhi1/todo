from django.urls import path
from . import views

urlpatterns = [
    path('<int:id>', views.get_todo),
    # path('create/<int:id>', views.create_todo)
]
