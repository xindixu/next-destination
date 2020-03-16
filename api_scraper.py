import requests
import json
import billboard
import pprint
import csv
import pandas as pd
import musicbrainzngs

musicbrainzngs.set_useragent("cityhunt", "1.0", "quintonpham@utexas.edu")
api_key = 'CM7RXF3cu7qfjLoQ'
venue_name = 'Emos'
artist_id = "c5c2ea1c-4bde-4f4d-bd0b-47b200bf99d6"
metro_area_id = "26330"

pp = pprint.PrettyPrinter(depth=6)


# def get_venue_data():
#     URL = 'https://api.songkick.com/api/3.0/search/venues.json?query={0}&apikey={1}'.format(
#         venue_name, api_key)
#     response = requests.get(URL)
#     print(response.status_code)

#     data = response.text
#     parsed = json.loads(data)
#     print(json.dumps(parsed['resultsPage']['results']['venue'], indent=2))


# def get_artist_by_id(id):
#     try:
#         result = musicbrainzngs.get_artist_by_id(id)
#     except:
#         pass
#     else:
#         artist = result
#     pp.pprint(result['artist'])



# def get_upcoming_events_data():
#     URL = f"https://api.songkick.com/api/3.0/metro_areas/{metro_area_id}/calendar.json?apikey={api_key}"
#     response = requests.get(URL)
#     data = response.text
#     parsed = json.loads(data)

#     print(json.dumps(parsed['resultsPage']['results']['event'], indent=2))

# get_upcoming_events_data()
# def get_artists_data():
#     try:
#         result = musicbrainzngs.search_artists(
#             limit=10, artist="", type="person", country="US", ended="false")

#     except WebServiceError as exc:
#         print("Something went wrong with the request: %s" % exc)
#     else:
#         artist = result
#         # print("name:\t\t%s" % artist["name"])
#         # print("sort name:\t%s" % artist["sort-name"])
#         # print(artist[])
#     pp.pprint(result['artist-list'])


# def get_chart_data():  # ! Accessing top 50 artists
#     chart = billboard.ChartData('artist-100')
#     tmp_list = []
#     for i in chart:
#         tmp_list.append(i.artist)

#     artist_dict = {}
#     for i in tmp_list:
#         result = musicbrainzngs.search_artists(artist=i)
#         artist_dict[i] = result['artist-list'][0]['id']
#         # * for testing purposes
#         # if len(artist_dict) == 5:
#         #     break

#     # print(artist_dict)
#     #! Can't figure out how to rename the first row and column cell as artist name becuase orient = index line.
#     df = pd.DataFrame.from_dict(
#         artist_dict, orient='index', columns=['MusicBrainz ID'])
#     df.rename(columns={'0': 'Artist Name', '1': 'MusicBrainz ID'})
#     df.to_csv("artist.csv")


# def get_metro_area_data():  # ! Accessing Metro Area Data
#     metro_area = '9179'
#     URL = 'https://api.songkick.com/api/3.0/metro_areas/{}/calendar.json?apikey={}'.format(
#         metro_area, api_key)
#     response = requests.get(URL)
#     print(response.status_code)
#     data = response.text
#     parsed = json.loads(data)
#     # print(json.dumps(ok, indent=2))
#     df = pd.DataFrame(parsed['resultsPage']['results']['event'])
#     df.to_csv('MetroAreaData.csv', index=False)


def read_cities_csv():  # ! reading cities.csv
    a = pd.read_csv('cities.csv')

    my_list = []

    with open('cities.csv', 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            my_list.append(row[0])
