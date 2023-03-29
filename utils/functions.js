const bcrypt = require('bcrypt')


const hashPassword = (plain) => {
    password = bcrypt.hashSync(plain, 10);
    return password;

}

const isAdmin = () => {
    
}

module.exports = {
    hashPassword
}