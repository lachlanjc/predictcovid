"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.db = void 0;

var _client = require("@prisma/client");

const db = new _client.PrismaClient({ forceTransactions: true });
exports.db = db;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYkluc3RhbmNlLnRzIl0sIm5hbWVzIjpbImRiIiwiUHJpc21hQ2xpZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBRU8sTUFBTUEsRUFBRSxHQUFHLElBQUlDLG9CQUFKLEVBQVgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuZXhwb3J0IGNvbnN0IGRiID0gbmV3IFByaXNtYUNsaWVudCgpXG4iXX0=
