const express = require('express')
const bodyParser = require('body-parser')
const nodemon = require('nodemon')
const {spawn} = require('child_process')

const pull = repo => new Promise((resolve, reject) => {
  const gitPull = spawn('git', ['pull'], {cwd: `../${repo}`})
  gitPull.stdout.on('data', buf => console.log(buf.toString()))
  gitPull.stderr.on('data', buf => console.log(buf.toString()))
  gitPull.on('close', code => {code === 0 ? resolve() : reject(code)})
})

pull()

const core = nodemon({script: '../edward-core'})

core.on('start', () => console.log('core has started'))

const ip = '67.169.223.206'
const port = 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => res.send('hello'))
app.post('/github-webhook', (req, res) => {
  const repo = req.body.repository.name
  pull(repo).then(() => core.emit('restart'))
  res.send('hi github')
})

app.listen(port, () => console.log(`http://${ip}:${port}`))
