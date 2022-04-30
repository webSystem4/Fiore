let challengeList = document.getElementsByClassName("challText");
let flowerZone = document.getElementsByClassName("plants")[0];
let challengeBtn = document.getElementById("challengeBtn");

function store() {
  if (!window.localStorage) {
    alert("cannot use localstorage");
    return;
  }
  let flowerList = JSON.parse(localStorage.getItem("flowerList")) || [];

  for (let flower of flowerList) {
    //html 꽃 이미지 추가
    let flowerImage = document.createElement("img");
    flowerImage.className = "plant";
    flowerImage.src = `./img/${flower.flowerName + flower.step }.png`;
    console.log(flower.flowerName);
    flowerZone.appendChild(flowerImage);
  }
  //도전과제 완료
  let fail = false;
  const clearFlowerList = flowerList.map(
    (flower) => flower.flowerName + flower.step
  );
  [...challengeList].forEach((element) => {
    if(element.dataset.value == "0") return;
    if (!clearFlowerList.includes(element.dataset.value)) {
      element.nextElementSibling.style.visibility = "hidden";
      element.parentElement.style.background = "white";
        fail = true;
    }
  });
  if(fail){
    challengeList[14].nextElementSibling.style.visibility = "hidden";
    challengeList[14].parentElement.style.background = "white";
  }
}

challengeBtn.addEventListener("click", () => {
  let box = document.getElementById("challengeBox");
  if (!box.style.visibility||box.style.visibility == "hidden") box.style.visibility = "visible";
  else box.style.visibility = "hidden";
});

store();
