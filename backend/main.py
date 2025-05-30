from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from products import router as products_router
from orders import router as orders_router
import os
from fastapi.staticfiles import StaticFiles


app = FastAPI()

app.mount("/assets", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "assets")), name="assets")
# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router)
app.include_router(orders_router)
