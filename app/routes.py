from flask import Blueprint, request, jsonify
from .services.scira_api import call_scira
from .services.deepseek_api import call_deepseek

api = Blueprint("api", __name__)

@api.route("/api/query", methods=["POST"])
def query_models():
    data = request.get_json()
    prompt = data.get("prompt")
    mode = data.get("mode")

    if not prompt or mode not in {"scira","deepseek","chain"}:
        return jsonify({"error":"Invalid request"}),400

    if mode == "scira":
        return jsonify({"response":call_scira(prompt)})
    if mode == "deepseek":
        return jsonify({"response":call_deepseek(prompt)})
    # chain
    first = call_scira(prompt)
    second = call_deepseek(first)
    return jsonify({"response":second})
