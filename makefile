export FLASK_ENV=development
export FLASK_DEBUG=1
export FLASK_APP=main.py
export FLASK_PORT=5000
export REACT_PORT=3000
export PROJECT="The World"

flask: ;@echo "Flask served on http://127.0.0.1:${FLASK_PORT}....."; 
	cd flask-backend && flask run -p${FLASK_PORT} 

react: ;@echo "React running on http://localhost:${REACT_PORT}.....";
	cd react-frontend && yarn start

website: 
	make -j 2 flask react

setup: ;@echo "Setting up ${PROJECT}....."; 
	cd flask-backend && pip install -r requirement.txt
	cd react-frontend && yarn install

deploy: ;@echo "Building ${PROJECT}....."; 
	cd react-frontend && yarn install && yarn build 
	cp -a react-frontend/build/. flask-backend/static/react
	cp -a flask-backend/static/react/index.html flask-backend/templates/index.html 

ifeq ($(shell uname), Darwin)          # Apple
    PYDOC := pydoc3
else ifeq ($(shell uname -p), unknown) # Windows
    PYDOC := python -m pydoc        # on my machine it's pydoc

endif

models.html: flask-backend/models.py
	$(PYDOC) -w models

IDB2.log:
	git log > IDB2.log
