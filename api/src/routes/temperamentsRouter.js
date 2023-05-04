const {Router} = require('express')
const temperamentsRouter = Router()
const { getTemperamentsHandler} = require('../handlers/temperamentHandler')

//----------------------->GET
temperamentsRouter.get('/', getTemperamentsHandler);

module.exports = temperamentsRouter