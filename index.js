const express = require('express')
const bodyParser = require('body-parser')

const ip = '67.169.223.206'
const port = 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => res.send('hello'))
app.post('/github-webhook', (req, res) => {
  console.log(req.body)
  res.send('hi github')
})

app.listen(port, () => console.log(`http://${ip}:${port}`))
