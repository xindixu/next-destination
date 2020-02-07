export FLASK_ENV=development
export FLASK_DEBUG=1
export FLASK_APP=main.py
export FLASK_PORT=8080
REACT_PORT=5000
PROJECT = "The World"

ifeq ($(shell uname), Darwin)          # Apple
    PYTHON   := python3
    PIP      := pip3
    PYLINT   := pylint
    COVERAGE := coverage
    PYDOC    := pydoc3
    AUTOPEP8 := autopep8
else ifeq ($(shell uname -p), unknown) # Windows
    PYTHON   := python                 # on my machine it's python
    PIP      := pip3
    PYLINT   := pylint
    COVERAGE := coverage
    PYDOC    := python -m pydoc        # on my machine it's pydoc
    AUTOPEP8 := autopep8
else                                   # UTCS
    PYTHON   := python3
    PIP      := pip3
    PYLINT   := pylint3
    COVERAGE := coverage
    PYDOC    := pydoc3
    AUTOPEP8 := autopep8
endif

flask: ;@echo "Flask served on http://localhost:${FLASK_PORT}....."; 
	cd flask-backend && flask run -p${FLASK_PORT}

react: ;@echo "React running on http://localhost:${REACT_PORT}.....";
	cd react-frontend && yarn start

website: ;@echo "Running ${PROJECT}....."; 
	make flask && react

setup: ;@echo "Setting up ${PROJECT}....."; 
	cd react-frontend && yarn install
	cd ..
	cd flask-backend && pip install requirements.txt
