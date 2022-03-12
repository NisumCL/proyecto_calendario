/* eslint-disable */
const mongoose = require('mongoose')
const Worker = require('../models/worker')
const express = require('express')
const app = express()
const { matchThisYear } = require('../utils/converter')
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('../utils/service');
const { isValidDateFormat } = require('../utils/validator');


mongoose.connect('mongodb://127.0.0.1:27017/nisum-workers', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  
  console.log('connected')

// const workdatas = Worker.find({})
// // console.log(Worker)
// console.log(workdatas)

app.get('/workers', async(req, res) => {
    
    try {
        const workerData = await Worker.find({})
        // const workerDataParsed = workerData.Worker
        console.log(typeof Worker)
        console.log(Worker)
        // const workerData = await Worker.updateMany({ }, { birthday: matchThisYear(birthday) })
        // let juego = JSON.parse(...workerData)
        // const { nosequetraeraesto } = req.body.json()
        console.log(typeof workerData)
        console.log(workerData[56].cumpleanios)
        const cumple = workerData[56].cumpleanios
        console.log(typeof cumple)
        // const newworkerData = workerData[56].split(',');
        // console.log(newworkerData)
        // const parsedItem = JSON.parse(workerData[56])
        // console.log(parsedItem.cumpleanios)
        // console.log(workerData)
        // console.log(nosequetraeraesto )
        // const workerDataArray = []
        // let worker = {}
        // workerData.forEach(element => {
        //   // console.log(typeof element)
        // //   worker = {
        // //     name: workerData[element].name,
        // //     email: workerData[element].email,
        // //     birthday: matchThisYear(workerData[element].birthday),
        // //     company: workerData[element].company
        // //   }
        // //   workerDataArray.push(worker)
        // })

        // console.log(workerDataArray)
            res.send(workerData)

    } catch(e){
        res.status(400).send(e)
    }
})

  const port = 3000
  app.listen(port, () =>{
      console.log('server is up and port ' + port)
  })
  









