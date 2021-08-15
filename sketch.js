let board = [
  ['','',''],
  ['','',''],
  ['','',''],
];

let players=['X','O'];
let currentplayer;
let available = [];

function setup(){
  createCanvas(500,500);
  frameRate(2);
  currentplayer=floor(random(players.length));
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      available.push([i,j]);
    }
  }
}

function equals3(a,b,c){
  return (a==b&&b==c&&a!='')
}

function checkwinner()
{
  let winner=null;
  for(let i=0;i<3;i++){
    if(equals3(board[i][0],board[i][1],board[i][2]))
    winner=board[i][0];
  }
  for(let i=0;i<3;i++){
    if(equals3(board[0][i],board[1][i],board[2][i]))
    winner=board[0][i];
  }
  if(equals3(board[0][0],board[1][1],board[2][2]))
  winner=board[0][0];
  if(equals3(board[0][2],board[1][1],board[2][0]))
  winner=board[0][2];
  if(winner==null&&available.length==0)
  return 'TIE';
  else
  return winner;
}
function nextturn(){
  let index=floor(random(available.length));
  let spot = available.splice(index,1)[0]; 
  let i=spot[0];
  let j=spot[1];
  board[i][j]=players[currentplayer];
  currentplayer=(currentplayer+1)%players.length;
  
}

function draw(){
  background(255);
  let w=width/3;
  let h=height/3;

  line(w,0,w,height);
  line(w*2,0,w*2,height);
  line(0,h,width,h);
  line(0,2*h,width,2*h);
  strokeWeight(4);
  for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        let x= w*j+ w/2;
        let y= h*i +h/2;
        let spot =board[i][j];
        textSize(32);
        if(spot==players[1]){
          noFill;
          ellipse(x,y,w/2);
        }else if(spot==players[0]){
          let xr=w/4;
          line(x-xr,y-xr,x+xr,y+xr);
          line(x-xr,y+xr,x+xr,y-xr);
        }
          
      }
  } 
  let result=checkwinner();
  if(result!=null){
  noLoop();
  
  createP("Winner: "+result).style('color','#FF').style('font-size','40pt');
  }else{
    nextturn();
  }
}