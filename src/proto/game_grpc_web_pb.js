/**
 * @fileoverview gRPC-Web generated client stub for primtech.game
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var general_pb = require('./general_pb.js')
const proto = {};
proto.primtech = {};
proto.primtech.game = require('./game_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.primtech.game.GameServiceClient =
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
proto.primtech.game.GameServicePromiseClient =
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
 *   !proto.primtech.game.FrameInfo>}
 */
const methodDescriptor_GameService_StreamFrames = new grpc.web.MethodDescriptor(
  '/primtech.game.GameService/StreamFrames',
  grpc.web.MethodType.SERVER_STREAMING,
  general_pb.Void,
  proto.primtech.game.FrameInfo,
  /**
   * @param {!proto.primtech.Void} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.primtech.game.FrameInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.primtech.Void,
 *   !proto.primtech.game.FrameInfo>}
 */
const methodInfo_GameService_StreamFrames = new grpc.web.AbstractClientBase.MethodInfo(
  proto.primtech.game.FrameInfo,
  /**
   * @param {!proto.primtech.Void} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.primtech.game.FrameInfo.deserializeBinary
);


/**
 * @param {!proto.primtech.Void} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.primtech.game.FrameInfo>}
 *     The XHR Node Readable Stream
 */
proto.primtech.game.GameServiceClient.prototype.streamFrames =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/primtech.game.GameService/StreamFrames',
      request,
      metadata || {},
      methodDescriptor_GameService_StreamFrames);
};


/**
 * @param {!proto.primtech.Void} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.primtech.game.FrameInfo>}
 *     The XHR Node Readable Stream
 */
proto.primtech.game.GameServicePromiseClient.prototype.streamFrames =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/primtech.game.GameService/StreamFrames',
      request,
      metadata || {},
      methodDescriptor_GameService_StreamFrames);
};


module.exports = proto.primtech.game;

