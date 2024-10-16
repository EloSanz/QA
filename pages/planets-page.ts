import { Locator, Page, expect } from "@playwright/test";

export class PlanetPage{
    readonly page: Page;
    readonly header: Locator;
    readonly footer: Locator;
    readonly homeButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.header = page.locator("h1");
        this.footer = page.locator("footer");
        this.homeButton = page.locator("button:has-text('Home')");
    }
    async verifyHeader() {
        await expect(this.header).toHaveText("Planets");
    }    
    async verifyFooter() {
        await expect(this.footer).toHaveText("© 2024 Dragon Ball API. All rights reserved.");
    }
    async getPlanetCard(name: string) {
        const planetCard = this.page.locator(`h5:has-text("${name}")`).first();
        await expect(planetCard).toBeVisible();
        return planetCard;
    }
    async clickHomeButton() {
        await expect(this.homeButton).toBeVisible();
        await this.homeButton.click();
    }
    async gotoPlanetDetail(name: string) {
        const planetCard = await this.getPlanetCard(name);
        await planetCard.click();
    }
}

