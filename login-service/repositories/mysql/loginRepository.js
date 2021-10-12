// Use db if your repository using Query View only
const db = require('../../utils/db')
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { QueryTypes } = require('sequelize');
const globalFunction = require('../../utils/globalFunction');
const md5 = require('md5');

class loginRepository {
    constructor() {
        this._db = db;
    }

    async login({ username, password }) {
        const user = await this._db.query(
            'SELECT * FROM qv_complite_user WHERE username = :username AND password = :password AND status = :status LIMIT 1',
            {
              replacements: {
                  username: username,
                  password: md5(password),
                  status: '1'
              },
              type: QueryTypes.SELECT
            }
          );
  
        if(user == '') {
            throw new NotFoundError(`Username or Password is Wrong!`);
        }

        return user[0];
    }
}

module.exports = loginRepository;