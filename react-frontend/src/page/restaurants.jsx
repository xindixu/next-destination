import React, { useContext } from "react";
import Restaurants from "../containers/restaurants";
import { CityHuntContext } from "../App";
import { RESTAURANTS_PAGE_SCHEMA } from "../lib/constants";

const RestaurantsPage = () => {
  const { coordinates } = useContext(CityHuntContext);
  return (
    <>
      <h1>Restaurants</h1>
      {coordinates ? (
        <Restaurants
          tableSchema={RESTAURANTS_PAGE_SCHEMA}
          coordinates={coordinates}
        />
      ) : (
        // <></>
        <Restaurants tableSchema={RESTAURANTS_PAGE_SCHEMA} city="austin" />
      )}
    </>
  );
};

export default RestaurantsPage;
