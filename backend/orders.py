from fastapi import APIRouter, Request
from datetime import datetime
import json
import os
from collections import defaultdict

router = APIRouter()

ORDERS_FILE = os.path.join("data", "orders.json")

# Make sure data directory exists
os.makedirs("data", exist_ok=True)


@router.post("/checkout")
async def process_checkout(request: Request):
    data = await request.json()

    raw_items = data.get("items", [])
    
    # Count items by name
    grouped_items = defaultdict(lambda: {"quantity": 0, "price": 0.0})
    for item in raw_items:
        name = item.get("name")
        price = item.get("price")
        grouped_items[name]["quantity"] += 1
        grouped_items[name]["price"] = price  # Assume price stays same for same product

    # Create clean items list
    items = [
        {
            "name": name,
            "quantity": info["quantity"],
            "price_per_item": info["price"],
            "subtotal": round(info["quantity"] * info["price"], 2)
        }
        for name, info in grouped_items.items()
    ]

    total_price = round(sum(item["subtotal"] for item in items), 2)

    order = {
        "timestamp": datetime.utcnow().isoformat(),
        "name": data.get("name"),
        "address": data.get("address"),
        "items": items,
        "total_price": total_price
    }

    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, "r") as f:
            try:
                orders = json.load(f)
            except json.JSONDecodeError:
                orders = []
    else:
        orders = []

    orders.append(order)

    with open(ORDERS_FILE, "w") as f:
        json.dump(orders, f, indent=2)

    return {"message": "Order saved successfully"}
