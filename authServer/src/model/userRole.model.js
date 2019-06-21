const userRoleModel = (Model) => {
  class UserRole extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          role_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
          },
        },
        {
          tableName: 'user_roles',
          sequelize,
        },
      );
    }

    static associate(models) {
      this.hasOne(models.people, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }
  return UserRole;
};

export default userRoleModel;
