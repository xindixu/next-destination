import React, { useContext } from "react";
import Restaurants from "../containers/restaurants";
import { CityHuntContext } from "../App";

const RestaurantsPage = () => {
  const { coordinates } = useContext(CityHuntContext);
  return (
    <>
      <h1>Restaurants</h1>
      {coordinates ? <Restaurants coordinates={coordinates} /> : <></>}
    </>
  );
};

export default RestaurantsPage;