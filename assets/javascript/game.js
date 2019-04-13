$(document).ready(function () {
   // first I am going to make my questions, much like the word guess game, where one var will have multiple subsets of properties
   var questions = [
         {
            question: "What was the name of Metallica's first album?", 
            options: ["Kill em All", "Ride the Lightning", "Master of Puppets", "Garage Days"],
            answer: 0, // The answer references the options array, and the right choice is referenced by the array number //
            image: "assets/images/killem.jpg"   
         },
               {
                  question: "What band was Dave Mustaine in before Megadeth?",
                  options: ["Montly Crue", "Twisted Sister", "Iron Maiden", "Metallica"],
                  answer: 3,
                  image: "assets/images/Metallica-Mustaine.jpg"
               }, 
                        {
                        question: "Who is the lead singer for the band Slipknot?",
                        options: ["Brent Hinds", "James Hetfield", "Corey Taylor", "James Maynard Keenan"],
                        answer: 2,
                        image: "assets/images/corey.jpg"
                     }, 
                           {
                              question: "Who is the lead guitarist for the band DragonForce?",
                              options: ["Kirk Hammet", "Herman Li", "Adam Jones", "Slash"],
                              answer: 1,
                              image: "assets/images/HermanLi.jpg"
                           }, 
                                 {
                                    question: "What is the subtitle for Periphery's second album?",
                                    options: ["This time... It's Personal", "Shrek 2", "Hail Stan", "Player Select"],
                                    answer: 0,
                                    image: "assets/images/periphery.jpg"

                                 }, 
                                             {
                                                question: "What is the name of Mastodon's fourth album?",
                                                options: ["Remission", "Leviathan", "Blood Mountain", "Crack the Skye"],
                                                answer: 3,
                                                image: "assets/images/crack.jpg"
                                             }];
      // These are the global varibles that we will use throughout the page // 

      // This is what we will use to track the user's guess so that we can tell if they are right or wrong using an if funciton //
      var userGuess ="";         
      // This stores the user's correct guesses for the end of the game results //                             
      var correctGuesses = 0;
      // This stores the user's incorrect guesses for the end of the game results //
      var incorrectGuesses = 0;
      // This stores the user's unanswered questions
      var unanswered = 0;
      // This is the clock that will be edited later, the user has 10 seconds to answer each question //
      var clock = 10;
      // This is what we use in functions to set the interval of time for our clock //
      var clockControl;
      // This sets the clock to be stopped till we manipulate it //
      var clockRun = false;
      // This allows us to eventually stop the test, and end it //
      var questionsAmount = questions.length;
      // This selects a question //
      var select;
      // This randomizes the array of questions
      var random;
      // This is where we will push the random selection //
      var pusher = [];
      // This is where the questions are stored. The questions are properties, and not individual varibles, so we need a way to move them dynamically //
      var contain = [];
   // The restart button is hidden till it is needed, and does about the same thing that the start button does //
         $("#restart").hide();
   // This is the function of the start button //
         $("#start").on("click", function () {
         $("#start").hide();
         displayQ();
         runClock();
         for(var i = 0; i < questions.length; i++) {
      contain.push(questions[i]);
   }
      })
   // clock begin //
      function runClock(){
      if (!clockRun) {
      clockControl = setInterval(decrement, 800); // I set the interval to be a little less than a second because there is a little bit of delay when the clock appears //
      clockRun = true;
      }
   }
   // clock decrease //
      function decrement() {
      $("#timeleft").html("<h3>Time remaining: " + clock + "</h3>");
      clock --;
      if (clock === 0) {
         unanswered++;
         stop();
         $("#answer").html("<p>Time is up! The correct answer is: " + select.options[select.answer] + "</p>");
         hiddenimg();
      }	
   }
   // This function will stop the clock when we need it to //
      function stop() {
      clockRun = false;
      clearInterval(clockControl);
   }
         function displayQ() {
         random = Math.floor(Math.random()*questions.length);
         select = questions[random];
         $("#question").html("<h2>" + select.question + "</h2>");
         for(var i = 0; i < select.options.length; i++) {
               var userChoice = $("<div>");
                     userChoice.addClass("chosen");
                        userChoice.html(select.options[i]);
                           userChoice.attr("data-guessPos", i);
                              $("#answer").append(userChoice);
   }
 // this is our function for dealing with the result of a question before the test ends //
   $(".chosen").on("click", function () {
   userGuess = parseInt($(this).attr("data-guessPos"));
   if (userGuess === select.answer) {
   stop();
   correctGuesses++;
      userGuess="";
      $("#answer").html("<p>Correct!</p>");
      hiddenimg();
         } else {
         stop();
         incorrectGuesses++;
         userGuess="";
         $("#answer").html("<p>Wrong! The correct answer is: " + select.options[select.answer] + "</p>");
         hiddenimg();
      }
   })
   }
   // This is the function for revealing the image after the user has guessed //
       function hiddenimg () {
      $("#answer").append("<img src=" + select.image + ">");
      pusher.push(select);
      questions.splice(random,1);
      
      // This resets the clock upon answering //
      var hidden = setTimeout(function() {
         $("#answer").empty();
         clock= 10;
         // This is the results screen, it reveals the restart button //
      if ((incorrectGuesses + correctGuesses + unanswered) === questionsAmount) {
          $("#question").empty();
                $("#question").html("<h3>Game Over!  Here's how you did: </h3>");
                     $("#answer").append("<h4> Correct: " + correctGuesses + "</h4>" );
                         $("#answer").append("<h4> Incorrect: " + incorrectGuesses + "</h4>" );
                              $("#answer").append("<h4> Unanswered: " + unanswered + "</h4>" );
                                  $("#restart").show();
         correctGuesses = 0;
         incorrectGuesses = 0;
         unanswered = 0;
      } else {
         runClock();
         displayQ();
      }
      }, 2000); // This is how long the page will wait before moving to the next question, again, fairly short due to timer delays //
   }
   // This is the restart button functions, which is an edited version of the start button //
   $("#restart").on("click", function() {
      $("#restart").hide();
            $("#answer").empty();
               $("#question").empty();
                  for(var i = 0; i < contain.length; i++) {
                      questions.push(contain[i]);
                        }
                                                   runClock();
                                                   displayQ();
   })
   })
