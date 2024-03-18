"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = void 0;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["Bad_Request"] = 400] = "Bad_Request";
    ErrorCodes[ErrorCodes["Un_Authorized"] = 401] = "Un_Authorized";
    ErrorCodes[ErrorCodes["Not_Found"] = 404] = "Not_Found";
    ErrorCodes[ErrorCodes["Internal"] = 500] = "Internal";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
