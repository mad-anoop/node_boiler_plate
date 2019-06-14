import bcrypt from 'bcrypt';

export const hashValue = (data ,rounds) => new Promise((resolve,reject) => bcrypt.hash(data, rounds, function(err, hash) {
        if (err){
            reject('Hash error');
        }
        else {
            resolve(hash);
        }
}));