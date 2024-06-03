import Long from "long";
import { createGRPCClient } from "../../src/api/client";
import { GetBlocksRequest } from "../../src/proto/base_node";
import { Empty } from "../../src/proto/types";
import { Block, HistoricalBlock } from "../../src/proto/block";

describe("GetBlocksFlow", () => {
  it("retrieves blocks", async () => {
    const client = createGRPCClient({
        endpoint: "3.248.103.200:18142"
    });

    const height = await new Promise<Long | undefined>((resolve, reject) => {
        client.getTipInfo(Empty, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response.metadata?.bestBlockHeight);
            }
        });
    })
    if (!height) {
        return;
    }
    const request: GetBlocksRequest = {
        heights: [height],
    }

    const block = await new Promise<Block | undefined>((resolve, reject) => {
    const stream = client.getBlocks(request);
        let value: Block | undefined;
        stream.on("error", (err) => {
            reject(err);
        });
        stream.on("data", (chunk: HistoricalBlock) => {
            value = chunk.block;
        });
        
        stream.on("end", () => {
            resolve(value)
        })
    });
    expect(block?.header?.height).toStrictEqual(height);
  });
});
