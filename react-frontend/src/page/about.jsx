import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  Spinner,
  Card,
  Container,
  CardDeck,
  Col,
  Row
} from "react-bootstrap";
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

const UnitTestResult = ({ response }) => {
  const { results, spentMilliseconds: totalTime } = response;

  return (
    <>
      <Table triped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Statues</th>
            <th>Description</th>
            <th>Name</th>
            <th>Time Spent (ms)</th>
          </tr>
        </thead>
        <tbody>
          {results.map(({ type, description, name, spentMilliseconds }) => (
            <tr>
              <td>{type}</td>
              <td>{description}</td>
              <td>{name}</td>
              <td>{spentMilliseconds}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>Total time spent: {totalTime}</p>
    </>
  );
};

const About = () => {
  const [people, setPeople] = useState([]);
  const [unitTestResult, setUnitTestResult] = useState("");
  useEffect(() => {
    apiFetch("/about", { json: true, useApi: true }).then(data =>
      setPeople(data.about)
    );
  }, []);

  const runTests = useCallback(() => {
    apiFetch("/unittests", { json: true }).then(setUnitTestResult);
  }, []);

  return (
    <div className="about">
      <Container>
        <h1>About Us</h1>
        <h2>Run unit tests</h2>
        <button
          onClick={runTests}
          type="button"
          className="btn btn-outline-primary w-100 mb-lg-3"
        >
          Run Unit tests
        </button>
        {unitTestResult && <UnitTestResult response={unitTestResult} />}

        <h2>The Project</h2>
        <div className="flex-links">
          <p>
            This project connects music-focused travellers to artists, venues,
            and cities.
          </p>
          <h3>Links about our project</h3>
          <ul>
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
          </ul>

          <h3>Links about Data</h3>
          <ul>
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
          </ul>

          <h3>Links about Tools</h3>
          <ul>
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
                href="https://react-bootstrap.netlify.com/"
              >
                CSS - React-Bootstrap - a bootstrap library for react
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
                <Col key={name} xs={12} sm={12} md={6} lg={4} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={photos[id]} alt={name} />
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                      <Card.Text>Skills: {responsibilities}</Card.Text>
                      <Card.Text>Description: {description}</Card.Text>
                      <Card.Text>Commits: {commits} </Card.Text>
                      <Card.Text>Issues: {issues} </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
            )
          ) : (
            <div className="w-100 d-flex justify-content-center">
              <Spinner animation="border" variant="info" />
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default About;
