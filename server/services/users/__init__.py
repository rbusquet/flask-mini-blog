from .user_dao import UserDAO
from .user import User


class UserService:
    def __init__(self, dao: UserDAO):
        self._dao = dao

    @classmethod
    def factory(cls) -> "UserService":
        return cls(UserDAO.factory())

    def create_user(self, username: str, password: str) -> User:
        return self._dao.create_user(username, password)

    def get_user(self, username: str) -> User:
        return self._dao.get_user(username)

    def get_user_by_id(self, user_id) -> User:
        return self._dao.get_user_by_id(user_id)
