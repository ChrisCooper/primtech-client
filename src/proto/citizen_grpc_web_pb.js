/**
 * @fileoverview gRPC-Web generated client stub for primtech.citizen
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var general_pb = require('./general_pb.js')
const proto = {};
proto.primtech = {};
proto.primtech.citizen = require('./citizen_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.primtech.citizen.CitizenServiceClient =
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
proto.primtech.citizen.CitizenServicePromiseClient =
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
 *   !proto.primtech.citizen.Citizen>}
 */
const methodDescriptor_CitizenService_GetCitizen = new grpc.web.MethodDescriptor(
  '/primtech.citizen.CitizenService/GetCitizen',
  grpc.web.MethodType.UNARY,
  general_pb.Void,
  proto.primtech.citizen.Citizen,
  /**
   * @param {!proto.primtech.Void} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.primtech.citizen.Citizen.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.primtech.Void,
 *   !proto.primtech.citizen.Citizen>}
 */
const methodInfo_CitizenService_GetCitizen = new grpc.web.AbstractClientBase.MethodInfo(
  proto.primtech.citizen.Citizen,
  /**
   * @param {!proto.primtech.Void} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.primtech.citizen.Citizen.deserializeBinary
);


/**
 * @param {!proto.primtech.Void} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.primtech.citizen.Citizen)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.primtech.citizen.Citizen>|undefined}
 *     The XHR Node Readable Stream
 */
proto.primtech.citizen.CitizenServiceClient.prototype.getCitizen =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/primtech.citizen.CitizenService/GetCitizen',
      request,
      metadata || {},
      methodDescriptor_CitizenService_GetCitizen,
      callback);
};


/**
 * @param {!proto.primtech.Void} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.primtech.citizen.Citizen>}
 *     A native promise that resolves to the response
 */
proto.primtech.citizen.CitizenServicePromiseClient.prototype.getCitizen =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/primtech.citizen.CitizenService/GetCitizen',
      request,
      metadata || {},
      methodDescriptor_CitizenService_GetCitizen);
};


module.exports = proto.primtech.citizen;

