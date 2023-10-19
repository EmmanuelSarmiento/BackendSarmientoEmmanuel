const socketClient = io();

const from = document.getElementById("form");
const inputPrice = document.getElementById("price");
const priceP = document.getElementById("priceP");

from.onsubmit = (e) => {
  e.preventDefault();
  const price = inputPrice.value;
  socketClient.emit("newPrice", price);
};

socketClient.on("priceUpdated", (price) => {
  priceP.innerText = price;
});
