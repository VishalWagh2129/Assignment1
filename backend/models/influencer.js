module.exports = (sequelize, DataTypes) => {
    const Influencer = sequelize.define('Influencer', {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
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
      timestamps: false // Disable timestamps
    });
  
    return Influencer;
  };