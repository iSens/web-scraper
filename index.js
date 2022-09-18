const PORT = process.env.PORT || 3030

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const cors = require('cors')

const url = 'https://www.total-croatia-news.com/news/politics'

const app = express()
app.use(cors())

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// app.METHOD(PATH, HANDLER)

app.get('/', function(req, res) {
    res.json('Denis')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
            $('.listingPage-item-content', html).each(function() {
                const title = $(this).find('.listingPage-item-title').text()
                const intro = $(this).find('.listingPage-item-introtext').text().slice(0, 150)
                const date = $(this).find('.listingPage-item-date').text()
                const link = $(this).find('a').attr('href')
                articles.push({
                    title,
                    date,
                    intro,
                    link
                })
            })
            console.log(articles)
            res.json(articles)
        }).catch(error => console.error(error))
})





app.listen(PORT, () => console.log(`server running on port ${PORT}`))