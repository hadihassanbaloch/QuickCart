import os
import requests
from pathlib import Path
from urllib.parse import urlencode
from time import sleep

# ✅ Your Pixabay API key
API_KEY = '50565748-7946bc29a7a2f84617316b668'
BASE_URL = 'https://pixabay.com/api/'

# ✅ Categories to download images for
categories = ['fruits', 'vegetables', 'bakery', 'meat', 'dairy', 'beverages']

# ✅ Number of images per category
IMAGES_PER_CATEGORY = 15

# ✅ Where to save images
output_dir = Path("assets")
output_dir.mkdir(exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0"}

def sanitize_filename(name):
    return name.lower().strip().replace(" ", "_").replace("/", "_")

def download_images(category):
    print(f"📦 Downloading images for category: {category}")
    try:
        params = {
            "key": API_KEY,
            "q": category,
            "image_type": "photo",
            "per_page": IMAGES_PER_CATEGORY,
            "safesearch": "true"
        }
        url = f"{BASE_URL}?{urlencode(params)}"
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        cat_dir = output_dir / category
        cat_dir.mkdir(parents=True, exist_ok=True)

        used_names = set()
        for i, hit in enumerate(data["hits"]):
            image_url = hit.get("largeImageURL")
            tags = hit.get("tags", "")
            name_tag = tags.split(",")[0] if tags else f"{category}_{i+1}"
            base_name = sanitize_filename(name_tag)

            # Ensure filename is unique
            filename = base_name
            count = 1
            while filename in used_names:
                filename = f"{base_name}_{count}"
                count += 1
            used_names.add(filename)

            ext = image_url.split('.')[-1].split('?')[0]
            save_path = cat_dir / f"{filename}.{ext}"
            img_data = requests.get(image_url).content
            with open(save_path, 'wb') as f:
                f.write(img_data)

        print(f"✅ Downloaded {len(data['hits'])} images for {category}")
    except Exception as e:
        print(f"❌ Error for category '{category}': {e}")

# 🔁 Download for each category
for cat in categories:
    download_images(cat)
    sleep(1)  # avoid hammering the API
