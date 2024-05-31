import Long from "long";
import { BaseNodeClient, MetaData } from "../proto/base_node";
import { Empty } from "../proto/types";
import { NetworkError } from "@ledgerhq/errors";

export function getTipMetadata(client: BaseNodeClient): Promise<MetaData> {
    return new Promise<MetaData>((resolve, reject) => {
        client.getTipInfo(Empty, (error, response) => {
            if (error) {
                reject(new NetworkError(error.message));
            } else if (response.metadata == null) {
                reject(new NetworkError('No tipmetadata provided'));
            } else {
                resolve(response.metadata);
            }
        })
    });
}