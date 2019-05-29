let questions = [
    "What is the motto of House Stark of Winterfell?",
    "What is the native language of the Targaryen family?",
    "Who was the prince that conquered The Seven Kingdoms of Westeros?",
    "What is the name of Melisandre's God?",
    "What is the capital city of The Seven Kingdoms of Westeros?"
];

let answers = [
    ["We Do Not Sow", "Winter Is Coming", "Fire And Blood"],
    ["Valyrian", "Westerosi", "Dothraki"],
    ["Orys Baratheon", "Oberyn Martell", "Aegon Targaryen"],
    ["The Maiden", "R'hallor", "Drowned God"],
    ["Pentos", "High Garden", "King's Landing"]
];

let correct_answers = [
    1,
    0,
    2,
    1,
    2
];

let results = [0,0,0];
let correct_answer_count = 0;
let incorrect_answer_count = 0;
let unanswered_count = 0;

$(document).ready(function(){

    $("#start_game").click(function(){
      $("#start_game").hide();
      $("#question_div").show();
      start_timer();
      displayQuestions();
    });

    function start_timer(){
        var seconds_left = 20;
        document.getElementById('timer').innerHTML = seconds_left;
        var interval = setInterval(function() {
        document.getElementById('timer').innerHTML = --seconds_left;
        if (seconds_left <= 0)
        {
            calculateResults();
            $("#question_div").children().hide(); 
            $("#question_div").hide();
            $("#result_div").show();
            displayResults();
            clearInterval(interval);
        }
        }, 1000);
    }

    function displayQuestions(){
        for(let i = 0; i < questions.length; i++){
            $('#question_div').append('<div class="questions" id=' + i + '>' + questions[i] + '</div>');
            $('#'+i).append('<div id=answers_' + i + '></div>');
            for(let j = 0; j < answers[i].length; j++){
                $('#answers_'+i).append("<input type='radio' name='answer" + i + "'   value='" + answers[i][j] + "'> " + answers[i][j] + "<br></input>  ");
            }
        }
    }

    function calculateResults(){
        for(let i = 0; i < questions.length; i++){
            let current_answer = $("input:radio[name=answer" + i + "]:checked").val();
            if (current_answer == null || current_answer == ""){
                unanswered_count = unanswered_count + 1; 
            }
            if (current_answer == answers[i][correct_answers[i]]){
                correct_answers = correct_answers + 1;
            }
        }
    }

    function displayResults(){
        incorrect_answer_count = (questions.length - correct_answer_count);
        $('#result_div').append("<div id='correct_answer_count'>Correct Answers: " + correct_answer_count + "<div>");
        $('#result_div').append("<div id='incorrect_answer_count'>Incorrect Answers: " + incorrect_answer_count + "<div>");
        $('#result_div').append("<div id='unanswered_answer_count'>Unanswered Questions: " + unanswered_count + "<div>");
    }

});