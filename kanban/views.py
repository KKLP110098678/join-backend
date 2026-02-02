from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout

from join_backend.settings import BASE_DIR

# Create your views here.
def kanban_board(request):
    if not request.user.is_authenticated:
        return render(request, 'authetication/login.html')
    return render(request, 'board.html')

def kanban_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return render(request, 'board.html')
        else:
            return render(request, 'authetication/login.html', {'error': 'Invalid username or password'})
    else:
        return render(request, 'authetication/login.html')