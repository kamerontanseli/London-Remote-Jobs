const puppeteer = require("puppeteer");
const fs = require('fs');
const path = require('path');

(async () => {
  const data = {
    jobs: {}
  };
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let start = 0; start <= 100; start += 10) {
    console.log(start)
    await page.goto(
      "https://www.indeed.co.uk/jobs?q=%22remote%22&l=London&radius=0&sort=date" + (start === 0 ? '' : '&start=' + start),
      { waitUntil: 'networkidle2' }
    );
    const jobListings = await page.$$eval(".jobsearch-SerpJobCard", elements => {
      const result = [];
      for (const el of elements) {
        result.push({
          id: el.getAttribute('id'),
          url: el.querySelector(".title a").href,
          title: el.querySelector(".title a").innerText,
          companyName: el.querySelector(".company").innerText,
          location: el.querySelector(".location").innerText,
          summary: Object.values(el.querySelectorAll(".summary ul li")).map(
            e => e.innerText
          )
        });
      }
      return result;
    });
    jobListings.forEach(j => {
      data.jobs[j.id] = j
    })
    fs.writeFileSync(path.join(__dirname, '../data/jobs.json'), JSON.stringify(Object.values(data.jobs), null, 2))
  }
  await browser.close();
})();
