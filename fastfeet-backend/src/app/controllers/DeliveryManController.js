const { Op } = require('sequelize');
const { parseISO } = require('date-fns');

const Order = require('../models/Order');
const Recipient = require('../models/Recipient');
const Libdate = require('../../lib/LibDate');
const SignatureFile = require('../models/SignatureFile');

class DeliveryManController {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const { delivered } = req.query;

    if (!deliveryman_id) {
      return res.status(400).json({ error: 'entregador não informado' });
    }

    const where = {
      deliveryman_id,
    };

    if (delivered === '1') {
      where.end_date = {
        [Op.not]: null,
      };
    } else {
      where.end_date = null;
    }

    const orders = await Order.findAll(
      {
        where,
        attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date', 'created_at'],
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: ['id', 'name', 'street', 'number', 'complement', 'state', 'city', 'zip_code'],
          },
        ],
      },
    );

    return res.json(orders);
  }

  async withdrawal(req, res) {
    const { order_id } = req.params;
    const { start_date } = req.body;

    if (!Libdate.isDate(start_date)) {
      return res.status(400).json({ error: 'formato da data inválido' });
    }

    if (!Libdate.BetweenHour(start_date, '8:00:00', '20:00:00')) {
      return res.status(400).json({ error: 'só é possivel fazer retiradas entre as 8:00h até 20:00' });
    }

    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(400).json({ error: 'entrega não encontrada' });
    }

    const ordersInday = await Order.findAll({
      where: { deliveryman_id: order.deliveryman_id },
    });

    if (ordersInday.length > 5) {
      return res.status(400).json({ error: 'não é permitido fazer mais que 5 retiradas por dia' });
    }

    const orderUpdated = await Order.update({
      start_date: parseISO(start_date),
    }, {
      where: { id: order_id },
      returning: true,
    });

    return res.json(orderUpdated[1][0].dataValues);
  }

  async finish(req, res) {
    const { order_id } = req.params;
    const { end_date, signature_id } = req.body;

    if (!signature_id) {
      return res.status(400).json({ error: 'id da assinatura não informado' });
    }

    if (!Libdate.isDate(end_date)) {
      return res.status(400).json({ error: 'formado de data inválido' });
    }

    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(400).json({ error: 'entrega não encontrada' });
    }

    const signature = await SignatureFile.findByPk(signature_id);
    if (!signature) {
      return res.status(400).json({ error: 'arquivo de assinatura não encontrado' });
    }

    order.end_date = end_date;
    order.signature_id = signature_id;

    const orderUpdated = await order.save();

    return res.json(orderUpdated);
  }
}

module.exports = new DeliveryManController();
