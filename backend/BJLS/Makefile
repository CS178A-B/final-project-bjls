WEBSITE="application"

build:
	docker-compose build

clean:
	docker system prune -f
	docker system prune -f --volumes
	
createsuperuser:
	docker-compose run $(WEBSITE) python manage.py createsuperuser

down:
	docker-compose down

logs:
	docker-compose logs

makemigrations:
	docker-compose run $(WEBSITE) python manage.py makemigrations

migrate:
	docker-compose run $(WEBSITE) python manage.py migrate

push:
	docker-compose push

up:
	docker-compose up

up-b:
	docker-compose up --build

up-bd:
	docker-compose up --build -d

style:
	pycodestyle --ignore=E501,W291,W293 application/

style-ubuntu:
	python -m pycodestyle --ignore=E501,W291,W293 application/

test:
	docker-compose run $(WEBSITE) coverage run manage.py test --no-input
	
test-report:
	docker-compose run $(WEBSITE) coverage report -m

fix-postgres:
	kill -9 $(sudo lsof -t -i:5432)
