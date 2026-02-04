from django.db import models

# Create your models here.

class Board(models.Model):
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    users = models.ManyToManyField('auth.User', related_name='boards')

    def __str__(self):
        return self.name

class Task(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=50)  # e.g., 'To Do', 'In Progress', 'Done'
    urgency = models.CharField(max_length=50)  # e.g., 'Low', 'Medium', 'High'
    assignees = models.CharField(max_length=200)  # Comma-separated usernames
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class Contact(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='contacts')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    @property
    def initials(self):
        return ''.join([part[0].upper() for part in self.name.split() if part])
    @property
    def avatar_color(self):
        colors = [
        "#FF7A00",
        "#9327FF",
        "#6E52FF",
        "#FC71FF",
        "#FFBB2B",
        "#1FD7C1",
        "#462F8A",
        "#FF4646",
        "#00BEE8"]
        return colors[ord(self.name[0].upper()) % len(colors)]

def __str__(self):
    return self.name