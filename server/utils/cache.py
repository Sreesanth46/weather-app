from functools import wraps

from fastapi import HTTPException

from config.database import collection_name
from schema.schemas import serializer


def cache_location():
    """
    returns data from mongo db if data exists,
    otherwise get data from external api
    and saves it to the mongo db
    """

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            location = args[0]
            weather = collection_name.find_one({"city": {"$regex": location, '$options': 'i'}})
            if not weather:
                try:
                    weather = func(location)
                    collection_name.insert_one(weather)
                except Exception:
                    raise HTTPException(status_code=400, detail="Something went wrong")

            return serializer(weather)

        return wrapper

    return decorator
