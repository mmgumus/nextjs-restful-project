import crypto from 'crypto';
const Secret = 'mysecretkey';

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {return crypto.createHmac('sha256',[salt,password].join('/')).update(Secret).digest('hex')}; 
