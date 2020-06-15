const express = require('express')
const Plant = require('../sequelize').Plant
const Module = require('../sequelize').Module
const Requests = require('../lib/request-wrapper')

const router = express.Router()

var plantList = []

function UpdatePlantList () {
  return new Promise((resolve) => {
    Plant.findAll().then((plants) => {
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

router.get('', (req, res) => {
  UpdatePlantList().then(() => {
    res.status(200).json({
      message: 'Plants Fetched Successfully',
      plants: plantList
    })
  })
})

router.post('', (req, res) => {
  Module.findOne({ where: { name: req.body.moduleName } }).then(module => {
    Plant.create({ name: req.body.plantName, moduleId: module.id }).then(() => {
      res.status(201).json({ message: 'Successfully Added Plant' })
    })
  })
})

router.delete('/:id', (req, res) => {
  Plant.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(204).json({ message: 'Successfully Deleted Plant' })
  })
})

router.get('/:id/settings', (req, res) => {
  UpdatePlantList().then(() => {
    const plant = plantList.find(plant => plant.id == req.params.id)
    if (typeof plant === 'undefined') res.status(500).json({ message: 'Failed to find plant with id' })
    else {
      res.status(200).json({
        message: 'Successfully Retrieved Plant Settings',
        plant: plant
      })
    }
  })
})

router.post('/:id/settings', (req, res) => {
  Plant.findOne({ where: { id: req.params.id } }).then((plant) => {
    if (plant === null) {
      res.status(502).json({ message: 'Failed to find plant with id' })
    } else {
      plant.name = req.body.plantName
      plant.save().then(() => {
        res.status(200).json({ message: 'Successfully Updated Plant' })
      })
    }
  })
})

router.get('/:id/info', (req, res) => {
  UpdatePlantList().then(() => {
    const plant = plantList.find(plant => plant.id == req.params.id)
    if (typeof plant === 'undefined') res.status(500).json({ message: 'Failed to find plant with id' })
    else {
      Module.findOne({ where: { id: plant.moduleId } }).then(module => {
        Requests.NewGetRequest(`${module.name}.local`, '/plant/info').then(response => {
          res.status(200).json({
            message: 'Successfully Retrieved Plant Info',
            plant: plant,
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
