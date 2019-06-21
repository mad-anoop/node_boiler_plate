const permissionModel = (Model) => {
  class Permission extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          permission_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          permission_name: {
            type: DataTypes.ENUM,
            values: ['All', 'Payment'],
            allowNull: false,
            defaultValue: 'All',
            primaryKey: false,
          },
        },
        {
          tableName: 'permisssion',
          sequelize,
        },
      );
    }
  }
  return Permission;
};

export default permissionModel;
