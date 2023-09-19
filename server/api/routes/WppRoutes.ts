import express from "express"
import * as wppController from "./../controllers/WppController"

const router = express.Router()

router.route('/')
    .get(wppController.checkSessionConnection)

router.route('/send-random-messages')
    .post(wppController.sendRandomMessages)

router.route('/send-messages')
    .post(wppController.sendMenssages)

router.route('/send-image')
    .post(wppController.sendImages)

export = router