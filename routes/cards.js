const router = require('express').Router();
const path = require('path');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middlewares/auth');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  // eslint-disable-next-line import/no-dynamic-require
} = require(path.join('..', 'controllers', 'cards'));

router.route('/cards')
  .get(auth, getCards)
  .post(auth, celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
  }), createCard);
router.route('/cards/:cardId/likes')
  .put(auth, celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24),
    }),
  }), likeCard)
  .delete(auth, celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24),
    }),
  }), dislikeCard);
router.delete('/cards/:_id', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24),
  }),
}), deleteCard);

module.exports = router;
