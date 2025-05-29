const puppeteer = require("puppeteer")
const fs = require("fs")

;(async () => {
    const browser = await puppeteer.launch({
        headless: "new", // or true if using older Puppeteer
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    const page = await browser.newPage()
    const ua = await page.evaluate(() => navigator.userAgent)

    // Write UA to JSON file
    fs.writeFileSync("ua.json", JSON.stringify({ userAgent: ua }, null, 2))

    console.log("User Agent saved:", ua)
    await browser.close()
})()
