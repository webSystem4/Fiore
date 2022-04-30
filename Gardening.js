class Environment {
  constructor() {
    this.status = 1;
    this.statusListener = () => {};
  }
  setStatus(status) {
    this.status = status;
    this.statusListener(status);
  }
  mountChangeStatus(element, status) {
    element.addEventListener("click", () => {
      this.setStatus(status);
    });
  }
  changeStatusListener(func) {
    this.statusListener = func;
  }
}
class Sun extends Environment {
  constructor(element) {
    super();
    this.sun = element;
  }
  setStatus(status) {
    super.setStatus(status);
    this.sun.children[1].children[0].src = `img/sun${this.status}.png`;
    this.sun.children[0].style.animationDuration = `${
      4 + (3 - this.status) * 2
    }s`;
  }
}

class Water extends Environment {
  constructor() {
    super();
  }
}
class Seed extends Environment {
  constructor() {
    super();
    this.status = "";
  }
}

class Cloud {
  constructor(elements) {
    this.clouds = elements;
    this.x = [...this.clouds].map(() => this.getRandomX());
    this.y = [...this.clouds].map(() => this.getRandomY());
  }
  getRandomX() {
    return Math.floor(Math.random() * window.innerWidth);
  }
  getRandomY() {
    return Math.floor(Math.random() * 400 + 100);
  }
  flowCloud() {
    for (let i = 0; i < this.clouds.length; i++) {
      this.x[i] += 3;
      if (this.x[i] >= innerWidth) {
        this.x[i] = -400;
        this.y[i] = this.getRandomY();
        this.clouds[i].style.transition = "none";
      } else {
        this.clouds[i].style.transition = "";
      }
      this.clouds[i].style.top = this.y[i] + "px";
      this.clouds[i].style.left = this.x[i] + "px";
    }
    setTimeout(() => {
      this.flowCloud();
    }, 50);
  }
}

class Pot {
  static flowerList = [
    {
      flowerName: "hyacinth",
      displayName: "히아신스",
      requiredWater: 2, // 물
      requiredSun: 1, // 태양
      color: 1, //색상
      growthTime: 5, // 성장주기
    },
    {
      flowerName: "tulip",
      displayName: "튤립",
      requiredWater: 1, // 물
      requiredSun: 1, // 태양
      color: 1, //색상
      growthTime: 5, // 성장주기
    },
    {
      flowerName: "rose",
      displayName: "장미",
      requiredWater: 3, // 물
      requiredSun: 2, // 태양
      color: 1, //색상
      growthTime: 5, // 성장주기
    },
    {
      flowerName: "lily",
      displayName: "백합",
      requiredWater: 2, // 물
      requiredSun: 1, // 태양
      color: 1, //색상
      growthTime: 5, // 성장주기
    },
    {
      flowerName: "anemone",
      displayName: "아네모네",
      requiredWater: 1, // 물
      requiredSun: 2, // 태양
      color: 1, //색상
      growthTime: 5, // 성장주기
    },
    {
      flowerName: "daffodil",
      displayName: "수선화",
      requiredWater: 3, // 물
      requiredSun: 2, // 태양
      color: 1, //색상
      growthTime: 5, // 성장주기
    },
    {
      flowerName: "lavender",
      displayName: "라벤더",
      requiredWater: 1, // 물
      requiredSun: 3, // 태양
      growthTime: 5, // 성장주기
    },
    {
      flowerName: "sunflower",
      displayName: "해바라기",
      requiredWater: 2, // 물
      requiredSun: 3, // 태양
      growthTime: 5, // 성장주기
    },
  ];
  constructor(element, idx) {
    this.element = element;
    this.selectListener = () => {};

    this.element
      .getElementsByClassName("waterbtn")[0]
      .addEventListener("click", () => {
        this.selectListener("water", idx);
      });
    this.element
      .getElementsByClassName("plantbtn")[0]
      .addEventListener("click", () => {
        this.selectListener("seed", idx);
      });

    this.changeDraw();
  }

  changeSelectListener(func) {
    this.selectListener = func;
  }

  // 씨앗심기
  seeding(flowerName) {
    let obj = Pot.flowerList.find((i) => i.flowerName == flowerName);
    if (!obj) return;

    this.flowerName = obj.flowerName;
    this.displayName = obj.displayName;
    this.requiredWater = obj.requiredWater;
    this.requiredSun = obj.requiredSun;
    this.step = 0;
    this.color = obj.color;
    this.growthTime = obj.growthTime;
    this.currentGrowthTime = obj.growthTime;
    this.timer = null;

    this.currentSun = 0;
    this.currentWater = 0;

    this.changeEnviroment();
    this.changeDraw();
  }

  // 수확
  harvest() {
    if (this.isHarvestable)
      return {
        flowerName: this.flowerName,
        step: this.step,
      };
    else return null;
  }

  controlSun(sun) {
    this.currentSun = sun;
    this.changeEnviroment();
  }
  controlWater(water) {
    this.currentWater = water;
    this.changeEnviroment();
  }

  stepUp() {
    if (this.step < 3) {
      if (this.step == 2)
        this.step += 1 + Math.round(Math.random() * (this.color || 0));
      else this.step++;
    }

    if (this.step >= 3) this.isHarvestable = true;
  }

  startGrowth() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.currentGrowthTime <= 0) {
        this.currentGrowthTime = this.growthTime;
        this.stepUp();
      }
      this.currentGrowthTime--;
      this.changeDraw();
      if (this.step >= 3) this.stopGrowth();
    }, 100);
  }
  stopGrowth() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  changeEnviroment() {
    console.log(
      this.flowerName,
      this.currentSun,
      this.requiredSun,
      this.currentWater,
      this.requiredWater
    );
    if (
      this.currentSun == this.requiredSun &&
      this.currentWater == this.requiredWater &&
      !this.isHarvestable
    )
      this.startGrowth();
    else this.stopGrowth();
  }

  changeDraw() {
    if (!this.step)
      this.element.getElementsByClassName("plant")[0].src = `img/seed.png`;
    else
      this.element.getElementsByClassName(
        "plant"
      )[0].src = `img/${this.flowerName}${this.step}.png`;

    if (this.isHarvestable)
      this.element.getElementsByClassName("remaintime")[0].innerHTML = "0:0";
    else if (this.currentGrowthTime !== undefined)
      this.element.getElementsByClassName(
        "remaintime"
      )[0].innerHTML = `${Math.floor(this.currentGrowthTime / 60)}:${
        this.currentGrowthTime % 60
      }`;

    this.element.getElementsByClassName("plantbtn")[0].style.visibility =
      "visible";
    if (this.isHarvestable)
      this.element.getElementsByClassName("plantbtn")[0].innerHTML = "수확하기";
    else if (!this.flowerName)
      this.element.getElementsByClassName("plantbtn")[0].innerHTML = "씨앗심기";
    else
      this.element.getElementsByClassName("plantbtn")[0].style.visibility =
        "hidden";
  }
}

const sunElement = document.getElementsByClassName("sun")[0];

const sun = new Sun(sunElement);
const water = new Water();
const seed = new Seed();
const cloud = new Cloud(document.getElementsByClassName("clouds")[0].children);

sun.setStatus(2);
water.setStatus(2);

// 패널 세팅
function changePanelType(type) {
  for (let element of document.getElementsByClassName("option-sun")) {
    if (type == "sun") {
      element.style.display = "block";
      if (sun.status == element.dataset.value)
        element.style.background = "#ffe0e0";
      else element.style.background = "white";
    } else element.style.display = "none";
  }
  for (let element of document.getElementsByClassName("option-water")) {
    if (type == "water") {
      element.style.display = "block";
      if (water.status == element.dataset.value)
        element.style.background = "#ffe0e0";
      else element.style.background = "white";
    } else element.style.display = "none";
  }
  for (let element of document.getElementsByClassName("option-seed")) {
    if (type == "seed") {
      element.style.display = "block";
    } else element.style.display = "none";
  }

  switch (type) {
    case "sun":
      document.getElementById("optionHead").innerHTML = "햇빛 조절";
      break;
    case "water":
      document.getElementById("optionHead").innerHTML = "물 조절";
      break;
    case "seed":
      document.getElementById("optionHead").innerHTML = "씨앗 종류";
      break;
  }
}
changePanelType("sun");

// 화분 세팅
const pots = document.getElementsByClassName("pot");
let potList = [...pots].map((i, idx) => new Pot(i, idx));
let selectedPotIndex = 0;

// sun 세팅
const sunOptions = document.getElementsByClassName("option-sun");
for (let element of sunOptions) {
  sun.mountChangeStatus(element, parseInt(element.dataset.value));
}
sunElement.addEventListener("click", () => {
  changePanelType("sun");
});

sun.changeStatusListener((status) => {
  changePanelType("sun");
  potList.forEach((i) => {
    i.controlSun(status);
    selectedPotIndex = -1;
  });
});

// water 세팅
const waterOptions = document.getElementsByClassName("option-water");
for (let element of waterOptions) {
  water.mountChangeStatus(element, parseInt(element.dataset.value));
}

water.changeStatusListener((status) => {
  changePanelType("water");
  if (potList[selectedPotIndex]) potList[selectedPotIndex].controlWater(status);
});

//seed 세팅
const seedOptions = document.getElementsByClassName("option-seed");
for (let element of seedOptions) {
  seed.mountChangeStatus(element, element.dataset.value);
}

seed.changeStatusListener((status) => {
  changePanelType("seed");
  if (potList[selectedPotIndex]) {
    potList[selectedPotIndex].seeding(status);
    potList[selectedPotIndex].controlSun(sun.status);
    potList[selectedPotIndex].controlWater(water.status);
    changePanelType("water");
  }
});

potList.forEach((pot) => {
  pot.changeSelectListener((type, idx) => {
    selectedPotIndex = idx;
    if (
      type == "seed" &&
      potList[selectedPotIndex] &&
      potList[selectedPotIndex].isHarvestable
    ) {
      saveHarvest(potList[selectedPotIndex].harvest());
      potList[selectedPotIndex] = new Pot(
        potList[selectedPotIndex].element,
        selectedPotIndex
      );
}
    if (type == "water" && potList[selectedPotIndex]) {
      water.status = potList[selectedPotIndex].currentWater;
    }
    changePanelType(type);
  });
});

// cloud 세팅
cloud.flowCloud();

function saveHarvest(flower) {
  let flowerList = JSON.parse(localStorage.getItem("flowerList")) || [];

  if (
    !flowerList.find(
      (i) => i.flowerName == flower.flowerName && i.step == flower.step
    )
  ) {
    flowerList.push(flower);
    localStorage.setItem("flowerList", JSON.stringify(flowerList));
  }
}
