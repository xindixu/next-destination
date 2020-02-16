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
    {'name': 'Yulissa Montes', "photo": 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Xindi Xu', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Marshall Munsch-Hayhurst', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Nathan Craig', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Quinton Pham', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'}
]
citydata= [{
    'name':'Austin', 'state':'TX', 'coordinates':{'x':'','y':''}, 'description':'I live here', 'venues':["Emo's"]
}]
business_data= [{
    'name':'Barbeque Resstaurant',
    'category':'Barbeque',
    'description':'as;dfalsdf;',
    'address':'1234 Rockefeller Street',
    'coordinates':{'x':'1234','y':'1234'},
    'price':'$$$',
    'hours':[{
        'day':'M',
        'start':'8:00',
        'end':'9:00'}]
    },
    {
    'name':'Marshalls Restaurant',
    'category':'Barbeque',
    'description':'as;dfalsdf;',
    'address':'1234 Rockefeller Street',
    'coordinates':{'x':'1234','y':'1234'},
    'price':'$$$',
    'hours':[{
        'day':'M',
        'start':'8:00',
        'end':'9:00'}
    ]
}]
event_data=[{
    'name':'V day',
    'category':'Holiday',
    'description':'asdsf',
    'address':'sdasf',
    'coordinates':{'x':'asdfdsa','y':'adfadsf'},
    'price':'asdfas',
    'hours':{
        'date':'afsdf',
        'start':'gfhfh',
        'end':'nxcv,cxzbv'}
}]
music_data=[{
    'artist':{
        'name':'Hobo Johnson',
        'url':'cvxz',
        'image_url':'vadvx',
        'upcoming_event_count':'dasfasdaf'
    },
    'events':[{
        'id':'sdfasd',
        'sale_datetime':'sdfasdf',
        'event_datetime':'asdfadf',
        'description':'dfsafdf',
        'venue':'fasdfsaf'
    }]
}]
venue_data=[{
    'name':'sdfasdf', 'coordinates':{'x':'dfgdsgf','y':'dvdvcx'}, 'city':'fvfdgsfd', 'region':'dfbxxcvb'
}]


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


@app.route('/business')
def business():
    return jsonify(business=business_data)

@app.route('/event')
def event():
    return jsonify(event=event_data)

@app.route('/music')
def music():
    return jsonify(music=music_data)


@app.route('/venue')
def venue():
    return jsonify(venue=venue_data)


@app.route('/us')
def us():
    return jsonify(us=us_data)


@app.route('/city/<string:id>')
def city(id):
    data = get_city_by_id(id)
    print(data)
    return jsonify(city=get_city_by_id(id))


if __name__ == '__main__':
    app.run(debug=True)
