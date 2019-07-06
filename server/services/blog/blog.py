from flask import Blueprint, g, request, jsonify

from server.services.auth import login_required
from server.services.posts import PostService

bp = Blueprint("blog", __name__, url_prefix="/blog")


@bp.route("/posts")
def posts():
    post_service = PostService.factory()
    posts = post_service.get_posts()

    return jsonify([p.to_dict() for p in posts])


@bp.route("/post/<int:id>")
def get_post(id):
    post_service = PostService.factory()
    post = post_service.get_post(id)

    return jsonify(post.to_dict())


@bp.route("/post/create", methods=["POST"])
@login_required
def create():
    data = request.get_json()
    title = data["title"]
    body = data["body"]

    if not title:
        return "Title is required", 400

    service = PostService.factory()
    service.create_post(title, body, g.user.id)
    return jsonify({}), 201


@bp.route("/post/<int:id>/update", methods=["POST"])
@login_required
def update(id):
    service = PostService.factory()
    post = service.get_post(id)
    if post is None:
        return jsonify({"error": "Not found"}), 404
    if post.author_id != g.user.id:
        return jsonify({"error": "Forbidden"}), 403

    data = request.get_json()
    title = data["title"]
    body = data["body"]

    if not title:
        return "Title is required", 400

    service.update_post(id, title, body)
    return jsonify({}), 201


@bp.route("/post/<int:id>/delete", methods=["POST"])
@login_required
def delete(id):
    service = PostService.factory()
    post = service.get_post(id)
    if post is None:
        return jsonify({"error": "Not found"}), 404
    if post.author_id != g.user.id:
        return jsonify({"error": "Forbidden"}), 403

    service.delete_post(id)
    return jsonify({}), 202
