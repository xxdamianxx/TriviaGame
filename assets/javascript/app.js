// Trivia Question
let questions = [
    // Question 1
    "What is the motto of House Stark of Winterfell?",
    // Question 2
    "What is the native language of the Targaryen family?",
    // Question 3
    "Who was the prince that conquered The Seven Kingdoms of Westeros?",
    // Question 4
    "What is the name of Melisandre's God?",
    // Question 5
    "What is the capital city of The Seven Kingdoms of Westeros?",
    // Question 6
    "Who gave Daenerys Targaryen three dragon eggs on her wedding day?",
    // Question 7
    "Which city in Slaver's Bay holds the Pyramid of the Harpy?",
    // Question 8
    "What is the name of the brotherhood that guards the Northern Wall?",
    // Question 9
    "What mineral is useful for slaying Wight Walkers?",
    // Question 10
    "Which is Daenerys Targaryen's biggest dragon?"
];

// Possible Answers
let answers = [
    // Question 1
    ["We Do Not Sow", "Winter Is Coming", "Fire And Blood"],
    // Question 2
    ["Valyrian", "Westerosi", "Dothraki"],
    // Question 3
    ["Orys Baratheon", "Oberyn Martell", "Aegon Targaryen"],
    // Question 4
    ["The Maiden", "R'hallor", "Drowned God"],
    // Question 5
    ["Pentos", "High Garden", "King's Landing"],
    // Question 6
    ["Illyrio Mopatis", "Khal Drogo", "Jorah Mormont"],
    // Question 7
    ["Astapor", "Yunkai", "Meereen"],
    // Question 8
    ["The Night's Watch", "The Second Sons", "The Golden Company"],
    // Question 9
    ["Obsidian", "Sulfur", "Graphite"],
    // Question 10
    ["Rhaegal", "Drogon", "Viserion"]
];

// Index in 'answers' array with the correct answer
let correct_answers = [
    1, // Question 1
    0, // Question 2
    2, // Question 3
    1, // Question 4
    2, // Question 5
    0, // Question 6
    2, // Question 7
    0, // Question 8
    0, // Question 9
    1, // Question 10
];

// All variables initialized to zero
let results = [0,0,0];
let correct_answer_count = 0;
let incorrect_answer_count = 0;
let unanswered_count = 0;

$(document).ready(function(){

    // [Start] Button
    $("#start_game").click(function(){
      $("#start_game").hide();
      $("#question_div").show();
      start_timer();
      displayQuestions();
    });

    // [Submit] Button
    $("#end_game").click(function(){
        $("#question_div").hide();
        $("#result_div").show();
        calculateResults();
        displayResults();
        clearInterval(interval);
      });

    // Timer starts at 120 seconds
    function start_timer(){
        var seconds_left = 120;
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

    // Displays the questions in 'questions' array
    function displayQuestions(){
        for(let i = 0; i < questions.length; i++){
            $('#question_div').append('<div class="questions" id=' + i + '>' + questions[i] + '</div>');
            $('#'+i).append('<div id=answers_' + i + '></div>');
            for(let j = 0; j < answers[i].length; j++){
                let sanitized_value = answers[i][j].replace(/['"]+/g, '');
                $('#answers_'+i).append("<input type='radio' name='answer" + i + "'   value='" + sanitized_value + "'> " + answers[i][j] + "<br></input>  ");
            }
        }
    }

    // Calculates the results of the user's answers
    function calculateResults(){
        for(let i = 0; i < questions.length; i++){
            let current_answer = $("input:radio[name=answer" + i + "]:checked").val();
            let correct_answer = answers[i][correct_answers[i]];
            correct_answer = correct_answer.replace(/['"]+/g, '');
            if (current_answer == null || current_answer == ""){
                unanswered_count = unanswered_count + 1;
            }
            if (current_answer == correct_answer){
                correct_answer_count = correct_answer_count + 1;
            }
        }
    }

    // Displays the results of the user's answers
    function displayResults(){
        incorrect_answer_count = (questions.length - correct_answer_count);
        $('#result_div').append("<div id='correct_answer_count'>Correct Answers: " + correct_answer_count + "<div>");
        $('#result_div').append("<div id='incorrect_answer_count'>Incorrect Answers: " + incorrect_answer_count + "<div>");
        $('#result_div').append("<div id='unanswered_answer_count'>Unanswered Questions: " + unanswered_count + "<div>");
    }

});