const todayFlower = document.getElementsByClassName("option-today")[0];
const monthFlower = document.getElementsByClassName("option-month")[0];
const eachMonthFlower = document.getElementsByClassName("months");
const flowerInfo = document.getElementsByClassName("flowerInfo");
const dayflowerInfo = document.getElementsByClassName("dayflowerInfo")[0];

let date = new Date();
let xhr = new XMLHttpRequest();
let url = 'http://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlower01';
let queryParams = '?' + encodeURIComponent('serviceKey') + '='+'R7Y2gKOGiTpCr38JTAdNMKjKIkgRaqgUZteHLc%2B1KTuhpY5vBCGXORI9UB6K%2B%2FfaNeBi2EHOtxFa14q6ZsdTXg%3D%3D';
queryParams += '&' + encodeURIComponent('fMonth') + '=' + encodeURIComponent(String(date.getMonth()+1));
queryParams += '&' + encodeURIComponent('fDay') + '=' + encodeURIComponent(String(date.getDate()));
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
	if (this.readyState == 4) {
		let xmlDoc = this.responseXML;
		let flowNm = xmlDoc.getElementsByTagName("flowNm");
		let flowerName = document.getElementById("tdflowerName");
		flowerName.innerHTML = flowNm[0].childNodes[0].nodeValue;
		let fContent = xmlDoc.getElementsByTagName("fContent");
		let flowerExplain = document.getElementById("tdflowerExplain");
		flowerExplain.innerHTML = fContent[0].childNodes[0].nodeValue;
		let flowLang = xmlDoc.getElementsByTagName("flowLang");
		let flowLangArray = flowLang[0].childNodes[0].nodeValue.split(",");
		let flowertag = document.getElementById("tdflowertag");
		flowertag.innerHTML= "";
		for(i=0; i<flowLangArray.length; i++){
			flowertag.innerHTML += "#";
			flowertag.innerHTML += flowLangArray[i];
		}
		let fimgUrl1 = xmlDoc.getElementsByTagName("imgUrl1");
		let flowerImage = document.getElementById("tdflowerImage");
		flowerImage.src = fimgUrl1[0].childNodes[0].nodeValue;
	}
};
xhr.send('');

function changeTodayMonth(type) {
  for (let i=0; i<document.getElementsByClassName("option-month").length; i++) {
    if (type == "monthFlower") {
      if (i==0){
        monthFlower.style.color="#FD5D5D";
      }
      for(let i=0;i<flowerInfo.length;i++){
        flowerInfo[i].style.display="none";
      }
      flowerInfo[4].style.display="flex";
      dayflowerInfo.style.display="none";
      document.getElementsByClassName("option-month")[i].style.visibility="visible";
    } else {
      document.getElementsByClassName("option-month")[i].style.visibility="hidden";
      if (i==0) {
        monthFlower.style.color="black";
        monthFlower.style.visibility="visible"
      }
    }
  }
  for (let i=0; i<document.getElementsByClassName("option-today").length; i++){
    if (type == "todayFlower") {
      if (i==0) todayFlower.style.color="#FD5D5D";
      dayflowerInfo.style.display="flex";
      document.getElementsByClassName("option-today")[i].style.visibility="visible";
      for(let i=0;i<flowerInfo.length;i++){
        flowerInfo[i].style.display="none";
      }
    } else {
      document.getElementsByClassName("option-today")[i].style.visibility="hidden";
      if (i==0) {
        todayFlower.style.color="black";
        todayFlower.style.visibility="visible"
      }
    }
  }
}

function changeMonthFlower(type){
  for(let i=0;i<flowerInfo.length;i++){
    flowerInfo[i].style.display="none";
  }  
  flowerInfo[type].style.display="flex";
}

monthFlower.addEventListener("click", function() {changeTodayMonth("monthFlower");});
todayFlower.addEventListener("click", function() {changeTodayMonth("todayFlower");});

window.onload=changeTodayMonth("todayFlower");
for(let i=0;i<flowerInfo.length;i++){
  flowerInfo[i].style.display="none";
}
for(let i=0; i< eachMonthFlower.length; i++){
  eachMonthFlower[i].addEventListener("click", function(){changeMonthFlower(i)})
}
