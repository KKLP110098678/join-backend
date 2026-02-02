from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

from join_backend.settings import BASE_DIR

# Create your views here.
def kanban_board(request):
    if not request.user.is_authenticated:
        return render(request, 'authentication/login.html')
    return render(request, 'board.html')

def kanban_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('kanban_board')
        else:
            return render(request, 'authentication/login.html', {'error': 'Invalid username or password'})
    else:
        return render(request, 'authentication/login.html')
    
def kanban_signup(request):
    return render(request, 'authentication/register.html')