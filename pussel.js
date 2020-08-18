
var size
var matrix
var solution

/*
//skickar parameter till css variabeln för antal kolumner i grid
getComputedStyle(document.documentElement).getPropertyValue('--columnsize');
document.documentElement.style.setProperty('--columnsize', size);
*/


function populateMatrix() {
    let localMatrix = [size]
    let count = 1
    for (var i = 0; i < size; i++) {
        localMatrix[i] = new Array(size)
        for (var j = 0; j < size; j++) {
            localMatrix[i][j] = count
            count++
        }
    }
    return localMatrix;
}


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

function getValue() {
    let input = document.getElementById("input").value;
    let int = parseInt(input);
    number = int;
    console.log(int)
    return number;
}

function render() {
    size = getValue();
    matrix = [size]

    //skickar parameter till css variabeln för antal kolumner i grid
    getComputedStyle(document.documentElement).getPropertyValue('--columnsize');
    document.documentElement.style.setProperty('--columnsize', size);


    solution = populateMatrix()
    matrix = populateMatrix()

    //shufflar loss
    shuffle(matrix)
    console.log(matrix)
    //gör buttons och döper dom
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (matrix[i][j] != size * size) {

                /*
                getComputedStyle(document.documentElement).getPropertyValue('--marginal-top');
                document.documentElement.style.setProperty('--marginal-top', 100 * i);

                getComputedStyle(document.documentElement).getPropertyValue('--marginal-vanster');
                document.documentElement.style.setProperty('--marginal-vanster', 100 * j);
                */
                var ruta = document.createElement('div')
                ruta.className = "rutor";
                ruta.style.left = 100 * j + "px"
                ruta.style.top = 100 * i + "px"
                ruta.id = '' + i + j
                ruta.onclick = clicked;

                //skickar till dokumentet
                ruta.innerHTML = matrix[i][j]
                var element = document.getElementById('spelplan')
                element.appendChild(ruta)
            }
            else { //gör den tomma rutan
                var block = document.createElement('div')
                block.id = "space"
                var element = document.getElementById('spelplan')
                element.appendChild(block)
            }
        }
    }
}

function render2() {
    size = getValue();
    matrix = [size]


    //skickar parameter till css variabeln för antal kolumner i grid
    getComputedStyle(document.documentElement).getPropertyValue('--columnsize');
    document.documentElement.style.setProperty('--columnsize', size);





    solution = populateMatrix()
    matrix = populateMatrix()

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
            }
            else { //gör den tomma rutan
                var block = document.createElement('div')
                block.id = "space"
                var element = document.getElementById('game')
                element.appendChild(block)
            }
        }
    }
    var ruta = document.createElement('div');
    ruta.className = "rutor"
    ruta.id = "ruta1"
    console.log(ruta)
    var spel = document.getElementById("spelplan");
    console.log(spel)
    spel.appendChild(ruta)
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

    let y = parseInt(this.id[0])
    let x = parseInt(this.id[1])

    // Kontrollerar att indexet +/- 1 är inom matrisens ramar (inte out of bounds/undefined).
    // Kontrollerar ifall den tomma rutan (size*size) är inill någon av dom 4 riktingarna
    // och gör då en swap().

    if ((y + 1 <= size - 1) && (matrix[y + 1][x] == size * size)) {
        swap(y, x, y + 1, x)

    } else if ((y - 1 >= 0) && (matrix[y - 1][x] == size * size)) {
        swap(y, x, y - 1, x)

    } else if ((x + 1 <= size - 1) && (matrix[y][x + 1] == size * size)) {
        swap(y, x, y, x + 1)

    } else if ((x - 1 >= 0) && (matrix[y][x - 1] == size * size)) {
        swap(y, x, y, x - 1)
    }
}


function swap(index_A, index_B, index_C, index_D) {
    let temp = matrix[index_A][index_B]
    matrix[index_A][index_B] = matrix[index_C][index_D]
    matrix[index_C][index_D] = temp


    updateRender()
}


function kill() {
    var containern = document.getElementById("game")
    while (containern.firstChild) {
        containern.removeChild(containern.firstChild)
    }
}


function isEqual(matA, matB) {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (matA[i][j] != matB[i][j]) {
                return false
            }
        }
    }
    return true
}

function updateRender() {

    /*
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
    */
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
