$(document).ready(function() {
  var questionNumberDisplay = $("#questionNumber"),
    scoreDisplay = $("#score"),
    atemptsDisplay = $("#atempts"),
    questionNumber = 0,
    score = 0,
    atempts = 3;

  var quiz = $("#quiz1");

  function render() {
    questionNumberDisplay.text(questionNumber + 1);
    scoreDisplay.text(score);
    atemptsDisplay.text(atempts);
    if (atempts > 0 && questions.length >= questionNumber + 1) {
      quiz.loadTemplate($("#quiz-template"), questions[questionNumber]);
    } else {
      $("#quiz_result").hide();
      quiz.loadTemplate($("#quiz-finish-template"), { score: score });
    }
  }

  function start() {
    quiz.off("click");
    $("#quiz_result").show();
    render();

    quiz.click(check => {
      var answer = check.target.id[1];
      if (answer == questions[questionNumber].correct) {
        score += 200;
      } else {
        if (answer !='u') {
          atempts = atempts - 1;  
        }
        else{
          check();
        }
        
      }

      questionNumber++;
      render();
    });
  }

  quiz.loadTemplate($("#quiz-begin-template"));
  quiz.click(start);
});
