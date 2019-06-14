
class UserQuery {
  init(db) {
    this.db = db;
    return this;
  }

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

  getUserByEmail(email) {
    return this.db.credentials.findOne({
      where: { email },
    });
  }
}

export default new UserQuery();
