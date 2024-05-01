from bson import ObjectId
from fastapi import APIRouter
from config.database import collection_name
from models.weather import Weather
from schema.schemas import serializer, list_serializer
from utils.weather import get_weather_of_city
from fastapi import HTTPException

router = APIRouter()


# Get weather of a city
@router.get("/weather")
async def list_weather() -> list[dict]:
    """
    :return: list[dict]
    """
    return list_serializer(collection_name.find())


# Get weather of a city
@router.get("/weather/{location}")
async def get_weather(location) -> dict:
    """
    :param location:
    :return: dict[Weather]

    retrieves data from database if present
    otherwise get from external api and saves
    it to the database
    """
    return get_weather_of_city(location)


# Delete weather of a city
@router.delete("/weather/{_id}")
async def get_weather(_id):
    """
    :param _id: id of the weather
    """
    collection_name.find_one_and_delete({"_id": ObjectId(_id)})


# Add weather of a city
@router.post("/weather")
async def post_weather(weather: Weather) -> dict:
    """

    :param weather:
    :return: dict
    """
    try:
        collection_name.insert_one(dict(weather))
        return serializer(weather)
    except Exception:
        raise HTTPException(status_code=400, detail="Something went wrong")
