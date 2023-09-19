import express from "express"
import * as loteController from "./../controllers/LoteController"

const router = express.Router()

router.route('/add-lote')
    .post(loteController.addLoteLin)

export = router