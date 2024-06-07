module.exports = (sequelize, DataTypes) => {
    const Campaign = sequelize.define('Campaign', {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Campign_Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Influencers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false 
    });
  
    return Campaign;
  };