import React from "react";
import { Link } from "react-router-dom";
import { getCityIdByName } from "./util";

export const MAX_PAGE_NUM = 50;
export const LIMIT = 20;

// schema for apiSorting
export const RESTAURANT_SORTABLE_SCHEMA = {
  best_match: { title: "Best Match", dataSort: true },
  rating: { title: "Rating", dataSort: true },
  review_count: { title: "Review Count", dataSort: true },
  distance: { title: "Distance", dataSort: true }
};

export const EVENT_SORTABLE_SCHEMA = {
  popularity: { title: "Popularity", dataSort: true },
  time_start: { title: "Time Start", dataSort: true }
};

export const AIRBNB_SORTABLE_SCHEMA = {
  price: { title: "Price", dataSort: true },
  accomodates: { title: "Accomodates", dataSort: true }
};

// schema for sortableTable
export const AIRBNB_SCHEMA = {
  image: {
    title: "",
    getBodyFormat: (_, { picture_url: img, name }) => (
      <img src={img} alt={name} />
    ),
    isKey: false,
    dataSort: false
  },
  name: {
    title: "Name",
    getBodyFormat: (_, { listing_url, name }) => (
      <a href={listing_url} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    ),
    isKey: true,
    dataSort: true
  },
  price: {
    title: "Price per night",
    getBodyFormat: (_, { price }) => <span>${price}</span>,
    isKey: false,
    dataSort: true
  },
  accomodates: {
    title: "Accomodates",
    getBodyFormat: (_, { accomodates }) => <span>{accomodates}</span>,
    isKey: false,
    dataSort: true
  },
  review_score: {
    title: "Rating out of 100",
    getBodyFormat: (_, { review_scores_rating }) => (
      <span>{review_scores_rating}</span>
    ),
    isKey: false,
    dataSort: true
  },
  number_of_reviews: {
    title: "# of Reviews",
    getBodyFormat: (_, { number_of_reviews }) => (
      <span>{number_of_reviews}</span>
    ),
    isKey: false,
    dataSort: true
  },
  zipcode: {
    title: "Zipcode",
    getBodyFormat: (_, { zipcode }) => <span>{zipcode}</span>,
    isKey: false,
    dataSort: true
  },
  description: {
    title: "Description",
    getBodyFormat: (_, { neighborhood_overview, listing_url }) => (
      <span>
        {`${neighborhood_overview.substring(0, 200)} ...`}
        <a href={listing_url} target="_blank" rel="noopener noreferrer">
          READ MORE
        </a>
      </span>
    ),
    isKey: false,
    dataSort: true
  }
};

export const RESTAURANT_SCHEMA = {
  image: {
    title: "",
    getBodyFormat: (_, { image_url: img, name }) => (
      <img src={img} alt={name} />
    ),
    isKey: false,
    dataSort: false
  },
  name: {
    title: "Restaurants",
    getBodyFormat: (_, { alias, name }) => (
      <Link to={`/restaurant/${alias}`}>{name}</Link>
    ),
    isKey: true,
    dataSort: true
  },
  distance: {
    title: "Distance",
    getBodyFormat: (_, { distance }) => (
      <span>{Number(distance).toFixed(2)} yd.</span>
    ),
    isKey: false,
    dataSort: true
  },
  location: {
    title: "Address",
    getBodyFormat: (_, { location: { display_address: address } }) => (
      <span>{address.join(", ")}</span>
    ),
    isKey: false,
    dataSort: false
  },
  categories: {
    title: "Categories",
    getBodyFormat: (_, { categories }) => (
      <span>{categories.map(category => category.title).join(", ")}</span>
    ),
    isKey: false,
    dataSort: false
  },
  price: {
    title: "Price",
    getBodyFormat: (_, { price }) => <span>{price}</span>,
    isKey: false,
    dataSort: true
  },
  rating: {
    title: "Rating",
    getBodyFormat: (_, { rating }) => <span>{rating}</span>,
    isKey: false,
    dataSort: true
  },
  review_count: {
    title: "Review Count",
    getBodyFormat: (_, { review_count: reviews }) => <span>{reviews}</span>,
    isKey: false,
    dataSort: true
  },
  url: {
    title: "URL",
    getBodyFormat: (_, { url }) => (
      <a href={url} target="_blank" rel="noopener noreferrer">
        Yelp
      </a>
    ),
    isKey: false,
    dataSort: false
  }
};

export const RESTAURANTS_PAGE_SCHEMA = {
  ...RESTAURANT_SCHEMA,
  city: {
    title: "City",
    getBodyFormat: (_, { location: { city } }) => (
      <Link to={`/city/${getCityIdByName(city)}`}>{city}</Link>
    )
  }
};

export const EVENT_SCHEMA = {
  name: {
    title: "Events",
    getBodyFormat: (_, { id, name }) => <Link to={`/event/${id}`}>{name}</Link>,
    isKey: true,
    dataSort: true
  },
  location: {
    title: "Address",
    getBodyFormat: (_, { location: { display_address: address } }) => (
      <span>{address.join(", ")}</span>
    ),
    isKey: false,
    dataSort: false
  },
  interested_count: {
    title: "Interested Count",
    getBodyFormat: (_, { interested_count: count }) => <span>{count}</span>,
    isKey: false,
    dataSort: true
  },
  is_free: {
    title: "Free",
    getBodyFormat: (_, { is_free: isFree }) => (
      <span>{isFree ? "Yes" : "No"}</span>
    ),
    isKey: false,
    dataSort: true
  },
  description: {
    title: "Description",
    getBodyFormat: (_, { description }) => <span>{description}</span>,
    isKey: false,
    dataSort: false
  },
  category: {
    title: "Category",
    getBodyFormat: (_, { category }) => <span>{category}</span>,
    isKey: false,
    dataSort: true
  },
  time: {
    title: "Time",
    getBodyFormat: (_, { time_start: start, time_end: end }) => (
      <span>
        {new Date(start).toLocaleDateString()}
        {end && `- ${new Date(end).toLocaleDateString()}`}
      </span>
    ),
    isKey: false,
    dataSort: true
  },
  url: {
    title: "URL",
    getBodyFormat: (_, { event_site_url: url }) => (
      <a href={url} target="_blank" rel="noopener noreferrer">
        Yelp
      </a>
    ),
    isKey: false,
    dataSort: false
  }
};

export const EVENTS_PAGE_SCHEMA = {
  ...EVENT_SCHEMA,
  city: {
    title: "City",
    getBodyFormat: (_, { location: { city } }) => (
      <Link to={`/city/${getCityIdByName(city)}`}>{city}</Link>
    )
  }
};

export const CITY_SCHEMA = {
  image: {
    title: "Picture",
    getBodyFormat: _ => <span>INSERT PICTURE HERE</span>,
    isKey: false,
    dataSort: false
  },
  name: {
    title: "City",
    getBodyFormat: (_, { id, name }) => <Link to={`/city/${id}`}>{name}</Link>,
    isKey: true,
    dataSort: true
  },
  state: {
    title: "State",
    getBodyFormat: (_, { state }) => <span>{state}</span>,
    isKey: false,
    dataSort: true
  },
  population: {
    title: "Population",
    getBodyFormat: (_, { population }) => <span>{population}</span>,
    isKey: false,
    dataSort: true
  },
  description: {
    title: "Description",
    getBodyFormat: (_, { description }) => (
      <span>{description.replace(/^"|"$/g, "")}</span>
    ),
    isKey: false,
    dataSort: false
  }
};

export const ORDER_SCHEMA = [
  { title: "Ascending", key: "asc" },
  { title: "Descending", key: "desc" }
];

export const TABS = {
  restaurants: {
    key: "restaurants",
    title: "Restaurants"
  },
  airbnbs: {
    key: "airbnbs",
    title: "Airbnbs"
  },
  events: {
    key: "events",
    title: "Events"
  }
};
export const CATEGORIES = [
  {
    alias: "afghani",
    title: "Afghan"
  },
  {
    alias: "african",
    title: "African"
  },
  {
    alias: "arabian",
    title: "Arabian"
  },
  {
    alias: "argentine",
    title: "Argentine"
  },
  {
    alias: "armenian",
    title: "Armenian"
  },
  {
    alias: "asianfusion",
    title: "Asian Fusion"
  },
  {
    alias: "australian",
    title: "Australian"
  },
  {
    alias: "austrian",
    title: "Austrian"
  },
  {
    alias: "bangladeshi",
    title: "Bangladeshi"
  },
  {
    alias: "basque",
    title: "Basque"
  },
  {
    alias: "bbq",
    title: "Barbeque"
  },
  {
    alias: "belgian",
    title: "Belgian"
  },
  {
    alias: "brasseries",
    title: "Brasseries"
  },
  {
    alias: "brazilian",
    title: "Brazilian"
  },
  {
    alias: "breakfast_brunch",
    title: "Breakfast & Brunch"
  },
  {
    alias: "british",
    title: "British"
  },
  {
    alias: "buffets",
    title: "Buffets"
  },
  {
    alias: "bulgarian",
    title: "Bulgarian"
  },
  {
    alias: "burgers",
    title: "Burgers"
  },
  {
    alias: "burmese",
    title: "Burmese"
  },
  {
    alias: "cafes",
    title: "Cafes"
  },
  {
    alias: "cafeteria",
    title: "Cafeteria"
  },
  {
    alias: "cajun",
    title: "Cajun/Creole"
  },
  {
    alias: "cambodian",
    title: "Cambodian"
  },
  {
    alias: "caribbean",
    title: "Caribbean"
  },
  {
    alias: "catalan",
    title: "Catalan"
  },
  {
    alias: "cheesesteaks",
    title: "Cheesesteaks"
  },
  {
    alias: "chicken_wings",
    title: "Chicken Wings"
  },
  {
    alias: "chickenshop",
    title: "Chicken Shop"
  },
  {
    alias: "chinese",
    title: "Chinese"
  },
  {
    alias: "comfortfood",
    title: "Comfort Food"
  },
  {
    alias: "creperies",
    title: "Creperies"
  },
  {
    alias: "cuban",
    title: "Cuban"
  },
  {
    alias: "czech",
    title: "Czech"
  },
  {
    alias: "delis",
    title: "Delis"
  },
  {
    alias: "diners",
    title: "Diners"
  },
  {
    alias: "dinnertheater",
    title: "Dinner Theater"
  },
  {
    alias: "eritrean",
    title: "Eritrean"
  },
  {
    alias: "ethiopian",
    title: "Ethiopian"
  },
  {
    alias: "filipino",
    title: "Filipino"
  },
  {
    alias: "fishnchips",
    title: "Fish & Chips"
  },
  {
    alias: "fondue",
    title: "Fondue"
  },
  {
    alias: "food_court",
    title: "Food Court"
  },
  {
    alias: "foodstands",
    title: "Food Stands"
  },
  {
    alias: "french",
    title: "French"
  },
  {
    alias: "gamemeat",
    title: "Game Meat"
  },
  {
    alias: "gastropubs",
    title: "Gastropubs"
  },
  {
    alias: "georgian",
    title: "Georgian"
  },
  {
    alias: "german",
    title: "German"
  },
  {
    alias: "gluten_free",
    title: "Gluten-Free"
  },
  {
    alias: "greek",
    title: "Greek"
  },
  {
    alias: "guamanian",
    title: "Guamanian"
  },
  {
    alias: "halal",
    title: "Halal"
  },
  {
    alias: "hawaiian",
    title: "Hawaiian"
  },
  {
    alias: "himalayan",
    title: "Himalayan/Nepalese"
  },
  {
    alias: "hkcafe",
    title: "Hong Kong Style Cafe"
  },
  {
    alias: "honduran",
    title: "Honduran"
  },
  {
    alias: "hotdog",
    title: "Hot Dogs"
  },
  {
    alias: "hotdogs",
    title: "Fast Food"
  },
  {
    alias: "hotpot",
    title: "Hot Pot"
  },
  {
    alias: "hungarian",
    title: "Hungarian"
  },
  {
    alias: "iberian",
    title: "Iberian"
  },
  {
    alias: "indonesian",
    title: "Indonesian"
  },
  {
    alias: "indpak",
    title: "Indian"
  },
  {
    alias: "irish",
    title: "Irish"
  },
  {
    alias: "italian",
    title: "Italian"
  },
  {
    alias: "japanese",
    title: "Japanese"
  },
  {
    alias: "kebab",
    title: "Kebab"
  },
  {
    alias: "korean",
    title: "Korean"
  },
  {
    alias: "kosher",
    title: "Kosher"
  },
  {
    alias: "laotian",
    title: "Laotian"
  },
  {
    alias: "latin",
    title: "Latin American"
  },
  {
    alias: "malaysian",
    title: "Malaysian"
  },
  {
    alias: "mediterranean",
    title: "Mediterranean"
  },
  {
    alias: "mexican",
    title: "Mexican"
  },
  {
    alias: "mideastern",
    title: "Middle Eastern"
  },
  {
    alias: "modern_european",
    title: "Modern European"
  },
  {
    alias: "mongolian",
    title: "Mongolian"
  },
  {
    alias: "moroccan",
    title: "Moroccan"
  },
  {
    alias: "newamerican",
    title: "American (New)"
  },
  {
    alias: "newmexican",
    title: "New Mexican Cuisine"
  },
  {
    alias: "nicaraguan",
    title: "Nicaraguan"
  },
  {
    alias: "noodles",
    title: "Noodles"
  },
  {
    alias: "pakistani",
    title: "Pakistani"
  },
  {
    alias: "panasian",
    title: "Pan Asian"
  },
  {
    alias: "persian",
    title: "Persian/Iranian"
  },
  {
    alias: "peruvian",
    title: "Peruvian"
  },
  {
    alias: "pizza",
    title: "Pizza"
  },
  {
    alias: "polish",
    title: "Polish"
  },
  {
    alias: "polynesian",
    title: "Polynesian"
  },
  {
    alias: "popuprestaurants",
    title: "Pop-Up Restaurants"
  },
  {
    alias: "portuguese",
    title: "Portuguese"
  },
  {
    alias: "poutineries",
    title: "Poutineries"
  },
  {
    alias: "raw_food",
    title: "Live/Raw Food"
  },
  {
    alias: "russian",
    title: "Russian"
  },
  {
    alias: "salad",
    title: "Salad"
  },
  {
    alias: "sandwiches",
    title: "Sandwiches"
  },
  {
    alias: "scandinavian",
    title: "Scandinavian"
  },
  {
    alias: "scottish",
    title: "Scottish"
  },
  {
    alias: "seafood",
    title: "Seafood"
  },
  {
    alias: "singaporean",
    title: "Singaporean"
  },
  {
    alias: "slovakian",
    title: "Slovakian"
  },
  {
    alias: "somali",
    title: "Somali"
  },
  {
    alias: "soulfood",
    title: "Soul Food"
  },
  {
    alias: "soup",
    title: "Soup"
  },
  {
    alias: "southern",
    title: "Southern"
  },
  {
    alias: "spanish",
    title: "Spanish"
  },
  {
    alias: "srilankan",
    title: "Sri Lankan"
  },
  {
    alias: "steak",
    title: "Steakhouses"
  },
  {
    alias: "supperclubs",
    title: "Supper Clubs"
  },
  {
    alias: "sushi",
    title: "Sushi Bars"
  },
  {
    alias: "syrian",
    title: "Syrian"
  },
  {
    alias: "taiwanese",
    title: "Taiwanese"
  },
  {
    alias: "tapas",
    title: "Tapas Bars"
  },
  {
    alias: "tapasmallplates",
    title: "Tapas/Small Plates"
  },
  {
    alias: "tex-mex",
    title: "Tex-Mex"
  },
  {
    alias: "thai",
    title: "Thai"
  },
  {
    alias: "tradamerican",
    title: "American (Traditional)"
  },
  {
    alias: "turkish",
    title: "Turkish"
  },
  {
    alias: "ukrainian",
    title: "Ukrainian"
  },
  {
    alias: "uzbek",
    title: "Uzbek"
  },
  {
    alias: "vegan",
    title: "Vegan"
  },
  {
    alias: "vegetarian",
    title: "Vegetarian"
  },
  {
    alias: "vietnamese",
    title: "Vietnamese"
  },
  {
    alias: "waffles",
    title: "Waffles"
  },
  {
    alias: "wraps",
    title: "Wraps"
  }
];
