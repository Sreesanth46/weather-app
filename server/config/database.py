from pymongo import MongoClient
from config.config import settings


client = MongoClient(settings.MONGO_DB_URL)

db = client.weather_db

collection_name = db["weather_collection"]

