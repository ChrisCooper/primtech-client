/**
 * @fileoverview gRPC-Web generated client stub for primtech.tech
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var general_pb = require('./general_pb.js')
const proto = {};
proto.primtech = {};
proto.primtech.tech = require('./tech_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.primtech.tech.TechServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.primtech.tech.TechServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.primtech.Void,
 *   !proto.primtech.Void>}
 */
const methodDescriptor_TechService_GetTech = new grpc.web.MethodDescriptor(
  '/primtech.tech.TechService/GetTech',
  grpc.web.MethodType.UNARY,
  general_pb.Void,
  general_pb.Void,
  /**
   * @param {!proto.primtech.Void} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  general_pb.Void.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.primtech.Void,
 *   !proto.primtech.Void>}
 */
const methodInfo_TechService_GetTech = new grpc.web.AbstractClientBase.MethodInfo(
  general_pb.Void,
  /**
   * @param {!proto.primtech.Void} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  general_pb.Void.deserializeBinary
);


/**
 * @param {!proto.primtech.Void} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.primtech.Void)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.primtech.Void>|undefined}
 *     The XHR Node Readable Stream
 */
proto.primtech.tech.TechServiceClient.prototype.getTech =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/primtech.tech.TechService/GetTech',
      request,
      metadata || {},
      methodDescriptor_TechService_GetTech,
      callback);
};


/**
 * @param {!proto.primtech.Void} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.primtech.Void>}
 *     A native promise that resolves to the response
 */
proto.primtech.tech.TechServicePromiseClient.prototype.getTech =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/primtech.tech.TechService/GetTech',
      request,
      metadata || {},
      methodDescriptor_TechService_GetTech);
};


module.exports = proto.primtech.tech;

