import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { TestContext } from "node:test";

test.describe("Home Page", () => {

  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should have the correct title", async () => {
    await homePage.verifyTitle();
  });
  test("Search Input Field should be visible", async () => {
    await homePage.verifySearchInputField();
  });
  test("Show All Button should be visible", async () => {
    await homePage.verifyShowAllButton();
  });

});

test.describe("Search bar", () => {
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });
  test("should display character details when searching for a valid character name", async () => {
    const validName = "Goku";
    await homePage.searchCharacter(validName);
    await homePage.verifySearchResults(validName);
  });
  test("should show 'No characters found' message for an invalid character search", async () => {
    const name = "aaaaGoku";
    await homePage.searchCharacter(name);
    await homePage.verifySearchResultsNotFound(name);
  });
  test("should display paginated results when searching by a single letter", async () => {
    const validName = "Goku";
    await homePage.searchCharacter(validName);
    await homePage.verifySearchResults(validName);
  });
});

test.describe("Aside Filters", () => {
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });
  test("Aside Filters should be visible", async () => {
    await homePage.verifyFilters();
  });
  test("should have 'Clear Filters' as the text on the Clear Filters button", async () => {
    const clearFiltersButton = homePage.asideFilters.getByRole("button", { name: "Clear filters" });
    const buttonText = await clearFiltersButton.textContent();

    expect(buttonText).toBe("Clear Filters");
  });
  test("should be 'Saiyans' Filter Button Saiyan", async () => {
    const firstFilterButton = await homePage.getFilterButtonByIndex(1);

    const buttonText = await firstFilterButton.textContent();
    expect(buttonText).toBe("Saiyans");
  
    await firstFilterButton.click();
    await homePage.verifyButtonActive(firstFilterButton);
  });
  test("should be one filter active at a time", async () => {
    const firstFilterButton = await homePage.getFilterButtonByIndex(1);
    const secondFilterButton = await homePage.getFilterButtonByIndex(2);

    await firstFilterButton.click();
    await homePage.verifyButtonActive(firstFilterButton);

    await secondFilterButton.click();
    await homePage.verifyButtonActive(secondFilterButton);
    await homePage.verifyButtonInactive(firstFilterButton);
  });
});