var c;
var ctx;
var time;
var pos;
const SIZE = 720;
var x; // basically player x
var y; // basically player y
var theta; // math stuff idk
var fragments; // list of every fragment
var active; // number of active fragments
var tries; // allotted tries given to player
var delimeter; // leniency of the pointer being in range
var delta; // speed of pointer
var gameover = false;

// keyup maybe best to stop spam
$(document).on('keyup', '', function(e) { // keyup keypress
    ctx.clearRect(0, 0, SIZE, SIZE);
    if (e.keyCode == 32) { // i think space center i think
        if(tries <= 0) {
            console.log('gameover - FAIL');
            gameover = true;
            score = 0 + tries + active + delimeter + delta - (time / 100);
            var form = document.getElementById("score");
            form.value = score;
            alert("score: " + score);
        }
        console.log(pos);
        $(fragments).each(function (index) {
            var lower = (fragments[index].a) - delimeter;
            var upper = (fragments[index].a) + delimeter;
            if((theta >= (lower)) && (theta <= (upper))) {
                console.log('activate: ' + index);
                console.log("theta: " + theta);
                console.log('lower: ' + ((fragments[index].a) - delimeter));
                console.log('upper: ' + ((fragments[index].a) + delimeter));
                fragments[index].activate();
                delta+=delimeter*2; // speed increased when player hits fragment
            }
        })
        tries--;
    }
    ctx.beginPath();
    ctx.stroke();
})

// runs when the page is created
function onLoad() {
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    time = 0;
    pos = 0;
    x = 0;
    y = 0;
    theta = 0;
    active = 0;
    delta = 1;
    fragments = [
        new Fragment((SIZE/2) + 256 * Math.cos(0), (SIZE/2) + 256 * Math.sin(0), 0),
        new Fragment((SIZE/2) + 256 * Math.cos(1.5), (SIZE/2) + 256 * Math.sin(1.5), 1.5),
        new Fragment((SIZE/2) + 256 * Math.cos(3), (SIZE/2) + 256 * Math.sin(3), 3),
        new Fragment((SIZE/2) + 256 * Math.cos(4.5), (SIZE/2) + 256 * Math.sin(4.5), 4.5)
    ];
    // mayber change tries based on adding more
    tries = fragments.length; // sets tries player is given
    delimeter = 1 / fragments.length; // with 4 is 0.25
    ctx.beginPath();
    setInterval(update, 10); // timer
    ctx.stroke();
}

// function to update all attributes
function update() {
    ctx.clearRect(0, 0, SIZE, SIZE);
    if(!gameover) { // stops timer if game over
        time++;
        //console.log(time);
        pos+=delta;
    }
    
    if(pos >= 360)
        pos = 0;
    theta = (pos/180) * Math.PI;
    //console.log(theta);
    ctx.beginPath();
    active = 0;
    // add background
    img = new Image();
    img.src = 'img/fragments.png';
    ctx.drawImage(img, SIZE/7, SIZE/7, 512, 512); // total size of circle
    // add each fragment
    $(fragments).each(function (index) {
        ctx.drawImage(fragments[index].img, fragments[index].x-16, fragments[index].y-16, 32, 32);
        // check if fragment is activated
        if(fragments[index].activated)
            active++;
    })
    // check for WIN case
    if(active == fragments.length) { // if all of array + 1 for last
        ctx.fillText('gameover - WIN', 640, 672);

        gameover = true;
        score = 10 + tries + active + delimeter + delta - time;
        var form = document.getElementById("score");
        form.value = score;
        alert("score: " + score);
    }
    // draw core
    ctx.arc(SIZE/2, SIZE/2, 16, 0, 2 * Math.PI);
    // think becuase total size equals 2 and 180 is half or something not sure geomitry
    // the pos for some reason
    // draw pointer (PLAYER)
    x = (SIZE/2) + 256 * Math.cos(theta);
    y = (SIZE/2) + 256 * Math.sin(theta);
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    // draw text
    ctx.fillText("Tries Left: " + tries, 640, 640);
    ctx.fillText("Delimeter: " + delimeter, 640, 656);
    ctx.fillText("Theta: " + theta, 640, 688); // with pi
    ctx.fillText("Delta: " + delta, 640, 704); // with pi
    // commit all to be drawn
    ctx.stroke();
}

// class for each piece
class Fragment {
    constructor(x, y, a) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.activated = false;
        this.img = new Image();
        this.img.src = 'img/fragment_off.png';
    }

    // activates the fragment and changes the art
    activate() {
        this.activated = !this.activated;
        if(this.activated)
            this.img.src = 'img/fragment_on.png'
        else
            this.img.src = 'img/fragment_off.png'
        console.log(this.activated);
    }
}