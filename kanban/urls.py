from django.urls import path

from join_backend import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.kanban_board, name='kanban_board'),
    path('login/', views.kanban_board, name='kanban_login'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)