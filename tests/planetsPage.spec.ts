import { test } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { PlanetPage } from "../pages/planets-page";

test.describe("Planet Page", () => {
  let homePage: HomePage;
  let planetPage : PlanetPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.gotoPlanets();
    planetPage = new PlanetPage(page);
  });

  test("should have the correct header", async () => {
    await planetPage.verifyHeader();
  });

    test("should have the correct footer", async () => {
        await planetPage.verifyFooter();
    });
});
