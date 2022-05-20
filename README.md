# Chinese Restaurant API

Este documento contiene la información necesaria para correr la API y brindar información de qué se puede hacer con ella.

**Nota: Es importante que la api esté corriendo para el correcto funcionamiento del Front-End.**

## Comandos

### `npm install`

Se instalarán todas las dependencias con este comando.

### `npm start`

Corre el proyecto en el puerto seleccionado en el archivo .env del proyecto (En este caso, PORT = 1234).

## Funcionalidades

La url base de la api es http://localhost:1234/api/actions. A continuación se listan las rutas de las acciones:

### /create `method: "POST"`

#### endpoint

http://localhost:1234/api/actions/create

#### Petición de ejemplo

`{ "document": { "name": "Nombre del platillo", "description": "Descripción del platillo", "price": "Precio del platillo" } }`
`document`: Contiene la información del platillo que será insertada en la base de datos.

### /retrieve `method: "GET"`

#### endpoint

http://localhost:1234/api/actions/retrieve

#### Petición sin params

Retorna un array con todos los platillos existentes en la base de datos.

#### Petición con params

##### params iguales a id o name

Retorna un array con todos el/los platillo/s que tenga/n el nombre exacto `{ "name": "<nombre exacto>" }` o el platillo correspondiente al id `{ "id": "<id del platillo>" }`

##### params diferentes de id o name

Retorna bad request.

### /update `method: "PUT"`

#### endpoint

http://localhost:1234/api/actions/update

#### Petición de ejemplo

`{ "document": { "id": "<id del platillo>" }, "newDocument":{ <atributos que se quieran actualizar o insertar> } }`
`document`: Contiene el id del platillo que desea actualizar.
`newDocument`: Contiene la nueva información del platillo que se desea actualizar o insertar en caso de no poseerla.

### /remove `method: "DELETE"`

#### endpoint

http://localhost:1234/api/actions/remove

#### Petición de ejemplo

`{ "document": { "id": "<id del platillo>" } }`
`document`: Contiene el id del platillo que desea eliminar.
