# primtech-client

## Project setup
```
npm install
```

### gRPC code generation
```
./gen_proto_bindings.sh
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Painful lessons so far
- Protoc only generates gRPC service stubs via a plugin. This plugin also has (experimental) TypeScript support, so you don't need a typescript plugin
- The Node package for gRPC support relies on Node features, so can't be used in the browser. Instead, you must use gRPC-Web, which has a separate protoc plugin for generated browser-compatible version of the gRPC client
- There are two grpc clients currently: grpc-web, and @improbable-eng/grpc-web (Summary of state: https://grpc.io/blog/state-of-grpc-web/)
- The gRPC protocol can't yes be natively implemented in the browser, so a proxy must be used (Envoy)
- PR to add TLS support to envoy/gRPS communication and increase streaming connection limit: https://github.com/angelomelonas/grpc-web-chat/pull/13/files
