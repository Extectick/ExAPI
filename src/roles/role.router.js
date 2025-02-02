import { Router } from "express";
import { roleController } from "./role.controller.js";
//const controller = require('./user.controller')
const router = new Router()
const controller = new roleController()
//router.get('/roles', controller.getRoles)
router.post('/roles', controller.createRole)
router.get('/roles', controller.getRoles)

//module.exports = router
export const roleRouter = router