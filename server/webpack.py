from flask import Flask
from jinja2_webpack import Environment as WebpackEnvironment, filter


def init_app(app: Flask):
    with app.open_instance_resource("webpack-manifest.json") as f:
        webpack_env = WebpackEnvironment(
            manifest=f, publicRoot=app.config["WEBPACK_PUBLIC_ROOT"]
        )
        app.jinja_env.filters["webpack"] = filter.WebpackFilter(webpack_env)
