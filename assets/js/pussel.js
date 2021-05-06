
var userInput
var matrix
var solution


function render() {

    userInput = parseInt(document.getElementById("input").value);

    document.documentElement.style.setProperty('--columnsize', userInput);

    matrix = populateMatrix()
    solution = populateMatrix()
    
    shuffle(matrix);

    for (var i = 0; i < userInput; i++) { 
        for (var j = 0; j < userInput; j++) {
            if (matrix[i][j] != userInput * userInput) {

                var ruta = document.createElement('div')
                ruta.className = "blocks";

                ruta.style.top = 100 * i + "px";
                ruta.style.left = 100 * j + "px";
                ruta.id = '' + i + j;

                console.log(i);


                ruta.onclick = clicked;

                ruta.innerHTML = matrix[i][j];
                var element = document.getElementById('gameplan');
                element.appendChild(ruta);
            }
        }
    }
}


function populateMatrix() {
    
    var localMatrix = [userInput]
    var count = 1
    for (var i = 0; i < userInput; i++) {
        localMatrix[i] = new Array(userInput)
        for (var j = 0; j < userInput; j++) {
            localMatrix[i][j] = count
            count++
        }
    }
    return localMatrix;
}


function shuffleBoard() {



    kill()
    render()
}

function kill() {
    var containern = document.getElementById("gameplan")
    while (containern.firstChild) {
        containern.removeChild(containern.firstChild)
    }
}


function shuffle(matrix) {

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {


            var shuffle_i = Math.floor(Math.random() * (matrix.length));
            var shuffle_j = Math.floor(Math.random() * (matrix.length));

            var temp = matrix[i][j];


            matrix[i][j] = matrix[shuffle_i][shuffle_j];

            matrix[shuffle_i][shuffle_j] = temp;
        }
    }
}

window.onresize

function clicked() {


    var hojdled = parseInt(this.id[0]);
    var sidled = parseInt(this.id[1]);

    if ((hojdled + 1 <= userInput - 1) && (matrix[hojdled + 1][sidled]) == userInput * userInput) {
        swap(hojdled, sidled, hojdled + 1, sidled);

        this.style.top = (hojdled + 1) * 100 + "px";
        this.id = "" + (hojdled + 1) + sidled;
        console.log(this.id);
    }

    else if ((hojdled - 1 >= 0) && (matrix[hojdled - 1][sidled]) == userInput * userInput) {
        swap(hojdled, sidled, hojdled - 1, sidled);
        this.style.top = (hojdled - 1) * 100 + "px";
        this.id = "" + (hojdled - 1) + sidled;
        console.log(this.id);
    }

    else if ((sidled + 1 <= userInput - 1) && (matrix[hojdled][sidled + 1]) == userInput * userInput) {
        swap(hojdled, sidled, hojdled, sidled + 1);
        this.style.left = (sidled + 1) * 100 + "px";
        this.id = "" + hojdled + (sidled + 1);
        console.log(this.id);
    }

    else if ((sidled - 1 >= 0) && (matrix[hojdled][sidled - 1]) == userInput * userInput) {
        swap(hojdled, sidled, hojdled, sidled - 1);
        this.style.left = (sidled - 1) * 100 + "px";
        this.id = "" + hojdled + (sidled - 1);
        console.log(this.id);
    }
    checkResult();
}


function swap(current_i, current_j, empty_i, empty_j) {
    var temp = matrix[current_i][current_j];
    matrix[current_i][current_j] = matrix[empty_i][empty_j];
    matrix[empty_i][empty_j] = temp;
}


function isEqual(matA, matB) {
    for (var i = 0; i < userInput; i++) {
        for (var j = 0; j < userInput; j++) {
            if (matA[i][j] != matB[i][j]) {
                return false;
            }
        }
    }
return true;
}



function checkResult() {

    if (isEqual(matrix, solution)) {

        var modal = document.getElementById("gameComplete");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}
