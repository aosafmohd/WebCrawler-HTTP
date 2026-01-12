const { crawlPage } = require('./crawl.js')

async function main() {
    if (process.argv.length < 3) {
        console.log("No website provided")
        process.exit(1)
    }

    if (process.argv.length > 3) {
        console.log("Too many command line arguments")
        process.exit(1)
    }

    const baseURL = process.argv[2]
    console.log(`Starting crawl of ${baseURL}`)

    const pages = await crawlPage(baseURL, baseURL, {})

    printReport(pages)
}

function printReport(pages) {
    console.log('\n========== CRAWL REPORT ==========')

    const sortedPages = Object.entries(pages).sort(
        (a, b) => b[1] - a[1]
    )

    for (const [url, count] of sortedPages) {
        console.log(`Found ${count} internal links to ${url}`)
    }

    console.log('========== END REPORT ==========\n')
}

main()
