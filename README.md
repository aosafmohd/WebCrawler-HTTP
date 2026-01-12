# WebCrawler-HTTP

A CLI-based web crawler built using Node.js that recursively crawls same-origin pages, extracts internal links, normalizes URLs, and generates a frequency-based crawl report.

## Features
- Recursive crawling with same-domain enforcement
- URL normalization to avoid duplicates
- Relative & absolute URL resolution
- Internal link frequency analysis
- CLI interface
- Jest unit tests
- Cross-platform (Windows/Linux/macOS)

## Tech Stack
- Node.js
- JavaScript (CommonJS)
- JSDOM
- Jest

## Installation
```bash
git clone https://github.com/aosafmohd/WebCrawler-HTTP.git
cd WebCrawler-HTTP
npm install

Usage
npm start https://example.com

Run Tests
npm test

Example Output
Found 440 internal links to blog.boot.dev/about
Found 1253 internal links to blog.boot.dev
