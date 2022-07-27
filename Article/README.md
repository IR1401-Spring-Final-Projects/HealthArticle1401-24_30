# Article Retrieval System
This is a retreival system based on [Semantic Scholar](https://www.semanticscholar.org/) papers.

For this system to work you need to start a react app for frontend and a Django app for backend.

You can find our notebooks in notebooks folder.

## Run Django Server
To run Django App first go to backend directory. Create virtualEnv and then install requirements. You can install requirements with:
### `pip install -r requirements.txt`

You need to download models from [here](https://github.com/sudoparsa/information-retrieval). Paste the models folder in backend directory.
Also, you need to have elasticsearch-7.3.2 installed on your local.

To start the server, open the windows command prompt and type the following command:
### `python manage.py runserver`

## Run React App
To run the frontend project go to frontend directory. If you don't have nodejs and npm on your pc, first install them.
Then for first time run:
### `npm install`

Now you can run:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
