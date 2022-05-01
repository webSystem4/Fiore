var map = new naver.maps.Map('map', {
  center: new naver.maps.LatLng(37.5665234, 126.9779950),
  zoom: 7
});

var marker = new naver.maps.Marker({
  position: new naver.maps.LatLng(37.4026208, 129.2094782),
  map: map
});

naver.maps.Event.addListener(marker, 'click', function() {
  alert("이곳은 삼척 상맹방리의 유채꽃 축제 장소입니다.");
});

// 일단 한 장소랑 마커 연결하기=>완료

flowerPlace = document.getElementById("flowerPlace");
flowerPlace.addEventListener("click", placeInfo);

function placeInfo(){
  alert("이곳은 삼척 상맹방리의 유채꽃 축제 장소입니다.");
}

// css hover=>mouseover event로 빼내기
