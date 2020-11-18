const { Op } = require('sequelize');
const Validator = require('validator').default;

const Recipient = require('../models/Recipient');

class RecipientController {
  async index(req, res) {
    const { q: search_name } = req.query;
    const { recipient_id: id } = req.params;

    const where = {};

    if (search_name) {
      where.name = {
        [Op.iLike]: `%${search_name}%`,
      };
    }
    if (id) {
      where.id = id;
    }

    const recipients = await Recipient.findAll({
      where,
      order: [['id', 'ASC']],
    });

    res.json(recipients);
  }

  async store(req, res) {
    const {
      name, street, number, complement, state, city, zip_code,
    } = req.body;

    if (!complement) { req.body.complement = null; }

    if (
      !name || Validator.isEmpty(name)
      || !street || Validator.isEmpty(street)
      || !number || Validator.isEmpty(number) || !Validator.isNumeric(number)
      || !state || Validator.isEmpty(state)
      || !city || Validator.isEmpty(city)
      || !zip_code || Validator.isEmpty(zip_code) || !Validator.isNumeric(zip_code)
    ) {
      return res.status(400).json({ error: 'Parametros inválidos' });
    }

    const recipientExist = await Recipient.findOne({
      where: {
        street, number, state, city, zip_code,
      },
    });
    if (recipientExist) {
      return res.status(400).json({ error: 'Destinatario já existe' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const {
      name, street, number, complement, state, city, zip_code,
    } = req.body;

    const { recipient_id: id } = req.params;

    if (!id) { return res.status(400).json({ error: 'Id do destinatario não informado' }); }

    const recipient = await Recipient.findOne({
      where: { id },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'destinatário não encontrado' });
    }

    const recipientUpdated = await Recipient.update({
      name, street, number, complement, state, city, zip_code,
    }, {
      where: { id },
      returning: true,
    });

    return res.json(recipientUpdated[1][0].dataValues);
  }
}

module.exports = new RecipientController();
