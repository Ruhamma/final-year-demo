from django.db import models
from django.conf import settings
from artist.models import ArtistProfile
import uuid
class Follow(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    follower = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="following")
    following = models.ForeignKey(ArtistProfile, on_delete=models.CASCADE, related_name="followers")
    followed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'following')  
        
    def __str__(self):
        return f"{self.follower.email} follows {self.following.user.username}"
