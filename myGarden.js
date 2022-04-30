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
    // html 꽃 이미지 추가
    let flowerImage = document.createElement("img");
    flowerImage.className = "plant";
    flowerImage.src = `./img/${flower.flowerName + flower.step }.png`;
    console.log(flower.flowerName);
    flowerZone.appendChild(flowerImage);
  }
  // 도전과제 완료
  let fail = false;
  const clearFlowerList = flowerList.map(
    (flower) => flower.flowerName + flower.step
  );
  // 
  [...challengeList].forEach((element) => {
    // '완벽' 과제에 대해서는 건너뜀
    if(element.dataset.value == "0") return;
  // value가 존재하면 도전과제 달성 표시
    if (!clearFlowerList.includes(element.dataset.value)) {
      // 옆의 체크표시
      element.nextElementSibling.style.visibility = "hidden";
      // 상위의 박스
      element.parentElement.style.background = "white";
      fail = true;
    }
  });
  // '완벽' 과제 달성
  if(fail){
    challengeList[14].nextElementSibling.style.visibility = "hidden";
    challengeList[14].parentElement.style.background = "white";
  }
}

//도전과제 아이콘
challengeBtn.addEventListener("click", () => {
  let box = document.getElementById("challengeBox");
  if (!box.style.visibility||box.style.visibility == "hidden") box.style.visibility = "visible";
  else box.style.visibility = "hidden";
});

store();
