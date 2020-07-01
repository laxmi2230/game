const express = require('express')
const app = express()
const port = 3000
app.use(express.static('./library'))

app.get('/', function(req, res){
    res.sendFile('game.html', { root: __dirname})
});


app.listen(port,() => console.log(`app is runing on port ${port}!`))