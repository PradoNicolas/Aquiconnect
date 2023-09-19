import * as dotenv from "dotenv";
dotenv.config();

import loteHdr from "./LoteHdrModel";
import loteLin from "./LoteLinModel";

import sequelize from "../../config/sequelize";

loteHdr.sync()
loteLin.sync()

sequelize.sync({ alter: true })