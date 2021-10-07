const express = require('express');
require('express-async-errors');
const router = express.Router();
const httpStatus = require('http-status');

// Repositories
const FormERFRepository = require('../../repositories/mysql/formERFRepository');
const formERFRepository = new FormERFRepository();

const CacheRepository = require('../../repositories/redis/cacheRepository');
const cacheRepository = new CacheRepository();

const ERFValidator = require('../../validators/ERFValidator');

// Rabbit MQ Example
// await rabbitMq.sendMessage(`export:task:${id}`, JSON.stringify(data));

// Explain : using try catch to check if data found in Cache / Redis or no
// Error Handling should in Repository

router.get('/', async (req, res) => {
   try {
      const erfs = await cacheRepository.get(`erf:all`);

      res.status(httpStatus.OK).json({
         code: httpStatus.OK,
         status: 'SUCCESS',
         message: httpStatus[`${httpStatus.OK}_NAME`],
         data: JSON.parse(erfs)
      });
   } catch (err) {
      const erfs = await formERFRepository.getERFs();

      await cacheRepository.set(`erf:all`, JSON.stringify(erfs), 60);

      res.status(httpStatus.OK).json({
         code: httpStatus.OK,
         status: 'SUCCESS',
         message: httpStatus[`${httpStatus.OK}_NAME`],
         data: erfs
      });
   }
})

router.get('/get', async (req, res) => {
   const {
      id
   } = req.query;

   try {
      const erfs = await cacheRepository.get(`erf:${id}`);

      res.status(httpStatus.OK).json({
         code: httpStatus.OK,
         status: 'SUCCESS',
         message: httpStatus[`${httpStatus.OK}_NAME`],
         data: JSON.parse(erfs)
      });
   } catch (error) {
      const erfs = await formERFRepository.getERF({
         id
      });
   
      await cacheRepository.set(`erf:${id}`, JSON.stringify(erfs), 60);
   
      res.status(httpStatus.OK).json({
         code: httpStatus.OK,
         status: 'SUCCESS',
         message: httpStatus[`${httpStatus.OK}_NAME`],
         data: erfs
      });
   }
})

router.post('/', async (req, res) => {
   ERFValidator.AddERFValidator(req.body);

   const erf = await formERFRepository.addERF(req.body);

   if(erf) {
      await cacheRepository.delete(`erf:all`);
   }

   res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED,
      status: 'SUCCESS',
      message: httpStatus[`${httpStatus.CREATED}_NAME`],
      data: erf
   });
})

router.put('/', async (req, res) => {
   const { id } = req.query;
   
   const erf = await formERFRepository.updateERF({ id, params: req.body })

   if(erf) {
      await cacheRepository.delete(`erf:${id}`);
      await cacheRepository.delete(`erf:all`);
   }

   res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED,
      status: 'SUCCESS',
      message: httpStatus[`${httpStatus.CREATED}_NAME`],
      data: erf
   });
})

router.delete('/', async (req, res) => {
   const { id } = req.query;
   
   const erf = await formERFRepository.deleteERF({ id })

   if(erf) {
      await cacheRepository.delete(`erf:${id}`);
      await cacheRepository.delete(`erf:all`);
   }

   res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      status: 'SUCCESS',
      message: httpStatus[`${httpStatus.OK}_NAME`],
      data: erf
   });
})

router.get('/dropdown', async (req, res) => {
   try {
      const erfs = await cacheRepository.get(`erf:all-dropdown`);

      res.status(httpStatus.OK).json({
         code: httpStatus.OK,
         status: 'SUCCESS',
         message: httpStatus[`${httpStatus.OK}_NAME`],
         data: JSON.parse(erfs)
      });
   } catch (err) {
      const erfs = await formERFRepository.getERFs();

      await cacheRepository.set(`erf:all-dropdown`, JSON.stringify(erfs), 60);

      res.status(httpStatus.OK).json({
         code: httpStatus.OK,
         status: 'SUCCESS',
         message: httpStatus[`${httpStatus.OK}_NAME`],
         data: erfs
      });
   }
})

module.exports = router;