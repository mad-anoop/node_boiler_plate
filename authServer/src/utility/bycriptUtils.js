import bcrypt from 'bcrypt';

export const hashValue = (data, rounds) => new Promise((resolve, reject) => {
  bcrypt.hash(data, rounds, (err, hash) => {
    if (err) {
      reject(err);
    } else {
      resolve(hash);
    }
  });
});

export const comparePassword = (passwordAttempt, password) => new Promise((resolve, reject) => {
  bcrypt.compare(passwordAttempt, password, (err, isMatch) => {
    if (err) {
      reject(err);
    }
    resolve(isMatch);
  });
});
