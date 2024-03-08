

const { createItem, getItemById, getItemByCollections, getAllItemFromTable, deleteItem, updateItem, updateSingleProperty } = require("../controllers/dynamodb-crud");

const tableName = process.env.tableName;

const createElement = async (req, res) => {

    const PartitionKey = req.body.collections;
    const SortKey = req.body.id;
    const data = req.body;
    
    createItem(tableName, PartitionKey, SortKey, data)
    .then(result => {
        res.status(200).json({ success: 1, data: result.Items, message: 'Save complited' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ success: 0, data: err, message: 'Save failed' });
    }) 
}

const getAllElementFromTable = async (req, res) => {

    getAllItemFromTable(tableName)
    .then(response => {
        const result = response.Items || [];
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }) 
}


const getElementByCollections = async (req, res) => {

    let PartitionKey = req.params.collectionName;

    getItemByCollections(tableName, PartitionKey)
    .then(response => {
        const result = response.Items || [];
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }) 
}

const getElementById = async (req,res)=>{
    
    const SortKey = req.params.id;
    const PartitionKey = req.body.collections;
    
    getItemById(tableName,SortKey,PartitionKey)
    .then(response => {
        const result = response.Item || {};
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })      
}

const deleteElementById = async (req,res)=>{
    
    const SortKey = req.params.id;
    const PartitionKey = "comptes"
    
    deleteItem(tableName, PartitionKey, SortKey)
    .then(result => {
        res.status(200).json({ success: 1, data: result.Items, message: 'Delete complited' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ success: 0, data: err, message: 'Delete failed' });
    })     
}


const updateElementById = async (req, res) => {
    
    const SortKey = req.params.id;
    const data = req.body;
    
    updateItem(tableName, SortKey, data)
    .then(result => {
        res.status(200).json({ success: 1, data: result.Item, message: 'Update complited' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ success: 0, data: err, message: 'Update failed' });
    }) 
}

const updateSingleElementProperty = async (req, res) => {
    
    const SortKey = req.params.id;
    const value1 = req.body.login_Compte;
    const value2 = req.body.password_Compte;
    const PartitionKey = req.body.collections;
    
    updateSingleProperty(tableName, PartitionKey, SortKey, value1, value2)
    .then(result => {
        res.status(200).json({ success: 1, data: result.Item, message: 'Update complited' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ success: 0, data: err, message: 'Update failed' });
    }) 
}



module.exports = { createElement, getAllElementFromTable, getElementByCollections, getElementById, deleteElementById, updateElementById, updateSingleElementProperty };



// const getElementByDepartement = async (req, res) => {

//     let idDepartement = req.params.id;

//     const command = new QueryCommand({
//         TableName: tableName,
//         KeyConditionExpression:
//             "collections = :_collection AND id_Departement = :id_Departement",
//         ExpressionAttributeValues: {
//             ":_collection": PartitionKey,
//             ":id_Departement": idDepartement,
//         },
//         ConsistentRead: true,   //------ seules les plus recentes sont cosidérées --------
//     });

//     const response = await docClient.send(command);

//     response
//         .then(result => {
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         })
// }