const express = require('express');
require('express-async-errors');
const router = express.Router();
const httpStatus = require('http-status');
const tokenManager = require('../../utils/tokenManager');

// Repositories
const LoginRepository = require('../../repositories/mysql/loginRepository');
const loginRepository = new LoginRepository();

const CacheRepository = require('../../repositories/redis/cacheRepository');
const cacheRepository = new CacheRepository();

const loginValidator = require('../../validators/loginValidator');

// Rabbit MQ Example
// await rabbitMq.sendMessage(`export:task:${id}`, JSON.stringify(data));

// Explain : using try catch to check if data found in Cache / Redis or no
// Error Handling should in Repository

router.post('/', async (req, res) => {
   loginValidator.loginValidator(req.body);
   const {
      username,
      password
   } = req.body;

   const user = await loginRepository.login({
      username,
      password
   });

   const data = {
      username: user.username,
      level: user.level,
      status_app: user.status_app
   };

   const payload = {
      data
   }

   const accessToken = tokenManager.generateAccessToken(payload);

   res.header('X-Auth-Token', accessToken);
   res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      status: 'SUCCESS',
      message: httpStatus[`${httpStatus.OK}_NAME`],
      data: user
   });
})

module.exports = router;