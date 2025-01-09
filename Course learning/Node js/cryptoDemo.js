import crypto from 'crypto';

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);

//createHash()
//doesnt seem to work anymore
/*
const hash1 = crypto.createHash('sha256')
hash1.update('I love cupcakes');
console.log(hash1.digest('hex'));
*/

//randomBytes()
crypto.randomBytes(64, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});

//createCipheriv() and createDecipheriv()
const algorithm = 'aes-192-cbc';
const key = crypto.randomBytes(24); // 24 bytes for aes-192-cbc
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('\n', encrypted);

//decipher
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('\n', decrypted);