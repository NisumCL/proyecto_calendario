/* eslint-disable */
const fs = require('fs');
const readline = require('readline');
// const {google} = require('googleapis');
// const axios = require('axios').default;
const express = require('express');
const { GoogleSpreadsheet} = require('google-spreadsheet');
const pug = require('pug');
const credentials = require('./json/credentials.json');






//INSTRUCCIONES

//video de la suerte https://www.youtube.com/watch?v=crIC5JbS5tc y https://www.youtube.com/watch?v=lNattW06LlA
// instalar npm google-spreadsheet nodemon pug
//ir a console.developers.google.com a fabricarse las putas credencialesS
//id trainees-nisum-birthdays-169
// Correo electrónico
// trainees-nisum-birthdays-447@trainees-nisum-birthdays.iam.gserviceaccount.com. ESTE ES MI MAIL DE CUENTA DE SERVICIO DE GOOGLE, QUE TAMBIEN ESTA EN LAS CREDENCIALES QUE HE CREADO
//LO QUE DEBO HACER ES COMPARTIR MI SPREADSHEET CON ESE MAIL DE CUENTA DE SERVICIO, TODO CON EL FIN DE CUMPLIR CON L AUTENTICACION.

// ID único
// 100031541886570755018
//name Trainees-nisum-birthdays
//ya me hice mi proyecto sin ubicacion en mi correo personal, porque el de nisum me pide servicios
//le pongo el boton de habilitar apis y servicios
//habilito la api de google drive y despues la de gogle sheet
//habilito pinchando en la biblioteca y despues le pongo crear credenciales a cada una
// le pongo que quiero que sea la api de google drive, que voy a hacer un servidor de node y que quiero acceder a datos de la aplicacion
//nombre de la cuenta de servicio : nisumbirthdaysheet
// nisumbirthdaysheet
// ID de la cuenta de servicio de @trainees-nisum-birthdays.iam.gserviceacco 
// ID de la cuenta de servicio *
// @trainees-nisum-birthdays.iam.gserviceacco
//ya logre hacerme el json, lo pongo en el proyecto y le cambio el nombre a credenciales.json
const app = express();
//nombre proyecto: Nisum birthdays
//id: arboreal-cosmos-344223
let googleDocId = '1X5mSu78hNXki5sKj_vD7hZIDpWwRJAzGf33otJG2MY0' //esto es el id de mi spreadsheet en google drive""entre barras"
async function enterGoogleSheet () {
  const document = new GoogleSpreadsheet(googleDocId);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();

  const sheet = document.sheetsByIndex[0];
  const sheetRows =  await sheet.getRows() 

  return sheetRows

  console.log(sheetRows)
}

enterGoogleSheet()

const port = 3000
app.listen(port, () =>{
    console.log('server is up and port ' + port)
})