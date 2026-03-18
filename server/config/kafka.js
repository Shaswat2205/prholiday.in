const { Kafka } = require('kafkajs');

const brokerString = process.env.KAFKA_BROKERS || '127.0.0.1:29092';
const brokers = brokerString.split(',');
console.log('Kafka brokers configured:', brokers);

const kafka = new Kafka({
  clientId: 'prholidays-monolith',
  brokers: brokers
});

module.exports = kafka;
