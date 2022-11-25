# Frontend

### Endpoints/Flags que pueden utilizar:

#### AIRLINES

- GET <http://localhost:3001/airlines> --> pedir todas las aerolineas de la base de datos.
- GET <http://localhost:3001/airlines/{id}> --> pedir aerolinea particular mediante un ID proporcionado por params.
- GET <http://localhost:3001/airlines?name={nombre}> --> pedir aerolinea mediante un nombre específico. Pasar nombre por query con el `'key': 'name'`.(ej: `http://localhost:3001/airlines?name=Alaska Airlines Inc`).

- POST <http://localhost:3001/airlines> --> Crear una nueva aerolinea. Pasar por por body los siguientes parametros:

  ```bash
  {
    "iata_code":"AA",
    "airline":"Aerolinea de ejemplo"
  }
  ```

- PUT <http://localhost:3001/airlines/{id}> --> Modificar una aerolinia particular mediante un ID proporcionado por params, y los mismos parametros que queramos modificar por body al igual que el `POST`.

- DELETE <http://localhost:3001/airlines/{id}> --> Borrar una aerolinia particular mediante un ID proporcionado por params.

#### AIRPORTS

- GET <http://localhost:3001/airports> --> pedir todos los aeropuertos de la base de datos.
- GET <http://localhost:3001/airports/{id}> --> pedir aeropuerto particular mediante un ID proporcionado por params.
- GET <http://localhost:3001/airports?name={nombre}> --> pedir aeropuertos mediante un nombre específico. Pasar nombre por query con el `'key': 'name'`.(ej: `http://localhost:3001/airports?name=Southwest Georgia Regional Airport`).
- GET <http://localhost:3001/airports?city={city}> --> pedir aeropuertos pertenecientes a una ciudad particular. Pasar el nombre de la ciudad por query con el `'key': 'city'`.(ej: `http://localhost:3001/airports?city=Aberdeen`).
- GET <http://localhost:3001/airports?country={country}> --> pedir aeropuertos pertenecientes a un pais particular. Pasar las siglas del pais por query con el `'key': 'country'`.(ej: `http://localhost:3001/airports?country=usa`).

- POST <http://localhost:3001/airports> --> Crear un nuevo aeropuerto. Pasar por por body los siguientes parametros:

  ```bash
  {
    "iata_code": "ABC",
    "airport": "Aeropuerto de ejemplo",
    "city": "Albany",
    "state": "GA",
    "country": "USA",
    "latitude": 31.53552,
    "longitude": -84.19447
  }
  ```

- PUT <http://localhost:3001/airports/{id}> --> Modificar un aeropuerto particular mediante un ID proporcionado por params, y los mismos parametros que queramos modificar por body al igual que el `POST`.

#### FLIGHTS
