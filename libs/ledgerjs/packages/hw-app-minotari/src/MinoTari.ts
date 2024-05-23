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
}
