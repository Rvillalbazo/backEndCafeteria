const { returnsResponse } = require('../helpers/returnsResponse');
const { CODE_200, CODE_201, CODE_400, CODE_404, CODE_500, BAD_REQUEST, CREATED, NOT_FOUND, OK } = require('../config');
const { Orden } = require('../models');

exports.getOrden = async (req, res) => {
    try {
        const { status } = req.query;
        const query = { status: (+status === 1) };
        const validStates = [0, 1];

        if (!validStates.includes(+status))
            return returnsResponse(res, CODE_400, { msg: BAD_REQUEST });

        const records = await Orden.find(query);

        if (!records.length)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });
        
        return returnsResponse(res, CODE_200, { msg: OK, data: records });  
    } 
    
    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

exports.getOrdenByID = async (req, res) => {
    try {
        const { id } = req.params;
    
        const record = await Orden.findById(id);
        
        if (!record)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });
        
        return returnsResponse(res, CODE_200, { msg: CREATED, data: record });  
    } 
    
    catch (error) {
        return returnsResponse(res, CODE_500);  
    }
}

exports.createOrden = async (req, res) => {
    try {        
        const record = new Orden({ ...req.body });
        await record.save();
        
        return returnsResponse(res, CODE_201, { msg: CREATED, data: record });  
    } 
    
    catch (error) {
        return returnsResponse(res, CODE_500);  
    }
}

exports.updateOrden = async (req, res) => {
    try {
        const { name, status } = req.body;
        const { id } = req.params;
        
        if (!name)
            return returnsResponse(res, CODE_400, { msg: BAD_REQUEST });
    
        const record = await Orden.findById(id);            
    
        if (!record)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });  

        const data = {
            name,   
            status: ((status === undefined) ? record.status : status)
        }

        const updatedRecord = await Orden.findByIdAndUpdate(id, data, { new: true }); 

        return returnsResponse(res, CODE_200, { msg: OK, data: updatedRecord });  
    } 
    
    catch (error) {
        return returnsResponse(res, CODE_500);  
    }
}

exports.deleteOrden= async (req, res) => {
    try {
        const { id } = req.params;
    
        const record = await Orden.findById(id);            
    
        if (!record)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });  
        
        await Orden.findByIdAndDelete(id);
        return returnsResponse(res, CODE_200, { msg: OK });  
    } 
    
    catch (error) {
        return returnsResponse(res, CODE_500);  
    }
}