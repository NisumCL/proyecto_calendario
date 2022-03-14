/* eslint-disable */
const { MongoClient, ObjectID} = require('mongodb')
const { readData} = require('../utils/service');
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName= 'nisum-workers'



//pendiente: en este punto podriamos haber visto la manera de ejecutar en terminal la creacion de una base de datos
//a partir de nuestro archivo csv con la linea de comandos en el string de la linea 15. Probablemente con el modulo electron js y el metodo webcontent.executeJavascript
// sin embargo, decidimos hacer aprovechar el backend y crear la base de datos con el arreglo que originalmente manipulabamos.

//esto contiene el string de creacion de la base de datos, pero el exec no lo usamos
// const exec = require('child_process').exec;
// let mongoToImport = 'mongoimport -d nisum-workers -c workers --type CSV --file mails_y_cumples_03.csv --headerline';
// exec(mongoToImport, function(error, stdout, stderr) {
//   console.log('exec')
// })

const createDataBase = () => {
    MongoClient.connect( connectionURL, {useNewUrlParser: true}, (error, client)=>{
        if(error){
            return console.log('Unable to connect to database')
        }
        const db = client.db(databaseName)
        const  workersData = readData()
    
        db.collection('workers').insertMany(workersData, (error, result) =>{
            if(error){
                return console.log('Unable to insert many users')
            }
            console.log('Database nisum-workers, collection workers and documents worker succesfully created')
        })
    })
}

module.exports = createDataBase












