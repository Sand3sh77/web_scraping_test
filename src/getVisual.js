import puppeteer from 'puppeteer';

const URL = 'https://www.scrapingbee.com/';

async function getVisual() {
    let browser;

    try {
        browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.goto(URL, {
            waitUntil: 'networkidle2'
        });

        await page.screenshot({ path: `assets/${URL.split(".")[1]}_screenshot.png`, fullPage: true });
        await page.pdf({ path: `assets/${URL.split(".")[1]}_page.pdf`, format: 'A4' });

        console.log('Saved screenshot.png and page.pdf');
    } catch (err) {
        console.error('Puppeteer failed:', err.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

await getVisual();