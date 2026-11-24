const router = require('express').Router();
const ProdutoController = require('../Controller/ProdutoController.js');
const { uploadFoto } = require('../helpers/upload-foto.js');

router.post('/create', uploadFoto.single('imagem'), ProdutoController.create);
router.get('/getAll', ProdutoController.getAll);
router.get('/getById/:id', ProdutoController.getById);
router.patch('/update/:id', uploadFoto.single('imagem'), ProdutoController.update);
router.delete('/delete/:id', ProdutoController.delete);

module.exports = router;