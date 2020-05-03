const fs = require("fs");
const process = require("process");
const request = require("request");


// const prompt = require('prompt');
// prompt.start();


// const leaderBoard = prompt.get(['searchItem'], function (err, result) {
//   if (err) { return onErr(err); }
//   return result.searchItem;
// });

const searchTerm = process.argv[2];
const options = {
  url: `https://icanhazdadjoke.com/search?term=${searchTerm}`,
  method: "GET",
  headers: {
    Accept: "application/json",
    "Accept-Charset": "utf-8",
  },
};

request(options, (err, res, body) => {
  if (!err && res.statusCode == 200) {
    let jsonValue = JSON.parse(body);

    const jokes = jsonValue.results.map((item) => item.joke);
    if (jokes.length > 0) {
      const longest = jokes.reduce((a, b) => (a.length > b.length ? a : b));

      fs.readFile("./jokes.txt", () => {
        const newJoke = longest + "\n";
        fs.appendFile("./jokes.txt", newJoke, (err) => {
          if (err) throw err;
          console.log("saved");
        });
      });
    } else {
      console.log("No Match For This Search Item");
    }
  }
});
