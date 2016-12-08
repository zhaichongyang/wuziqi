$(function(){
	var c=document.getElementById("canvas");
	var ctx=c.getContext('2d');
	var $audio=$("#audio");
	var audio=$("#audio").get(0);
	
	var sep=40;
	var sr=5;
	var br=40;
  var time=[10,9,8,7,6,5,4,3,2,1,0];
  var time1=[10,9,8,7,6,5,4,3,2,1,0];
  var qizi={};
  var info=$('.info');
  var AI=false;
  var gameState='pause';
  kongbai={};
 
	//画棋盘
	function huan(x){
      return (x+0.5)*sep+0.5;
	}
	function qipan(){
 ctx.save();
    ctx.fillStyle='#BC7905';
    ctx.fillRect(0,0,600,600);
    ctx.restore();

    ctx.save();
    ctx.fillStyle='#FCC621';
    ctx.fillRect(huan(0),huan(0),560.5,560.5);
    ctx.restore();

		ctx.save();
    ctx.beginPath();
    for(var i=0;i<15;i++){
    	ctx.moveTo(huan(0),huan(i));
      ctx.lineTo(huan(14),huan(i));
      ctx.moveTo(huan(i),huan(0));
      ctx.lineTo(huan(i),huan(14));
    }
    ctx.stroke();
    ctx.closePath();
		ctx.restore();

    for(var i=0;i<15;i++){
      for(var j=0;j<15;j++){
        kongbai[m(i,j)]=true;
      }
    }
	}
	qipan();

  	//画小圆
  	function scil(x,y){
  		ctx.save();
      ctx.beginPath();
      ctx.arc(huan(x),huan(y),sr,0,Math.PI*2);
      ctx.fill();
      ctx.closePath();
  		ctx.restore();
  	}
  	scil(7,7);
  	scil(3,3);
  	scil(3,11);
  	scil(11,3);
  	scil(11,11);

   //画表盘

//		function biaopan(cp){
//			cp.save()
//			cp.strokeStyle="red"
//			cp.beginPath()
//			cp.translate(100,100);
//			cp.arc(0, 0, 2, 0, Math.PI * 2)
//			cp.moveTo(0, 0)
//			cp.lineTo(0, 30)
//			cp.moveTo(0, 0)
//			cp.lineTo(0, -60)
//			cp.closePath()
//			cp.stroke()
//			cp.restore()
//			
//		}
	 //黑白落子的时间
//  var blackT=document.getElementById("canvas1");
//  var ctx1=blackT.getContext('2d');
//  var whiteT=document.getElementById("canvas2");
//  var ctx2=whiteT.getContext('2d');
//  biaopan(ctx1);
//  biaopan(ctx2);
//  function pan(ctx1,qiming){	
//
//		  ctx1.save();
//    ctx1.beginPath();
//    ctx1.translate(100,100);
//    ctx1.rotate(Math.PI/180*de*6);
//			ctx1.arc(0, 0, 2, 0, Math.PI * 2)
//			ctx1.moveTo(0, 0)
//			ctx1.lineTo(0, 30)
//			ctx1.moveTo(0, 0)
//			ctx1.lineTo(0, -60)
//	    ctx1.closePath();
//	    ctx1.stroke();
//	    ctx1.restore();
//  }
//  var de=0;//黑棋时间小点
//  var deg=0;//白棋时间小点
    //黑棋时间

//白棋时间
//  function render1(cp,ming,t){
//  	cp.translate(100,100);
//	    pan(cp,ming);
//		
//	    cp.save();
//    	cp.beginPath();
//  
//    	cp.rotate(Math.PI/180*deg*6);
//    	cp.clearRect(0,0,200,200)
//		cp.arc(0, 0, 2, 0, Math.PI * 2)
//		cp.moveTo(0, 0)
//		cp.lineTo(0, 30)
//		cp.moveTo(0, 0)
//		cp.lineTo(0, -60)
//	    cp.fill();
//	    cp.closePath();
//		cp.restore();
//	
//		cp.save();
//	    cp.font = "80px serif";
//	    cp.fillStyle="#fff";
//	    cp.textAlign="center";
//	    cp.textBaseline = "middle";
////    cp.fillText(time[Math.floor(deg/33)],100,100);
//    cp.restore();
//	    deg+=1;
//	     if(deg===60){
//	     	alert("时间到，黑棋胜，结束游戏");
//	     	clearInterval(t);
//	     }
//
//     audio.play();
//
//    
//  }
    var bt=setInterval(function(){
    	render("黑棋",bt);
     
    },100);
    var wt=setInterval(function(){
    	render1("白棋",wt);
      
    },100);


    clearInterval(bt);
    clearInterval(wt);
    
       var qizi=[];
    //画棋子
    function luozi(x,y,r,color){
       ctx.save();
       ctx.translate(huan(x),huan(y));
       ctx.beginPath();
       ctx.arc(0,0,r,0,Math.PI*2);
       var g=ctx.createRadialGradient(-4,-9,0,0,0,18);
       if(color==='black'){
       	g.addColorStop(0.1,"#888");
       	g.addColorStop(0.5,"black");
       	g.addColorStop(1,"black");
       	ctx.fillStyle=g;
       }else{
       	g.addColorStop(0.1,"#fff");
       	g.addColorStop(0.5,"#fff");
       	g.addColorStop(1,"#ccc");
       	ctx.fillStyle=g;
       }
       qizi[x+"_"+y]=color;
       ctx.fill();
       ctx.closePath();
       ctx.restore();
       audio.play();
       gameState='play';
       delete kongbai[m(x,y)];
       // qizi.push({x:x,y:y,color:color});
       // console.table(qizi);
    }
    
    //判断是否已有某个棋子
    function you(x,y){
       var kai=false;
       $.each(qizi,function(i,v){
           if(qizi[i].x==x&&qizi[i].y==y){
           	kai=true;
           }
       });
       return kai;
           // console.log(qizi[i].x)
    }


    
    //生成棋谱
    chessManual=function(){
      clearInterval(bt);
      clearInterval(wt);
      ctx.save();
      ctx.font = "20px serif";
      ctx.textAlign="center";
      ctx.textBaseline = "middle";
      var i=1;

      for(var k in qizi){
        var arr=k.split('_');
        if(qizi[k]==="white"){
          ctx.fillStyle="#333";
        }else{
          ctx.fillStyle="#F92672";
        }
        ctx.fillText(i++,huan(parseInt(arr[0])),huan(parseInt(arr[1])));
      }
      ctx.restore();
      $('.box').addClass('box-xian');
      if($('.box').find('img').length){
        $('.box').find('img').attr('src',c.toDataURL());
      }else{
        $('<img>').attr('src',c.toDataURL()).appendTo('.box');
      }
      if($('.box').find('a').length){
        $('.box').find('a').attr('href',c.toDataURL());
      }else{
        $('<a>').attr('href',c.toDataURL()).attr('download','qipu.png').appendTo('.box');
      }
      
    }
    //查看棋谱
    $('#qipu').on('click',chessManual);
    $('#close').on('click',function(){
      $('.box').removeClass('box-xian');
      qipan();
      for(var k in qizi){
        var x=parseInt(k.split('_')[0]);
        var y=parseInt(k.split('_')[1]);
        luozi(x,y,18,qizi[k]);
      }
    });
    //人机截堵
    function intel(){
      //棋盘上所有的空白位置
      var max=-Infinity;
      var pos={};
      for(var k in kongbai){
        var x=parseInt(k.split('_')[0]);
        var y=parseInt(k.split('_')[1]);
        var m=panduan(x,y,'black');
        if(m>max){
          max=m;
          pos={x:x,y:y};
        }
      }

      var max2=-Infinity;
      var pos2={};
      for(var k in kongbai){
        var x=parseInt(k.split('_')[0]);
        var y=parseInt(k.split('_')[1]);
        var m=panduan(x,y,'white');
        if(m>max2){
          max2=m;
          pos2={x:x,y:y};
        }
      }

      if(max>max2){
        return pos;
      }else{
        return pos2;
      }
      
    }
    //下棋
    var flag=true;
    function handleClick(e){
      var bian=0;
        var a=Math.floor(e.offsetX/sep);
        var b=Math.floor(e.offsetY/sep);
        // if(you(a,b)){
        //  return;
        // }
        if(qizi[a+"_"+b]){
          return;
        }
        //人机下棋及输赢
        if(AI){
          luozi(a,b,18,"black");
          clearInterval(bt);
          de=0;
          wt=setInterval(function(){
            render1("白棋",wt);
          },100);
          if(panduan(a,b,"black")>=5){
            $(c).off('click');
            info.addClass('active');
            clearInterval(wt);
            $('#hei').animate({top:220},1000).css('display','block')
          }
          var p=intel();
          luozi(p.x,p.y,18,'white');
          clearInterval(wt);
          deg=0;
//        bt=setInterval(function(){
//          render("黑棋",bt);
//        },100);
          if(panduan(p.x,p.y,'white')>=5){
            $(c).off('click');
            info.addClass('active');
            clearInterval(bt);
            $('#bai').animate({top:220},1000).css('display','block')
          }
          return false;
        }
        //双人下棋及输赢
        if(flag){
          luozi(a,b,18,"black");
          clearInterval(bt);
            de=0;
//        wt=setInterval(function(){
//          render1("白棋",wt);
//        },100);
          if(panduan(a,b,"black")>=5){
            $(c).off("click");
            clearInterval(wt);
            info.addClass('active');
            $('#hei').animate({top:220},1000).css('display','block')
          }
        }else{
          luozi(a,b,18,"white");
          clearInterval(wt);
          deg=0;
//        bt=setInterval(function(){
//          render("黑棋",bt);
//        },100);
          if(panduan(a,b,"white")>=5){
            clearInterval(bt);
            $(c).off("click");
            info.addClass('active');
            $('#bai').animate({top:220},1000).css('display','block')
          }
        }
        flag=!flag;
    }
    $(c).on('click',handleClick);

    function m(c,d){
      return c+"_"+d;
    }

    //输赢判断
    function panduan(x,y,color){
      var row=1; var i;
      i=1;while(qizi[m(x+i,y)]===color){ row++; i++; }
      i=1;while(qizi[m(x-i,y)]===color){ row++; i++; }
      
      var lie=1;
      i=1;while(qizi[m(x,y+i)]===color){ lie++; i++; }
      i=1;while(qizi[m(x,y-i)]===color){ lie++; i++; }
        
      var zX=1;
      i=1;while(qizi[m(x+i,y+i)]===color){ zX++; i++; }
      i=1;while(qizi[m(x-i,y-i)]===color){ zX++; i++; } 
      
      var yX=1;
      i=1;while(qizi[m(x+i,y-i)]===color){ yX++; i++; }
      i=1;while(qizi[m(x-i,y+i)]===color){ yX++; i++; } 

      return Math.max(row,lie,zX,yX);
    }

    //重置棋盘
    function restart(){
      info.removeClass('active');
      qipan();
      clearInterval(bt);
      clearInterval(wt);
      $(c).on('click',handleClick);
      flag=true;
      qizi={};
//    ctx1.clearRect(0,0,blackT.width,blackT.height);
//    ctx2.clearRect(0,0,whiteT.width,whiteT.height);
//    biaopan(ctx1);
//    biaopan(ctx2);
      scil(7,7);
      scil(3,3);
      scil(3,11);
      scil(11,3);
      scil(11,11);
      gameState='pause';
      AI=false;
      $(".robot").removeClass('red');
      $(".double").addClass('red');
    }
    $('.again').on('click',restart);

    //暂停、继续、重新开局
    $("#zan").on('click',function(){
      if(flag){
        clearInterval(bt);
      }
      else{
        clearInterval(wt);
      }
      $('#canvas').off('click')
    });
    $("#jixu").on('click',function(){
      if(flag){
//      bt=setInterval(function(){
//        render(ctx1,"黑棋",bt);
//      },100);
      }
      else{
        wt=setInterval(function(){
          render1(ctx2,"白棋",wt);
        },100);
        
      }
      $('#canvas').on('click',handleClick)
    });
    $("#chong").on("click",restart);
    $(".zai").on("click",restart);
	$(".zai").on('click',function(){
    	$('.jieju').animate({top:-150},1000).css('display','none')
    	
    })
    //游戏规则
    $("#gui").on("click",function(){
      $("#guize").css("display","block");
      $('#jiemian').css('display','none')
    });
    //返回  退出 
    $("#fan").on("click",function(){
      $("#guize").css("display","none");
      $('#jiemian').css('display','block')
     
    });
    $("#fanhui").on("click",function(){
      $('#jiemian').css('display','block')
      $('#canvas').css('display','none')
      $('#canvas1').css('display','none')
      $('#canvas2').css('display','none')
      $('#zan').css('display','none')
      $('#jixu').css('display','none')
      $('#chong').css('display','none')
      $('#fanhui').css('display','none')
      $('#qipu').css('display','none')
      $('html').css('background-image','none')
      $('.jieju').animate({top:-150},1000).css('display','none')
    });
//  $(".tui").on("click",restart);
   $(".tui").on("click",function(){
      $('#jiemian').css('display','block')
      $('#canvas').css('display','none')
      $('#canvas1').css('display','none')
      $('#canvas2').css('display','none')
      $('#zan').css('display','none')
      $('#jixu').css('display','none')
      $('#chong').css('display','none')
      $('#fanhui').css('display','none')
      $('#qipu').css('display','none')
      $('html').css('background-image','none')
      $('.jieju').animate({top:-150},1000).css('display','none')
    });
    //人机和双人的切换
    $(".robot").on('click',function(){
    	
     
      console.log(1)
      $('#qipu').css('display','block')
      $('#canvas').css('display','block')
      $('#jiemian').css('display','none')
      $(".double").removeClass('red');
      $('#canvas1').css('display','block')
      $('#canvas2').css('display','block')
      $('#zan').css('display','block')
      $('#jixu').css('display','block')
      $('#chong').css('display','block')
      $('#fanhui').css('display','block')
      $('html').css('background-image','url(img/bg.jpg)')
      $(this).addClass('red');
//    if(gameState==='play'){
//      return;
//    }
      AI=true;
    });
    $(".double").on('click',function(){
//    if(gameState==='play'){
//      return;
//    }
      $('#qipu').css('display','block')
      $('#canvas').css('display','block')
      $('#jiemian').css('display','none')
      $('#canvas1').css('display','block')
      $('#canvas2').css('display','block')
      $('#zan').css('display','block')
      $('#jixu').css('display','block')
      $('#chong').css('display','block')
      $('#fanhui').css('display','block')
      $('html').css('background-image','url(img/bg.jpg)')
      $(".robot").removeClass('red');
      $(this).addClass('red');
      AI=false;
    });
});