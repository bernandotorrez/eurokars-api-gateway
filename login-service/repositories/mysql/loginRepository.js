const { User } = require('../../models')
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { QueryTypes } = require('sequelize');
const globalFunction = require('../../utils/globalFunction');
const md5 = require('md5');

class loginRepository {
    constructor() {
        this._model = new User();
    }

    async login({ username, password }) {
        const user = await this._model.sequelize.query(
            `select * from qv_complite_user where username = '${username}' AND password = '${md5(password)}' and status = '1'`, 
            {
                type: QueryTypes.SELECT
            })
  
        if(user == '') {
            throw new NotFoundError(`Username or Password is Wrong!`);
        }

        return user[0];
    }
}

module.exports = loginRepository;