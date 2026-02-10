import * as cheerio from 'cheerio';

const URL = 'https://news.ycombinator.com';

async function run() {
    const res = await fetch(URL);
    const html = await res.text();

    const $ = cheerio.load(html);

    const titles = [];

    $('.athing .titleline > a').each((_i, el) => {
        titles.push($(el).text());
    });

    console.log('Top HN titles:');
    console.log(titles);
}

try {
    await run();
} catch (e) {
    console.error('Scraper failed:', e);
}