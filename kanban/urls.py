from django.urls import path

from join_backend import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.kanban_board, name='kanban_board'),
    path('login/', views.kanban_login, name='kanban_login'),
    path('signup/', views.kanban_signup, name='kanban_signup'),
    path('privacy', views.privacy_policy, name='privacy_policy'),
    path('legalnotice', views.legal_notice, name='legal_notice'),
    path('help', views.help, name='help'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)