/**
 * Created by 赵亚峰 on 2018/8/30.
 */

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var endTime = new Date();
endTime.setTime(endTime.getTime() + 3600000*24);
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function() {
    var body = (document.compatMode && document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;

    WINDOW_WIDTH = body.clientWidth - 10;
    WINDOW_HEIGHT = body.clientHeight - 30;

    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 7);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    //得到现在将要倒计时的秒数，并把全局中的进行更新。
    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(function(){
        render(context);
        update();
    },100)
};

//得到现在将要倒计时的秒数
function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000);

    return ret >= 0 ? ret : 0;
}

//更新函数
function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if( nextSeconds != curSeconds ){
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            //后一个时刻与前一个时刻的值不一样了，那么要用前一个时刻的值生成随机的小球。
            addBalls( MARGIN_LEFT, MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours%10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
    console.log(balls.length);
}

//更新小球，小球生成了，但是要动起来，就要不断改变位置。
function updateBalls() {
    for(var i=0; i<balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        //碰撞检测小球是否到了最下面
        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }

    //优化算法，使得小球的数量控制在一个范围内，而不是无限的增长。
    var cnt = 0;
    for(var j=0; j<balls.length; j++) {
        if(balls[j].x + RADIUS > 0 && balls[j].x -RADIUS < WINDOW_WIDTH) {
            //小球还在画布中,则添加到管理小球的这个数组中。
            balls[cnt++] = balls[j];
        }
    }

    //清除已经弹出画布的
    while( balls.length > Math.min(350,cnt)){
        balls.pop();
    }
}

//添加小球的函数,把点阵中每个为1的位置生成一个小球。
function addBalls(x, y, num) {
    for(var i=0; i<digit[num].length; i++) {
        for(var j=0; j<digit[num][i].length; j++) {
            if(digit[num][i][j] == 1) {
                var aBall = {
                    x: x+j*2*(RADIUS+1)+(RADIUS+1),
                    y: y+i*2*(RADIUS+1)+(RADIUS+1),
                    g: 1.5+Math.random(),
                    vx: Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aBall)
            }
        }
    }
}



//渲染函数
function render(cxt) {
    //刷新一下画布
    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

    //分别得到需要倒计时时间的小时、分钟以及秒数。
    var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
    var seconds = curShowTimeSeconds % 60;

    //绘制时间
    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
    renderDigit( MARGIN_LEFT + 30*(RADIUS+1) , MARGIN_TOP , 10 , cxt );
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    //绘制小球
    for(var i=0; i<balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
}

//绘制每一个对应的数字
function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";

    //每一个数字对应的点阵在一个三维数组中存储。
    for(var i=0; i<digit[num].length; i++) {
        for(var j=0; j<digit[num][i].length ; j++ ) {
            if(digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}