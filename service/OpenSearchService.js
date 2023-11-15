"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexDocumentInOpenSearch = exports.removeDocumentFromOpenSearch = void 0;
const OpenSearchClient_1 = require("./OpenSearchClient");
async function removeDocumentFromOpenSearch(partitionKey, sortKey) {
    if (!partitionKey || !sortKey) {
        console.error("Error: either partition key or sort key is undefined");
        return;
    }
    const documentId = `${partitionKey}_${sortKey}`;
    console.log("Deleting document from OpenSearch with id:", documentId);
    await (0, OpenSearchClient_1.deleteDocument)(documentId);
}
exports.removeDocumentFromOpenSearch = removeDocumentFromOpenSearch;
async function indexDocumentInOpenSearch(restroom, partitionKey, sortKey) {
    if (!partitionKey || !sortKey) {
        console.error("Error: either partition key or sort key is undefined");
        return;
    }
    const documentId = `${partitionKey}_${sortKey}`;
    console.log("Indexing document in OpenSearch with id:", documentId);
    await (0, OpenSearchClient_1.indexDocument)(documentId, restroom);
}
exports.indexDocumentInOpenSearch = indexDocumentInOpenSearch;
