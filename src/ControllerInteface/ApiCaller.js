const URL = "http://3.134.88.218:3001/";
const POST_SUBMISSION = URL + "submission";
const GET_STATUS = URL + "status";

export const getStatus = setStatus => {
  fetch(GET_STATUS, {
    method: "get",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status !== 200) {
        throw new Error("Invalid response status");
      }
      return res.text();
    })
    .then(body => {
      setStatus(JSON.parse(body));
    })
    .catch(err => {
      console.log(err);
      setStatus([]);
    });
};

export const saveStocktake = (userId, fixtureId, stocks, success, fail) => {
  let stockArray = [];
  for (let e of Object.entries(stocks)) {
    stockArray.push({ upc: e[0], count: e[1] });
  }

  return fetch(POST_SUBMISSION, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fixtureId: fixtureId,
      userId: userId,
      stocks: stockArray
    })
  })
    .then(res => {
      if (res.status === 200) {
        success();
        return null;
      }
      return res.text();
    })
    .then(text => {
      if (text !== null) {
        throw new Error(text);
      }
    })
    .catch(err => {
      console.log(err);
      fail(err);
    });
};
