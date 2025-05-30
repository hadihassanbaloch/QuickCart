from fastapi import APIRouter
import json
import os

router = APIRouter()

@router.get("/products")
def get_products():
    file_path = os.path.join(os.path.dirname(__file__), 'data', 'products.json')
    with open(file_path) as f:
        return json.load(f)
