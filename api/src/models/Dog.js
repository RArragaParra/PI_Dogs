const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      
      image: {
          type: DataTypes.STRING,
          allowNull:false,
          validate:{
              isURL: true
          }
      },

      maxHeight:{
          type: DataTypes.STRING,
          allowNull: false
      },

      minHeight:{
        type: DataTypes.STRING,
        allowNull: false
    },
      
      maxWeight:{
          type: DataTypes.STRING,
          allowNull: false
      },

      minWeight:{
        type: DataTypes.STRING,
        allowNull: false
    },

      lifeSpanMin:{
          type: DataTypes.STRING,
          allowNull: false
      },

      lifeSpanMax:{
          type: DataTypes.STRING,
          allowNull: false
      },
    });
};
