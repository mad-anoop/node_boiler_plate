
class UserQuery {
  init(db) {
    this.db = db;
    return this;
  }

  // userRole not implemnted
  createRegistration(email, password, firstName, lastName) {
    return this.db.people.create(
      {
        first_name: firstName,
        last_name: lastName,
        credentials: {
          email,
          password,
        },
      }, {
        include: [{
          model: this.db.credentials,
        }],
      },
    );
  }

  getUserByParams(params) {
    return this.db.credentials.findOne({
      where: { ...params },
    });
  }

  getUserDetailsWithCredentials(credentials) {
    return this.db.credentials.findOne({
      where: { ...credentials },
      include: [{
        model: this.db.people,
      }],
    });
  }
}

export default new UserQuery();
