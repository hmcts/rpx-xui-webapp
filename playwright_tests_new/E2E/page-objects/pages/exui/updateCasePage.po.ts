import { Page, expect } from "@playwright/test";
import { Base } from "../../base.ts";

export class updateCasePage extends Base {
  static fillPerson2Title(title: any) {
    throw new Error("Method not implemented.");
  }
  static fillPerson2FirstName(firstName: any) {
    throw new Error("Method not implemented.");
  }
  static fillPerson2LastName(lastName: any) {
    throw new Error("Method not implemented.");
  }
  static selectPerson2Gender(gender: any) {
    throw new Error("Method not implemented.");
  }
  static enterPostcode(postcode: any) {
    throw new Error("Method not implemented.");
  }
  static selectDynamicAddress(address: any) {
    throw new Error("Method not implemented.");
  }
  static clickContinue() {
    throw new Error("Method not implemented.");
  }
  static checkAdulteryAndSubmit() {
    throw new Error("Method not implemented.");
  }
  readonly container = this.page.locator("exui-case-details-home");
  readonly submitButton = this.page.getByRole("button", { name: "Submit" });
  static exuiSpinnerComponent: any;

  constructor(page: Page) {
    super(page);
  }
  async openNextStep() {
    await this.page.getByLabel("Next step").click();
  }
  async selectUpdateCaseEvent() {
    await this.page.getByLabel("Next step").selectOption("3: Object");
  }
  async clickGoButton() {
    await this.page.getByRole("button", { name: "Go" }).click();
    await this.exuiSpinnerComponent.wait();
  }
  async fillPerson2Title(title: string) {
    await this.page.locator("#Person2_Title").fill(title);
  }
  async fillPerson2FirstName(first: string) {
    await this.page
      .getByRole("group", { name: /Person 2 - not retained/ })
      .getByLabel("First Name (Optional)")
      .fill(first);
  }
  async fillPerson2LastName(last: string) {
    await this.page
      .getByRole("group", { name: /Person 2 - not retained/ })
      .getByLabel("Last Name (Optional)")
      .fill(last);
  }
  async selectPerson2Gender(label: string) {
    await this.page.locator("#Person2_Gender").selectOption({ label });
  }
  async enterPostcode(postcode: string) {
    await this.page.locator("#AddressGlobalUK1_AddressGlobalUK1_postcodeInput").fill(postcode);
    await this.page.getByRole("button", { name: "Find address" }).click();
    await this.exuiSpinnerComponent.wait();
  }
  async selectAddress(label: string) {
    await this.page.locator("#AddressSelect").selectOption({ label });
  }
  async clickContinue() {
    await this.page.getByRole("button", { name: "Continue" }).click();
    await this.exuiSpinnerComponent.wait();
  }

  async checkAdulteryAndSubmit() {
    await this.page.getByRole("checkbox", { name: "Adultery" }).check();
    await this.submitButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  async verifyUpdateSuccess() {
    const banner = this.page.getByText(/Case #[\d-]+ has/);
    await expect(banner).toBeVisible();
  }
  async updateCase() {
    await this.openNextStep();
    await this.selectUpdateCaseEvent();
    await this.clickGoButton();
    await this.fillPerson2Title("mr");
    await this.fillPerson2FirstName("Mark");
    await this.fillPerson2LastName("Lee");
    await this.selectPerson2Gender("Not given");
    await this.enterPostcode("SM1");
    await this.selectAddress("21teste");
    await this.clickContinue();
    await this.checkAdulteryAndSubmit();
  }
}
