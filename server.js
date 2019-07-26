const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

//引入users.js 
const users = require('./routes/api/users')
const staff = require('./routes/api/staff')
const profiles = require('./routes/api/profiles')

//引入DB config 
const db = require('./config/keys').mongoURI

//使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// app.get('/', (req, res) => {
//     res.send('hello world')
// })

//链接mongodb
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log('MongoDB connect success')
}).catch(err => {
    console.log(err)
})

//possport 初始化
app.use(passport.initialize())
require('./config/passport')(passport)

//user routes 
app.use('/api/users', users)
app.use('/api/staff', staff)
app.use('/api/profiles', profiles)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})