import jwt from 'jsonwebtoken';

export const jwtSign = (signObject, privateKey, algorithm) => new Promise((resolve, reject)=>{
    return jwt.sign(signObject, privateKey, { algorithm }, (err, token) => {
        if(err){
            reject(err)
        }
        resolve(token)
    });
});


