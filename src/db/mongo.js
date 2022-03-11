/* eslint-disable */
const { MongoClient, ObjectID} = require('mongodb')
const router = require('../../../task-manager/src/routers/user')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName= 'nisum-workers'

//pendiente
// const exec = require('child_process').exec;
// let mongoToImport = 'mongoimport -d nisum-workers -c workers --type CSV --file mails_y_cumples_03.csv --headerline';


// exec(mongoToImport, function(error, stdout, stderr) {
//   console.log('exec')
// })

MongoClient.connect( connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database')
    }
    
    const db = client.db(databaseName)
    
    db.collection('workers').find({ }).toArray((error, workers)=>{
        if(error){
            return console.log('Unable to fetch')
        }
        // console.log(workers)

        workers.forEach(element => console.log(element))
        console.log(workers[166])
        return workers
    })
    
})







