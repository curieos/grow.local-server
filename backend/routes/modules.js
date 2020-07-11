const express = require('express')
const Module = require('../sequelize').Module
// const find = require('local-devices')
const Requests = require('../lib/request-wrapper')
const multer = require('multer')
const EspOTA = require('esp-ota')
const EventEmitter = require('events')


const uploadEmitter = new EventEmitter();
const esp = new EspOTA();
const router = express.Router()
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'backend/firmware')
  },
  filename: ((req, file, callback) => {
    const name = 'firmware.bin'//file.originalname.toLowerCase().split(' ').join('-');
    callback(null, name)
  })
})

esp.on('state', (state) => {
  if (state == 'done') uploadEmitter.emit('finished')
  console.log('Current state of transfer: ', state);
});

esp.on('progress', (current, total) => {
  uploadEmitter.emit('progress', Math.round(current / total * 100))
});

var moduleList = []
var rawModuleList = []

function UpdateModuleList() {
  return new Promise((resolve) => {
    Module.findAll().then(modules => {
      const newList = []
      for (const module of modules) {
        const newModule = { id: module.id, name: module.name, ip: module.ip }
        newList.push(newModule)
      }
      moduleList.length = newList.length
      moduleList = [...newList]
      resolve()
    })
  })
}

function UpdateRawModuleList() {
  return new Promise((resolve, reject) => {
    Requests.NewGetRequest('new_module.local', '/module/info').then(response => {
      rawModuleList = []
      rawModuleList.push(response)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

router.get('', (req, res) => {
  UpdateModuleList().then(() => {
    res.status(200).json({
      message: 'Modules Fetched Successfully',
      modules: moduleList
    })
  })
})

router.post('', (req, res) => {
  Module.create({ name: req.body.name, ip: req.body.ip }).then(module => {
    const data = JSON.stringify({
      name: module.name,
      timezoneOffset: new Date().getTimezoneOffset()
    })
    Requests.NewPostRequest(module.ip, '/module/setup', data).then(() => {
      res.status(201).json({ message: 'Successfuly Added Module' })
    }).catch(error => {
      console.error(error)
      res.status(502).json({ message: 'Failed to Setup Module' })
    })
  })
})

router.delete('/:id', (req, res) => {
  UpdateModuleList().then(() => {
    const module = moduleList.find(module => module.id == req.params.id)
    const data = JSON.stringify({
      name: 'new_module',
      timezoneOffset: new Date().getTimezoneOffset()
    })
    Requests.NewPostRequest(`${module.name}.local`, '/module/setup', data).then(() => {
      Module.destroy({ where: { id: req.params.id } }).then(() => {
        res.status(204).json({ message: 'Successfully Deleted Module' })
      }).catch(error => {
        console.error(error)
        res.status(500).json({ message: 'Failed to Delete Module' })
      })
    }).catch(error => {
      console.error(error)
      res.status(502).json({ message: 'Failed to Reset Module' })
    })
  }).catch((error) => {
    console.error(error)
    res.status(502).json({ message: 'Failed to retrieve data from database' })
  })
})

router.patch('/:id', (req, res) => {
  Module.findOne({ where: { id: req.params.id } }).then((module) => {
    if (module === null) {
      res.status(502).json({ message: 'Failed to find module with id' })
    } else {
      module.name = req.body.name
      module.save().then(() => {
        const data = JSON.stringify({
          name: module.name,
          timezoneOffset: new Date().getTimezoneOffset()
        })
        Requests.NewPostRequest(module.ip, '/module/setup', data).then(() => {
          res.status(200).json({ message: 'Successfully Updated Module Data' })
        })
      })
    }
  })
})

router.post('/:id/update', multer({ storage: storage }).single('firmware'), (req, res) => {
  UpdateModuleList().then(() => {
    const module = moduleList.find(module => module.id == req.params.id)
    if (typeof module === 'undefined') res.status(500).json({ message: 'Failed to find module with id' })
    else {
      esp.uploadFirmware('backend/firmware/firmware.bin', module.ip, 3232).then(() => {
        res.status(201).json({ message: 'Update Complete' })
      }).catch(function (error) {
        console.error('Transfer error: ', error)
        res.status(500).json({ message: 'Failed to establish connection with module for update' })
      })
    }
  })
})

router.get('/:id/update/status', (req, res) => {
  res.writeHead(200,
    {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  )

  uploadEmitter.on('progress', (progress) => {
    res.write('data: ' + JSON.stringify({ progress }) + '\n\n')
  })
})

router.get('/:id/settings', (req, res) => {
  UpdateModuleList().then(() => {
    const module = moduleList.find(module => module.id == req.params.id)
    if (typeof module === 'undefined') res.status(500).json({ message: 'Failed to find module with id' })
    else {
      res.status(200).json({
        message: 'Successfully Retrieved Module Settings',
        module: module
      })
    }
  })
})

router.get('/:id/info', (req, res) => {
  UpdateModuleList().then(() => {
    const module = moduleList.find(module => module.id == req.params.id)
    Requests.NewGetRequest(`${module.name}.local`, '/module/info').then((response) => {
      res.status(200).json({
        message: 'Module info received',
        module: {
          name: module.name,
          moduleName: response.moduleName,
          ipAddress: response.ipAddress,
          version: response.version
        }
      })
    }).catch(error => {
      console.error(error)
      res.status(502).json({ message: 'Failed to retrieve data from module' })
    })
  }).catch((error) => {
    console.error(error)
    res.status(502).json({ message: 'Failed to retrieve data from database' })
  })
})

router.get('/raw', (req, res) => {
  UpdateRawModuleList().then(() => {
    res.status(200).json({
      message: 'Raw Modules Fetched Successfully',
      modules: rawModuleList
    })
  }).catch(() => {
    console.error('Failed to find modules')
    res.status(500).json({ message: 'No modules found on network' })
  })
})

module.exports = router
