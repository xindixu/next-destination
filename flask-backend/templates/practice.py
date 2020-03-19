import musicbrainzngs
musicbrainzngs.set_useragent("cityhunto", "1.0", "quintonpham@utexas.edu")

# result = musicbrainzngs.search_artists(
# artist="Justin Beiber", type="", country="")
result = musicbrainzngs.search_artists(artist="justin bieber", type="",
                                       country="")
# for artist in result['artist-list']:
#     print(u"{id}: {name}".format(id=artist['id'], name=artist["name"]))
print(result['artist-list'][0]['id'])

artist_id = "e0140a67-e4d1-4f13-8a01-364355bee46e"
try:
    result = musicbrainzngs.get_artist_by_id(artist_id)
except WebServiceError as exc:
    print("Something went wrong with the request: %s" % exc)
else:
    artist = result["artist"]
    print("name:\t\t%s" % artist["name"])
    print("sort name:\t%s" % artist["sort-name"])
