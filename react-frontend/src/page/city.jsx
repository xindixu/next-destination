import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import apiFetch from "../lib/api-fetch";
import Restaurants from "../containers/restaurants";
import Events from "../containers/events";
import Airbnbs from "../containers/airbnbs";
import Tabs from "../components/tabs";
import { RESTAURANT_SCHEMA, EVENT_SCHEMA, TABS } from "../lib/constants";

const City = () => {
  const { id } = useParams();

  const [city, setCity] = useState(null);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showAirbnbs, setShowAirbnbs] = useState(true);

  // TODO: data should be passed down from parent
  useEffect(() => {
    apiFetch(`/city/${id}`, {})
      .then(data => {
        setCity(data.city);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://api.teleport.org/api/urban_areas/slug:${id}/images/`)
      .then(resp => resp.json())
      .then(data => {
        try {
          setImage(data.photos[0].image.web);
        } catch (error) {
          setImage();
        }
      });
  }, []);

  if (city) {
    const { state, latitude, longitude, population, description, name } = city;

    const eventProps = {
      eventKey: TABS.events.key,
      title: TABS.events.title,
      content: <Events city={id} tableSchema={EVENT_SCHEMA} />
    };
    const restaurantProps = {
      eventKey: TABS.restaurants.key,
      title: TABS.restaurants.title,
      content: <Restaurants city={id} tableSchema={RESTAURANT_SCHEMA} />
    };
    const airbnbProps = {
      eventKey: TABS.airbnbs.key,
      title: TABS.airbnbs.title,
      content: (
        <Airbnbs
          city={name}
          setShowAirbnbs={setShowAirbnbs}
          setActiveTab={() => {}}
        />
      )
    };

    const tabs = [restaurantProps, eventProps];
    if (showAirbnbs) {
      tabs.push(airbnbProps);
    }

    return (
      <>
        <div className="header-image-container">
          <img src={image} alt={name} />
        </div>
        <h1>
          {name}, {state}{" "}
        </h1>

        {/* TODO: extract this component */}
        <div className="description">
          <h2>Description</h2>
          <p>{description.replace(/^"|"$/g, "")}</p>
          <h2>Statistics</h2>
          <div className="stat-table">
            <Table>
              <tr>
                <th>Population</th>
                <th>Longitude</th>
                <th>Latitude</th>
              </tr>
              <tr>
                <td>{population}</td>
                <td>{longitude}</td>
                <td>{latitude}</td>
              </tr>
            </Table>
          </div>
        </div>

        <Tabs tabs={tabs} />
      </>
    );
  }

  return <> </>;
};

export default City;
