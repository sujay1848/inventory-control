

const URL = "http://3.134.88.218:3001/";
const POST_SUBMISSION = URL + "submission";

export const saveStocktake = (userId, fixtureId, stocks, success, fail) => {
  let stockArray = [];
  for (let e of Object.entries(stocks)) {
    stockArray.push({ upc: e[0], count: e[1] });
  }

  fetch(POST_SUBMISSION, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fixtureId: fixtureId,
      userId: userId,
      stocks: stockArray
    })
  })
    .then(res => res.text())
    .then(res => {
      console.log(res);
      success();
    })
    .catch(err => {
      console.log(err);
      fail();
    });
};
