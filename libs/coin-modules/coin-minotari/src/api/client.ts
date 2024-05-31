import { credentials } from "@grpc/grpc-js";
import { BaseNodeClient } from "../proto/base_node";
import { APIConfiguration } from "./config";

export function createGRPCClient(config: APIConfiguration) {
  return new BaseNodeClient(config.endpoint, credentials.createInsecure());
}

