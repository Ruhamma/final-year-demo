from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import CustomUser
from .models import ArtistProfile

@receiver(post_save, sender=CustomUser)
def create_artist_profile(sender, instance, created, **kwargs):
    print("Signal artist profile")
    if created and instance.is_seller():
        print("Creating artist profile")
        ArtistProfile.objects.create(user=instance)

