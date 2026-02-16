from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

from join_backend.settings import BASE_DIR

# Create your views here.
def kanban_board(request):
    if not request.user.is_authenticated:
        return redirect('kanban_login')
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
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        # Additional fields can be handled here

        from django.contrib.auth.models import User
        if User.objects.filter(username=username).exists():
            print(f"Registration failed: Username {username} already exists.")
            return render(request, 'authentication/register.html', {'error': 'Username already exists'})
        
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        login(request, user)
        print(f"Registered new user: {username}, {email}")
        return redirect('kanban_board')
    else:
        return render(request, 'authentication/register.html')
    
def kanban_logout(request):
    logout(request)
    return redirect('kanban_login')

def privacy_policy(request):
    return render(request, 'datenschutz.html')

def legal_notice(request):
    return render(request, 'legalnotice.html')

def help(request):
    return render(request, 'help.html')

def summary(request):
    if not request.user.is_authenticated:
        return render(request, 'authentication/login.html')
    return render(request, 'summary.html')

def add_task(request):
    if not request.user.is_authenticated:
        return render(request, 'authentication/login.html')
    return render(request, 'add-task.html')

def contacts(request):
    if request.user.is_authenticated:
        contacts_list = list(request.user.contacts.all().values('id','name', 'email', 'phone'))
        context = {
            'contacts': request.user.contacts.all(),
            'initials': [name[:2].upper() for name in request.user.contacts.all().values_list('name', flat=True)],
            'contact_list': contacts_list
        }
        return render(request, 'contacts.html', context)
    else:
        return redirect('kanban_login')

def add_contact(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            user = request.user
            name = request.POST.get('add-contact-name')
            email = request.POST.get('add-contact-email')
            phone = request.POST.get('add-contact-phone')
            from .models import Contact
            contact = Contact.objects.create(user=user, name=name, email=email, phone=phone)
            contact.save()
            print(f"Added contact: {name}, {email}, {phone}")
            # Post/Redirect/Get to avoid duplicate submission on refresh
            return redirect('contacts')
    else:
        return redirect('kanban_login')

def edit_contact(request, contact_id):
    if request.user.is_authenticated:
        if request.method == 'POST':
            from .models import Contact
            contact = Contact.objects.get(id=contact_id, user=request.user)
            contact.name = request.POST.get('edit-contact-name')
            contact.email = request.POST.get('edit-contact-email')
            contact.phone = request.POST.get('edit-contact-phone')
            contact.save()
        return redirect('contacts')
    else:
        return redirect('kanban_login')
    
def delete_contact(request, contact_id):
    if request.user.is_authenticated:
        from .models import Contact
        contact = Contact.objects.get(id=contact_id, user=request.user)
        contact.delete()
        return redirect('contacts')
    else:
        return redirect('kanban_login')

