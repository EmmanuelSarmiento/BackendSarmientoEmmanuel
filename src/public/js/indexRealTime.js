const socketClient = io();

const from2 = document.getElementById("form2");
const inputPrice2 = document.getElementById("price2");
const price2P = document.getElementById("price2P");

from.onsubmit = (e) => {
  e.preventDefault();
  const price2 = inputPrice2.value;
  socketClient.emit("newPrice2", price2);
};

socketClient.on("priceUpdated2", (price2) => {
  priceP.innerText = price2;
});
