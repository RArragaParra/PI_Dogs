const {getAllTemperaments} = require("../controllers/dogTemperamentControllers")


const getTemperamentsHandler = async (req, res) => {
    try{
        const getAll = await getAllTemperaments()
        res.status(200).send(getAll);

    }catch(error){
        res.status(400).send({message: "No se encontraron los temperamentos", error:error.message})
    }
};

module.exports = {
    getTemperamentsHandler
}