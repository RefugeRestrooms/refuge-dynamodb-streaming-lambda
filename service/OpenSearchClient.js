"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexDocument = exports.deleteDocument = exports.deleteIndex = void 0;
const node_http_handler_1 = require("@aws-sdk/node-http-handler");
const signature_v4_1 = require("@aws-sdk/signature-v4");
const credential_provider_node_1 = require("@aws-sdk/credential-provider-node");
const sha256_browser_1 = require("@aws-crypto/sha256-browser");
const protocol_http_1 = require("@aws-sdk/protocol-http");
const type = "_doc";
const domain = "your-open-search-domain.com"; // the best way to get this value into your lambdas is to set it as an environment variable in CDK
const index = "user-index";
async function deleteIndex() {
    const request = new protocol_http_1.HttpRequest({
        headers: {
            "Content-Type": "application/json",
            host: domain,
        },
        hostname: domain,
        method: "DELETE",
        path: index
    });
    await execute(request);
}
exports.deleteIndex = deleteIndex;
async function deleteDocument(documentId) {
    const request = new protocol_http_1.HttpRequest({
        headers: {
            "Content-Type": "application/json",
            host: domain
        },
        hostname: domain,
        method: "DELETE",
        path: `${index}/${type}/${documentId}`
    });
    await execute(request);
}
exports.deleteDocument = deleteDocument;
async function indexDocument(documentId, document) {
    const request = new protocol_http_1.HttpRequest({
        body: JSON.stringify(document),
        headers: {
            "Content-Type": "application/json",
            host: domain
        },
        hostname: domain,
        method: "PUT",
        path: `${index}/${type}/${documentId}`
    });
    await execute(request);
}
exports.indexDocument = indexDocument;
async function execute(request) {
    const awsOpenSearchSigner = new signature_v4_1.SignatureV4({
        credentials: (0, credential_provider_node_1.defaultProvider)(),
        region: "<yourRegion>",
        service: "es",
        sha256: sha256_browser_1.Sha256
    });
    try {
        const signedRequest = await awsOpenSearchSigner.sign(request);
        const awsNodeHttpClient = new node_http_handler_1.NodeHttpHandler();
        const { response } = await awsNodeHttpClient.handle(signedRequest);
        if (response.statusCode === 200 || response.statusCode === 201) {
            console.log("Successfully sent request to OpenSearch Domain. Response code:", response.statusCode);
        }
        else {
            console.error("Error occurred with request to OpenSearch Domain. Response code:", response.statusCode);
        }
    }
    catch (error) {
        console.error("Error occurred trying to make request to OpenSearch Domain", error);
        throw error;
    }
}
