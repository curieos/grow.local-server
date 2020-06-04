const express = require('express')
const Module = require('../sequelize').Module
const find = require('local-devices')
const http = require('http')

const router = express.Router()

var moduleList = []
var rawModuleList = []

function UpdateModuleList () {
  return new Promise((resolve, reject) => {
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

function UpdateRawModuleList () {
  return new Promise((resolve, reject) => {
    NewGetRequest('new_module.local', '/module/info').then(response => {
      rawModuleList = []
      rawModuleList.push(response)
      resolve()
    }).catch(error => {
      reject(error)
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

function NewPostRequest (host, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      port: 80,
      path: path,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }
    const post = http.request(options, response => {
      resolve(response)
    })

    post.on('error', error => {
      reject(error)
    })

    post.write(data)
    post.end()
  })
}

router.get('', (req, res, next) => {
  UpdateModuleList().then((response) => {
    res.status(200).json({
      message: 'Modules Fetched Successfully',
      modules: moduleList
    })
  })
})

router.post('', (req, res, next) => {
  Module.create({ name: req.body.name, ip: req.body.ip }).then(module => {
    const data = JSON.stringify({
      name: module.name,
      timezoneOffset: new Date().getTimezoneOffset()
    })
    NewPostRequest(module.ip, '/module/setup', data).then(response => {
      res.status(201).json({ message: 'Successfuly Added Module' })
    }).catch(error => {
      console.error(error)
      res.status(502).json({ message: 'Failed to Setup Module' })
    })
  })
})

router.delete('/:id', (req, res, next) => {
  UpdateModuleList().then((response) => {
    const module = moduleList.find(module => module.id === req.params.id)
    const data = JSON.stringify({
      name: 'new_module',
      timezoneOffset: new Date().getTimezoneOffset()
    })
    NewPostRequest(`${module.name}.local`, '/module/setup', data).then(response => {
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
  })
})

router.get('/:id/info', (req, res, next) => {
  UpdateModuleList().then((response) => {
    const module = moduleList.find(module => module.id === req.params.id)
    NewGetRequest(`${module.name}.local`, '/module/info').then(response => {
      res.status(200).json(response)
    }).catch(error => {
      console.error(error)
      res.status(502).json({ message: 'Failed to retrieve data from module' })
    })
  })
})

router.get('/raw', (req, res, next) => {
  UpdateRawModuleList().then((response) => {
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
