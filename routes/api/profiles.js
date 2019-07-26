const express = require('express')
const router = express.Router()
const keys = require('../../config/keys')
const Profile = require('../../models/Profile')
const passport = require('passport')


router.get('/test', (req, res) => {
    res.json({ msg: 'profiles' })
})


router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ProfileFields = {}
    if (req.body.type) ProfileFields.type = req.body.type
    if (req.body.describe) ProfileFields.describe = req.body.describe
    if (req.body.income) ProfileFields.income = req.body.income
    if (req.body.cash) ProfileFields.cash = req.body.cash
    if (req.body.remark) ProfileFields.remark = req.body.remark

    new Profile(ProfileFields).save().then(profile => {
        console.log(profile)
        res.json(profile)
    })
})

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find().then(profiles => {
        if (!profiles) {
            return res.status(404).json("无数据")
        }
        res.json(profiles)
    }).catch(err => {
        res.status(404).json(err)
    })
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ _id: req.params.id }).then(profiles => {
        if (!profiles) {
            return res.status(404).json("无数据")
        }
        return res.json(profiles)
    }).catch(err => {
        res.status(404).json(err)
    })
})

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ProfileFields = {}
    if (req.body.type) ProfileFields.type = req.body.type
    if (req.body.describe) ProfileFields.describe = req.body.describe
    if (req.body.expend) ProfileFields.expend = req.body.expend
    if (req.body.income) ProfileFields.income = req.body.income
    if (req.body.cash) ProfileFields.cash = req.body.cash
    if (req.body.remark) ProfileFields.remark = req.body.remark

    Profile.findByIdAndUpdate({ _id: req.params.id }, { $set: ProfileFields }, { new: true }).then(profile => {
        if (!profile) {
            return res.status(404).json("无数据")
        }
        res.json(profile)
    }).catch(err => {
        res.status(404).json(err)
    })
})

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findByIdAndRemove({ _id: req.params.id }).then(profile => {
        profile.save().then(profile => {
            res.json(profile)
        }).catch(err => {
            return res.status(404).json(err)
        })
    })
})
module.exports = router