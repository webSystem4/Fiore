var map = new naver.maps.Map('map', {
  center: new naver.maps.LatLng(36.4695548, 127.6297043),
  zoom: 7
});
var marker1 = new naver.maps.Marker({
  position: new naver.maps.LatLng(37.5286729, 126.9329010),
  map: map
});
var marker2 = new naver.maps.Marker({
  position: new naver.maps.LatLng(35.2324727, 127.6506937),
  map: map
});
var marker3 = new naver.maps.Marker({
  position: new naver.maps.LatLng(35.8428264, 129.2862310),
  map: map
});
var marker4 = new naver.maps.Marker({
  position: new naver.maps.LatLng(33.3063369, 126.5845256),
  map: map
});
var marker5 = new naver.maps.Marker({
  position: new naver.maps.LatLng(35.1019072, 127.8858415),
  map: map
});
var marker6 = new naver.maps.Marker({
  position: new naver.maps.LatLng(35.0785214, 127.7200059),
  map: map
});
var marker7 = new naver.maps.Marker({
  position: new naver.maps.LatLng(35.3301869, 127.4880280),
  map: map
});
var marker8 = new naver.maps.Marker({
  position: new naver.maps.LatLng(37.4026208, 129.2094782),
  map: map
});
var marker9 = new naver.maps.Marker({
  position: new naver.maps.LatLng(33.3618604, 126.7654550),
  map: map
});
var marker10 = new naver.maps.Marker({
  position: new naver.maps.LatLng(36.3533075, 127.2201106),
  map: map
});
var marker11 = new naver.maps.Marker({
  position: new naver.maps.LatLng(35.8669008, 128.5854130),
  map: map
});
const modal = document.getElementById("modal")
const btnModal = document.getElementById("btn-modal")
const closeBtn = modal.querySelector(".close-area")
let placeName = document.getElementById("placeName");
let placeExp = document.getElementById("placeExp");

// 장소마다 장소정보 보여주기
naver.maps.Event.addListener(marker1, 'click', showPlaceInfo1);
naver.maps.Event.addListener(marker2, 'click', showPlaceInfo2);
naver.maps.Event.addListener(marker3, 'click', showPlaceInfo3);
naver.maps.Event.addListener(marker4, 'click', showPlaceInfo4);
naver.maps.Event.addListener(marker5, 'click', showPlaceInfo5);
naver.maps.Event.addListener(marker6, 'click', showPlaceInfo6);
naver.maps.Event.addListener(marker7, 'click', showPlaceInfo7);
naver.maps.Event.addListener(marker8, 'click', showPlaceInfo8);
naver.maps.Event.addListener(marker9, 'click', showPlaceInfo9);
naver.maps.Event.addListener(marker10, 'click', showPlaceInfo10);
naver.maps.Event.addListener(marker11, 'click', showPlaceInfo11);

function showPlaceInfo1(){
  modal.style.display = "flex"
  placeName.innerHTML = "서울 여의도 한강공원";
  placeExp.innerHTML = "강가에 위치한 대형 공원으로 아름다운 경치와 조깅 코스, 수영장 등이 있어 많은 사람들의 사랑을 받고 있습니다.<br><br><b>상세주소</b>: 서울특별시 영등포구 여의동로 330";

}
function showPlaceInfo2(){
  modal.style.display = "flex"
  placeName.innerHTML = "하동 쌍계사";
  placeExp.innerHTML = "울창한 산속에 자리한 수백 년 된 불교 사원으로 녹차 밭과 벚꽃길을 감상할 수 있습니다.<br><br><b>상세주소</b>: 경상남도 하동군 화개면 쌍계사길 59";
}
function showPlaceInfo3(){
  modal.style.display = "flex"
  placeName.innerHTML = "경주 보문단지";
  placeExp.innerHTML = "아름다운 호수와 울창한 나무 뒤에 리조트와 야외극장이 있는 관광 명소입니다.<br><br><b>상세주소</b>: 경상북도 경주시 보문로 446";
}
function showPlaceInfo4(){
  modal.style.display = "flex"
  placeName.innerHTML = "제주 상효원";
  placeExp.innerHTML = "한라산을  뒷배경으로  둔  넓은  사설  수목원입니다.  꼬마기차를  이용하여  각  정거장에  내려  이용할 수  있고  도보로도  각종  꽃과  향목들을  만날 수 있습니다.<br><br><b>상세주소</b>: 제주특별자치도 서귀포시 영천동 산록남로 2847-37";
}
function showPlaceInfo5(){
  modal.style.display = "flex"
  placeName.innerHTML = "하동 직전리";
  placeExp.innerHTML = "‘물길과 꽃길의 고장’ 알프스 하동은 꽃 중에서 가장 먼저 봄소식을 전한다는 매화를 시작으로 4월 벚꽃, 배꽃, 철쭉에 이어 5월 꽃 양귀비에 이르기까지 꽃의 향연이 펼쳐집니다.";
}
function showPlaceInfo6(){
  modal.style.display = "flex"
  placeName.innerHTML = "광양 매화마을";
  placeExp.innerHTML = "광양 매화마을에서는 만개한 매화꽃이 상춘객(賞春客)을 반기고 있습니다. 광양시에서는 매년 매화축제를 개최하고 있지만 올해는 코로나로 인하여 취소되었습니다.<br><br><b>상세주소</b>: 전라남도 광양시 다압면 지막1길";
}
function showPlaceInfo7(){
  modal.style.display = "flex"
  placeName.innerHTML = "구례 산수유마을";
  placeExp.innerHTML = "산동의 마을들을 흔히 ‘구례 산수유 마을’이라 부릅니다. 여느 마을의 소나무처럼 산수유나무가 흔한 마을들 입니다. 이 마을에서는 산수유 축제가 열리지만 올해는 코로나로 인하여 취소되었습니다.<br><br><b>상세주소</b>: 전라남도 구례군 산동면 위안월계길 6-12";
}
function showPlaceInfo8(){
  modal.style.display = "flex"
  placeName.innerHTML = "삼척 맹방 유채꽃 축제";
  placeExp.innerHTML = "주변 벚꽃 가로수길과 멋지게 어우러지는 유채꽃을 감상할 수 있습니다.<br><br><b>상세주소</b>: 강원도 삼척시 근덕면 상맹방리 215-1";
}
function showPlaceInfo9(){
  modal.style.display = "flex"
  placeName.innerHTML = "제주 가시리";
  placeExp.innerHTML = "가시리에는 여러 유채꽃 명소들이 있습니다. 아주 광활한 규모의 유채꽃 단지를 구경할 수 있습니다. <br><br><b>상세주소</b>: 제주특별자치도 서귀포시 표선면 가시리 3149-17";
}
function showPlaceInfo10(){
  modal.style.display = "flex"
  placeName.innerHTML = "공주 동학사";
  placeExp.innerHTML = "숲속에 자리 잡은 유서 깊은 사찰이자 승려를 위한 학문 기관으로, 매해 꽃 축제가 열립니다.<br><br><b>상세주소</b>: 충청남도 공주시 반포면 동학사1로 462"
}
function showPlaceInfo11(){
  modal.style.display = "flex"
  placeName.innerHTML = "대구 청라언덕";
  placeExp.innerHTML = "과거에 선교사들이 머물렀던 곳입니다. 대구광역시 주요 관광명소이며 푸른 담쟁이덩굴과 등나무꽃을 감상할 수 있습니다.<br><br><b>상세주소</b>: 대구광역시 중구 성내2동 달구벌대로 2029"
}


closeBtn.addEventListener("click", e => {
    modal.style.display = "none"
})
modal.addEventListener("click", e => {
  const evTarget = e.target
  if(evTarget.classList.contains("modal-overlay")) {
      modal.style.display = "none"
  }
})
window.addEventListener("keyup", e => {
  if(modal.style.display === "flex" && e.key === "Escape") {
      modal.style.display = "none"
  }
})

const flowerPlace = document.getElementsByClassName("places");

for(let i=0; i<flowerPlace.length; i++){
  switch(i) {
    case 0:
      flowerPlace[i].addEventListener("click", showPlaceInfo1);
      break;
    case 1:
      flowerPlace[i].addEventListener("click", showPlaceInfo2);
      break;
    case 2:
      flowerPlace[i].addEventListener("click", showPlaceInfo3);
      break;
    case 3:
      flowerPlace[i].addEventListener("click", showPlaceInfo4);
      break;
    case 4:
      flowerPlace[i].addEventListener("click", showPlaceInfo5);
      break;
    case 5:
      flowerPlace[i].addEventListener("click", showPlaceInfo6);
      break;
    case 6:
      flowerPlace[i].addEventListener("click", showPlaceInfo7);
      break;
    case 7:
      flowerPlace[i].addEventListener("click", showPlaceInfo8);
      break;
    case 8:
      flowerPlace[i].addEventListener("click", showPlaceInfo9);
      break;
    case 9:
      flowerPlace[i].addEventListener("click", showPlaceInfo10);
      break;
    case 10:
      flowerPlace[i].addEventListener("click", showPlaceInfo11);
      break;
  }
};