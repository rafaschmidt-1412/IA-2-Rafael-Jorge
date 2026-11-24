const router = require('express').Router();
const ProdutoController = require('../controller/ProdutoController.js');

router.post('/create', ProdutoController.create);
router.get('/getAll', ProdutoController.getAll);
router.get('/getById/:id', ProdutoController.getById);
router.patch('/update/:id', ProdutoController.update);
router.delete('/delete/:id', ProdutoController.delete);

module.exports = router;