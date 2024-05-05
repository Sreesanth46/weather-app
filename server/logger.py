import time
from typing import Callable
from fastlogging import LogInit
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from config.config import settings


class Logger:
    def __init__(self, filename="logger.log"):
        self.logger = LogInit(pathName=settings.LOGS_DIR + "/" + filename, console=True, colors=True, encoding="utf-8")

    def read_log_file(self) -> str:
        with open(self.logger.pathName, "r") as file:
            return file.read()

    def info(self, message: str):
        self.logger.info(message)
        self.logger.flush()

    def error(self, message: str):
        self.logger.error(message)
        self.logger.flush()

    def warning(self, message: str):
        self.logger.warning(message)
        self.logger.flush()

    def debug(self, message: str):
        self.logger.debug(message)
        self.logger.flush()

    def exception(self, message: str):
        self.logger.exception(message)
        self.logger.flush()


logger = Logger()


class RouteLoggerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable[[Request], Response]):
        start_time = time.time()
        response = await call_next(request)
        end_time = time.time()
        time_taken = end_time - start_time
        logger.info(f"Route: {request.url.path}, Method: {request.method}, Time Taken: {time_taken}, Status Code: {response.status_code}")
        return response
