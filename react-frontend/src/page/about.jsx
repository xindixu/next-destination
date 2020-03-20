import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Spinner
} from "reactstrap";

import apiFetch from "../lib/api-fetch";
import marshallPhoto from "../assets/marshall_portrait.jpg";
import yulissaPhoto from "../assets/yulissa_portrait.jpg";
import quintonPhoto from "../assets/quinton_portrait.jpg";
import nathanPhoto from "../assets/nathan_portrait.jpg";
import xindiPhoto from "../assets/xindi_portrait.jpg";
import "./about.css";

const photos = {
  marshall: marshallPhoto,
  yulissa: yulissaPhoto,
  quinton: quintonPhoto,
  nathan: nathanPhoto,
  xindi: xindiPhoto
};
const People = () => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    apiFetch("/about", { json: true, useApi: true }).then(data =>
      setPeople(data.about)
    );
  }, []);

  return (
    <div className="body">
      <Container>
        <h1>About Us</h1>
        <h2>The Project</h2>
        <div className="flex-links">
          <p>
            This project connects music-focused travellers to artists, venues,
            and cities.
          </p>
          <ul>
            <p>
              <b>Links about our project</b>
            </p>
            <li>
              <a
                href="https://gitlab.com/nmcraig/cs-331e/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Our Issue Tracker
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://gitlab.com/nmcraig/cs-331e/"
              >
                Our Repo
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://gitlab.com/nmcraig/cs-331e/-/wikis/Phase-1-Development"
              >
                Our report for phase 1 Development
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://gitlab.com/nmcraig/cs-331e/-/wikis/Technical-Report"
              >
                The overall technical report
              </a>
            </li>
            <p>
              <b>Links about Data</b>
            </p>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.artists.bandsintown.com/support/api-installation"
              >
                Artists and Venues through BandsinTown
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://developers.teleport.org/api/getting_started/#search_name"
              >
                City Searching Feature and Photo Database
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.mediawiki.org/wiki/API:Main_page"
              >
                Information about Cities
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://insideairbnb.com/get-the-data.html"
              >
                Airbnb Data for Different Cities
              </a>
            </li>
            <p>
              <b>Links about Tools</b>
            </p>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://reactjs.org/"
              >
                Frontend - React.js
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://palletsprojects.com/p/flask/"
              >
                Backend - Flask
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://reactstrap.github.io/"
              >
                CSS - Reactstrap - a bootstrap library for react
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://insideairbnb.com/get-the-data.html"
              >
                Airbnb Data for Different Cities
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://slack.com/"
              >
                Communication and gitlab integration done with Slack
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://cloud.google.com/"
              >
                Deployment through Google Cloud Platform
              </a>
            </li>
          </ul>
        </div>
        <h2>The Team</h2>
        <Row>
          {people.length ? (
            people.map(
              ({
                name,
                responsibilities,
                stats: { commits, issues },
                description,
                id
              }) => (
                <Col key={name} xs={12} sm={12} md={6} lg={4}>
                  <Card>
                    <CardBody>
                      <CardTitle>{name}</CardTitle>
                      <img src={photos[id]} alt={name} />
                      <CardText>Skills: {responsibilities}</CardText>
                      <CardText>Description: {description}</CardText>
                      <CardText>Commits: {commits} </CardText>
                      <CardText>Issues: {issues} </CardText>
                    </CardBody>
                  </Card>
                </Col>
              )
            )
          ) : (
            <div className="w-100 d-flex justify-content-center">
              <Spinner type="grow" color="info" />
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default People;
