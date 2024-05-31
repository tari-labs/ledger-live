import Long from "long";
import { createGRPCClient } from "../../src/api/client";
import { GetBlocksRequest } from "../../src/proto/base_node";
import { Empty } from "../../src/proto/types";
import { HistoricalBlock } from "../../src/proto/block";

describe("GetBlocksFlow", () => {
  it("retrieves blocks", async () => {
    const client = createGRPCClient({
        endpoint: "3.248.103.200:18142"
    });

    const height = await new Promise<Long | undefined>((resolve, reject) => {
        client.getTipInfo(Empty, (error, response) => {
            if(error) {
                console.error(error);
                reject(error);
            } else {
                resolve(response.metadata?.bestBlockHeight);
                console.log(response);
            }
        });
    })
    if (!height) {
        return;
    }
    const request: GetBlocksRequest = {
        heights: [height],
    }

    const blocksPromise = await new Promise<void>((resolve, reject) => {
    const stream = client.getBlocks(request);

        stream.on("error", (err) => {
            console.error(err);
            reject(err);
        });
        stream.on("data", (chunk: HistoricalBlock) => {
            console.log(chunk.block?.header?.height);
        });
        stream.on("status", (status) => {
            console.log(status);
        });
        stream.on("end", () => {
            console.log("end");
            resolve()
        })
    })

    

  });
});
