import Transport from "@ledgerhq/hw-transport";

const CLA = 0x80; // Instruction class, unique per APP

export default class MinoTari {
  constructor(
    private transport: Transport,
    scrambleKey = "Min0Tar",
  ) {
    // Lock device around methods & check if already locked
    this.transport.decorateAppAPIMethods(this, ["getAppConfiguration"], scrambleKey);
  }

  /**
   * Retrieves device App version and configuration
   */
  async getAppConfiguration() {
    const response = await this.transport.send(CLA, 0x01, 0x00, 0x00);
    return {
      version: response.subarray(0, response.length - 2).toString("ascii"),
    };
  }

  /**
   *
   * @param account Account type
   * @returns public alpha key received from device
   */
  async getPublicAlphaKey(account: bigint) {
    // Buffer length plus account number as u64
    const buffer = Buffer.alloc(9);
    buffer[0] = 8; // 64 bits fixed
    buffer.writeBigUInt64LE(account, 1);
    const response = await this.transport.send(CLA, 0x03, 0, 0, buffer);
    const version = response[0];
    if (version != 1) {
      throw new Error(`Unsupported response version received: ${version}`);
    }
    const key = response.subarray(1, response.length - 2).toString("hex");
    return key;
  }

  /**
   *
   * @param account Account number
   * @param keyIndex zero based index
   * @param keyType between 1 and 4
   *
   * Key Types:
   * Alpha - 1
   * Nonce - 2
   * Recovery - 3
   * SenderOffset - 4
   * @returns public key returned from device
   */
  async getPublicKey(account: bigint, keyIndex: bigint, keyType: bigint) {
    // buffer length plus 3 uint64s
    const buffer = Buffer.alloc(1 + 3 * 8);
    buffer[0] = 3 * 8;
    buffer.writeBigUInt64LE(account, 1);
    buffer.writeBigUInt64LE(keyIndex, 9);
    buffer.writeBigUInt64LE(keyType, 17);
    const response = await this.transport.send(CLA, 0x04, 0, 0, buffer);
    const version = response[0];
    if (version != 1) {
      throw new Error(`Unsupported response version received: ${version}`);
    }
    const key = response.subarray(1, response.length - 2).toString("hex");
    return key;
  }
}
