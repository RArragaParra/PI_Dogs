const {getAllInfo} = require('./dogsControllers');
const {Temperament} = require('../db')


const getAllTemperaments = async () =>{

    const allTemperaments = [];
    const apiInfoMain = await getAllInfo();
    const useAllTemperaments = apiInfoMain.map(element => element.temperament).join(", ").split(",")
    useAllTemperaments.forEach(element => {
        if(!allTemperaments.includes(element) && element !== "Stubborn") {
            allTemperaments.push(element)
        }
    })
    allTemperaments.sort();
    
    allTemperaments.map(obj => Temperament.findOrCreate({where: {name:obj}}))

    const temperamentModel = await Temperament.findAll({attributes: ['id', 'name']})

    return temperamentModel;
}


module.exports = {
    getAllTemperaments
}