def serializer(model) -> dict:
    return {
        "id": str(model.get("_id")),
        "city": model.get("city"),
        "longitude": model.get("longitude"),
        "latitude": model.get("latitude"),
        "minTemperature": model.get("min_temperature"),
        "maxTemperature": model.get("max_temperature"),
        "temperature": model.get("temperature"),
        "country": model.get("country"),
    }


def list_serializer(models) -> list:
    return [serializer(model) for model in models]
