#!/bin/bash

GREEN='\033[1;32m'
if [ -z "$1" ]; then
    echo -e "No argument supplied"
fi


python manage.py runserver localhost:8000
