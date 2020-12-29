const dark = document.getElementById("dark");
const programming = document.getElementById("programming");
const misc = document.getElementById("misc");
const pun = document.getElementById("pun");
const spooky = document.getElementById("spooky");
const christmas = document.getElementById("christmas");

//Checks which checkbox are checked and return an object
const readCheckbox = () => {
  let objParams = {};
  dark.checked ? (objParams.Dark = true) : true;
  pun.checked ? (objParams.Pun = true) : true;
  programming.checked ? (objParams.Programming = true) : true;
  christmas.checked ? (objParams.Christmas = true) : true;
  spooky.checked ? (objParams.Spooky = true) : true;
  misc.checked ? (objParams.Misc = true) : true;
  return objParams;
};

//gets single joke. Modify the URL is checkboxes are checked
const getJoke = async (params) => {
  let str = [];
  for (const key in params) {
    str.push(key);
  }
  const url =
    Object.values(params).length === 0
      ? `https://v2.jokeapi.dev/joke/Any?type=single`
      : `https://v2.jokeapi.dev/joke/${str.join(",")}?type=single`;
  const res = await fetch(url);
  const data = await res.json();
  displayJoke(data.joke);
};

//gets two parts joke. Modify the URL is checkboxes are checked
const getTwoParts = async (params) => {
  let str = [];
  for (const key in params) {
    str.push(key);
  }
  const url =
    Object.values(params).length === 0
      ? `https://v2.jokeapi.dev/joke/Any?type=twopart`
      : `https://v2.jokeapi.dev/joke/${str.join(",")}?type=twopart`;
  console.log("url", url);
  const res = await fetch(url);
  const data = await res.json();
  displayTwoParts(data.setup, data.delivery);
};

//Function to display a single joke
const displayJoke = (joke) => {
  removeDiv();
  let div = document.getElementById("result");
  div.classList.add("p-3");
  div.innerText = `${joke}`;
};

//Display a Two part joke
const displayTwoParts = (setup, delivery) => {
  removeDiv();
  let div = document.getElementById("result");
  div.classList.add("p-3");
  const setupDiv = document.createElement("div");
  setupDiv.setAttribute("id", "setup");
  setupDiv.innerText = setup;
  console.log(div);
  const arrow = document.createElement("div");
  arrow.setAttribute("id", "arrow");
  arrow.classList.add("arrow-down");
  const divDelivery = document.createElement("div");
  divDelivery.setAttribute("id", "delivery");
  divDelivery.classList.add("invisible");
  divDelivery.innerText = delivery;
  div.appendChild(setupDiv);
  div.appendChild(arrow);
  div.appendChild(divDelivery);
  document
    .getElementById("arrow")
    .addEventListener("click", () =>
      document.getElementById("delivery").classList.remove("invisible")
    );
};

//clear the div #result
const removeDiv = () => {
  let div = document.getElementById("result");
  div.innerHTML = "";
};
const btn = document.getElementById("btn-joke");
const twoPart = document.getElementById("btn-two-parts");

twoPart.addEventListener("click", () => {
  getTwoParts(readCheckbox());
});
btn.addEventListener("click", () => {
  getJoke(readCheckbox());
});
