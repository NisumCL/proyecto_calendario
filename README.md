
# **Proyecto calendario 🗓️**

###### Esta aplicación muestra los cumpleaños de los funcionarios de NISUM dentro de intervalos fijados por el usuario, en un lapso máximo de 365 días.

###### Fue desarrollada por las integrantes del Programa Trainee NISUM Chile del 2022.

##### Funcionalidades

Consta de 3 opciones:

1. Mostrar los cumpleaños que caen entre dos fechas determinadas por el usuario
2. Mostrar los cumpleaños del mes en curso
3. Mostrar los cumpleaños del próximo mes

##### Indicaciones

En la opción de mostrar cumpleaños entre dos fechas personalizadas:

- Se debe entregar dos fechas
- Si no se entrega ninguna fecha, o bien, alguna de las fechas está erronea o ausente, se acusa el error y no se muestran cumpleaños.
- Si se entregan dos fechas iguales, sólo se muestran los cumpleaños que caigan en ese único día.
- Si se entrega una primera fecha mayor a la segunda, se muestra correctamente dicho intervalo, como si la segunda fecha correspondiera al año siguiente de la primera. Siempre se busca en intervalos hacia el futuro.

##### Observaciones

- Esta aplicación no tiene por objetivo actualizar la nómina de cumpleaños de empleados de NISUM, sino sólo mostrar cumpleaños ya registrados.
- Esta aplicación arroja los cumpleaños para el año en curso y a lo sumo, parte del año próximo.
- Esta aplicación consulta una base de datos construida a partir de una Googlespreadsheet que contiene la nómina de personas cuyas fechas de cumpleaños se requiere buscar.
- La base de datos es creada ejecutando un archivo separado de la aplicación (detallado en las instrucciones). En caso de que ya exista, este archivo no vuelve a ejecutar su creación.

##### Instrucciones
Para poder hacer uso de esta aplicación se debe:
1. Instalar o tener instalado [Node.js](https://nodejs.org/). Esta aplicación funciona correctamente con la última versión de [Node.js](https://nodejs.org/), v10.
2. Clonar este repositorio a un repositorio local.
3. 
```sh
git clone https://github.com/NisumCL/proyecto_calendario.git
```
3. En el terminal preferido, posicionarse en la carpeta del repositorio y ejecutar:

```sh
cd proyecto_calendario
npm i
```
4. Para crear la base de datos, ejecutar:
```sh
node src/db/mongo.js
```
5. A continuación, en el mismo terminal, ejecutar:

```sh
npm run start
```
6. En el navegador, la aplicacion utiliza el puerto 3000, de manera que se visualiza en **http://localhost:3000/**

7. Es muy recomendable, aunque opcional, tener instalados Mongo, Mongoimport y Robo3t para poder visualizar la base de datos una vez creada. 

##### Tecnologías empleadas en la aplicación:

- [Markdown](https://markdown.es/sintaxis-markdown/)
- [Node](https://nodejs.org/)
- [Express](http://expressjs.com/)
- [CSS](http://www.csszengarden.com/)
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Mongo](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

##### Referencias y tecnología que se usó para construir la aplicación:

- [Como generar una API para rescatar registros desde Googlespreadsheets](https://www.youtube.com/watch?v=crIC5JbS5tc)
- [Como hacer a Mongodb y Mongoimport ejecutables desde terminal y así poder crear bases de datos en lineas de comando](https://www.youtube.com/watch?v=nuQD3Xfr0KY).
- la línea de comandos que empleamos para crear una base de datos a partir de csv desde el terminal fue:
###### 'mongoimport -d nisum-workers -c workers --type CSV --file mails_y_cumples_03.csv --headerline'
- [Robo3t](https://robomongo.org/)
- [Postman](https://www.postman.com/)


##### Colaboraciones y Sugerencias:
Estamos muy contentas de recibir sugerencias 👌.

@Programa Trainee Chile 2022