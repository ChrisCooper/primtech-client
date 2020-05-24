#!/bin/bash

PROTO_DEST=./src/proto
mkdir -p ${PROTO_DEST}

rm ${PROTO_DEST}/*

# JavaScript code generation
# ./node_modules/.bin/grpc_tools_node_protoc \
#     --js_out=import_style=commonjs,binary:${PROTO_DEST} \
#     --grpc_out=${PROTO_DEST} \
#     --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
#     -I ./proto \
#     proto/*.proto

# TypeScript code generation
# ./node_modules/.bin/grpc_tools_node_protoc \
#     --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
#     --ts_out=${PROTO_DEST} \
#     -I ./proto \
#     proto/*.proto

PROJECT_PATH=`pwd`

# JavaScript client code generation
# ./bin/protoc proto/citizen.proto \
#     --plugin=protoc-gen-grpc-web=${PROJECT_PATH}/bin/protoc-gen-grpc-web \
#     --js_out=import_style=commonjs:./src/ \
#     --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src/

# TypeScript client declarations generation
# ./bin/protoc proto/citizen.proto \
#     --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
#     --ts_out=./src/

#--plugin=protoc-gen-grpc-web=${PROJECT_PATH}/bin/protoc-gen-grpc-web \
#--js_out=import_style=commonjs,binary:${PROTO_DEST} \
#--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
# --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:${PROTO_DEST} \
# --grpc-ts_out=service=grpc-web:${PROTO_DEST} \
# ./bin/protoc \
#     --plugin=protoc-gen-grpc-web=${PROJECT_PATH}/bin/protoc-gen-grpc-web \
#     --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:${PROTO_DEST} \  
#     -I ${PROJECT_PATH}/proto \
#     ${PROJECT_PATH}/proto/*.proto

./bin/protoc --plugin=protoc-gen-grpc-web=${PROJECT_PATH}/bin/protoc-gen-grpc-web --js_out=import_style=commonjs,binary:${PROTO_DEST} --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:${PROTO_DEST} -I ${PROJECT_PATH}/proto ${PROJECT_PATH}/proto/*.proto
