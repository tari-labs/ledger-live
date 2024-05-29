
# @ledgerhq/coin-minotari


Common implementation for MinoTari family


## Generating typescript files from proto files

You need to install protoc and common headers, this is system dependent consult [documentation](https://grpc.io/docs/protoc-installation/) for platform specific instructions.
On fedora for example `dnf install protobuf-devel protobuf-compiler` installs the compiler and common headers.

After installing the dependencies for this package via `pnpm install` run the [build_proto.sh script](./build_proto.sh) This will generate the files under src/proto