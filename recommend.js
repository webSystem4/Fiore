const todayFlower = document.getElementsByClassName("option-today")[0];
const monthFlower = document.getElementsByClassName("option-month")[0];
const eachMonthFlower = document.getElementsByClassName("months");
const flowerInfo = document.getElementsByClassName("flowerInfo");
const dayflowerInfo = document.getElementsByClassName("dayflowerInfo")[0];

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
