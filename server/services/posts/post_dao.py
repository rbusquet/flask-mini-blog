import sqlite3
from typing import List

from server.db import get_db
from .post import Post


class PostDAO:
    def __init__(self, db: sqlite3.Connection):
        self._db = db

    @classmethod
    def factory(cls) -> "PostDAO":
        return cls(get_db())

    def get_posts(self) -> List[Post]:
        posts = self._db.execute(
            "SELECT p.id, title, body, created, author_id, username"
            " FROM post p JOIN user u ON p.author_id = u.id"
            " ORDER BY created DESC"
        ).fetchall()

        return [Post(**post) for post in posts]

    def create_post(self, title: str, body: str, user_id: int):
        self._db.execute(
            "INSERT INTO post (title, body, author_id)" " VALUES (?, ?, ?)",
            (title, body, user_id),
        )
        self._db.commit()

    def get_post(self, id):
        post = self._db.execute(
            "SELECT p.id, title, body, created, author_id, username"
            " FROM post p JOIN user u ON p.author_id = u.id"
            " WHERE p.id = ?",
            (id,),
        ).fetchone()

        return Post(**post)

    def update_post(self, id: int, title: str, body: str):
        self._db.execute(
            "UPDATE post SET title = ?, body = ?" " WHERE id = ?", (title, body, id)
        )
        self._db.commit()

    def delete_post(self, id: int):
        self._db.execute("DELETE FROM post WHERE id = ?", (id,))
        self._db.commit()
