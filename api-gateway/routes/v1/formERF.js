const express = require('express');
require('express-async-errors');
const router = express.Router();

// API Adapter
const apiAdapter = require('../../utils/apiAdapter.js');
const { URL_ERF_SERVICE } = process.env
const api = apiAdapter(URL_ERF_SERVICE);

router.get('/', async (req, res) => {
   const erf = await api.get('/v1/erf')
   return res.json(erf.data)
})

router.get('/get', async (req, res) => {
   const { id } = req.query;
   const erf = await api.get(`/v1/erf/get?id=${id}`);
   return res.json(erf.data)
})

router.post('/', async (req, res) => {
   const erf = await api.post(`/v1/erf`, req.body);
   return res.json(erf.data)
})

router.put('/', async (req, res) => {
   const { id } = req.query;
   const erf = await api.put(`/v1/erf?id=${id}`, req.body);
   return res.json(erf.data)
})

router.delete('/', async (req, res) => {
   const { id } = req.query;
   const erf = await api.delete(`/v1/erf?id=${id}`);
   return res.json(erf.data)
})

module.exports = router;