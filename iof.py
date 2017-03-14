# -*- coding: utf-8 -*-
import json
import re
import subprocess

from flask import Flask, abort, render_template, request, url_for
app = Flask(__name__)


@app.route("/")
def index():
    url_for("static", filename="main.css")
    url_for("static", filename="main.js")
    return render_template("index.html")


@app.route("/temp", methods=["GET"])
def temp():
    if request.is_xhr:
        temp = subprocess.check_output(["check_temperature"])
        if re.match(b"\d\d.\d\d\d\\n", temp):
            return json.dumps({"temperature": temp.strip("\n")})
        return json.dumps({"error": "reading_error"})

    abort(401)
