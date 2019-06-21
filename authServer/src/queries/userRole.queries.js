
class UserRoleQuery {
  init(db) {
    this.db = db;
    return this;
  }

  createUserRole(userRole) {
    debugger;
    return this.db.user_role.create(
      {
        role_name: userRole,
      },
    );
  }
}

export default new UserRoleQuery();

