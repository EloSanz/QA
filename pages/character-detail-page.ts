import { Locator, Page, expect } from "@playwright/test";

export class CharacterDetailPage {
    readonly page: Page;
    readonly header: Locator;
    readonly characterCard: Locator;
    readonly showPlanetButton: Locator;
    readonly showTransformationsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator("h1");
        this.characterCard = page.locator("div#character-card-container");
        this.showPlanetButton = this.characterCard.locator('button:has-text("Show Planet")');
        this.showTransformationsButton = this.characterCard.locator('button:has-text("Show Transformations")');
    }
    async verifyHeader() {
        await expect( this.header).toBeVisible();
    }
    async verifyCharacterCardName(name: string) {
        const characterName = await this.characterCard.locator("h5").textContent();
        expect(characterName).toBe(name);
    }
    async verifyshowPlanetButton() {
        await expect(this.showPlanetButton).toBeVisible();
    }
    async verifyshowTransformationsButton() {
        await expect(this.showTransformationsButton).toBeVisible();
    }
    async verifyCardButtons() {
        await this.verifyshowPlanetButton();
        await this.verifyshowTransformationsButton();
    }
    async showPlanet(name: string) {
        await this.showPlanetButton.click();
        const planet = await this.page.locator("h5:has-text('is from here')").textContent();
        expect(planet).toContain(`${name} is from here`);
    }
    async hidePlanet() {
        const hidePlanetButton = this.characterCard.locator('button:has-text("Hide Planet")');
        await hidePlanetButton.click();
        await expect(this.page.locator("h5:has-text('is from here')")).toBeHidden();
      
    }
    async showTransformations() {
        await this.showTransformationsButton.click();
        const transformations = await this.page.locator("h5:has-text('Transformations')").textContent();
        expect(transformations).toContain('Transformations');
    }
    async hideTransformations() {
        const hideTransformationsButton = this.characterCard.locator('button:has-text("Hide Transformations")');
        await hideTransformationsButton.click();
        await expect(this.page.locator("h5:has-text('Transformations')")).toBeHidden();
    }
    
    async verifyHasNoTransformations() {
        await this.showTransformationsButton.click();
        const transformations = await this.page.locator("p:has-text('No transformations')").textContent();
        expect(transformations).toContain('No transformations');
    }

}