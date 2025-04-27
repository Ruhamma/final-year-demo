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
    category_id = serializers.IntegerField(write_only=True, required=False)
    medium_id = serializers.IntegerField(write_only=True, required=False)
    style_id = serializers.IntegerField(write_only=True, required=False)
    
    tags = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True)
    favorite_count = serializers.SerializerMethodField()
    class Meta:
        model = Artwork
        fields = '__all__'
    def get_favorite_count(self, obj):
        return obj.favorited_by.count()
    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        category_id = validated_data.pop('category_id', None)
        medium_id = validated_data.pop('medium_id', None)
        style_id = validated_data.pop('style_id', None)

        artwork = Artwork.objects.create(**validated_data)

        if category_id:
            artwork.category = ArtworkCategory.objects.get(id=category_id)
        if medium_id:
            artwork.medium = ArtworkMedium.objects.get(id=medium_id)
        if style_id:
            artwork.style = ArtworkStyle.objects.get(id=style_id)

        artwork.save()

        if tags_data:
            tags = Tag.objects.filter(id__in=tags_data)
            artwork.tags.set(tags)

        return artwork

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        category_id = validated_data.get('category_id', None)
        medium_id = validated_data.get('medium_id', None)
        style_id = validated_data.get('style_id', None)

        if category_id:
            instance.category = ArtworkCategory.objects.get(id=category_id)
        if medium_id:
            instance.medium = ArtworkMedium.objects.get(id=medium_id)
        if style_id:
            instance.style = ArtworkStyle.objects.get(id=style_id)

        instance.save()

        if tags_data:
            tags = Tag.objects.filter(id__in=tags_data)
            instance.tags.set(tags)

        return instance

class FavoriteArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteArtwork
        fields = ['id', 'artwork', 'created_at']