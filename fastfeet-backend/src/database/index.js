const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database');

const User = require('../app/models/User');
const Recipient = require('../app/models/Recipient');
const PhotoFile = require('../app/models/PhotoFile');
const SignatureFile = require('../app/models/SignatureFile');
const DeliveryPeople = require('../app/models/DeliveryPeople');
const Order = require('../app/models/Order');
const OrderProblem = require('../app/models/OrderProblem');

const models = [User, Recipient, PhotoFile, DeliveryPeople, SignatureFile, Order, OrderProblem];

class DataBase {
  constructor() {
    this.conn = new Sequelize(databaseConfig);

    this.initModels();
  }

  initModels() {
    models.map((model) => model.init(this.conn))
      .map((model) => model.associate && model.associate(this.conn.models));
  }
}

module.exports = new DataBase();
