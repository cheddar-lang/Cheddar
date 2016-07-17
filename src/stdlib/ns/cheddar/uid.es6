let token = require('crypto').randomBytes(64).toString('hex');
export default function(cheddar) {
    return cheddar.init(cheddar.string, token);
}