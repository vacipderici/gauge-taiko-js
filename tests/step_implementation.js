/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    toRightOf
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Sign in", async () => {
       
    await click('Üyelik');
    await write("wenoy99557@wolfpat.com", into(textBox(toRightOf("E-posta"))));
    await write("testing", into(textBox(toLeftOf("Üye Olmak İstiyorum"))));
    await click("Giriş", above("Şifremi unuttum"));
    assert.ok(text("Testing Bootcamp").exists());
       

});

step("Go to url", async ()=>{
    await goto('cikolatasepeti.com');
});

step("Click Sign in", async ()=>{
    await click('Üyelik');
});

step("Enter username : <username>", async (username)=>{
    await write(username, into(textBox(toRightOf("E-posta"))));
});

step("Enter  password : <Password>", async (Password)=>{
    await write(Password, into(textBox(toLeftOf("Üye Olmak İstiyorum"))));
});

step("Click Login", async ()=>{
    await click("Giriş", above("Şifremi unuttum"));
});
step("Username should be correct", async ()=>{
    assert.ok(text("Testing Bootcamp").exists());
});

