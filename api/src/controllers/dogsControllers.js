const axios = require("axios");
const {API_KEY} = process.env;
const {Dog, Temperament} = require("../db");

//GET API INFO
const getApiInfo = async () => {

    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`);

    const apiInfo = await apiUrl.data.map(({id, image, name, height, weight, life_span, temperament}) => {
        const weightTemp = weight.metric.split("-");
        const heightTemp = height.metric.split("-");
        const ageTemp = life_span.slice(0, 7).split("-");
        return {
            id: id,
            name: name,
            image: image.url,
            minHeight: heightTemp[0],
            maxHeight: heightTemp[1],
            minWeight: weightTemp[0],
            maxWeight:  weightTemp[1],
            lifeSpanMin: ageTemp[0],
            lifeSpanMax: ageTemp[1],
            temperament: temperament,
        }
    });

    return apiInfo;
}

//GET DATABASE INFO
const getInfoDb = async () => {
    const getDogsDb = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name']       
        }
    })
    return getDogsDb
};


//GET ALL INFO
const getAllInfo = async () =>{
    const dogsDb = await getInfoDb();
    const dogsApi = await getApiInfo();
    const all = dogsDb.concat(dogsApi)
    return all;
};

//GET DOGS IDs
const getDogsById = async (id) => {
    const all = await getAllInfo()
    const filterDogId = all.filter((element) => element.id == id);
    return filterDogId;
};


module.exports = {
    getAllInfo,
    getApiInfo,
    getDogsById, 
};