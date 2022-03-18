/* eslint-disable */
const { MongoClient, ObjectID} = require('mongodb')
const { readDataForDB } = require('../utils/reader');
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName= 'nisum-workers'

const createDataBase = () => {
    MongoClient.connect( connectionURL, {useNewUrlParser: true}, async(error, client)=>{
        if(error){
            return console.log('Unable to connect to database');
        }
        const db = client.db(databaseName);
        db.dropDatabase()
        const  workersData = await readDataForDB();
        db.collection('workers').insertMany(workersData, (error, result) =>{
            if(error){
                return console.log('Unable to insert many users');
            }
            console.log('Database nisum-workers, collection workers and documents worker succesfully created');
        })
            
    })
}

createDataBase() 

module.exports = { createDataBase }












