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
        let words = wrongWords.concat(rightWords)
        words = shuffle(words)
        res.json(words)
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

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
