export FLASK_ENV=development
export FLASK_DEBUG=1
export FLASK_APP=main.py
export FLASK_PORT=8080
REACT_PORT=5000
PROJECT = "The World"

flask: ;@echo "Flask served on http://localhost:${FLASK_PORT}....."; 
	cd flask-backend && flask run -p${FLASK_PORT}

react: ;@echo "React running on http://localhost:${REACT_PORT}.....";
	cd react-frontend && yarn start

website: ;@echo "Running ${PROJECT}....."; 
	make flask && react

setup: ;@echo "Setting up ${PROJECT}....."; 
	cd react-frontend && yarn install
	cd ..
	cd flask-backend && pip isntall requirements.txt
