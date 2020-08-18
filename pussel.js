//sätt size på spelet
var size = 4
var matrix = [size]
var solution = [size]

var count = 1
for (var i = 0; i < size; i++) {
    solution[i] = new Array(size)
    for (var j = 0; j < size; j++) {
        solution[i][j] = count
        count = count + 1
    }
}

//skickar parameter till css variabeln för antal kolumner i grid
getComputedStyle(document.documentElement).getPropertyValue('--columnsize');
document.documentElement.style.setProperty('--columnsize', size);


function gplanGone() {
    var myobj = document.getElementById("game");
    myobj.remove();
}


function game() {
    var game = document.createElement('div');
    game.id = 'game';
    var main = document.getElementById('main')
    main.appendChild(game)
}


function render() {
    var count = 1
    for (var i = 0; i < size; i++) {
        matrix[i] = new Array(size)
        for (var j = 0; j < size; j++) {
            matrix[i][j] = count
            count = count + 1
        }
    }

    //shufflar loss
    shuffle(matrix)

    //gör buttons och döper dom
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (matrix[i][j] != size * size) {
                var block = document.createElement('button')
                block.className = "buttons";
                block.id = '' + i + j
                block.onclick = clicked;

                //skickar till dokumentet
                block.innerHTML = matrix[i][j]
                var element = document.getElementById('game')
                element.appendChild(block)

                //gör den tomma rutan
            } else {
                var block = document.createElement('div')
                block.id = "space"
                var element = document.getElementById('game')
                element.appendChild(block)
            }
        }
    }
}


//randomiserar indexplatserna och sätter in indexvärdet på dessa 
function shuffle(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            //randomiserar indexplatser
            let i1 = Math.floor(Math.random() * (matrix.length));
            let j1 = Math.floor(Math.random() * (matrix.length));

            //sparar nuvarande ij värde
            let temp = matrix[i][j];

            //lägger in värdet från random index på ij platsen
            matrix[i][j] = matrix[i1][j1];

            //lägger in det ursprungliga ij värdet på randomplatsen. 
            matrix[i1][j1] = temp;
        }
    }
}


function clicked() {
    var y = parseInt(this.id[0])
    var x = parseInt(this.id[1])

    // Kontrollerar att indexet +/- 1 är inom matrisens ramar (inte out of bounds/undefined).
    // Kontrollerar ifall den tomma rutan (size*size) är inill någon av dom 4 riktingarna
    // och gör då en swap().

    if ((y + 1 <= size - 1) && (matrix[y + 1][x] == size * size)) {
        swap(y, x, y + 1, x)
        console.log('under')

    } else if ((y - 1 >= 0) && (matrix[y - 1][x] == size * size)) {
        swap(y, x, y - 1, x)
        console.log('ovanför')

    } else if ((x + 1 <= size - 1) && (matrix[y][x + 1] == size * size)) {
        swap(y, x, y, x + 1)
        console.log('till höger')

    } else if ((x - 1 >= 0) && (matrix[y][x - 1] == size * size)) {
        swap(y, x, y, x - 1)
        console.log('till vänster')
    }
}


function swap(index_A, index_B, index_C, index_D) {
    let temp = matrix[index_A][index_B]
    matrix[index_A][index_B] = matrix[index_C][index_D]
    matrix[index_C][index_D] = temp

    kill()
    updateRender(solution)
}


function kill() {
    var containern = document.getElementById("game")
    while (containern.firstChild) {
        containern.removeChild(containern.firstChild)
    }
}


function updateRender(x) {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (matrix[i][j] != size * size) {
                var block = document.createElement('button')
                block.id = '' + i + j
                block.className = "buttons";
                block.onclick = clicked

                block.innerHTML = matrix[i][j]
                var element = document.getElementById('game')
                element.appendChild(block)
            }
            else {
                var block = document.createElement('div')
                block.id = 'space'
                var element = document.getElementById('game')
                element.appendChild(block)
            }
        }
    }
    if (matrix != solution) {

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


//Skriv beskrivande kommentar över alla funktoner
//Gör funktion av populateMatrix
//Fundera över om alla variabelnamn är beskrivande (tänker mest på "modal" i solution-ifet)
//Göra size valbar med input..? Gick det?