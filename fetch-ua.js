const puppeteer = require("puppeteer")
const fs = require("fs")

;(async () => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto("about:blank")
    const ua = await page.evaluate(() => navigator.userAgent)

    // Write UA to JSON file
    fs.writeFileSync("ua.json", JSON.stringify({ userAgent: ua }, null, 2))

    console.log("User Agent saved:", ua)
    await browser.close()
})()
