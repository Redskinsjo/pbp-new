// import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const url2 = "https://m2.paybyphone.fr/parking/start/location";

puppeteer
  .use(StealthPlugin())
  .launch({ headless: false })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto(url2);

    await page.waitForSelector("#onetrust-reject-all-handler");

    const cookiesReject = await page.$("#onetrust-reject-all-handler");
    if (cookiesReject) {
      cookiesReject.click();
    }
    const positions = await page.evaluate(() => {
      const parkWithoutAccountBtn = document.querySelector(
        "[data-testid=guestSignIn-button]"
      );
      console.log("park", parkWithoutAccountBtn); //returns null
      const dialogBox = document.querySelector("[role=dialog]");

      const boxes = dialogBox?.querySelectorAll(".MuiBox-root");

      if (boxes) {
        const thisBox = [...boxes][2];
        console.log("boxes", boxes); // returns a list
        console.log("thisBox", thisBox); // returns the parent
        const subBoxes = thisBox?.querySelectorAll(".MuiBox-root");
        console.log("subBoxes", subBoxes); // returns a partial list of childs

        const targetEl = document?.querySelector(".jss16");
        console.log("targetEl", targetEl); // returns null
        const targetEl2 = thisBox?.querySelector(".jss16");
        console.log("targetEl2", targetEl2); // returns null
        const targetEl3 = document.getElementsByClassName(".jss16");
        console.log("targetEl3", targetEl3); // returns an empty collection
      }
    });
  });
