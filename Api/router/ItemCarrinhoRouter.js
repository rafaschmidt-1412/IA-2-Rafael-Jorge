const router = require('express').Router();
const ItemCarrinhoController = require('../Controller/ItemCarrinhoController.js');

router.post('/add', ItemCarrinhoController.adicionar);
router.get('/getAll', ItemCarrinhoController.listar);
router.patch('/update/:id', ItemCarrinhoController.alterarQtd);
router.delete('/delete/:id', ItemCarrinhoController.excluir);
router.delete('/clear', ItemCarrinhoController.limpar);

module.exports = router;