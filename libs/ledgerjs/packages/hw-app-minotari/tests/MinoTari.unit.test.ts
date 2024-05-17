import MinoTari from "../src/MinoTari";
import { openTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";

describe("MinoTari app", () => {
  describe(MinoTari.prototype.getAppConfiguration.name, () => {
    it("retrieves app configuration", async () => {
      const transport = await openTransportReplayer(
        RecordStore.fromString(`
                => 8001000000
                <= 312e302e302d7072652e31339000
                `),
      );
      const app = new MinoTari(transport);
      const config = await app.getAppConfiguration();
      expect(config).toStrictEqual({
        version: "1.0.0-pre.13",
      });
    });
  });
});
