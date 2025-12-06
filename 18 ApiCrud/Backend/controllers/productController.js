import { parse } from 'path';
import Product from '../models/productmodel.js';
export const createProduct = (req, res) => {
    let categoryid=req.body.categoryid;
    if(!req.body.name || !isNaN(parseInt(categoryid)) && categoryid ===0 ){
        res.status(400).send({message: 'No puede estar vacio!'});
    }
      const newProduct = new Product({
        category_id: req.body.category_id,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    });
    let id = req.body.id;
    console.log('ID recibido: ', id);
    if (id && id !=0 && typeof parseInt(id) === 'number'? true : false) {
        Product.newProduct.id = id;
    }
    console.log('Nuevo producto a crear: ', newProduct);
    Product.create(newProduct, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error al crear el producto.'
            });
        } else {
            res.send({message: `Producto ${data.name} con id ${data.id} creado exitosamente y categoria ${data.category_id}`, data});
        }
    });
}
  