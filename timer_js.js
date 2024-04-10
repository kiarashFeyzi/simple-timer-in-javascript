 
let processIsGoingOn = false,
processHasntStartedYet = true;



let buttonOfStartStop = document.getElementById("buttonOfStartStop");

let days_textField = document.getElementById("textboxOfDays");

let hours_textField  = document.getElementById("textboxOfHours");

let minutes_textField  = document.getElementById("textboxOfMinutes");

let seconds_textField  = document.getElementById("textboxOfSeconds");

let centiSecs_textField = document.getElementById("textboxOfCentiSecs")

let centiSecs = 99;

let theCountdownValue_centiSecs ;
let days, hours, minutes, seconds;

buttonOfStartStop.addEventListener('mouseout', function () {
    this.style.color = '#006699';
    // this.style.border = '4px solid #99ffcc';
    // this.style.backgroundColor = '#06062f';

})
buttonOfStartStop.addEventListener('mouseover', function () {
    this.style.color = '#99ffcc';
})

//I added these because 'hover' had an issue I couldn't fix


//rearranges the structure of countdown values in a better way
let modify = function () {
    if(seconds >= 60 || minutes >= 60 || hours >= 24){
        
        if(seconds >= 60){
           
            minutes += Math.floor(seconds / 60) ;
            seconds %= 60;         
        }
        if(minutes >= 60){
           
            hours += Math.floor(minutes / 60) ;
            minutes %= 60;
        }
        if (hours >= 24) {
            
            days += Math.floor(hours / 24) ;
            hours %= 24;
        }

        let confirms = confirm("did you mean: " + days + " day(s), " + hours + " hour(s), " + minutes + " minute(s) " + "and " + seconds + " second(s) ?");
        if(confirms) {
            minutes_textField.value = minutes;
            seconds_textField.value = seconds;
            hours_textField.value = hours;
            days_textField.value = days;

            return true;
        }
        else{
            return false;
        }

    }
    else return true;
}

buttonOfStartStop.onclick = function(){
    if(processHasntStartedYet){

        if (isNaN(days_textField.value) || isNaN(hours_textField.value) || isNaN(minutes_textField.value) || isNaN(seconds_textField.value)) {
            alert("invalid input")
            return;
        }

        days = Number(days_textField.value);
        hours = Number(hours_textField.value);
        minutes = Number(minutes_textField.value);
        seconds = Number(seconds_textField.value);



        theCountdownValue_centiSecs = (days * 24 * 60 * 60 * 100 ) +
        (hours * 60 * 60 * 100) + (minutes * 60 * 100) + (seconds * 100) + 99;


        if(theCountdownValue_centiSecs - centiSecs > 60480000) {
            alert("if you want to have a countdown more than 7 days, please visit our premium timer")
            return;
        }


        if(!modify()) return;


        processHasntStartedYet = false;
    }




    if(processIsGoingOn){

        buttonOfStartStop.innerHTML = "start";

        processIsGoingOn = false;
    }
    else{
        buttonOfStartStop.innerHTML = "stop";
        
        processIsGoingOn = true;
        setTimeout(timer, 10);
        
    }


    
}


let timer = function () {
  //  let now = Date.now();
  //  console.log(now)
    if(!processIsGoingOn)  return;
    
    theCountdownValue_centiSecs -= 1;


    centiSecs -= 1;

    if(centiSecs < 0) {
        centiSecs = 99;
        seconds--;
    }
    if(seconds < 0){
        seconds = 59;
        minutes--;
    }
    if(minutes < 0){
        minutes = 59;
        hours--;
    }
    if(hours < 0){
        hours = 23;
        days--;
    }

    days_textField.value = days;
    hours_textField.value = hours;
    minutes_textField.value = minutes;
    seconds_textField.value = seconds;
    centiSecs_textField.value = centiSecs;


    if(theCountdownValue_centiSecs == 0) {
            days_textField.value = "";
            hours_textField.value = "";
            minutes_textField.value = "";
            seconds_textField.value = "";
            centiSecs_textField.value = "";


            //initalization for reuse
            buttonOfStartStop.innerHTML = "start";
            processIsGoingOn = false;
            processHasntStartedYet = true;
            centiSecs = 99;

            setTimeout(alrt, 100); // i did this because without this, alert() will be executed first
            
            return;
    }


 //   console.log(Date.now() - now)
    setTimeout(timer, 9.52);
}


let alrt = function(){
    alert("time's up" + days_textField.value)
}