var colors = "8ecae6-219ebc-023047-ffb703-fb8500".split("-").map(a=>"#"+a)
var colors_r = "8ecae6-219ebc-023047-ffb703-fb8500".split("-").map(a=>"#"+a)
var clr,clr_r

var positionX =[]
var positionY =[]
var clrList =[]
var clr_r_List =[]
var sizeList =[]

var m_x,m_y
var song
var songIsplay=false //設定此變數為"假"，收到按下滑鼠把變數改為"真"，音樂播放
var amp
var vol=0
var music_btn,mouse_btn,Speech_btn
var musicIsplay=true
var mouseIsplay=true
var myRec = new p5.SpeechRec();
var result

function preload(){
  song = loadSound("Christmas Village 001.mp3");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)

  music_btn = createButton("播音樂")
  music_btn.position(10,10)
  music_btn.size(350, 100);
  music_btn.style('background-color', 'black');
  music_btn.style('font-size', '44px');
  music_btn.style('color', 'white');
  music_btn.mousePressed(music_btn_pressed)

  mouse_btn = createButton("暫停")
  mouse_btn.position(370,10)
  mouse_btn.size(350, 100);
  mouse_btn.style('background-color', 'black');
  mouse_btn.style('font-size', '44px');
  mouse_btn.style('color', 'white');
  mouse_btn.mousePressed(mouse_btn_pressed)

  Speech_btn = createButton("語音辨識(播音樂/暫停)")
  Speech_btn.position(740,10)
  Speech_btn.size(350, 100);
  Speech_btn.style('background-color', 'black');
  Speech_btn.style('font-size', '32px');
  Speech_btn.style('color', 'white');
  Speech_btn.mousePressed(Speech_btn_pressed)
    
  


}

function music_btn_pressed(){  
  song.stop()
  song.play()
  songIsplay = true
  musicIsplay = false
  amp=new p5.Amplitude()
  music_btn.style('background-color', '#00b4d8');
  mouse_btn.style('background-color', 'black');
}

function mouse_btn_pressed(){  
  song.pause()
  musicIsplay = true
  songIsplay = false
  music_btn.style('background-color', 'black');
  mouse_btn.style('background-color', '#00b4d8');

 
}

function Speech_btn_pressed(){ 
  music_btn.style('background-color', 'black');
  mouse_btn.style('background-color', 'black');
  Speech_btn.style('background-color', '#00b4d8');
  myRec.onResult = showResult;
  myRec.start();
}

function showResult()
	{
		if(myRec.resultValue==true) {
			// background(192, 255, 192);
			// text(myRec.resultString, width/2, height/2);
      push()
        translate(0,0)
        background(192, 255, 192);
        fill(255,0,0)
        textStyle("italic")
        text(myRec.resultString,1200,10);
        text(myRec.resultString,0, height/2);
      pop()
      result = myRec.resultString
      if(myRec.resultString==="播音樂")
      {
        music_btn_pressed()
      }
      if(myRec.resultString==="暫停")
      {
        song.pause()
        mosueIsplay = true
        songIsplay = false
        }
		}
	}







function draw() {  //一秒進到function執行60次
  background(255); 
	push()
    textSize(50)
    fill(255,0,0)  
    text(result,1100,100);   
  pop()

  if(songIsplay){
    vol = amp.getLevel()
    m_x =map(vol,0,1,0,width) 
    m_y= map(vol,0,1,0,height)
    
  }
  else
  if(mouseIsplay)
  {
    m_x = mouseX
    m_y= mouseY
  
  }
  
	
	
  for(var j=0;j<5;j++){
    positionX.push(random(width))
    positionY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionX[j],positionY[j]) //原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j])
    pop()
    }
  }



function drawFlower(clr,size=1){
  push()
  scale(size)
  fill(clr)   
   //身體
   beginShape()
   curveVertex(400/4+m_x/150,400/5+m_y/150)
   curveVertex(400/3.5+m_x/150,400/2.5+m_y/150)
   curveVertex(400/1.5+m_x/150,400/3+m_y/150)
   curveVertex(400/1.3+m_x/150,400/-5+m_y/150)
   curveVertex(400/1.5+m_x/150,400/-5+m_y/150)
   curveVertex(400/1.6+m_x/150,400/25+m_y/150)
   curveVertex(400/1.9+m_x/150,400/05+m_y/150)
   curveVertex(400/15+m_x/150,400/8+m_y/150)
 endShape(CLOSE)

 triangle(400/-1.8+m_x/80,400/-1.8+m_y/80,400/-9.8+m_x/80,400/-2.3+m_y/80,400/-2.2+m_x/80,400/-6+m_y/80);
 triangle(400/-2+m_x/80,400/-2+m_y/80,400/-10+m_x/80,400/-2.5+m_y/80,400/-2.4+m_x/80,400/-6.2+m_y/80);

 triangle(400/1.8+m_x/80,400/-1.8+m_y/80,400/9.8+m_x/80,400/-2.3+m_y/80,400/2.2+m_x/80,400/-6+m_y/80);
 triangle(400/2+m_x/80,400/-2+m_y/80,400/10+m_x/80,400/-2.5+m_y/80,400/2.4+m_x/80,400/-6.2+m_y/80);
 ellipse(0+m_x/80,0+m_y/80,400)  //臉


  //左眼
  fill(255)
  ellipse(-400/5+m_x/80,-400/5+m_y/80,400/4.5)
  fill(0)
  ellipse(-400/5+m_x/50,-400/5+m_y/50,400/6)
  fill(255)
  ellipse(-400/5+m_x/50,-400/5+m_y/50,400/25)
  noFill()
  //右眼
  fill(255)
  ellipse(400/5+m_x/80,-400/5+m_y/80,400/4.5)
  fill(0)
  ellipse(400/5+m_x/50,-400/5+m_y/50,400/6)
  fill(255)
  ellipse(400/5+m_x/50,-400/5+m_y/50,400/25)

  //嘴
  fill(255,0,0)
  arc(0+m_x/80,400/35+m_y/80,400/10,400/5+m_x/20,0,180)

  fill(clr)
  arc(-400/10+m_x/80,-400/180+m_y/80,400/5,400/5,0,90)
  arc(400/10+m_x/80,-400/180+m_y/80,400/5,400/5,90,180)
  ellipse(0+m_x/80,0+m_y/80,400/20) 


  arc(-400/2.7+m_x/80,-400/80+m_y/80,400/5,400/180,90,45)
  arc(-400/2.5+m_x/80,400/20+m_y/80,400/5,400/180,90,45)
  arc(-400/2.7+m_x/80,400/8+m_y/80,400/5,400/180,90,45)

  arc(400/2.7+m_x/80,-400/80+m_y/80,400/5,400/180,90,45)
  arc(400/2.5+m_x/80,400/20+m_y/80,400/5,400/180,90,45)
  arc(400/2.7+m_x/80,400/8+m_y/80,400/5,400/180,90,45)
  
  arc(-400/2+m_x/80,-400/2+m_y/50,400/5,400/3,-400/2,-400/2)


  noFill()
  pop()
  
  }
