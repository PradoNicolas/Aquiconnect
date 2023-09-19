import express from "express";
import wppRoutes from "./WppRoutes"
import loteRoutes from "./LoteRoutes"

const rootRoutes = express.Router()

//rootRoutes.use('/wpp', wppRoutes)
rootRoutes.use('/lote', loteRoutes)

export = rootRoutes