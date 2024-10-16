import { Locator, Page, expect } from "@playwright/test";

export class PlanetDetailPage{
    readonly page: Page;
    readonly header: Locator;
    readonly footer: Locator;
    readonly homeButton: Locator;
    readonly characterList: Locator;
    readonly description: Locator;
    constructor(page: Page) {
        this.page = page;
        this.header = page.locator("h1");
        this.footer = page.locator("footer");
        this.homeButton = page.locator("button:has-text('Home')");
        this.characterList = page.locator('ul.list-disc.list-inside.pl-4');
        this.description = page.locator('p.text-gray-700.mb-4');
    }
    async verifyHeader(planetName: string) {
        await expect(this.header).toHaveText("You are in " + planetName);
    }    
    async verifyFooter() {
        await expect(this.footer).toHaveText("© 2024 Dragon Ball API. All rights reserved.");
    }
    async verifyDescription() {
        await expect(this.description).toBeVisible();
    }
    async clickHomeButton() {
        await expect(this.homeButton).toBeVisible();
        await this.homeButton.click();
    }
    async verifyCharacterList() {
        await expect(this.characterList).toBeVisible();   
    }
    async verifyCharacterByIndex(index: number, expectedText: string) {
        const listItem = this.characterList.locator('li').nth(index);

        await expect(listItem).toBeVisible();

        const listItemText = await listItem.textContent();
        expect(listItemText).toBe(expectedText);
    }
    async verifyPlanetIsDestroyed() {
        const destroyedMessage = this.page.locator('p.text-red-600.font-semibold.mb-4');
        await expect(destroyedMessage).toHaveText("Destroyed :(");
    }
    async verifyQuantityCharacterList(qtt: number) {
        await expect(this.characterList).toBeVisible();
        const quantity = await this.characterList.locator('li').count();    
        expect(quantity).toBe(qtt);
    }
    async verifyNoCharacters() {
        const noCharactersMessage = this.page.locator('p:has-text("No characters associated with this planet.")');
        await expect(noCharactersMessage).toBeVisible();
    }
}

