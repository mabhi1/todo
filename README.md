# todo

A simple ToDo app using Django and React Native ( expo ) in typescript

# How to run

Clone this repo and the perform following steps to run server and client

## For server

1. Create your own virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install the requirements

```bash
pip install -r requirements.txt
```

3. Migrate

```bash
python manage.py migrate
```

4. Run Server

```bash
python manage.py runserver
```

## For Client

1. Install dependencies

```bash
npm install
```

2. Run Client

```bash
npm start
```

## Important

Since React Native projects cannot directly communicate to local servers.\
Consider using ngrok to make a connection between client and server.\
Replace your new ngrok url with the existing one in serverURL.ts file in the client folder.
