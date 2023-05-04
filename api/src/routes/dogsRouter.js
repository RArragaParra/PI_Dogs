const {Router} = require("express");
const {getInfoHandler, getDogsNameHandler, getIdHandler, postDogs} = require("../handlers/dogsHandlers");
const dogsRouter = Router();


//-----------------------------> GET
dogsRouter.get("/", getInfoHandler);


dogsRouter.get("/:id", getIdHandler);


//------------------------------> POST
dogsRouter.post("/", postDogs);


module.exports = dogsRouter;