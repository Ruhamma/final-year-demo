from django.db import migrations

def seed_roles(apps, schema_editor):
    Role = apps.get_model('users', 'Role')
    roles = ['ADMIN', 'SELLER', 'BUYER']

    for role_name in roles:
        Role.objects.get_or_create(name=role_name)

class Migration(migrations.Migration):

    dependencies = [    
        ('users', '0001_initial'),  
    ]

    operations = [
        migrations.RunPython(seed_roles),
    ]
