//getting ID of the start button
let startBtn = document.getElementById("startBtn");
//geting ID of clickBtn Class
let clickBtn = document.querySelectorAll(".clickBtn");
//score variable
let score = 0;
//getting ID of the container 2
let container2 = document.getElementById("container2");
//getting ID of resultBox
let resultBox = document.getElementById("resultBox");
let resultBox2 = document.getElementById("resultBox2");
//variable for changing the innerHTML of result Box
let html = "";
//adding the finish audio
let finish = new Audio("/audio/finish.wav");
//adding click audi
let click = new Audio("/audio/click.wav");
//adding start button audio
let start = new Audio("/audio/start.wav");
//getting ID of start Again Button
let playAgain = document.getElementById("playAgain");
//getting name of the player
let nameId=document.getElementById("nameId");
//dummy arrays and let for sorting algorithm
let arr2=[],count=0;

//event listener for Start Button
startBtn.addEventListener("click", () => {

     document.getElementById("container1").style.display = "none";
     document.getElementById("container2").style.display = "grid";

     start.play();


});

console.log(typeof (clickBtn));
//for loop  to access every elements of the class array 
clickBtn.forEach((element, index) => {
     clickBtn[index].addEventListener("click", () => {
          //playing the click audio
          click.play();
          //disabling the button after one click
          clickBtn[index].disabled = true;


          //Generating the Random Value for the decision
          let randomValue = Math.ceil(Math.random() * 100);
          //  console.log(randomValue);
          // if the random number is divisible by 15 make the button red and game is over
          if (randomValue % 5 == 0) {
               clickBtn[index].style.background = "Red";
               setTimeout(() => {
                    container2.style.display = "none";
                    resultBox.style.display = "inline"
                    resultBox2.style.display = "inline"
               }, 1000)

            //setting up the local storage
            let notes = localStorage.getItem("notes");

            if (notes == null) {
                 notesObj = [];
            }
            else {
                 notesObj = JSON.parse(notes);
            }

       notesObj.push(`${score}---${nameId.value}`);
       localStorage.setItem( "notes",JSON.stringify(notesObj));
      
     //  sorting algorith STARTS
       
       arr2.length=10;

       notesObj.forEach((ele,i)=>
       {
            for(j=0;j<notesObj.length;j++)
            {
       
             if(parseInt(notesObj[i])<parseInt(notesObj[j]))
             {
                  count++;
             }
           
            }
            if(arr2[count]!=ele)
            {
       arr2[count]=ele;
            }
            else
            {
                 arr2[count+1]=ele;
            }
       count=0;
       });  
//Sorting Algorithm ENDS
 
//deleting records other than Top3
arr2.splice(3,Infinity);
        

            // console.log(notes);
               // changing the innerHTML of the box
            
               arr2.forEach((ele,index)=>{
               html += `<p class="resultText">${ele}</p> `
             });
             
               resultBox.innerHTML = html;
               resultBox2.innerHTML=`<p> your score is ${score} </p>`
               //playing finish Audio
               finish.play();
               //showing result heading
               document.getElementById("resultHeading").style.display = "inline";
               //showing the play Again button
               playAgain.style.display = "inline";
              




          }
          else {
               score = score + 1;


          }
          // console.log(score);
     });
});

//Start Again Button

playAgain.addEventListener("click", () => {

     window.location.reload();

});



