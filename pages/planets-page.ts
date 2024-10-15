import { Locator, Page, expect } from "@playwright/test";

export class PlanetPage{
    readonly page: Page;
    readonly header: Locator;
    readonly footer: Locator;
    readonly planetCard: Locator;
    constructor(page: Page) {
        this.page = page;
        this.header = page.locator("h1");
        this.footer = page.locator("footer");
        this.planetCard = page.locator("div:has-text('Planet Name')");
    }
    async verifyHeader() {
        await expect(this.header).toHaveText("Planets");
    }    
    async verifyFooter() {
        await expect(this.footer).toHaveText("© 2024 Dragon Ball API. All rights reserved.");
    }
}

