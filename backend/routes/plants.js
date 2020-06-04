const express = require('express')
const Plant = require('../sequelize').Plant
const Module = require('../sequelize').Module
const http = require('http')

const router = express.Router()

var plantList = []

function UpdatePlantList () {
  return new Promise((resolve, reject) => {
    Plant.findAll().then(plants => {
      const newList = []
      for (const plant of plants) {
        const newPlant = { id: plant.id, name: plant.name, moduleId: plant.moduleId }
        newList.push(newPlant)
      }
      plantList.length = newList.length
      plantList = [...newList]
      resolve()
    })
  })
}

function NewGetRequest (host, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      port: 80,
      path: path,
      method: 'GET'
    }
    const request = http.get(options, response => {
      const dataChunks = []
      response.on('data', d => {
        dataChunks.push(d)
      }).on('end', () => {
        const data = Buffer.concat(dataChunks)
        resolve(JSON.parse(data))
      })
    })
    request.on('error', error => {
      reject(error)
    })
    request.end()
  })
}

router.get('', (req, res, next) => {
  UpdatePlantList().then((response) => {
    res.status(200).json({
      message: 'Plants Fetched Successfully',
      plants: plantList
    })
  })
})

router.post('', (req, res, next) => {
  Module.findOne({ where: { name: req.body.moduleName } }).then(module => {
    Plant.create({ name: req.body.plantName, moduleId: module.id }).then(plant => {
      res.status(201).json({ message: 'Successfuly Added Plant' })
    })
  })
})

router.delete('/:id', (req, res, next) => {
  Plant.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(204).json({ message: 'Successfully Deleted Plant' })
  })
})

router.get('/:id/info', (req, res, next) => {
  UpdatePlantList().then((response) => {
    const plant = plantList.find(plant => plant.id === req.params.id)

    if (typeof plant === 'undefined') res.status(500).json({ message: 'Failed to find plant with id' })
    else {
      Module.findOne({ where: { id: plant.moduleId } }).then(module => {
        NewGetRequest(`${module.name}.local`, '/plant/info').then(response => {
          res.status(200).json({
            message: 'Successfully Retrieved Plant Info',
            data: response
          })
        }).catch(error => {
          console.log(error)
          res.status(502).json({ message: 'Failed to retrieve data from module' })
        })
      }).catch(error => {
        console.log(error)
        res.status(404).json({ message: 'Failed to find associated module' })
      })
    }
  })
})

module.exports = router
