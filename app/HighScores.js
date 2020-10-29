const init_HighScores = () => {
    let score_initial = [
        { name: "Dios", score: "100" }
    ];
    localStorage.highScores = localStorage.highScores || JSON.stringify(score_initial);
}

const saveScore = (score) => {

    let name = $("#player_name").val();
    let highScores = JSON.parse(localStorage.highScores);
    console.log(highScores);
    let new_score =
        { name: name, score: game.score };
    highScores.push(new_score);
    localStorage.highScores = JSON.stringify(highScores);
    animation_MainToMenu();
};

function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
            y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

//devuelve el listado de puntajes
const indexScore = () => {
    let highScores = JSON.parse(localStorage.highScores);
    let view = "";
    let max = 6;
    sortJSON(highScores, 'score', 'desc');
    
    highScores.forEach(element => {
        if(max>0){
        view += `
        <div class="lboard_item">
                <div class="lboard_item_name">

                       ${element.name || "empty"}
                   </div>
                   <div class="lboard_item_p">
                   ${element.score}
                    </div>
                </div>\n`;
                max--;
        }
    });
    return view;
};
