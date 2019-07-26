//主要用于login登录，register注册
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const keys = require('../../config/keys')
const User = require('../../models/User')
    //$router GET api/users/test 
    //@desc 返回的请求json数据
    //@access public
router.get('/test', (req, res) => {
    res.json({ msg: "login users test" })
})

//$router POST /api/users/register 
//@desc 返回的请求json数据
//@access public
router.post('/register', (req, res) => {
    //查询数据库中是否有邮箱
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json('邮箱已被注册')
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
                identity: req.body.identity
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash

                    newUser.save().then(user => {
                        res.json(user)
                    }).catch(err => {
                        console.log(err)
                    })
                })
            })
        }
    })
})

//$rotuer POST /api/users/login 
//@desc 返回请求的json数据 token jwt 
//@access public
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    //查询数据库
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(400).json('用户不存在')
        }
        bcrypt.compare(password, user.password).then(isMath => {
            if (isMath) {
                const rule = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    identity: user.identity
                }
                jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                })
            } else {
                return res.status(400).json('密码不存在')
            }
        })
    })
})

module.exports = router