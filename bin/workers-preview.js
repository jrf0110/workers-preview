const fs = require('fs')
const request = require('https').request
const spawn = require('child_process').spawn

let input = process.argv.find((arg, i) => process.argv[i - 1] === '--input')

if (input) input = fs.createReadStream(input)
else input = process.stdin

const options = {
  input,
  previewUrl:
    process.argv.find((arg, i) => process.argv[i - 1] === '--preview-url') ||
    'https://tutorial.cloudflareworkers.com',
  request: {
    method: 'POST',
    hostname: 'cloudflareworkers.com',
    path: '/script',
    headers: {
      'Content-Type': 'text/javascript; charset=UTF-8',
    },
  },
}

main()

function main() {
  const req = request(options.request, res => {
    readJSONFromResponse(res).then(body => {
      const open = spawn('open', [
        `https://${options.request.hostname}/#${body.id}:${options.previewUrl}`,
      ])
    })
  })

  options.input.pipe(
    req,
    { end: true },
  )
}

function readJSONFromResponse(res) {
  return new Promise((resolve, reject) => {
    let data = ''

    res.on('data', chunk => {
      data += chunk.toString()
    })

    res.once('end', () => {
      try {
        const body = JSON.parse(data)
        resolve(body)
      } catch (e) {
        reject(e)
      }
    })
  })
}
