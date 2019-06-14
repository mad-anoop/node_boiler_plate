import bcrypt from 'bcrypt-nodejs';

function comparePassword(passwordAttempt, password, cb) {
  bcrypt.compare(passwordAttempt, password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
}

export default comparePassword;
