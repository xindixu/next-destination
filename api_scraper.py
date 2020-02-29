import requests
import json
import billboard

api_key = 'CM7RXF3cu7qfjLoQ'
venue_name = 'Emos'

# # Accessing Venue Data
# URL = 'https://api.songkick.com/api/3.0/search/venues.json?query={0}&apikey={1}'.format(
#     venue_name, api_key)
# response = requests.get(URL)
# print(response.status_code)

# data = response.text
# parsed = json.loads(data)
# print(json.dumps(parsed['resultsPage']['results']['venue'], indent=2))
# # print(json.dumps(parsed, indent=2))

# Accessing Artist Data


# Accessing top 50 artists
# chart = billboard.ChartData('artist-100')
# for i in chart:
#     print(i)

#! Accessing Metro Area Data
metro_area = '9179'
URL = 'https://api.songkick.com/api/3.0/metro_areas/{}/calendar.json?apikey={}'.format(
    metro_area, api_key)
response = requests.get(URL)
print(response.status_code)
data = response.text
parsed = json.loads(data)
ok = (parsed['resultsPage']['results']['event'])

# print(json.dumps(ok, indent=2))
# print(json.dumps(parsed, indent=2))
for i in ok:
    print(i['id'])
