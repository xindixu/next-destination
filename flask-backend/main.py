from flask import Flask, render_template, request, redirect, url_for, jsonify
import random
app = Flask(__name__)

@app.route('/')
def index():
  return render_template("index.html", token="Hello Flask + React")


if __name__ == '__main__':
	app.run(debug=True)
