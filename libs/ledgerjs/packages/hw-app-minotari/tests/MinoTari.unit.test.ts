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
    it("retrieves public alpha from app", async () => {
      const transport = await openTransportReplayer(
        RecordStore.fromString(`
                => 8003000009083c00000000000000
                <= 01d0cbe7457c4a0b23b487de832351bb66c5c4fbcd08121842b7ab36577d31822c9000
                `),
      );
      const app = new MinoTari(transport);
      const publicAlphaKey = await app.getPublicAlphaKey(BigInt(60));
      expect(publicAlphaKey).toStrictEqual(
        "d0cbe7457c4a0b23b487de832351bb66c5c4fbcd08121842b7ab36577d31822c",
      );
    });

    it("retrieves public key from app", async () => {
      const transport = await openTransportReplayer(
        RecordStore.fromString(`
                => 8004000019183c0000000000000000000000000000000100000000000000
                <= 0116c7fc82ee83daa558182257137f0dd4eb781caffde1e232f86c4d9c0085ca4c9000
                `),
      );
      const app = new MinoTari(transport);
      const publicKey = await app.getPublicKey(BigInt(60), BigInt(0), BigInt(1));
      expect(publicKey).toStrictEqual(
        "16c7fc82ee83daa558182257137f0dd4eb781caffde1e232f86c4d9c0085ca4c",
      );
    });
  });
});
