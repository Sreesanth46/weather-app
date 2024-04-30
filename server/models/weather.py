from pydantic import BaseModel


class Weather(BaseModel):
    city: str
    country: str
    longitude: float
    latitude: float
    min_temperature: float
    max_temperature: float
    temperature: float

