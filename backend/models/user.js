module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      Mobile: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false // Disable timestamps
    });
  
    return User;
  };
  