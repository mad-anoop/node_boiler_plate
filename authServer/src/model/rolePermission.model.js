const rolePermissionModel = (Model) => {
  class RolePermission extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          role_permission_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
        },
        {
          tableName: 'role_permission',
          sequelize,
        },
      );
    }

    static associate(models) {
      this.role_id = this.BelongsToMany(models.people, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });

      this.permission_id = this.BelongsToMany(models.people, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
    }
  }
  return RolePermission;
};

export default rolePermissionModel;
