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
      console.log("park", parkWithoutAccountBtn);
      const dialogBox = document.querySelector("[role=dialog]");

      const boxes = dialogBox?.querySelectorAll(".MuiBox-root");

      if (boxes) {
        const thisBox = [...boxes][2];
        console.log("boxes", boxes);
        console.log("thisBox", thisBox);
        const subBoxes = thisBox?.querySelectorAll(".MuiBox-root");
        console.log("subBoxes", subBoxes);

        const targetEl = document?.querySelector(".jss16");
        console.log("targetEl", targetEl);
        const targetEl2 = thisBox?.querySelector(".jss16");
        console.log("targetEl2", targetEl2);
      }
    });
  });

// (async () => {
//   // console.log("Verificationtoken", Verificationtoken);
//   // const token = await getToken();
//   // console.log(token);
//   const browser = await puppeteer.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();
//   await page.goto(url2);
//   // await page.evaluate((access_token) => {
//   //   localStorage.setItem(
//   //     "PBP.UserAuthToken",
//   //     JSON.stringify({
//   //       access_token,
//   //       expires_in: 1200,
//   //       refresh_token: "6I7OU-HEVUgWyq_8bHGMlsa0oIA04B2qvwyyPkmeWKQ",
//   //       scope: "paybyphone",
//   //       token_type: "Bearer",
//   //     })
//   //   );
//   // }, access_token);
//   await page.waitForSelector("#onetrust-reject-all-handler");
//   const cookiesReject = await page.$("#onetrust-reject-all-handler");
//   if (cookiesReject) {
//     cookiesReject.click();
//   }
//   // const parkWithoutAccountBtn = await page.$(
//   //   "[data-testid=guestSignIn-button]"
//   // );
//   // if (parkWithoutAccountBtn) {
//   //   parkWithoutAccountBtn.click();
//   // }

//   const positions = await page.evaluate(() => {
//     const parkWithoutAccountBtn = document.querySelector(
//       "[data-testid=guestSignIn-button]"
//     );
//     console.log("parkWithoutAccountBtn", parkWithoutAccountBtn);
//     const dialogBox = document.querySelector("[role=dialog]");
//     console.log("dialogBox", dialogBox);

//     const boxes = dialogBox?.querySelectorAll(".MuiBox-root");

//     if (boxes) {
//       const thisBox = [...boxes][2];
//       const pos = thisBox.getBoundingClientRect();
//       console.log("box", boxes);
//       console.log("thisBox", thisBox.getBoundingClientRect());
//       console.log("thisBox", thisBox.getBoundingClientRect().top);
//       console.log("thisBox", thisBox.getBoundingClientRect().left);
//       console.log("thisBox", thisBox.getBoundingClientRect().bottom);
//       console.log("thisBox", thisBox.getBoundingClientRect().right);
//       const posFromTop = pos.top + pos.bottom - 44;
//       const posFromLeft = (pos.right - pos.left) / 2;
//       const newElement = document.createElement("div");
//       newElement.setAttribute(
//         "style",
//         "width:100%;height:140px;background-color:black"
//       );
//       thisBox.appendChild(newElement);
//       console.log("newElement", newElement.getBoundingClientRect().top);
//       console.log("newElement", newElement.getBoundingClientRect().left);
//       console.log("newElement", newElement.getBoundingClientRect().bottom);
//       console.log("newElement", newElement.getBoundingClientRect().right);
//       return { top: posFromTop, left: posFromLeft };
//     }
//   });

//   await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("ok");
//     }, 2000);
//   });

//   console.log("positions", positions);

//   if (positions) {
//     // await page.mouse.move(positions?.left, positions.top);
//     // await page.mouse.click(positions?.left, positions.top);
//   }

//   // const response = await fetch(
//   //   "https://m2.paybyphone.fr/parking/start/location",
//   //   {
//   //     headers: {
//   //       Accept: "/",
//   //       "Content-Type": "text/html; charset=utf-8",
//   //     },
//   //   }
//   // );
//   // const data = await response.text();
//   // console.log("response.status", response.status);
//   // console.log("data", data);
// })();
