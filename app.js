_.getCanvasById();
_.getContext();
_.setCanvasSize(1000, 1000);
_.context.translate(500, 500);
_.context.strokeStyle = "white";

let x, y;

function draw(x, y,angle = 0) {
  let newP
  _.beginEndPath(context => {
    context.beginPath();

    context.moveTo(x, y);
    for (let i = 0; i < 10 ; i++) {
        newP = _.rotateAroundCenter({ x: x + 2, y: _.random(-20, 20) },{x,y},angle);        
    }
    context.lineTo(newP.x, newP.y);
    context.stroke();
  });

  if(x> 1000)
    newP = {x:0,y:y+1}

  requestAnimationFrame(() => {
    draw(100,newP.y,angle+1);
  });
}

draw(0, 0);


function paint(x,y){
    console.log(x,y);
}

function incr(x,y){
    return [++x,y];
}

function stpc(x,y){
    return x>=13;
}

const args = [10,10]

const func = new IterableFunction(paint,incr,stpc,...args);

const manager = new LoopManager(func);

manager.start();
