const express = require('express')
const path = require('path')
const fs = require('fs')
const parse = require('csv-parse')
const app = express()

app.use(express.static(path.join(__dirname, 'front/build')))

app.get('/api/:lvl/:num', (req, res) => {
  try {
    const file = fs.readFileSync(`Sanalista taso ${req.params.lvl}.csv`, {
      encoding: 'utf-8',
    })
    parse(
      file,
      {
        delimiter: ';',
        columns: true,
      },
      (err, data) => {
        if (err) console.log(err)
        let wrongWordsCount = Math.floor(req.params.num / 3)
        let rightWordsCount = req.params.num - wrongWordsCount
        let [trueArray, falseArray] = splitArray(data)
        let wrongWords = pickRandomWords(falseArray, wrongWordsCount)
        let rightWords = pickRandomWords(trueArray, rightWordsCount)
        res.json([...wrongWords, ...rightWords])
      }
    )
  } catch {
    res.sendStatus(500)
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/build', 'index.html'))
})

app.listen(process.env.PORT || 5000)

const splitArray = (data) => {
  let trueArray = data.filter((word) => {
    return word.Oikea === '1'
  })
  let falseArray = data.filter((word) => {
    return word.Oikea !== '1'
  })
  return [trueArray, falseArray]
}

const pickRandomWords = (data, num) => {
  let arr = []
  let i = 0
  while (i < num) {
    let r = Math.floor(Math.random() * data.length)
    if (!arr.includes(data[r])) arr.push(data[r])
    else continue
    i++
  }
  return arr
}
