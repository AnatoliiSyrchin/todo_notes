FROM python:3.11.3

RUN apt update && apt install -y postgresql postgresql-contrib libpq-dev python3-dev
RUN pip install --upgrade pip

COPY ./ ./
RUN pip3 install -r requirements.txt

RUN pip install gunicorn

# COPY wait-for-postgres.sh .
# RUN chmod +x wait-for-postgres.sh