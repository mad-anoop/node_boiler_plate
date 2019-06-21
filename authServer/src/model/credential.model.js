const credentialsModel = (Model) => {
  class credentials extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          credentials_id: {
            field: 'credentials_id',
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          email: {
            field: 'email',
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false,
          },
          password: {
            field: 'password',
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
          },
        },
        {
          tableName: 'credentials',
          sequelize,
        },
      );
    }

    static associate(models) {
      this.belongsTo(models.people, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  return credentials;
};

export default credentialsModel;
