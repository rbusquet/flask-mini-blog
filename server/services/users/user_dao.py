import sqlite3
from typing import Optional

from werkzeug.security import generate_password_hash

from server.db import get_db
from .user import User


class UserDAO:
    def __init__(self, db: sqlite3.Connection):
        self._db = db

    @classmethod
    def factory(cls) -> "UserDAO":
        return cls(get_db())

    def create_user(self, username: str, password: str) -> User:
        if self.get_user(username):
            raise UserDAO.UserAlreadyExists(f"User {username} already exists")

        self._db.execute(
            "INSERT INTO user (username, password) VALUES (?, ?)",
            (username, generate_password_hash(password)),
        )
        self._db.commit()
        return self.get_user(username)

    def get_user(self, username: str) -> Optional[User]:
        user = self._db.execute(
            "SELECT * FROM user WHERE username = ?", (username,)
        ).fetchone()
        if user is None:
            return None
        return User(**user)

    class UserAlreadyExists(ValueError):
        pass

    def get_user_by_id(self, user_id):
        user = self._db.execute(
            "SELECT * FROM user WHERE id = ?", (user_id,)
        ).fetchone()
        if user is None:
            return None
        return User(**user)
