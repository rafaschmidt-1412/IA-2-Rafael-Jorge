const router = require('express').Router();
const PedidoController = require('../Controller/PedidoController.js');

router.post('/finalizar', PedidoController.concluir);
router.get('/getAll', PedidoController.listar);

module.exports = router;