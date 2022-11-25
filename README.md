# Prueba técnica - BACKEND - Suma Wealth

---

## Objetivos del Proyecto

- Desarrollar una API en Node.js que permita crear, actualice, elimine y obtenga los datos sobre aeropuertos, aerolíneas y vuelos proporcionados.
- La API debe tener documentación sobre cómo usarla como si estuviera entregando esta API a und desarrollador front-end.
- Integrar con una base de datos PostgreSQL y construir seeders para poblar la base de datos con los datos proporcionados.

## Comenzando

1.  Forkear el repositorio para tener una copia del mismo en sus cuentas
2.  Clonar el repositorio en sus computadoras para comenzar a trabajar

Tendrán un `boilerplate` con la estructura general del servidor.

3.  En la carpeta raiz crear un archivo llamado: `.env` que tenga la siguiente forma:

```env
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
DB_NAME=airline
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario crear desde psql una base de datos llamada `airline`

4.  Instrucciones para iniciar:

- Instalar dependecias ingresando en nuestro terminal el comando:

```bash
npm install
```

- Inicializar ingresando el comando:

```bash
npm start
```

3.  Una vez inicializado se cargaran automaticamente los aeropuertos y las aerolineas en la base de datos.
    Por el gran tamaño del archivo de datos de vuelos ("flights.csv") adjunto en el correo electronico se debera cargar manualmente de la siguiente manera:

    A- Dentro de la interfaz grafica de postgresSQL "pgAdmin 4", accedemos a las tablas ya creadas dentro de la base de datos(airline -> Schemas -> Tables)<p align="left"><img height="300"  src="./Assets/ScreenShots/tablas.jpg" /><p>

    B- Nos situamos sobre la tabla "fligths" y hacemos click derecho clickeando "query tool" en el menu que se nos despiega<p align="left"><img height="300"  src="./Assets/ScreenShots/query tool.jpg" /><p>

    C- ingresamos el siguiente script:

    ```
    COPY PUBLIC.flights (YEAR,MONTH,DAY,DAY_OF_WEEK,AIRLINE,FLIGHT_NUMBER,TAIL_NUMBER,ORIGIN_AIRPORT,DESTINATION_AIRPORT,SCHEDULED_DEPARTURE,DEPARTURE_TIME,DEPARTURE_DELAY,TAXI_OUT,WHEELS_OFF,SCHEDULED_TIME,ELAPSED_TIME,AIR_TIME,DISTANCE,WHEELS_ON,TAXI_IN,SCHEDULED_ARRIVAL,ARRIVAL_TIME,ARRIVAL_DELAY,DIVERTED,CANCELLED,CANCELLATION_REASON,AIR_SYSTEM_DELAY,SECURITY_DELAY,AIRLINE_DELAY,LATE_AIRCRAFT_DELAY,WEATHER_DELAY)

    from 'C:\\TU_RUTA\flights.csv' WITH DELIMITER ',' CSV HEADER;
    ```

    > **IMPORTANTE:** Reemplazar `TU_RUTA` por la ruta donde tengas guardado el archivo `flights.csv`<p align="left"><img height="300"  src="./Assets/ScreenShots/carpeta.jpg" /><p>

    D- Quedandonos como en la imagen:<p align="left"><img height="150"  src="./Assets/ScreenShots/pgadmin.jpg" /><p>
    clickeamos el boton de "play" remarcado en rojo, en la parte inferior veremos un contador, una vez que finalize tendremos cargados los datos de los vuelos en la base de datos. Si todo salio correctamente deberiamos visualizar un mensaje como el siguiente:<p align="left"><img height="220"  src="./Assets/ScreenShots/finish.jpg" /><p>

---
