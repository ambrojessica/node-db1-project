const router = require('express').Router();
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware');
const Accounts = require('./accounts-model');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.getAll();
    res.json(account);
  }
  catch (err) {
    next(err);
  }
});

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account);
});

router.post('/', checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Accounts.create(
      req.body
    );
    res.status(201).json(newAccount);
  }
  catch (err) {
    next(err);
  }
});

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updated = await Accounts.updateById(req.params.id, req.body);
    res.json(updated);
  }
  catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Accounts.deleteById(req.params.id);
    res.json(req.account);
  }
  catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 201).json(err);
});

module.exports = router;
