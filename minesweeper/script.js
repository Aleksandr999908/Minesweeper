const container = document.createElement("canvas");
container.id = "canvas";
document.body.appendChild(container);

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let countContainer = 10;
let sizeContainer = 40;
let x = 0.1;
let game = false;
let blocks = Array();

container.width = countContainer * sizeContainer;
container.height = countContainer * sizeContainer;

function room(i, j) {
    if(i >= 0 && i <= countContainer - 1 && j >= 0 && j < countContainer - 1){
       if(blocks[i][j].number != 9){
           blocks[i][j].number++;
       }
    }
}


function start(sh, sw) {
    blocks = Array();
    for(let i = 0; i < countContainer; i++) {
        let wline = Array();
        for(let j = 0; j < countContainer; j++){
            if(i == sh && j == sw){
               wline.push({number:0, show:0});
               continue;
            }
            if(Math.random() < x){
              wline.push({number: 9, show: 0});
            } else {
                wline.push({number:0, show: 0});
            }
        }
        blocks.push(wline);
    }
    for(let i = 0; i < countContainer; i++){
       for(let j = 0; j < countContainer; j++){
           if(blocks[i][j].number == 9){
                 room(i,j - 1);
                 room(i,j + 1);
                 room(i - 1,j);
                 room(i + 1,j);
                 room(i - 1,j - 1);
                 room(i - 1,j + 1);
                 room(i + 1,j - 1);
                 room(i + 1,j + 1);
           }
       }
    }
    game = true;
}

function back() {
    ctx.fillStyle = "#ddd";
    ctx.fillRect(0,0,container.width, container.height);

    for(let i = 0; i < blocks.length; i++){
        for(let j = 0; j < blocks[i].length; j++){
            if(blocks[i][j].show){
               if(blocks[i][j].number == 9){
                  ctx.beginPath();
                  ctx.fillStyle = "#f00";
                  ctx.arc(j*sizeContainer+sizeContainer/2,i*sizeContainer+sizeContainer/2,sizeContainer/3,0,2*Math.PI,true);
                  ctx.fill();
                  continue;
               }
               ctx.fillStyle = "#F07427";
               ctx.fillRect(j*sizeContainer,i*sizeContainer,sizeContainer,sizeContainer);

               if(blocks[i][j].number){
                ctx.font = "32px serf";
                ctx.fillStyle = "#ddd";
                ctx.fillText(blocks[i][j].number, j*sizeContainer + 10, (i + 1)*sizeContainer - 10);

               }
            }
        }
    }
    for(let i = 0; i < countContainer + 1; i++){
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(0,i * sizeContainer);
    ctx.lineTo(container.width,i * sizeContainer);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i * sizeContainer,0);
    ctx.lineTo(i * sizeContainer,container.height);
    ctx.stroke();
    }
}
setInterval(back,25);

container.addEventListener('mousedown', function(event){
   let i = Math.floor((event.clientY/sizeContainer));
   let j = Math.floor((event.clientX/sizeContainer));

   if(!game){
      start(i,j);
   }

   if(blocks[i][j].number == 9){
      console.log('lose');
      game = false;
   }

   showBlock(i, j);
});

function showBlock(i, j) {
   blocks[i][j].show = 1;
   if(blocks[i][j].number != 0){
       return;
   }
   zero(i, j - 1);
   zero(i, j + 1);
   zero(i - 1, j);
   zero(i + 1, j);
}

function zero(i, j){
    if(i >= 0 && i <= countContainer - 1 && j >= 0 && j < countContainer - 1){
        if(!blocks[i][j].show){
             showBlock(i, j);
        }

    }
}