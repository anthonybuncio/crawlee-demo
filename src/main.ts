import { PlaywrightCrawler, Dataset, launchPuppeteer, PuppeteerCrawler } from 'crawlee';

// const crawler = new PlaywrightCrawler({
//     maxRequestsPerCrawl: 2,
//     requestHandler: async ({ page }) => {
//         await page.waitForSelector('.col-md-6');
//         const actorTexts = await page.$$eval('.col-md-6', (els) => {
//             return els.map((el) => el.textContent);
//         });
//         actorTexts.forEach((text, i) => {
//             console.log(text);
//         });
//     },
// });

// await crawler.run(['https://mlbshow.com/']);


const crawler = new PuppeteerCrawler({
    headless: false,
    maxRequestsPerCrawl: 3,
    async requestHandler({ page, request }) {
        console.log('Select size');
        await page.waitForSelector("button[class='gl-label size___TqqSo']", {
            visible: true,
          });
        await page.select('select.gl-label size___TqqSo', 'M 10 / W 11');

        console.log('Add to cart');
        await Promise.all([
            page.waitForNavigation(),
            page.click('#add-to-bag button[type="submit"]'),
        ]);

        // This function is called to extract data from a single web page
        await Dataset.pushData({
            title: await page.title(),
            url: request.url,
            succeeded: true,
        })
    },
    async failedRequestHandler({ request }) {
        // This function is called when the crawling of a request failed too many times
        await Dataset.pushData({
            url: request.url,
            succeeded: false,
            errors: request.errorMessages,
        })
    },
});

await crawler.run([
    'https://www.adidas.com/us/adilette-comfort-slides/GZ5891.html',
]);


