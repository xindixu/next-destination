export const filterCities = (venueCity, cities) =>
  cities.filter(city => city.name === venueCity);

export const filterArtists = (venueArtist, artists) =>
  artists.filter(artist => artist.name === venueArtist);

export const filterVenues = (artistVenue, venues) =>
  venues.filter(venue => venue.name === artistVenue);
