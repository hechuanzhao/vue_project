const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const Staff = require('../../models/Staff')
const keys = require('../../config/keys')
const router = express.Router()

//$route GET api/staff/test 
//@desc 返回请求的json数据
//@access public

router.get('/test', (req, res) => {
    res.json({ msg: 'staff test success' })
})

//$route POST api/staff/add 
//@desc 添加员工信息
//@access public
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const staffInformation = {}
    if (req.body.name) staffInformation.name = req.body.name
    if (req.body.sex) staffInformation.sex = req.body.sex
    if (req.body.state) staffInformation.state = req.body.state
    if (req.body.hobby) staffInformation.hobby = req.body.hobby
    if (req.body.marriage) staffInformation.marriage = req.body.marriage
    if (req.body.birthday) staffInformation.birthday = req.body.birthday
    if (req.body.address) staffInformation.address = req.body.address

    new Staff(staffInformation).save().then(staff => {
        console.log(staff)
        res.json(staff)
    })
})

//$route POST 
module.exports = router