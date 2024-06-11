FROM python:3.12

COPY . /flask_server

WORKDIR /flask_server

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD [ "python", "main.py" ]