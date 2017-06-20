const express = require('express')

const ip = '67.169.223.206'
const port = 3000

const app = express()

app.get('/', (req, res) => res.send('hello'))

app.listen(port, () => console.log(`http://${ip}:${port}`))
