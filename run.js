const chalk = require("chalk");
const delay = require("delay");
const moment = require("moment-timezone");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const readline = require("readline-sync");
puppeteer.use(StealthPlugin());
const akun = require("./config.json");

(async () => {
    console.log((await gidhan()) + " Spotify Rp.800 Bot - By: GidhanB.A");

    const browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-popup-blocking", "--allow-popups-during-page-unload"],
    });
    try {
        const email = akun["email"];
        const pswd = akun["password"];

        const options = { waitUntil: "networkidle2" };

        const page = await browser.newPage();

        let pages = await browser.pages();
        await pages[0].close();

        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36");

        await page.goto("https://www.spotify.com/id/purchase/offer/2022-artist-mini-premium-mini-7d/?mini-repurchase%3Futm_source=spotify_gp&utm_medium=inapp&utm_campaign=GP_22q1_mini_repurchase_discounts&utm_content=treatment&s=08", options);

        await page.waitForSelector("div[data-testid=login-form]", {
            visible: true,
            timeout: 60000,
        });

        const emailField = await page.$("input[id=login-username]");
        await emailField.type(email);
        await emailField.dispose();

        const passwordField = await page.$("input[id=login-password]");
        await passwordField.type(pswd);
        await passwordField.dispose();
        await delay(1000);

        await page.click("#login-button");
        await page.waitForNavigation();

        console.log((await gidhan()) + " Login Success!");

        let found = false;
        while (!found) {
            try {
                let h1 = await page.$("h1.Type__TypeElement-sc-1dxoivu-0.kkBztw.OfferCardV2__Title-sc-1uxgtui-8.eWmMox");
                const title = await page.evaluate((el) => el.textContent, h1);
                if (title == "Spotify Premium Mini") {
                    found = true;
                }
            } catch (error) {
                await page.goto(
                    "https://www.spotify.com/id/purchase/offer/2022-artist-mini-premium-mini-7d/?mini-repurchase%3Futm_source=spotify_gp&utm_medium=inapp&utm_campaign=GP_22q1_mini_repurchase_discounts&utm_content=treatment&s=08",
                    options
                );
            }
        }

        await page.waitForSelector('a[class="sc-bqiQRQ yiWnV"]', {
            visible: true,
            timeout: 60000,
        });

        console.log((await gidhan()) + " Success Get Rp.800 Price!");

        await page.evaluate(() => {
            document.querySelectorAll('a[class="sc-bqiQRQ yiWnV"]')[0].click();
        });

        await page.click("#checkout_submit");
        await page.waitForNavigation();

        const a = readline.question((await gidhan()) + " Please continue the payment process, press enter to exit..");
        await browser.close();
    } catch (error) {
        console.log("Error: " + chalk.red(error.toString()));
    }
})();

async function gidhan(status = "INFO") {
    return `[${chalk.cyan(moment().tz("Asia/Jakarta").format("HH:mm:ss"))}] [${chalk.yellow(status)}]`;
}
