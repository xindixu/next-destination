from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources=r'/*')

# TODO: replace with actual data from db
cities_data = [
    {'name': 'Austion', 'state': 'TX',
        'description': 'Austin is known for its eclectic live-music scene centered around country, blues and rock.', 'id': 'austin'},
    {'name': 'Dallas', 'state': 'TX',
        'description': 'Dallas, a modern metropolis in north Texas, is a commercial and cultural hub of the region.', 'id': 'dallas'}
]


restaurants_data = [
    {'name': 'Franklin', 'location': 'Austin',
        'description': 'Long lines form early for brisket, pulled pork & other smoked meats at this lunch-only spot.'}
]

us_data = [
    {'name': 'Yulissa Montes', "photo": '', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Xindi Xu', 'photo': '', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Marshall Munsch-Hayhurst', 'photo': '', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Nathan Craig', 'photo': '', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Quinton Pham', 'photo': '', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'}
]


def get_city_by_id(id):
    return [city for city in cities_data if city["id"] == id][0]


@app.route('/')
def index():
    return render_template("index.html", token="Hello Flask + React")


@app.route('/about')
def about():
    return render_template("about.html")


@app.route('/cities')
def cities():
    return jsonify(cities=cities_data)


@app.route('/city/<string:id>')
def city(id):
    data = get_city_by_id(id)
    print(data)
    return jsonify(city=get_city_by_id(id))


if __name__ == '__main__':
    app.run(debug=True)
