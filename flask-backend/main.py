from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

cities_data = [
    {'name': 'Austion', 'state': 'TX', 'description': 'Austin is known for its eclectic live-music scene centered around country, blues and rock.'},
    {'name': 'Dallas', 'state': 'TX', 'description': 'Dallas, a modern metropolis in north Texas, is a commercial and cultural hub of the region.'}
]


restaurants_data = [
    {'name': 'Franklin', 'location': 'Austin',
        'description': 'Long lines form early for brisket, pulled pork & other smoked meats at this lunch-only spot.'}
]
@app.route('/')
def index():
    return render_template("index.html", token="Hello Flask + React")


@app.route('/about')
def about():
    return render_template("about.html")


@app.route('/cities')
@cross_origin()
def cities():
    return jsonify(cities=cities_data)


if __name__ == '__main__':
    app.run(debug=True)
