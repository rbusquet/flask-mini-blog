from typing import Dict, Any

import attr
from flask import json
from werkzeug.security import check_password_hash


@attr.s
class User:
    id = attr.ib()
    username = attr.ib(str)
    password = attr.ib(str)

    @username.validator
    def validate_username(self, attribute, value):
        if not value:
            raise ValueError("Username is required.")

    @password.validator
    def validate_password(self, attribute, value):
        if not value:
            raise ValueError("Password is required.")

    def to_dict(self) -> Dict[str, Any]:
        return attr.asdict(
            self, filter=attr.filters.exclude(attr.fields(User).password)
        )

    def check_password(self, password) -> bool:
        return check_password_hash(self.password, password)

    def to_json(self):
        return json.dumps(self.to_dict())
