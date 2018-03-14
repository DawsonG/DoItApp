module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    UserId: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
    priority: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    sortOrder: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    startDateTime: DataTypes.DATE,
    endDateTime: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    isComplete: DataTypes.BOOLEAN,
  });

  Todo.associate = function(models) {
    models.Todo.belongsTo(models.User);
  };

  return Todo;
};
