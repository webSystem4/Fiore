// 태양, 물, 꽃 선택과 같은 모든 상태를 관리하는 최상위 클래스
class Environment {
	constructor() {
		this.status = 1;
    // statusListener의 기본값을 빈 함수로 지정
		this.statusListener = () => {};
	}

  // status 값 변경
	setStatus(status) {
		this.status = status;

    // status 값 변경 시 changeStatusListener로 등록된 함수를 실행
		this.statusListener(status);
	}

  // 받은 element의 status값 변경
	mountChangeStatus(element, status) {
		element.addEventListener("click", () => {
			this.setStatus(status);
		});
	}

  // statusListener의 함수를 변경한다.
	changeStatusListener(func) {
		this.statusListener = func;
	}
}

// 태양값 상태 관리
class Sun extends Environment {
	constructor(element) {
		super();
		this.sun = element;
	}
	setStatus(status) {
    // 함수 오버라이드
		super.setStatus(status);

    //이미지와 애니메이션 속도 변경
		this.sun.children[1].children[0].src = `./img/sun${this.status}.png`;
		this.sun.children[0].style.animationDuration = `${4 + (3 - this.status) * 2}s`;
	}
}

// 물 상태 관리
class Water extends Environment {
	constructor() {
		super();
	}
}

// 씨앗 상태 관리
class Seed extends Environment {
	constructor() {
		super();

    // status값을 문자열로 설정
		this.status = "";
	}
}

// 구름 흘러가는 애니메이션
class Cloud {
	constructor(elements) {
		this.clouds = elements;
    
    // 구름 갯수에 따라 유동적으로 배열크기를 할당하기 위한 스프레드 문법 (https://stackoverflow.com/questions/3871547/iterating-over-result-of-getelementsbyclassname-using-array-foreach)
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
    // 0.05초마다 3px
		setTimeout(() => {
			this.flowCloud();
		}, 50);
	}
}

// 화분 (꽃의 모든 생명주기 포함)
class Pot {
  // 전체 꽃 리스트
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
    // 화분 엘리먼트
		this.element = element;
		this.selectListener = () => {};

    // 물 버튼 클릭 시 몇 번째 화분인지 selectListener로 전송
		this.element.getElementsByClassName("waterbtn")[0].addEventListener("click", () => {
			this.selectListener("water", idx);
		});
    // 씨앗 심기 & 수확하기 버튼 클릭 시 몇 번째 화분인지 selectListener로 전송
		this.element.getElementsByClassName("plantbtn")[0].addEventListener("click", () => {
			this.selectListener("seed", idx);
		});

    // 화분 엘리먼트에 초기화
		this.changeDraw();
	}

	changeSelectListener(func) {
		this.selectListener = func;
	}

	// 씨앗심기 - flowerName이 일치하는 오브젝트의 값으로 설정해줌
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

    // 환경, 화분 초기화
		this.changeEnviroment();
    // 화분 엘리먼트에 시간 등을 반영
		this.changeDraw();
	}

	// 성장이 완료된 꽃 수확하여 객체로 반환
	harvest() {
		if (this.isHarvestable)
			return {
				flowerName: this.flowerName,
        // 꽃 색상
				step: this.step,
			};
		else return null;
	}

  // 태양 조절
	controlSun(sun) {
		this.currentSun = sun;
		this.changeEnviroment();
	}

  // 물 조절
	controlWater(water) {
		this.currentWater = water;
		this.changeEnviroment();
	}

  // 식물을 다음 단계로 성장시킴
	stepUp() {
    // 3단계 미만이면 다음 단계로 성장
		if (this.step < 3) {
      // 색상값이 있으면 1과 2중 랜덤으로 성장값 설정
			if (this.step == 2) this.step += 1 + Math.round(Math.random() * (this.color || 0));
			else this.step++;
		}

    // 3단계 이상일 때 수확 가능 상태로 변경
		if (this.step >= 3) this.isHarvestable = true;
	}

  // 설정된 성장주기가 될 때까지 Interval 실행
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
		}, 1000);
	}

  // 성장 중지
	stopGrowth() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

  // 환경 변경 시 성장 가능 확인
	changeEnviroment() {
		if (this.currentSun == this.requiredSun && this.currentWater == this.requiredWater && !this.isHarvestable) this.startGrowth();
		else this.stopGrowth();
	}

  // 지금 클래스의 값을 화면에 반영
	changeDraw() {
    // 씨앗상태면 seed 이미지, 아니면 식물 이미지
		if (!this.step) this.element.getElementsByClassName("plant")[0].src = `./img/seed.png`;
		else this.element.getElementsByClassName("plant")[0].src = `./img/${this.flowerName}${this.step}.png`;

    // 수확 가능 상태면 남은 시간 0:0, 아니면 시간 변경
		if (this.isHarvestable) this.element.getElementsByClassName("remaintime")[0].innerHTML = "0:0";
		else if (this.currentGrowthTime !== undefined) this.element.getElementsByClassName("remaintime")[0].innerHTML = `${Math.floor(this.currentGrowthTime / 60)}:${this.currentGrowthTime % 60}`;

    // 씨앗심기, 수확하기 버튼
		this.element.getElementsByClassName("plantbtn")[0].style.visibility = "visible";
    // 수확 가능 상태면 씨앗심기 버튼 문구 변경, 아니면 씨앗심기
		if (this.isHarvestable) this.element.getElementsByClassName("plantbtn")[0].innerHTML = "수확하기";
		else if (!this.flowerName) this.element.getElementsByClassName("plantbtn")[0].innerHTML = "씨앗심기";
    // 수확 불가능, 식물이 있음 => 식물이 성장중이기 때문에 버튼 숨기기
		else this.element.getElementsByClassName("plantbtn")[0].style.visibility = "hidden";
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
      //선택된 status의 background값 조절
			if (sun.status == element.dataset.value) element.style.background = "#ffe0e0";
			else element.style.background = "white";
		} else element.style.display = "none";
	}
	for (let element of document.getElementsByClassName("option-water")) {
		if (type == "water") {
			element.style.display = "block";
      //선택된 status의 background값 조절
			if (water.status == element.dataset.value) element.style.background = "#ffe0e0";
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
//default
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

// 각각 화분에 sun값 조절
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
    // 화분이 있고 수확이 가능하면 수확하고 새 화분을 생성
		if (type == "seed" && potList[selectedPotIndex] && potList[selectedPotIndex].isHarvestable) {
			saveHarvest(potList[selectedPotIndex].harvest());
			potList[selectedPotIndex] = new Pot(potList[selectedPotIndex].element, selectedPotIndex);
		}
    // 물 조절
		if (type == "water" && potList[selectedPotIndex]) {
			water.status = potList[selectedPotIndex].currentWater;
		}
		changePanelType(type);
	});
});

// cloud 세팅
cloud.flowCloud();

// 스토리지에 저장
function saveHarvest(flower) {
	let flowerList = JSON.parse(localStorage.getItem("flowerList")) || [];

  // 중복이 아니어야 리스트에 추가
	if (!flowerList.find((i) => i.flowerName == flower.flowerName && i.step == flower.step)) {
		flowerList.push(flower);
		localStorage.setItem("flowerList", JSON.stringify(flowerList));
	}
}
