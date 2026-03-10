const { Kafka } = require('kafkajs');

const brokerString = process.env.KAFKA_BROKERS || 'localhost:29092';
const brokers = brokerString.split(',');

const kafka = new Kafka({
  clientId: 'prholidays-monolith',
  brokers: brokers
});

module.exports = kafka;
