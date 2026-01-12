const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    // Stay on same domain
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizedURL = normalizeURL(currentURL)

    // If already crawled, increase count and stop
    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++
        return pages
    }

    pages[normalizedURL] = 1

    console.log(`actively crawling: ${currentURL}`)

    let htmlBody = ''
    try {
        const resp = await fetch(currentURL)

        if (resp.status >= 400) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get('content-type')
        if (!contentType || !contentType.includes('text/html')) {
            return pages
        }

        htmlBody = await resp.text()
    } catch (err) {
        console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`)
        return pages
    }

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)
    for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages)
    }

    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')

    for (const linkElement of linkElements) {
        if (!linkElement.href) continue

        try {
            if (linkElement.href.startsWith('/')) {
                // relative URL
                urls.push(new URL(linkElement.href, baseURL).href)
            } else {
                // absolute URL
                urls.push(new URL(linkElement.href).href)
            }
        } catch (err) {
            // Ignore invalid URLs
        }
    }

    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    let normalizedPath = `${urlObj.hostname}${urlObj.pathname}`
    if (normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1)
    }
    return normalizedPath
}

module.exports = {
    crawlPage,
    getURLsFromHTML,
    normalizeURL
}
