import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { PlanetPage } from "../pages/planets-page";

test.describe("Planet Page", () => {
  let homePage: HomePage;
  let planetPage: PlanetPage;

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
  test("should have the correct planet card", async () => {
    const planetCard = await planetPage.getPlanetCard("Tierra");
    
    expect(await planetCard.textContent()).toContain("Tierra");
    await expect(planetCard).toBeVisible();
  });

  test("Home button should navigate to home page", async ({page}) => {
    await planetPage.clickHomeButton();
    const currentUrl = page.url();
    expect(currentUrl).toBe('https://dragon-ball-api-react.vercel.app/');
  
  });

});
