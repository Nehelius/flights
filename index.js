const express = require('express')
const path = require('path')

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/api', (req, res) => {
  res.json({ message: "Hello from the server" })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})