const express = require('express');
require('express-async-errors');
const router = express.Router();
const httpStatus = require('http-status');
const InvariantError = require('../../exceptions/InvariantError');

// Repositories
const FormERFRepository = require('../../repositories/mysql/formERFRepository');
const formERFRepository = new FormERFRepository();

const CacheRepository = require('../../repositories/redis/cacheRepository');
const cacheRepository = new CacheRepository();

// const taskValidator = require('../../validators/formERFValidator');

// Rabbit MQ Example
// await rabbitMq.sendMessage(`export:task:${id}`, JSON.stringify(data));

// Explain : using try catch to check if data found in Cache / Redis or no
// Error Handling should in Repository

router.get('/', async (req, res) => {
   try {
      const data = await cacheRepository.get(`erf:all`);

      res.status(httpStatus.OK).json({
         code: httpStatus.OK,
         status: 'SUCCESS',
         message: httpStatus[`${httpStatus.OK}_NAME`],
         data: JSON.parse(data)
      });
   } catch (err) {
      const data = await formERFRepository.getAll();

      await cacheRepository.set(`erf:all`, JSON.stringify(data), 60);

      res.status(httpStatus.OK).json({
         code: httpStatus.OK,
         status: 'SUCCESS',
         message: httpStatus[`${httpStatus.OK}_NAME`],
         data: data
      });
   }
})

router.get('/:id', async (req, res) => {
   const {
      id
   } = req.params;

   try {
      const data = await cacheRepository.get(`erf:${id}`);

      res.status(httpStatus.OK).json({
         code: httpStatus.OK,
         status: 'SUCCESS',
         message: httpStatus[`${httpStatus.OK}_NAME`],
         data: JSON.parse(data)
      });
   } catch (error) {
      const data = await formERFRepository.getById({
         id
      });
   
      await cacheRepository.set(`erf:${id}`, JSON.stringify(data), 60);
   
      res.status(httpStatus.OK).json({
         code: httpStatus.OK,
         status: 'SUCCESS',
         message: httpStatus[`${httpStatus.OK}_NAME`],
         data: data
      });
   }
})

// router.post('/', async (req, res) => {
//    taskValidator.AddTaskValidator(req.body);

//    const task = await formERFRepository.addTask(req.body);

//    if(task) {
//       await cacheRepository.delete(`task:all`);
//    }

//    res.status(httpStatus.CREATED).json({
//       code: httpStatus.CREATED,
//       status: 'SUCCESS',
//       message: httpStatus[`${httpStatus.CREATED}_NAME`],
//       data: task
//    });
// })

// router.put('/:id', async (req, res) => {
//    const { id } = req.params;
   
//    const task = await formERFRepository.updateTask({ id, body: req.body })

//    if(task) {
//       await cacheRepository.delete(`task:${id}`);
//       await cacheRepository.delete(`task:all`);
//    }

//    res.status(httpStatus.CREATED).json({
//       code: httpStatus.CREATED,
//       status: 'SUCCESS',
//       message: httpStatus[`${httpStatus.CREATED}_NAME`],
//       data: task
//    });
// })

// router.delete('/:id', async (req, res) => {
//    const { id } = req.params;
   
//    const task = await formERFRepository.deleteTask({ id })

//    if(task) {
//       await cacheRepository.delete(`task:${id}`);
//       await cacheRepository.delete(`task:all`);
//    }

//    res.status(httpStatus.OK).json({
//       code: httpStatus.OK,
//       status: 'SUCCESS',
//       message: httpStatus[`${httpStatus.OK}_NAME`],
//       data: task
//    });
// })

module.exports = router;