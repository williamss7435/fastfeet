const { Op } = require('sequelize');
const Validator = require('validator').default;
const DeliveryPeople = require('../models/DeliveryPeople');
const PhotoFile = require('../models/PhotoFile');

class DeliveryPeopleController {
  async store(req, res) {
    const { name, email, photo_id } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'nome não informado',
      });
    }

    if (email && !Validator.isEmail(email)) {
      return res.status(400).json({
        error: 'email inválido',
      });
    }

    const deliveryman = await DeliveryPeople.create({
      name,
      email,
      photo_id,
    });

    return res.json(deliveryman);
  }

  async update(req, res) {
    const {
      name, photo_id, email,
    } = req.body;

    const { deliveryman_id: id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: 'id do entregador não informado',
      });
    }

    const deliveryman = DeliveryPeople.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json({
        error: 'entregador não encontrado',
      });
    }

    const deliverymanUpdated = await DeliveryPeople.update({
      name, photo_id, email,
    }, {
      where: { id },
      returning: true,
    });

    return res.json(deliverymanUpdated[1][0].dataValues);
  }

  async index(req, res) {
    const { q: search_name } = req.query;
    const { deliveryman_id } = req.params;
    const where = {};

    if (search_name) {
      where.name = {
        [Op.iLike]: `%${search_name}%`,
      };
    }

    if (deliveryman_id) {
      where.id = deliveryman_id;
    }

    const deliverypeople = await DeliveryPeople.findAll({
      where,
      attributes: ['id', 'name', 'email', 'created_at'],
      include: {
        model: PhotoFile,
        as: 'photo',
        attributes: ['name', 'path', 'id', 'url'],
      },
      order: [['id', 'ASC']],
    });

    return res.json(deliverypeople);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await DeliveryPeople.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'entregador não encontrado' });
    }

    await deliveryman.destroy();

    return res.json({
      success: true,
    });
  }
}

module.exports = new DeliveryPeopleController();
