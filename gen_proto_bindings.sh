#!/bin/bash

PROTO_DEST=./src/proto

mkdir -p ${PROTO_DEST}
rm ${PROTO_DEST}/*

./bin/protoc --plugin=protoc-gen-grpc-web=${PROJECT_PATH}/bin/protoc-gen-grpc-web --js_out=import_style=commonjs,binary:${PROTO_DEST} --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:${PROTO_DEST} -I ${PROJECT_PATH}/proto ${PROJECT_PATH}/proto/*.proto
