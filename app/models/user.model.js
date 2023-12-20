module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      username: {
          type: Sequelize.STRING,
          allowNull: false
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              isEmail: true // Validates the email format
          },
          unique: true // Ensures email uniqueness
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              len: [6, 100] // Password must be between 6 and 100 characters
          }
      }
  }, {
      timestamps: true, // Enable automatic creation of createdAt and updatedAt fields
      tableName: 'users' // Explicitly specify the table name
  });

  return User;
};
