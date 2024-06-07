module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: DataTypes.STRING,
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
  
    return Brand;
  };