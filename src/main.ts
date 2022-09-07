import { PlaywrightCrawler, Dataset } from 'crawlee';

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
    maxRequestsPerCrawl: 2,
    // Use the requestHandler to process each of the crawled pages.
    requestHandler: async ({ page }) => {
        // Wait for the actor cards to render.
        await page.waitForSelector('.col-md-6');
        // Execute a function in the browser which targets
        // the actor card elements and allows their manipulation.
        const actorTexts = await page.$$eval('.col-md-6', (els) => {
            // Extract text content from the actor cards
            return els.map((el) => el.textContent);
        });
        actorTexts.forEach((text, i) => {
            console.log(text);
        });
    },
});

// await crawler.run(['https://apify.com/store']);


