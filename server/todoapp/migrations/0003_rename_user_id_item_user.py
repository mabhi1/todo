# Generated by Django 4.1.4 on 2023-01-01 07:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0002_alter_item_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='user_id',
            new_name='user',
        ),
    ]