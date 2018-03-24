var setTime = 1;
var breakTime = 1;
var isPaused = false;
$(document).ready(function() {
  var y = document.getElementById("alarm");
  $("#breakPlus").on("click", function() {
    if (timeLimit() == true) {
      $("#breakPlus")
        .on("click")
        .off();
    } else {
      breakTime += 1;
    }
    $("#break").html(breakTime + " minutes");
  });
  $("#breakMinus").on("click", function() {
    breakTime -= 1;
    $("#break").html(breakTime + " minutes");
  });

  $("#setPlus").on("click", function() {
    if (timeLimit() == true) {
      $("#setPlus")
        .on("click")
        .off();
    } else {
      setTime += 1;
    }
    $("#time").html(setTime + " minutes");
    $("#displayTime").html(setTime);
  });

  $("#setMinus").on("click", function() {
    setTime -= 1;
    $("#time").html(setTime + " minutes");
    $("#displayTime").html(setTime);
  });

  function timeLimit() {
    if (breakTime == 20 || setTime == 60) {
      return true;
    } else {
      return false;
    }
  }

  function convertTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }
    return minutes.toString() + ":" + seconds.toString();
  }

  var time2;

  function startTimer(time) {
    var countDown = 0;
    var time1 = time * 60;
    x = setInterval(function() {
      if (isPaused) {
        return;
      }
      time2 = time1--;
      if (time2 > 0) {
        document.getElementById("displayTime").innerHTML = convertTime(time2);
      } else if (time2 == 0) {
        clearInterval(x);
        document.getElementById("displayTime").innerHTML = convertTime(time2);
        if (document.getElementById("countDown").innerHTML == "Work Session") {
          y.play();
          document.getElementById("countDown").innerHTML = "It's break time";
          alert("It's break time :>");
          startTimer(breakTime);
        } else {
          document.getElementById("countDown").innerHTML = "Work Session";
          y.play();
          alert("It's work time :>");
          startTimer(setTime);
        }
      }
    }, 1000);
  }
  console.log(time2);

  $("#resume").on("click", function() {
    isPaused = false;
  });

  $("#start").on("click", function() {
    isPaused = false;
    startTimer(setTime);
    $(this).hide();
  });

  $("#stop").on("click", function() {
    isPaused = true;
  });
  $("#reset").on("click", function() {
    clearInterval(x);
    document.getElementById("countDown").innerHTML = "Work Session";
    document.getElementById("displayTime").innerHTML = setTime;
    $("#start").show();
  });
  function getDate(){
    var date,day,month,year,date1;
    dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    date = new Date();
    date1 = date.getDate();
    day = date.getDay();
    month = date.getMonth();
    year = date.getFullYear();
    document.getElementById("date").innerHTML = dayList[day] + ", " + monthList[month] +"  "+date1 + ", "+ year;
  }
  getDate();
});