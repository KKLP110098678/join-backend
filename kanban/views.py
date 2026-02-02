from django.shortcuts import render

from join_backend.settings import BASE_DIR

# Create your views here.
def kanban_board(request):
    print("Basedir is" + str(BASE_DIR))
    return render(request, 'board.html')