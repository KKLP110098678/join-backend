from django.urls import path

from join_backend import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.kanban_board, name='kanban_board'),
    path('summary/', views.summary, name='summary'),
    path('add-task/', views.add_task, name='add_task'),
    path('contacts/', views.contacts, name='contacts'),
    path('add-contact/', views.add_contact, name='add_contact'),
    path('edit-contact/<int:contact_id>/', views.edit_contact, name='edit_contact'),
    path('kanban-login/', views.kanban_login, name='kanban_login'),
    path('logout-user/', views.kanban_logout, name='kanban_logout'),
    path('signup/', views.kanban_signup, name='kanban_signup'),
    path('privacy', views.privacy_policy, name='privacy_policy'),
    path('legalnotice', views.legal_notice, name='legal_notice'),
    path('help', views.help, name='help'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)