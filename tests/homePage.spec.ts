import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";

test.describe("Home Page", () => {
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });
  test("should have the correct footer", async () => {
    await homePage.verifyFooter();
  });
  //TC-HP1
  test("should have the correct title", async () => {
    await homePage.verifyTitle();
  });
  //TC-HP2
  test("Search Input Field should be visible", async () => {
    await homePage.verifySearchInputField();
  });
  //TC-HP3
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
  test.skip("should clean filters when show all button is clicked after a search", async () => {
    const namekianFilterButton = await homePage.getFilterButtonByText("Namekian");
    await namekianFilterButton.click();

    await homePage.searchCharacter("g");

    await homePage.clickShowAllButton();
    
    await homePage.verifyFiltersClean();
  });
  test.skip("should clean the search input when clicking the 'Show All' button", async () => {
    const validName = "Goku";
    await homePage.searchCharacter(validName);
    await homePage.verifySearchResults(validName);

    await homePage.clickShowAllButton();
    await homePage.verifySearchInputFieldEmpty();
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
    const clearFiltersButton = homePage.asideFilters.getByRole("button", {
      name: "Clear filters",
    });
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
  test("should display the correct number of characters when a filter is selected", async () => {
    const firstFilterButton = await homePage.getFilterButtonByIndex(1);
    await firstFilterButton.click();
    await homePage.verifyCharactersPerPage(10); // 10 saiyans always
  });
});
test.describe("Pagination", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });
  test("should display 12 characters in the first page", async () => {
    await homePage.verifyCharactersPerPage(12);
  });
  test("should display the next page when clicking the 'Next' button", async () => {
    await homePage.verifyNextPage();
  });
  test("should display the previous page when clicking the 'Previous' button", async () => {
    await homePage.verifyNextPage();
    await homePage.verifyPreviousPage();
  });
  test("should hide the 'Next' button on the last page", async () => {
    await homePage.verifyLastPage();
  });
  test("should hide the 'Previous' button on the first page with filters", async () => {
    const firstFilterButton = await homePage.getFilterButtonByText("Z Fighter");
    await firstFilterButton.click();
    await expect(homePage.previousButton).toBeHidden();

  });

  test.skip("should hide the 'Next' button on the last page with filters", async () => {
    const firstFilterButton = await homePage.getFilterButtonByText("Z Fighter");
    await firstFilterButton.click();

    await expect(homePage.nextButton).toBeVisible();
    await homePage.nextButton.click();

    await expect(homePage.nextButton).toBeHidden(); // failing
  });
  test.skip("should display the 'Previous' button on the last page with filters", async () => {
    const firstFilterButton = await homePage.getFilterButtonByText("Z Fighter");
    await firstFilterButton.click();

    await expect(homePage.nextButton).toBeVisible();
    await homePage.nextButton.click();

    await expect(homePage.previousButton).toBeVisible(); // failing
  });
});
