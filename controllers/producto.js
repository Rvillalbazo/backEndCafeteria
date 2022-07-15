const { returnsResponse } = require('../helpers/returnsResponse');
const { 
    CODE_200, CODE_201, CODE_400, CODE_404, CODE_500, OK, BAD_REQUEST, NOT_FOUND
} = require('../config');
const { Categoria, Producto } = require('../models');

exports.getProducto= async (req, res) => {
    try {
        const { from = 0, limit = 400 } = req.query;
        const validStates = [0, 1];
        const state = (req.query.state === undefined) ? true : (validStates.includes(+req.query.state) && +req.query.state === 1);
        const query = { state };

        const [totalRecords, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip( Number(from) )
                .limit( Number(limit) )
                .populate('category', 'name')
        ]);
                  
        return returnsResponse(res, CODE_200, { 
            msg: OK, 
            totalRecords, 
            data: productos 
        });    
    } 
    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

exports.getProductoByID = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id)
            .populate('category', 'nombre');

        if (!producto)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });

        return returnsResponse(res, CODE_200, { 
            msg: OK, 
            data: producto 
        }); 
    } 
    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

exports.getProductoxCategoriaByID = async (req, res) => {
    try {
        const { idCategory } = req.params;
        const [totalRecords, productoXcategoria] = await Promise.all([
            Producto.countDocuments(),
            //Categoria.find({ where: { _id: idCategory }}).populate('producto ', 'name')
            Producto.find().where('category').all([idCategory])
                .populate('category', 'nombre')
        ]);

        const producto = await Producto.find().where('category').all([idCategory])
            .populate('category', 'nombre');

        if (!producto)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });

        return returnsResponse(res, CODE_200, { 
            msg: OK,
            totalRecords,
            data: producto 
        }); 
    } 
    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

exports.createProducto = async (req, res) => {
    try {
        const { category: idCategory, nombre, ...body } = req.body;
        const productoExists = await Producto.findOne({ nombre });

        if(productoExists)
            return returnsResponse(res, CODE_400, { msg: BAD_REQUEST });
        
        const category = await Categoria.findById(idCategory);

        if (!category)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });
    
        const data = { category, nombre, ...body }

        const producto = new Producto(data);
        await producto.save();

        returnsResponse(res, CODE_201, { 
            msg: OK, 
            data: producto
        }); 
    } 

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { category: idCategory, name } = req.body;
        const validStates = [true, false];

        const productoExiste = await Producto.findById(id);

        if (!productoExiste)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });
        
        const category = await Categoria.findById(idCategory);
    
        if (!category)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });

        const state = ((validStates.includes(req.body.state) && (req.body.state !== null)) ? req.body.state : productoExiste.state)
        const data = { name, ...req.body, state, category: idCategory };

        const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

        return returnsResponse(res, CODE_200, { 
            msg: OK, 
            data: producto
        }); 
    } 

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

exports.deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const productoExiste = await Product.findById(id);

        if (!productoExiste)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });

        await Producto.findByIdAndDelete(id);

        returnsResponse(res, CODE_200, { 
            msg: OK
        });
    } 

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}