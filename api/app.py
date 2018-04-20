from flask import Flask, request, jsonify
from trie import Node
from tqdm import tqdm

app = Flask(__name__, static_url_path='')

root = Node()


@app.route("/search", methods=["GET"])
def search():
    prefix = request.args.get("q", "")
    return jsonify({"results": root.search(prefix)})


@app.route('/')
def default():
    return app.send_static_file("index.html")


@app.route('/<path:path>')
def send_static(path):
    return app.send_static_file(path)


def initialize_trie():
    with open("domains.csv", "r") as f:
        for line in tqdm(f.readlines()):
            parts = line.split(",")
            domain = parts[1].strip()
            root.insert(domain)


if __name__ == "__main__":
    initialize_trie()
    app.run(host='0.0.0.0', port=80)
