'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateProcessingBody = require('./HttpRequestStateProcessingBody');

var HttpRequestStateProcessingHeaders = function () {
    function HttpRequestStateProcessingHeaders(httpRequest) {
        _classCallCheck(this, HttpRequestStateProcessingHeaders);

        this.httpRequest = httpRequest;
        this._tempBuffer;
    }

    _createClass(HttpRequestStateProcessingHeaders, [{
        key: 'entry',
        value: function entry() {}
    }, {
        key: 'exit',
        value: function exit() {}
    }, {
        key: 'onData',
        value: function onData(data) {
            if (this._tempBuffer) this._tempBuffer = Buffer.concat([this._tempBuffer, data]);else this._tempBuffer = data;

            var completeRequest = this._getCompleteRequest(tempBuffer);
            if (completeRequest) {
                var requestData = this._parseRequestInfo(completeRequest.head);
                this.httpRequest.socket.unshift(completeRequest.body);
                this.httpRequest._headInfo = requestData;
            }
        }
    }, {
        key: '_getCompleteRequest',
        value: function _getCompleteRequest(buffer) {
            var tempString = buffer.toString('utf-8');
            if (~tempString.indexOf('\r\n\r\n')) {
                var requestParts = tempString.split('\r\n\r\n');
                return {
                    head: requestParts[0],
                    body: requestParts[1]
                };
            }
        }
    }, {
        key: '_parseRequestInfo',
        value: function _parseRequestInfo(buffer) {
            var result = {};
            result.headers = {};

            var requestHead = buffer.toString('utf-8');
            var requestRecords = requestHead.split('\r\n');
            var requestParams = requestRecords.shift().split(' ');

            result.method = requestParams[0];
            result.path = requestParams[1];
            result.protocol = requestParams[2];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = requestRecords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var requestRecord = _step.value;

                    var recordParts = requestRecord.split(': ');
                    result.headers[recordParts[0]] = recordParts[1];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return result;
        }
    }]);

    return HttpRequestStateProcessingHeaders;
}();

module.exports = HttpRequestStateProcessingHeaders;
//# sourceMappingURL=HttpRequestStateProcessingHeaders.js.map