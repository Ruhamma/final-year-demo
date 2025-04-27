from django.db import models
from artist.models import ArtistProfile
from django.conf import settings
class ArtworkCategory(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class ArtworkMedium(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ArtworkStyle(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
class Tag(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    
class Artwork(models.Model):
    artist = models.ForeignKey(ArtistProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='artwork_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_sold = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    category = models.ForeignKey(ArtworkCategory, on_delete=models.CASCADE)
    medium = models.ForeignKey(ArtworkMedium, on_delete=models.CASCADE)
    style = models.ForeignKey(ArtworkStyle, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True)
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    favorites = models.IntegerField(default=0)
    sales = models.IntegerField(default=0)
    size = models.JSONField(
        default=dict,
        blank=True,
        help_text="Dimensions in format {'width': 0, 'height': 0, 'unit': 'cm'}"
    )
    view_count = models.PositiveIntegerField(default=0)
    

    def __str__(self):
        return self.title


class FavoriteArtwork(models.Model):
    user = models.ForeignKey(ArtistProfile, on_delete=models.CASCADE, related_name="favorites")
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE, related_name="favorited_by")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'artwork')  

    def __str__(self):
        return f"{self.user.email} favorited {self.artwork.title}"

    
    
class ArtworkView(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.CharField(max_length=40, null=True, blank=True)  # for anonymous users
    artwork = models.ForeignKey('Artwork', on_delete=models.CASCADE, related_name='views')
    viewed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'artwork')