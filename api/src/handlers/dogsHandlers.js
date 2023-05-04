const {Dog, Temperament} = require('../db')
const {getDogsById, getAllInfo} = require("../controllers/dogsControllers")


//------------------------> GET ALL DOGS FROM API
const getInfoHandler = async (req, res) =>{
    const {name} = req.query
    const getInfo = await getAllInfo();
 try{
    if(req.query.hasOwnProperty('name')) {
        const dogsname = getInfo.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
       
        dogsname.length !== 0 
        ?res.status(200).json(dogsname)
        
        :res.status(400).send({message: 'No se encontraron perros con ese nombre'})

         return;
    } 
    
     res.status(200).json(getInfo)

 }   catch(error){
         res.status(400).send({message: "Hubo un error al encontrar todos los perritos", error: error.message})
  }
        
};

//---------------> GET BY ID
const getIdHandler = async (req, res) => {
    const {id} = req.params
    try{
        const getIdOfDogs = await getDogsById(id);
        if(getIdOfDogs.length === 0) {
            res.status(400).send(`No existe perrito con id ${id}`); 
            return;
        }
        res.status(200).json(getIdOfDogs)
    }catch(error){
        res.status(400).send({message:'Hubo un error al buscar el perrito por id', error: error.message})
    }
}

//------------------>POST NEW DOG
const postDogs = async (req, res) => {
    const { name,
        image,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        lifeSpanMin,
        lifeSpanMax,
        temperament } = req.body
    try{
        const createDogs = await Dog.create({
        name,
        image,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        lifeSpanMin,
        lifeSpanMax,
        })

    //---------------------------> DATABASE RELATIONS
    //SE MAPEA PORQUE EL TIPO DE DATO QUE ME LLEGA POR BODY ES UN ARRAY
    //SE USA ADD Y NO SET PORQUE SET SETEA UNA SOLA RELACION Y ADD AGREGA UNA O VARIAS
    //A CREATEDOGS LE AGREGO LOS TEMPERAMENTOS QUE CONSIGO EN EL FIND ONE (AMBAS FOREING KEY SE VAN A LA TABLA INTERMEDIA)
        temperament?.map(async (temp) => {
            let newRelation = await Temperament.findOne({where: {name: temp}})
            await createDogs.addTemperament(newRelation)
        })
        res.status(201).send(createDogs)

    }catch(error){
        res.status(400).send({message: 'Hubo un error al crear es perrito', error: error.message})
    }
}


module.exports = {
    getInfoHandler,
    getIdHandler,
    postDogs
}