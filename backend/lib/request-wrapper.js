const http = require('http')

class Requests {
  static NewGetRequest (host, path) {
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

  static NewPostRequest (host, path, data) {
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
};

module.exports = Requests
