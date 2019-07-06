import datetime

import attr


@attr.s
class Post:
    id = attr.ib()
    author_id = attr.ib()
    created = attr.ib(datetime.datetime)
    title = attr.ib(str)
    body = attr.ib(str)
    username = attr.ib(str)

    def to_dict(self):
        return attr.asdict(self)
