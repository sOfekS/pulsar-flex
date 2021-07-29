const commands = require('../../commands');
const errors = require('../../errors');
const utils = require('../../utils');

const create = async ({
  topic,
  requestId,
  producerId,
  cnx,
  responseMediator,
  producerConfiguration,
}) => {
  const { sendSimpleCommandRequest } = cnx;
  const createProducer = commands.createProducer({
    topic,
    requestId,
    producerId,
    ...producerConfiguration,
  });
  const { command } = await sendSimpleCommandRequest({ command: createProducer }, responseMediator);
  if (!utils.isNil(command.error))
    throw new errors.PulsarFlexProducerCreationError(command.message);
  return { command };
};

module.exports = create;
