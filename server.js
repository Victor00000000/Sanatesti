const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.static(path.join(__dirname, 'front/build')))

app.get('/api/:lvl/:num', (req, res) => {
  res.send(`${req.params.lvl}, ${req.params.num}`)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/build', 'index.html'))
})

app.listen(process.env.PORT || 5000)
