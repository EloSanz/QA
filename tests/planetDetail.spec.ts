import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { PlanetPage } from "../pages/planets-page";
import { PlanetDetailPage } from "../pages/planet-detail-page";

test.describe("Planet Detail Page", () => {
    let homePage: HomePage;
    let planetPage: PlanetPage;
    let planetDetail: PlanetDetailPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
        await homePage.gotoPlanets();
        planetPage = new PlanetPage(page);
        planetDetail = new PlanetDetailPage(page);
    });
    test("should have the correct header", async () => {
        await planetPage.gotoPlanetDetail("Tierra");
        await planetDetail.verifyHeader("Tierra");
    });
    test("should have description", async () => {
        await planetPage.gotoPlanetDetail("Tierra");
        await planetDetail.verifyDescription();
    });
    test("should have the correct footer", async () => {
        await planetPage.gotoPlanetDetail("Tierra");
        await planetDetail.verifyFooter();
    });
    test("should navigate to home page", async ({page}) => {
        await planetPage.gotoPlanetDetail("Tierra");
        await planetDetail.clickHomeButton();
        const url = page.url();
        expect(url).toBe("https://dragon-ball-api-react.vercel.app/planets");
    });
    test("should have a list of characters", async () => {
        await planetPage.gotoPlanetDetail("Tierra");
        await planetDetail.verifyCharacterList();
    });
    test("should have the correct character by index", async () => {
        await planetPage.gotoPlanetDetail("Tierra");
        const index = 0;
        const expectedText = "Bulma";

        await planetDetail.verifyCharacterByIndex(index, expectedText);
    });
    test("planet is destroyed", async () => {
        await planetPage.gotoPlanetDetail("Namek");
        await planetDetail.verifyPlanetIsDestroyed();
    });
    test("should have the correct quantity of characters", async () => {
        const qtt = 4;
        const planet = "Namek";

        await planetPage.gotoPlanetDetail(planet);
        await planetDetail.verifyQuantityCharacterList(qtt);
    });
    test("should have not characters", async () => {
        const planet = "Monmar";

        await planetPage.gotoPlanetDetail(planet);
        await planetDetail.verifyNoCharacters();
    });
});