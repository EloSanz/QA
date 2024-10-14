import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly showAllButton: Locator;

  readonly asideFilters: Locator;
  readonly clearFiltersButton: Locator;

  readonly nextButton: Locator;
  readonly previousButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("h1");
    this.searchInput = page.getByPlaceholder("Search characters...");
    this.searchButton = page.locator('button:has-text("Search")');
    this.showAllButton = page.getByRole("button", { name: "Show all" });

    this.asideFilters = page.locator("aside");

    this.clearFiltersButton = page.getByRole("button", {
      name: "Clear filters",
    });
    this.nextButton = page.locator('button:has-text("Next")');
    this.previousButton = page.locator('button:has-text("Previous")');
  }
  /* ASIDE FILTERS */

  async getFilterButtonByIndex(index: number): Promise<Locator> {
    return this.page.locator("aside button").nth(index);
  }

  async clickClearFilters() {
    await this.clearFiltersButton.click();
  }

  async getFilterButtonByText(text: string): Promise<Locator> {
    return this.page.locator(`aside button:has-text("${text}")`);
  }

  async getAsideFilters() {
    return this.asideFilters;
  }
  async verifyFilters() {
    const visibleFilters = this.asideFilters.filter({
      has: this.page.locator(":visible"),
    });
    await expect(visibleFilters).toHaveCount(1);
  }
//+-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+//

  async getHomePageHeaderText() {
    return this.header.textContent();
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Dragon ball Wiki/);
  }
  async verifyShowAllButton() {
    await expect(this.showAllButton).toBeVisible();
  }

  async verifyButtonActive(button: Locator): Promise<void> {
    const brightnessFilter = await button.evaluate((btn) => {
      return window.getComputedStyle(btn).filter;
    });

    const brightnessMatch = brightnessFilter.match(/brightness\(([^)]+)\)/);
    const brightnessValue = brightnessMatch
      ? parseFloat(brightnessMatch[1])
      : 1; // Default to 1 if no match

    expect(brightnessValue).toBeLessThan(1);
  }
  async verifyButtonInactive(button: Locator): Promise<void> { 
    const brightnessFilter = await button.evaluate((btn) => {
      return window.getComputedStyle(btn).filter;
    });

    const brightnessMatch = brightnessFilter.match(/brightness\(([^)]+)\)/);
    const brightnessValue = brightnessMatch
      ? parseFloat(brightnessMatch[1])
      : 1; 

    expect(brightnessValue).toBe(1);
  }
  async clickShowAllButton() {
    await this.showAllButton.click();
  }
  async clickNextButton() {
    await this.nextButton.isVisible();
    await this.nextButton.click();
  }
//+-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+//
  async verifySearchInputField() {
  await expect(this.searchInput).toBeVisible();
  }
  async searchCharacter(name: string) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }
  async verifySearchResults(name: string) {
    const characterCard = this.page
      .locator(`//h2[starts-with(text(),"${name}")]`)
      .first();
    await expect(characterCard).toBeVisible();
    await expect(characterCard).toContainText(name);
  }
  async verifySearchResultsNotFound(name: string) {
    const characterCard = this.page
      .locator(`//h2[starts-with(text(),"${name}")]`)
      .first();

    await expect(characterCard).toHaveCount(0);

    const noResultsMessage = this.page.locator(
      'p:has-text("No characters found :(")'
    );
    await expect(noResultsMessage).toBeVisible();
  }
//+-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+//
  async goto() {
    await this.page.goto("https://dragon-ball-api-react.vercel.app/");
  }
  async gotoCharacter(name: string) {
    const characterCard = this.page.locator(`//h2[text()="${name}"]`).first();
    await expect(characterCard).toBeVisible();
    await expect(characterCard).toContainText(name);

    await characterCard.click();
  }
//+-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-++-+-+-+-+-+//
  async verifyCharactersPerPage(){ //should display 12 characters per page while next button is visible
    //await this.page.waitForSelector('img[alt="Loading..."]', { state: 'hidden', timeout: 10000 });
    await this.page.waitForTimeout(4000);

    const characters = await this.page.locator('h2.text-lg.mb-2.text-white.font-bold').count();
    expect(characters).toBe(12);
  }
  async verifyNextPageButton(){
    const nextPageButton = this.page.locator('button:has-text("Next")');
    await expect(nextPageButton).toBeVisible();
  }
  async verifyNextPage(){

    await this.nextButton.click();
    await this.verifyCharactersPerPage();
  }
  async verifyPreviousPage(){
    await this.previousButton.click();
    await this.verifyCharactersPerPage();
  }
  async verifyLastPage(){
    const nextButton = this.nextButton;

    for (let pageCount = 0; nextButton.isVisible(); pageCount++) {
      console.log(pageCount);
      await this.clickNextButton();
    }
  }
}
