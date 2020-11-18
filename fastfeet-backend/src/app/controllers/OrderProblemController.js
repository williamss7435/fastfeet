const { default: Validator } = require('validator');

const OrderProblem = require('../models/OrderProblem');
const DeliveryPeople = require('../models/DeliveryPeople');
const Order = require('../models/Order');

const Email = require('../../lib/Email');

class OrderProblemController {
  async index(req, res) {
    const orderproblems = await OrderProblem.findAll(
      {
        attributes: ['id', 'description', 'created_at', 'updated_at'],
        include: [{
          model: Order,
          as: 'order',
          attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date', 'created_at', 'updated_at'],
          include: [
            {
              model: DeliveryPeople,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
          ],
        }],
        order: [
          ['updated_at', 'DESC'],
        ],
      },
    );

    return res.json(orderproblems);
  }

  async indexById(req, res) {
    const { order_id } = req.params;

    const orderproblems = await OrderProblem.findAll(
      {
        attributes: ['id', 'description', 'created_at', 'updated_at'],
        where: { order_id },
        limit: 10,
        // include: [{
        //   model: Order,
        //   as: 'order',
        //   attributes: ['id', 'product', 'canceled_at',
        // 'start_date', 'end_date', 'created_at', 'updated_at'],
        //   include: [
        //     {
        //       model: DeliveryPeople,
        //       as: 'deliveryman',
        //       attributes: ['id', 'name', 'email'],
        //     },
        //   ],
        // }],
        order: [
          ['updated_at', 'DESC'],
        ],
      },
    );

    return res.json(orderproblems);
  }

  async store(req, res) {
    const { description } = req.body;
    const { order_id } = req.params;

    if (!description || !Validator.isLength(description, { min: 1 })) {
      return res.status(400).json({ error: 'é necessário uma descrição para o problema' });
    }

    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(400).json({ error: 'entrega não encontrada' });
    }

    const orderProblem = await OrderProblem.create({
      order_id,
      description,
    });

    return res.json(orderProblem);
  }

  async delete(req, res) {
    const { problem_id } = req.params;

    const order_problem = await OrderProblem.findByPk(problem_id);
    if (!order_problem) {
      return res.status(400).json({ error: 'problema não encontrado' });
    }

    const order = await Order.findByPk(order_problem.order_id, {
      include: [{
        model: DeliveryPeople,
        as: 'deliveryman',
        attributes: ['email', 'name'],
      }],
    });

    await OrderProblem.destroy({
      where: { order_id: order.id },
    });

    await order.destroy();

    await Email.sendEmail(
      'noreply@fastfeet.com',
      order.deliveryman.email,
      `Entrega do ${order.product} foi cancelada`,
      `Olá ${order.deliveryman.name}, a entrega do produto ${order.product} foi cancelada`,
    );

    return res.json({ success: true });
  }
}

module.exports = new OrderProblemController();
