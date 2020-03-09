import functools

from flask import Blueprint, g, jsonify, request, session

from ..users import UserService

bp = Blueprint("auth", __name__, url_prefix="/auth")


def error(msg, code):
    return jsonify({"error": msg}), code


@bp.route("/register", methods=["POST"])
def register():
    user_service = UserService.factory()
    try:
        user = user_service.create_user(**request.json)
    except ValueError as ex:
        return str(ex), 403
    return jsonify(user.to_dict()), 201


@bp.route("/login", methods=["POST"])
def login():
    user_service = UserService.factory()
    user = user_service.get_user(request.json["username"])

    if user is None:
        return error("User not found", 404)
    if not user.check_password(request.json["password"]):
        return error("Invalid password", 403)

    session.clear()
    session["user_id"] = user.id
    return jsonify(user.to_dict()), 201


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get("user_id")

    if user_id is None:
        g.user = None
    else:
        g.user = UserService.factory().get_user_by_id(user_id)


@bp.route("/logout")
def logout():
    session.clear()
    return jsonify({"message": "Logged out!"}), 200


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return error("Login required", 403)

        return view(**kwargs)

    return wrapped_view


@bp.route("/me", methods=["GET"])
@login_required
def me():
    return jsonify(g.user.to_dict())
