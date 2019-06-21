import config from './config';

const sequelizeLoader = 'sequelize';
const credentialModelLoader = '../model/credential.model';
const peopleModelLoader = '../model/people.model';
const userRoleModelLoader = '../model/userRole.model';

class Db {
  #connectionStatus;

  #models;

  #sequelize;

  #Sequelize;

  async init() {
    let result = await Promise.all([
      import(sequelizeLoader),
      import(credentialModelLoader),
      import(peopleModelLoader),
      import(userRoleModelLoader),
    ]);

    const [
      { default: Sequelize },
      { default: credentialModel },
      { default: peopleModel },
      { default: userRoleModel },
    ] = result;
    this.#Sequelize = Sequelize;
    this.#sequelize = new this.#Sequelize(
      config.DATABASE_NAME,
      config.DATABASE_USER,
      config.DATABASE_PASSWORD,
      {
        host: config.DATABASE_HOST,
        port: config.DATABASE_PORT,
        logging: false,
        dialect: config.DATABASE_DIALECT,
        pool: {
          max: 5,
          acquire: 30000,
          idle: 10000,
        },
      },
    );
    result = await this.#sequelize.authenticate();

    this.#connectionStatus = true;
    this.#models = {
      credentials: credentialModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize,
      ),
      people: peopleModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize,
      ),
      user_role: userRoleModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize,
      ),
    };
    // result = await this.#sequelize.sync({ force: true });
    Object.values(this.#models)
      .filter(model => typeof model.associate === 'function')
      .forEach(model => model.associate(this.#models));

    result = await this.#sequelize.sync({ force: false });
    return this;
  }

  connection() {
    if (this.#connectionStatus) {
      return {
        ...this.#models,
      };
    }
    return false;
  }
}

export default new Db();
