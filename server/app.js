const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.post('/images/upload', (req, res) => res.send('post made on'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))