#!/bin/bash

PROJECT_PATH=`pwd`
PROTO_SRC='/mnt/c/Users/chris/pro/primitive-technology/src/main/proto'
PROTO_DEST="${PROJECT_PATH}/proto"
COMPILED_PROTO_DEST="${PROJECT_PATH}/src/proto"

mkdir -p ${PROTO_DEST}
rm ${PROTO_DEST}/*
cp ${PROTO_SRC}/* ${PROTO_DEST}

mkdir -p ${COMPILED_PROTO_DEST}
rm ${COMPILED_PROTO_DEST}/*

./bin/protoc --plugin=protoc-gen-grpc-web=${PROJECT_PATH}/bin/protoc-gen-grpc-web --js_out=import_style=commonjs,binary:${COMPILED_PROTO_DEST} --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:${COMPILED_PROTO_DEST} -I ${PROJECT_PATH}/proto ${PROJECT_PATH}/proto/*.proto
