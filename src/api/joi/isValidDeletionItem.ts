import Joi from 'joi';

const isValidDeletionItem = Joi.object({
  listID: Joi.string().required(),
  itemID: Joi.string().required(),
});

export default isValidDeletionItem;
