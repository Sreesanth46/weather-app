import requests
from config.config import settings
from models.weather import Weather
from utils.cache import cache_location


@cache_location()
def get_weather_of_city(city_name) -> dict:
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={settings.OPEN_WEATHER_API_KEY}"

    response = requests.get(url)
    data = response.json()
    if data["cod"] != 200:
        raise Exception("City not found")

    weather = Weather(**{
        "longitude": data.get("coord", {}).get("lon"),
        "latitude": data.get("coord", {}).get("lat"),
        "temperature": data.get("main", {}).get("temp"),
        "min_temperature": data.get("main", {}).get("temp_min"),
        "max_temperature": data.get("main", {}).get("temp_max"),
        "city": data.get("name", city_name),
        "country": data.get("sys", {}).get("country"),
    })

    return dict(weather)
