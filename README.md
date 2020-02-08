# The World
This is a project for CS 331E Software Engineering Class in University of Texas at Austin.

This app uses Python Flask as backend, React as frontend, and postgreSQL as database.

## Setting it up!

1. You will need [node.js](https://nodejs.org/en/download/) and [python3](https://www.python.org/downloads/) to start. You can download them from their official website or with [brew](https://docs.brew.sh/). 
  To check if you install them correctly, in a terminal, run: 
  ```
  $ node -v
  v13.7.0

  $ python3 --version
  Python 3.7.6
  ```

2. Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [pip](https://pip.pypa.io/en/stable/installing/)
  They are package managers for JavaScript and Python
  To check if you install them correctly, in a terminal, run: 
  ```
  $ npm --version
  6.13.6

  $ pip --version
  pip 20.0.2 from /usr/local/Cellar/python/3.7.6_1/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages/pip
  ```

3. (Optionally) Install [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable). It is another package manager that come with emojis!

4. (Optionally) Install virtual environments for python. [Guide](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)
A virtual environment allow you to create a isolated sandbox for each project you are working on.

5. Use our makefile to setup and run:
   In your terminal at the root, run `make setup`. You will see: "Setting up ..."
   In your terminal at the root, run `make website`. You will see: "Running ...". It will start both the react and flask server and give you the port where they are served.

6. To install extra dependencies:
JS (frontend): `yarn add [package-name]` or `yarn add <package_name> -D` to save as a dev-dependency
Python (backend): `pip install [package-name]`

## Run!

1. At this project root level, do `make website`. It will spin up the React and Flask server. React is served on http://localhost:5000 and Flask is served on http://127.0.0.1:8080. These two windows should be open automatically. Give it a bit time to bundle and run. Also try refreshing if nothing showed up. 

2. Note that the makefile will not activate the virtualenv. So you'll have to manually activate that if you plan on using it.

3. The React app will be build with `yarn run build` and it need to be placed under `flask-backend/static/react`. The output `index.html` should be placed in `flask-backend/template`

4. When you commit your changes, DO NOT, commit react build files (i.e. `flask-backend/static/react` directory).

5. To link React with Flask, do `make deploy`. Then refresh the Flask webpage, React should link with Flask.