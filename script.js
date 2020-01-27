$(document).ready(function () {


    $("#remaining-time").hide();
    $("#start").on("click", quiz.startGame);
    $(document).on("click", ".option", quiz.guessChecker);

})

var quiz = {
    correct: 0,
    incorrect: 0,
    currentSet: 0,
    unanswered: 0,
    timer: 60,
    timerOn: false,
    timerId: "",
    questions: {
        q1: "Where can a variable defined within a function be found?",
        q2: "Which is the correct way to log Hello World! to the console?",
        q3: "Which built-in method returns the calling string value converted to lower case?",
    },
    answers: {
        q1: ["Local Scope", "Global Scope"],
        q2: ["log.Hello-World!", "console.log(Hello World!);", "console.log.Hello World!", "console.log(HelloWorld)"],
        q3: ["string.lowerCase", "value.lowerCase", "toLowerCase()", "changeCase()"],
    },
    corrects: {
        q1: "Local Scope",
        q2: "console.log(Hello World!);",
        q3: "toLowerCase()",
    },


    startGame: function () {
        quiz.currentSet = 0;
        quiz.correct = 0;
        quiz.incorrect = 0;
        quiz.unanswered = 0;
        clearInterval(quiz.timerId);

        $("#game").show();
        $("#results").html("");
        $("#timer").text(quiz.timer);
        $("#remaining-time").show();

        quiz.nextQuestion();

    },

    nextQuestion: function () {
        quiz.timer = 10;
        $("#timer").removeClass("last-seconds");
        $("#timer").text(quiz.timer);

        if (!quiz.timerOn) {
            quiz.timerId = setInterval(quiz.timerRunning, 1000);

        }
        var questionContent = Object.values(quiz.questions)[quiz.currentSet];
        $("#question").text(questionContent);

        var questionOptions = Object.values(quiz.answers)[quiz.currentSet];

        $.each(questionOptions, function (index, key) {
            $("#options").append($('<button class ="option btn btn-info btn-lg">' + key + '</button>'));

        })

    },
    timerRunning: function () {
        if (quiz.timer > -1 && quiz.currentSet < Object.keys(quiz.questions).length) {
            $('#timer').text(quiz.timer);
            quiz.timer--;
            if (quiz.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        }
        else if (quiz.timer === -1) {
            quiz.unanswered++;
            quiz.result = false;
            clearInterval(quiz.timerId);
            resultId = setTimeout(quiz.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(quiz.corrects)[quiz.currentSet] + '</h3>');
        }
        else if (quiz.currentSet === Object.keys(quiz.questions).length) {

            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + quiz.correct + '</p>' +
                    '<p>Incorrect: ' + quiz.incorrect + '</p>' +
                    '<p>Unaswered: ' + quiz.unanswered + '</p>' +
                    '<p>Please play again!</p>');

            $('#game').hide();

            $('#start').show();
        }

    },
    guessChecker: function () {

        var resultId;

        var currentAnswer = Object.values(quiz.corrects)[quiz.currentSet];

        if ($(this).text() === currentAnswer) {
            // turn button green for correct
            $(this).addClass('btn-success').removeClass('btn-info');

            quiz.correct++;
            clearInterval(quiz.timerId);
            resultId = setTimeout(quiz.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }

        else {

            $(this).addClass('btn-danger').removeClass('btn-info');

            quiz.incorrect++;
            clearInterval(quiz.timerId);
            resultId = setTimeout(quiz.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }

    },

    guessResult: function () {

        quiz.currentSet++;


        $('.option').remove();
        $('#results h3').remove();

        quiz.nextQuestion();

    }

}

