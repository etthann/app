import os
from dotenv import load_dotenv
import requests
import re

load_dotenv()

OMDB_API_KEY = os.getenv('OMDB_API_KEY')
OMDB_BASE_URL = 'http://www.omdbapi.com/'

def get_movie_data(title):
    match = re.search(r'\((\d{4})\)', title)
    year = match.group(1) if match else None
    title = re.sub(r'\s*\(\d{4}\)$', '', title)
    params = {
        'apikey': OMDB_API_KEY,
        't': title
    }
    if year:
        params['y'] = year
    response = requests.get(OMDB_BASE_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        if 'Poster' in data and data['Poster'] != 'N/A':
            return data['Poster'], data['Plot'], data['Genre'], data['Director'], data['Actors'], data['imdbRating'], data['Year']
    return None, None, None, None, None, None, None
