import Crawler from 'crawler';

const BLOG_URL = 'https://www.scrapingbee.com/blog/';

const crawler = new Crawler({
    maxConnections: 1,
    callback: (error, res, done) => {
        if (error) {
            console.error(error);
            done();
            return;
        }

        const { url, $ } = res;

        if (url === BLOG_URL) {
            const links = $('a[href^="/blog/"]');

            links.each((_i, el) => {
                const href = el.attribs.href;
                if (!href) return;
                crawler.add(`https://www.scrapingbee.com${href}`);
            });
        } else {
            const title = $('title').text().trim();
            const readTime = $('#content span.text-blue-200').text().trim();

            console.log({ title, readTime });
        }

        done();
    },
});

crawler.add(BLOG_URL);