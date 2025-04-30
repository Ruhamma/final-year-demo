from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from artwork.models import Artwork,FavoriteArtwork
from artwork.serializers import ArtworkSerializer
from orders.models import CartItem
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from django.db.models import Q

class SmartRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        wishlist_ids = FavoriteArtwork.objects.filter(user=user).values_list('artwork_id', flat=True)
        cart_ids = CartItem.objects.filter(user=user).values_list('artwork_id', flat=True)

        combined_ids = list(set(list(wishlist_ids) + list(cart_ids)))

        if not combined_ids:
            artworks = Artwork.objects.all().order_by('-created_at')[:10]
            serializer = ArtworkSerializer(artworks, many=True)
            return Response(serializer.data)

        user_artworks = Artwork.objects.filter(id__in=combined_ids)
        all_artworks = Artwork.objects.exclude(id__in=combined_ids)  

        if not all_artworks.exists():
            return Response([])

        data = []
        for artwork in all_artworks:
            content = f"{artwork.title} "
            content += f"{artwork.category.name if artwork.category else ''} "
            content += f"{artwork.medium.name if artwork.medium else ''} "
            content += f"{artwork.style.name if artwork.style else ''} "
            content += ' '.join(tag.name for tag in artwork.tags.all())
            data.append((str(artwork.id), content.strip()))

        df = pd.DataFrame(data, columns=['id', 'content'])

        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(df['content'])

        user_content = []
        for artwork in user_artworks:
            content = f"{artwork.title} "
            content += f"{artwork.category.name if artwork.category else ''} "
            content += f"{artwork.medium.name if artwork.medium else ''} "
            content += f"{artwork.style.name if artwork.style else ''} "
            content += ' '.join(tag.name for tag in artwork.tags.all())
            user_content.append(content.strip())

        user_vector = tfidf.transform([' '.join(user_content)])

        cosine_sim = cosine_similarity(user_vector, tfidf_matrix)

        sim_scores = list(enumerate(cosine_sim[0]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        top_indexes = [i[0] for i in sim_scores[:10]]  
        recommended_artwork_ids = df.iloc[top_indexes]['id'].tolist()

        recommended_artworks = Artwork.objects.filter(id__in=recommended_artwork_ids)

        serializer = ArtworkSerializer(recommended_artworks, many=True)
        return Response(serializer.data)
