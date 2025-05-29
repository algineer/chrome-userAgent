const puppeteer = require("puppeteer")
const fs = require("fs")

const getLatestChromeVersion = async () => {
    const url = "https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions"
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch latest Chrome version: ${res.status}`)
    const data = await res.json()
    // The first element is the latest version object
    return data.versions[0].version.split(".")[0]
}

;(async () => {
    const browser = await puppeteer.launch({
        headless: "new", // or true if using older Puppeteer
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    const page = await browser.newPage()
    let ua = await page.evaluate(() => navigator.userAgent)

    ua = ua.replace(/HeadlessChrome\/\d+/, `Chrome/${getLatestChromeVersion()}`)

    // Write UA to JSON file
    fs.writeFileSync("ua.json", JSON.stringify({ userAgent: ua }, null, 2))

    await browser.close()
})()
