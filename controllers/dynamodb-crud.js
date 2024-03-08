
const { DynamoDBClient, waitUntilTableExists } = require("@aws-sdk/client-dynamodb");
const { PutCommand, UpdateCommand, GetCommand, DeleteCommand, QueryCommand, ScanCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const createItem = async (tableName, PartitionKey, SortKey, data) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: {
        ...data,
        collections: PartitionKey,
        id: SortKey
    },
  });

  //--This polls with DescribeTableCommand until the requested table is 'ACTIVE'.
  //--You can't write to a table before it's active.
  //--log("Waiting for the table to be active
  await waitUntilTableExists({ client }, { TableName: tableName });

  const response = await docClient.send(command);
  return response;
};


const getItemById = async (tableName, SortKey, PartitionKey) => {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      id: SortKey,
      collections: PartitionKey
    },
    ConsistentRead: true,   //------ seules les plus recentes sont cosidérées --------
  });

  const response = await docClient.send(command);
  return response;
};


const getItemByCollections = async (tableName, PartitionKey) => {
  const command = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression:
      "collections = :_collections",
    ExpressionAttributeValues: {
      ":_collections": PartitionKey,
    },
    ConsistentRead: true,   //------ seules les plus recentes sont cosidérées --------
  });

  const response = await docClient.send(command);
  return response;
};


const getAllItemFromTable = async (tableName) => {
  const command = new ScanCommand({
    TableName: tableName,
  });

  const response = await docClient.send(command);
  // for (const bird of response.Items) {
  //   console.log(`${bird.Name} - (${bird.Color}, ${bird.AvgLifeSpan})`);
  // }
  return response;
};


const deleteItem = async (tableName, PartitionKey, SortKey) => {
  const command = new DeleteCommand({
    TableName: tableName,
    Key: {
      id: SortKey,
      collections: PartitionKey
    },
  });

  const response = await docClient.send(command);
  return response;
};

const updateItem = async (tableName, SortKey, data) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: {
        ...data,
        id: SortKey
    },
  });

  const response = await docClient.send(command);
  return response;
};

const updateSingleProperty = async (tableName, PartitionKey, SortKey, value1, value2) => {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: {
      collections: PartitionKey,
      id: SortKey,
    },
    UpdateExpression: "set login_Compte = :login_Compte, password_Compte = :password_Compte",
    ExpressionAttributeValues: {
      ":login_Compte": value1,
      ":password_Compte": value2,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};



module.exports = { createItem, getItemById, getItemByCollections, getAllItemFromTable, deleteItem, updateItem, updateSingleProperty }

 

// const updateItem = async () => {
//   const command = new UpdateCommand({
//     TableName: "Dogs",
//     Key: {
//       Breed: "Labrador",
//     },
//     UpdateExpression: "set Color = :color",
//     ExpressionAttributeValues: {
//       ":color": "black",
//     },
//     ReturnValues: "ALL_NEW",
//   });

//   const response = await docClient.send(command);
//   console.log(response);
//   return response;
// };




// const getAllItemFromCollections = async () => {
//     const command = new QueryCommand({
//         TableName: "CoffeeCrop",
//         KeyConditionExpression:
//             "OriginCountry = :originCountry AND RoastDate > :roastDate",
//         ExpressionAttributeValues: {
//             ":originCountry": "Ethiopia",
//             ":roastDate": "2023-05-01",
//         },
//     });

//     const response = await docClient.send(command);
//     console.log(response);
//     return response;
// };

