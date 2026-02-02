from django.shortcuts import render

# Create your views here.
def kanban_board(request):
    return render(request, 'board.html')