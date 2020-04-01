export const filterCities = (venueCity, cities) =>
  cities.filter(city => city.name === venueCity);

export const filterArtists = (venueArtist, artists) =>
  artists.filter(artist => artist.name === venueArtist);

export const filterVenues = (artistVenue, venues) =>
  venues.filter(venue => venue.name === artistVenue);

export const filterVenuesByCities = (city, venues) =>
  venues.filter(venue => venue.city === city);

export const getSortableAttributes = schema =>
  Object.keys(schema).reduce((dict, key) => {
    if (schema[key].dataSort) {
      dict[key] = schema[key];
    }
    return dict;
  }, {});

export const setLocation = callback => {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(
      ({ coords }) => callback(coords),
      () => {
        callback(null);
        console.error("unable to get current location");
      }
    );
  }
  return "Geolocation is not supported by this browser.";
};

export const getCityIdByName = cityName =>
  cityName.toLowerCase().replace(" ", "-");

export const getGoogleMapLinkByCoordinates = (latitude, longtitude) =>
  `http://www.google.com/maps/place/${latitude},${longtitude}`;

export const getWeekDay = num => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  return days[num];
};

export const getHours = time => {
  const hour = time.substring(0, 2);
  const minute = time.substring(2);
  return `${hour}:${minute}`;
};
