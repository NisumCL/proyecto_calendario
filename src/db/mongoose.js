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
        // console.log(typeof workerData)
        // const workerDataArray = []
        // let worker = {}
        workerData.forEach(element => {
          console.log(element['apellido_y_nombre'])
        //   worker = {
        //     name: workerData[element].name,
        //     email: workerData[element].email,
        //     birthday: matchThisYear(workerData[element].birthday),
        //     company: workerData[element].company
        //   }
        //   workerDataArray.push(worker)
        })

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
  









