const { Op } = require('sequelize');

const Validator = require('validator').default;

const Order = require('../models/Order');
const DeliveryPeople = require('../models/DeliveryPeople');
const Recipient = require('../models/Recipient');
const SignatureFile = require('../models/SignatureFile');
const OrderProblem = require('../models/OrderProblem');

const Email = require('../../lib/Email');
const PhotoFile = require('../models/PhotoFile');

class OrderController {
  async store(req, res) {
    const {
      recipient_id, deliveryman_id, product, signature_id,
    } = req.body;

    if (!recipient_id || !deliveryman_id || !product) {
      return res.status(400).json({ error: 'parametros inválidos' });
    }

    const deliveryman = await DeliveryPeople.findByPk(deliveryman_id, {
      attributes: ['id', 'name', 'email'],
    });
    if (!deliveryman) {
      return res.status(400).json({ error: 'entregador não encontrado' });
    }

    const recipient = Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'endereço não cadastrado' });
    }

    const order = await Order.create({
      recipient_id, deliveryman_id, product, signature_id,
    });

    await Email.sendEmail(
      'noreply@fastfeet.com',
      deliveryman.email,
      `Olá ${deliveryman.name}, você tem uma nova entrega!`,
      `O produto ${product} já está disponível para retirada.`,
    );

    return res.json(order);
  }

  async index(req, res) {
    const { q: search_product } = req.query;
    const { order_id } = req.params;

    const where = {};
    if (search_product) {
      where.product = {
        [Op.iLike]: `%${search_product}%`,
      };
    }

    if (order_id) {
      where.id = order_id;
    }

    const orders = await Order.findAll({
      where,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      order: [['id', 'ASC']],
      include: [
        {
          model: DeliveryPeople,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: PhotoFile,
              as: 'photo',
              attributes: ['name', 'path', 'id', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'street', 'number', 'complement', 'state', 'city', 'zip_code'],
        },
        {
          model: SignatureFile,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }

  async update(req, res) {
    const { order_id } = req.params;
    const {
      recipient_id, deliveryman_id, product,
      canceled_at, start_date, end_date,
      signature_id,
    } = req.body;

    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(400).json({ error: 'entrega não encontrada' });
    }

    if (recipient_id) {
      if (!Validator.isNumeric(String(recipient_id))) {
        return res.status(400).json({ error: 'id do destino inválido' });
      }

      const recipient = await Recipient.findByPk(recipient_id);
      if (!recipient) {
        return res.status(400).json({ error: 'destino não encontrado' });
      }
    }

    if (deliveryman_id) {
      if (!Validator.isNumeric(String(deliveryman_id))) {
        return res.status(400).json({ error: 'id do entregador inválido' });
      }

      const deliveryman = await DeliveryPeople.findByPk(deliveryman_id);
      if (!deliveryman) {
        return res.status(400).json({ error: 'entregador não encontrado' });
      }
    }

    if (signature_id) {
      if (!Validator.isNumeric(String(signature_id))) {
        return res.status(400).json({ error: 'id do arquivo de assinatura inválido' });
      }

      const signature = await SignatureFile.findByPk(signature_id);
      if (!signature) {
        return res.status(400).json({ error: 'arquivo de assinatura não encontrado' });
      }
    }

    const orderUpdated = await Order.update({
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
      start_date,
      end_date,
      signature_id,
    }, {
      returning: true,
      where: { id: order_id },
    });

    return res.json(orderUpdated[1][0].dataValues);
  }

  async delete(req, res) {
    const { order_id } = req.params;

    if (!order_id) {
      return res.status(400).json({ error: 'id não informado' });
    }

    const order = await Order.findByPk(order_id);

    if (!order) {
      return res.status(400).json({ error: 'entrega não encontrada' });
    }

    await OrderProblem.destroy({
      where: {
        order_id,
      },
    });

    await order.destroy();

    return res.json({ success: true });
  }
}

module.exports = new OrderController();
