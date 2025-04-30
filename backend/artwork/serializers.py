from rest_framework import serializers
from .models import Artwork, ArtworkCategory, ArtworkMedium, ArtworkStyle, Tag, FavoriteArtwork


class ArtworkCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtworkCategory
        fields = '__all__'

class ArtworkMediumSerializer(serializers.ModelSerializer): 
    class Meta:
        model = ArtworkMedium
        fields = '__all__'

class ArtworkStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtworkStyle
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class ArtworkSerializer(serializers.ModelSerializer):
    category_id = serializers.UUIDField(write_only=True)
    medium_id = serializers.UUIDField(write_only=True)
    style_id = serializers.UUIDField(write_only=True)
    tags = serializers.ListField(
        child=serializers.UUIDField(),
        required=False,
        write_only=True
    )
    size = serializers.CharField(write_only=True)
    
    category = serializers.SerializerMethodField(read_only=True)
    medium = serializers.SerializerMethodField(read_only=True)
    style = serializers.SerializerMethodField(read_only=True)
    tag_details = serializers.SerializerMethodField(read_only=True)
    artist = serializers.SerializerMethodField(read_only=True)
    favorite_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Artwork
        fields = [
            'id', 'title', 'description', 'price', 'image', 
            'created_at', 'updated_at', 'is_sold', 'is_featured',
            'is_active', 'is_deleted', 'is_archived', 'is_published',
            'likes', 'comments', 'shares', 'favorites', 'sales',
            'view_count', 'size',
            # Relationship fields (write)
            'category_id', 'medium_id', 'style_id', 'tags',
            # Relationship fields (read)
            'category', 'medium', 'style', 'tag_details', 'artist',
            'favorite_count'
        ]
        extra_kwargs = {
            'image': {'required': True}
        }

    def get_category(self, obj):
        return {
            'id': obj.category.id,
            'name': obj.category.name
        } if obj.category else None

    def get_medium(self, obj):
        return {
            'id': obj.medium.id,
            'name': obj.medium.name
        } if obj.medium else None

    def get_style(self, obj):
        return {
            'id': obj.style.id,
            'name': obj.style.name
        } if obj.style else None

    def get_tag_details(self, obj):
        return [{
            'id': tag.id,
            'name': tag.name
        } for tag in obj.tags.all()]

    def get_artist(self, obj):
        artist = obj.artist
        return {
            'id': artist.id,
            'user': artist.user.username,
        }

    def get_favorite_count(self, obj):
        return obj.favorited_by.count()

    def create(self, validated_data):
        if 'size' in validated_data:
            size_str = validated_data.pop('size')
            width_height, unit = size_str.split(' ')
            width, height = width_height.split('x')
            validated_data['size'] = {
                'width': float(width),
                'height': float(height),
                'unit': unit
            }

        tags_data = validated_data.pop('tags', [])
        category_id = validated_data.pop('category_id')
        medium_id = validated_data.pop('medium_id')
        style_id = validated_data.pop('style_id')

        artwork = Artwork.objects.create(
            artist=self.context['request'].user.artistprofile,
            category_id=category_id,
            medium_id=medium_id,
            style_id=style_id,
            **validated_data
        )

        if tags_data:
            artwork.tags.set(tags_data)

        return artwork
    
class FavoriteArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteArtwork
        fields = ['id', 'artwork', 'created_at']