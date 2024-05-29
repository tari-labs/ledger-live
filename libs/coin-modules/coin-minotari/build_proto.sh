#!/usr/bin/env bash
rm -r src/proto
mkdir src/proto
protoc --plugin=$(pnpm root)/.bin/protoc-gen-ts_proto \
 --ts_proto_out=src/proto \
 --ts_proto_opt=forceLong=long \
 --ts_proto_opt=outputServices=grpc-js \
 --ts_proto_opt=esModuleInterop=true \
 -I=proto/ ./proto/*.proto