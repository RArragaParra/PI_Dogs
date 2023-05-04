const { Router } = require('express');
const router = Router();
const dogsRouter = require('./dogsRouter');
const temperamentsRouter = require('./temperamentsRouter');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//-------------------------> MIDDLEWARE TO DOGS
router.use('/dogs', dogsRouter);

//-------------------------> MIDDLEWARE TO TEMPERAMENTS
router.use('/temperaments', temperamentsRouter);



module.exports = router;
