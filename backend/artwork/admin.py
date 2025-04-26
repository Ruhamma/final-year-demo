from django.contrib import admin
from .models import Artwork, ArtworkCategory, ArtworkMedium, ArtworkStyle, Tag

# Register the models to make them available in the Django admin interface

class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'category', 'created_at', 'updated_at')
    search_fields = ('title', 'artist__name')
    list_filter = ('category',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class MediumAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class StyleAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
# Register models with custom admin configurations
admin.site.register(Artwork, ArtworkAdmin)
admin.site.register(ArtworkCategory, CategoryAdmin)
admin.site.register(ArtworkMedium, MediumAdmin)
admin.site.register(ArtworkStyle, StyleAdmin)
admin.site.register(Tag, TagAdmin)
