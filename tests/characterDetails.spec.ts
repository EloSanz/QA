import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { CharacterDetailPage } from "../pages/character-detail-page";

let homePage: HomePage;
let characterDPage: CharacterDetailPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();

  characterDPage = new CharacterDetailPage(page);
});

test("page should go to Character Goku ", async () => {
  await homePage.gotoCharacter("Goku");
  await characterDPage.verifyHeader();
});
test("Character Card should have the correct name", async () => {
  const name = "Goku";
  await homePage.gotoCharacter(name);
  await characterDPage.verifyCharacterCardName(name);
});
test("Show planet and Show Transformations should be visible", async () => {
  const name = "Vegeta";
  await homePage.gotoCharacter(name);
  await characterDPage.verifyCardButtons();
});
test("Show Planet Button should show the planet", async () => {
  const name = "Piccolo";
  await homePage.gotoCharacter(name);
   await characterDPage.showPlanet(name);
});
test("Show Transformations Button should show the transformations", async () => {
  const name = "Freezer";
  await homePage.gotoCharacter(name);
  await characterDPage.showTransformations();
});
test("Show Transformations should show No transformations", async () => {
  const name = "Bulma";
  await homePage.gotoCharacter(name);
  await characterDPage.verifyHasNoTransformations();
});
test("Hide Planet Button should hide the planet", async () => {
  const name = "Piccolo";
  await homePage.gotoCharacter(name);
  await characterDPage.showPlanet(name);
  await characterDPage.hidePlanet();
});
test("Hide Transformations Button should hide the transformations", async () => { 
  const name = "Freezer";
  await homePage.gotoCharacter(name);
  await characterDPage.showTransformations();
  await characterDPage.hideTransformations();
});