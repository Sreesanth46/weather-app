from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    OPEN_WEATHER_API_KEY: str = Field(alias='OPEN_WEATHER_API_KEY')
    MONGO_DB_URL: str = Field(alias='MONGO_DB_URL')
    LOGS_DIR: str = Field(alias="LOGS_DIR", default=".")

    model_config = SettingsConfigDict(env_file='.env')


# global instance
settings = Settings()
