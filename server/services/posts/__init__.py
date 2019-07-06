from typing import List

from .post_dao import PostDAO
from .post import Post


class PostService:
    def __init__(self, dao: PostDAO):
        self._dao = dao

    @classmethod
    def factory(cls) -> "PostService":
        return cls(PostDAO.factory())

    def get_posts(self) -> List[Post]:
        return self._dao.get_posts()

    def create_post(self, title: str, body: str, user_id: int):
        self._dao.create_post(title, body, user_id)

    def get_post(self, id: int):
        return self._dao.get_post(id)

    def update_post(self, id: int, title: str, body: str):
        self._dao.update_post(id, title, body)

    def delete_post(self, id: int):
        self._dao.delete_post(id)
