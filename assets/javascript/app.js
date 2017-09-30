

      

    // JavaScript function that wraps everything
    $(document).ready(function() {

      var timeCount = false;
      var timeOut = 15;
      var time = timeOut;
      var count = 0;
      var questions = ["Who is the only non Jedi in the original Star Wars trilogy to use a lightsaber?", "In which Star Wars film did Luke Skywalker lose his hand in a duel with Darth Vader?" , "Who gave Luke Skywalker his first lightsaber?"];
      var answer = ["Han Solo", "Empire Strikes Back", "Obi-Wan Kenobi"];
      var answerImg = ["assets/images/hanSolo.jpg", "assets/images/darthVader.jpg", "assets/images/obiWan.jpg"];
      var choice0 = ["Princess Leia", "Han Solo", "Chewbacca", "R2-D2"];
      var choice1 = ["Empire Strikes Back", "Return of the Jedi", "A New Hope", "The Force Awakens"];
      var choice2 = ["Yoda", "Han Solo", "Obi-Wan Kenobi", "Mace Windu"];
      var choiceBank = [choice0, choice1, choice2];
      var displayAnswerInterval = 5000;

      var correct = 0;
      var wrong = 0;
      var unanswered = 0;

      var backgroundImages = ["assets/images/starWars.jpg","assets/images/downedWalker.jpg","assets/images/deserted.jpg","assets/images/fighter.jpg","assets/images/vaderDuel.jpg","assets/images/stormTrooperKneel.jpg","assets/images/mFalcon.jpg"];
      var bckgrndCount = 1;

      


      function bckgrndSwap(){
        

        if(bckgrndCount === backgroundImages.length){
          bckgrndCount = 0;
        }
        document.body.style.backgroundImage = "url(" + backgroundImages[bckgrndCount] + ")";
        bckgrndCount++;
      };

      setInterval(bckgrndSwap, 8000);




     $("#startButton").on("click", function() {
          timeCount = true;
          setInterval(timeClock, 1000);

          displayQuestion();
          displayChoices();

       });



    function timeClock() {
          
          if (timeCount) {
            $("#timer").html(time);
            time--;
            
          }
          
          if (time + 1 === 0) {
            $("#questionSpace").html("Time's Up");
            displayAnswer()
            unanswered++;
          };
          
    };
    
    


    //function to display the current question and begin timer
    function displayQuestion() {
      $("#startButton").hide();
      //$("#buttonArea").hide();
    
      $("#questionSpace").html(questions[count]);
      
      timeCount = true;
    };


    function displayChoices() {
        
      for(i=0; i < choiceBank[count].length; i++){
        var answerButton = $("<button>");
        answerButton.addClass("btn btn-default btn-lg btn-block");
        answerButton.text(choiceBank[count][i]);
        answerButton.addClass("answerButton");
        answerButton.appendTo("#answerSpace");
      }
      
      $(".answerButton").click(rightWrongDecide)




    };

    function displayAnswer() {
      timeCount = false;
      $("#answerSpace").empty();
      $("#answerSpace").html(answer[count]);
      $("#answerImage").html("<img src=" + answerImg[count] + " width='400px'>");
      time = timeOut;

      if (count === questions.length - 1){
        setTimeout(endGame, displayAnswerInterval);
      } else{
      setTimeout(nextQuestion, displayAnswerInterval);  
      };

    };


    function nextQuestion() {
      //Increment the count by 1.
      //clearInterval(keepTime);
      count++;
      timeCount = true;
      $("#answerSpace").empty();
      $("#answerImage").empty();
      //Run displayQuestion function again for another question in sequence
      displayQuestion();
      displayChoices();

      //If the count is the same as the length of the questions array, run the end game function.
    };



    //function to execute time countdown by second
    
    function rightWrongDecide(){

        if(this.innerHTML === answer[count]){
              $("#questionSpace").html("Correct");
              correct++;
              displayAnswer();
        }else{
              $("#questionSpace").html("Incorrect");
              wrong++;
              displayAnswer();
        };

      };
   

    function endGame(){

      count = 0;
      time = timeOut;
      $("#timer").html("");
      $("#answerSpace").html("");
      $("#questionSpace").html("");
      $("#answerImage").html("");

    var correctStats = $("<li>");
        correctStats.appendTo("#questionSpace");
        wrongStats = $("<li>");
        wrongStats.appendTo("#questionSpace");
        unansweredStats = $("<li>");
        unansweredStats.appendTo("#questionSpace");
      

      correctStats.append("Number Correct: " + correct)
      wrongStats.append("Number Incorrect: " + wrong)
      unansweredStats.append("Number Unanswered: " + unanswered)


      var playAgain = $("<button>");
        playAgain.addClass("btn btn-default btn-lg btn-block");
        playAgain.addClass("playAgainButton");
        playAgain.text("Click To Play Again.");
        playAgain.appendTo("#buttonArea");
      
      $(".playAgainButton").on("click", restart);

      function restart(){
          correct = 0;
          wrong = 0;
          unanswered = 0;
          $("#answerSpace").empty();
          $(".playAgainButton").hide();
          displayQuestion();
          displayChoices();
        };


    };

    });
