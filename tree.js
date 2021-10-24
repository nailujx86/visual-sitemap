class SitemapNode {
    constructor(title, url, type, screenshot) {
        this.title = title
        this.url = url
        this.type = type
        if (screenshot instanceof Buffer) {
            this.screenshot = screenshot.toString('base64')
        } else {
            this.screenshot = screenshot
        }
        this.children = []
    }
}

module.exports = SitemapNode