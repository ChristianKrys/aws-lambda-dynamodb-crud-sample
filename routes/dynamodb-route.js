const express = require('express');

const { createElement, getAllElementFromTable, getElementByCollections, getElementById, deleteElementById, updateElementById, updateSingleElementProperty } = require('../controllers/controllerDynamodb');

const routeDynamodb = express.Router();
routeDynamodb.post('/createelement',createElement);
routeDynamodb.get('/getallelementfromtable',getAllElementFromTable);
routeDynamodb.get('/getelementbycollections/:collectionName',getElementByCollections);
routeDynamodb.get('/getelementbyid/:id',getElementById);
routeDynamodb.put('/updateelementbyid/:id',updateElementById);
routeDynamodb.put('/updatesingleelementproperty/:id',updateSingleElementProperty);
routeDynamodb.delete('/deleteelementbyid/:id',deleteElementById);


//---/dynamodb-api/v1/deleteelementbyid/100000000000dhddjjdj

module.exports = { routeDynamodb };

