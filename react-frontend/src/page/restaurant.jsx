import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiFetch from "../lib/api-fetch";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    apiFetch(`/restaurant/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setRestaurant(data.response);
      });
  }, []);

  if (!restaurant) {
    return <></>;
  }

  const {
    name,
    categories,
    location: { display_address: address },
    image_url: image,
    coordinates: { latitude, longitude },
    price
  } = restaurant;
  return (
    <>
      <h1>{name}</h1>
      <img src={image} alt={name} />
      {categories.map(({ title }) => (
        <span key={title}>#{title}</span>
      ))}
      <p>
        ({latitude}, {longitude}){" "}
      </p>
      <p>{address}</p>
      <p>{price}</p>
    </>
  );
};

export default Restaurant;
