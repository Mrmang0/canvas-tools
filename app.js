 _.getCanvasById();
 _.getContext();
 _.setCanvasSize(1000, 1000);


 _.context.translate(0, 500);
 _.context.strokeStyle='white';
 



 let x, y;

 function draw(x, y) {

     _.beginEndPath((context) => {
        context.beginPath();
        
         context.moveTo(x, y);
         x = x + 2;
         y =  _.random(-20,20);
         context.lineTo(x, y);
         context.stroke();


     });

     requestAnimationFrame(() => {
         draw(x, y)
     })
 }

 draw(0, 0);