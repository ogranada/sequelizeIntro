const express = require('express');
const { getModels } = require('../database');

const BASE_PATH = '/deportistas';
const router = express.Router();

router.get(BASE_PATH, async (req, res) => {
  // const Deportistas = (await getModels()).Deportistas;
  const { Deportista, Pais } = await getModels();
  const data = await Deportista.findAll({
    include: [
      {
        model: Pais,
        as: 'pais',
        attributes: ['nombre']
      }
    ]
  });
  res.json(data);
})

router.post(`${BASE_PATH}`, async (req, res) => {
  const { Deportista, Pais } = await getModels();
  const pais = await Pais.findOne({nombre: req.body.pais});
  const deportista = await Deportista.create(req.body);
  deportista.paisId = pais.id;
  try {
    const data = await deportista.save();
    res.status(202).json(data);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

router.get(`${BASE_PATH}/:id`, async (req, res) => {
  const client = await clientPromise;
  const database = client.db(DATABASE);
  const collection = database.collection(COLLECTION);
  const data = await collection.find({
    _id: mongodb.ObjectId(req.params.id)
  }).toArray()
  res.json(data);
})

module.exports = {
  users: router
}
