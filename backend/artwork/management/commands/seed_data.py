from django.core.management.base import BaseCommand
from artwork.models import ArtworkCategory, ArtworkStyle, Tag, ArtworkMedium

class Command(BaseCommand):
    help = 'Populates Artwork categories, styles, tags, and mediums'

    def handle(self, *args, **kwargs):
        # Example categories
        categories = [
            {"name": "Abstract", "description": "Abstract art focuses on shapes and colors."},
            {"name": "Realism", "description": "Realistic depictions of subjects from the real world."},
            {"name": "Impressionism", "description": "Art that seeks to capture a moment in time."},
            {"name": "Surrealism", "description": "Art that explores dream-like, fantastical imagery."},
            {"name": "Pop Art", "description": "Art that incorporates imagery from popular culture."},
            {"name": "Cubism", "description": "Artistic style that uses geometric shapes to represent reality."},
            {"name": "Minimalism", "description": "Art that focuses on simplicity and minimal elements."},
            {"name": "Expressionism", "description": "Art that expresses emotional experience rather than physical reality."},
            {"name": "Street Art", "description": "Urban art displayed on public surfaces like walls and streets."},
            {"name": "Fantasy", "description": "Art that depicts fantastical or imaginary subjects."},
            {"name": "Geometric", "description": "Art based on geometric shapes and forms."},
            {"name": "Gothic", "description": "Dark, medieval, and often macabre-themed art."},
            {"name": "Baroque", "description": "Art characterized by dramatic detail and movement."},
            {"name": "Renaissance", "description": "Art from the period of the Renaissance, focusing on realism and humanism."},
            {"name": "Figurative", "description": "Art that represents realistic subjects like people or animals."},
            {"name": "Nature", "description": "Art that features landscapes and natural scenery."},
            {"name": "Vintage", "description": "Art evoking nostalgia or past eras."},
            {"name": "Industrial", "description": "Art inspired by industrial and urban environments."},
            {"name": "Futurism", "description": "Art that portrays futuristic or technological themes."}
        ]

        for category in categories:
            ArtworkCategory.objects.get_or_create(**category)
            self.stdout.write(self.style.SUCCESS(f"Category '{category['name']}' created"))

        # Example styles
        styles = [
            {"name": "Cubism", "description": "An early 20th-century style that breaks subjects into geometric forms."},
            {"name": "Surrealism", "description": "A 20th-century style that focuses on dreamlike, absurd imagery."},
            {"name": "Pop Art", "description": "An art movement that draws on popular culture and mass media."},
            {"name": "Minimalism", "description": "A style that emphasizes simplicity, clean lines, and minimal elements."},
            {"name": "Expressionism", "description": "A style that expresses emotional experience rather than physical reality."},
            {"name": "Impressionism", "description": "A style focusing on capturing light and everyday scenes with loose brushwork."},
            {"name": "Realism", "description": "A style that aims to depict subjects as they appear in real life."},
            {"name": "Futurism", "description": "An early 20th-century movement focused on the speed, technology, and modernity of the future."},
            {"name": "Abstract Expressionism", "description": "A style of abstract art that expresses emotion and the artist's inner feelings."},
            {"name": "Renaissance", "description": "A style of art that reflects classical ideals of beauty and humanism."},
            {"name": "Gothic", "description": "A style with dark, emotional, and often medieval themes."},
            {"name": "Baroque", "description": "A highly detailed and dramatic style, often associated with the 17th century."},
            {"name": "Art Deco", "description": "A style that combines modernist styles with fine craftsmanship."},
            {"name": "Op Art", "description": "Art based on optical illusions and visual effects."},
            {"name": "Geometric Abstraction", "description": "Art that uses geometric shapes and colors to create abstract compositions."}
        ]

        for style in styles:
            ArtworkStyle.objects.get_or_create(**style)
            self.stdout.write(self.style.SUCCESS(f"Style '{style['name']}' created"))

        # Example tags
        tags = [
            {"name": "Modern", "description": "Contemporary artistic expressions."},
            {"name": "Nature", "description": "Art that features elements of the natural world."},
            {"name": "Black and White", "description": "Artwork created using only black and white tones."},
            {"name": "Minimalism", "description": "Art that focuses on simplicity and minimal elements."},
            {"name": "Pop Art", "description": "Art that uses imagery from popular culture."},
            {"name": "Impressionism", "description": "Art that captures the fleeting moment."},
            {"name": "Abstract", "description": "Art that doesn't represent reality directly."},
            {"name": "Realism", "description": "Art that aims to represent real life accurately."},
            {"name": "Surrealism", "description": "Art that explores dream-like, fantastical imagery."},
            {"name": "Fantasy", "description": "Art that depicts fantastical scenes or creatures."},
            {"name": "Geometric", "description": "Art based on geometric shapes and forms."},
            {"name": "Figurative", "description": "Art that represents real-world objects or people."},
            {"name": "Street Art", "description": "Urban art often displayed on public walls."},
            {"name": "Expressionism", "description": "Art that expresses emotional experience rather than physical reality."},
            {"name": "Gothic", "description": "Art that focuses on dark, medieval, and often macabre themes."},
            {"name": "Baroque", "description": "Art characterized by dramatic, highly detailed visuals."},
            {"name": "Renaissance", "description": "Art from the period of the Renaissance, focusing on humanism and classical themes."},
            {"name": "Cubism", "description": "Art that uses geometric shapes to represent subjects from multiple angles."},
            {"name": "Nature", "description": "Art that emphasizes natural elements like landscapes and wildlife."},
            {"name": "Vintage", "description": "Art with a nostalgic or retro feel, often evoking past eras."},
            {"name": "Futurism", "description": "Art focused on the themes of the future, technology, and speed."},
            {"name": "Symbolism", "description": "Art that uses symbolic images to represent ideas or emotions."},
            {"name": "Industrial", "description": "Art inspired by industrial machinery and urban environments."},
            {"name": "Nostalgic", "description": "Art that evokes a sense of longing for the past."},
            {"name": "Eclectic", "description": "Art that combines a wide range of styles and influences."}
        ]

        for tag in tags:
            Tag.objects.get_or_create(**tag)
            self.stdout.write(self.style.SUCCESS(f"Tag '{tag['name']}' created"))

        # Example mediums (you can customize this list as needed)
        mediums = [
            {"name": "Oil Paint", "description": "A painting medium made by mixing pigments with oil."},
            {"name": "Watercolor", "description": "A painting medium that uses water-soluble paints."},
            {"name": "Acrylic", "description": "A fast-drying painting medium made of pigment suspended in acrylic polymer emulsion."},
            {"name": "Charcoal", "description": "A drawing medium made from burnt wood, often used for sketching."},
            {"name": "Pastel", "description": "A painting medium that uses pigment in a paste or chalk form."},
            {"name": "Digital", "description": "Art created using digital tools like Photoshop or Illustrator."},
            {"name": "Ink", "description": "A medium used for drawing or painting, typically with pens or brushes."},
            {"name": "Clay", "description": "A material used for sculpting and pottery."},
            {"name": "Mixed Media", "description": "Art that combines different materials and techniques."},
            {"name": "Collage", "description": "Art created by assembling different materials into a unified composition."}
        ]

        for medium in mediums:
            ArtworkMedium.objects.get_or_create(**medium)
            self.stdout.write(self.style.SUCCESS(f"Medium '{medium['name']}' created"))
