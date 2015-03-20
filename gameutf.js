var score = 0;
var BallX, BallY; //小球在canvas元素中的横坐标与纵坐标
var AddX, AddY; //小球每次移动时的横向移动距离与纵向移动距离
var width, height;//canvas元素的宽度与高度
var canvas;//canvas元素
var context;//canvas元素的图形上下文对象
var functionId;//用来停止动画函数的整型变量
var tabx;
var changeX;
var level;
var stop = 2;
var text;
var pa=0;
var rl;
var k=5;
var jds = new Array();
for (var count = 0; count < 4; count++)
    jds[count] = new Array();
var tools = new Array();
for (var count2 = 0; count2 < 4; count2++)
	tools[count2] = new Array();
var remb = new Array();
for (var count3 = 0; count3 < 4; count3++)
	remb[count3] = new Array();
for(var m=0;m<4;m++)
	for(var n=0;n<9;n++)
	{
		remb[m][n]=0;
	}
var path = new Array();
for (var count4 = 0; count4 < 4; count4++)
	path[count4] = new Array();
for(var m=0;m<4;m++)
	for(var n=0;n<9;n++)
	{
		path[m][n]=0;
	}
function changetitle() {
    document.title = "hello world1"
}
function type(text) {
    context.save();
    context.font = "30px Microsoft YaHei";
    context.fillStyle = '#996600';
    context.textAlign = 'center';
    context.fillText(text, width / 2, height / 2, 800);
    stop = 1;
}//输出文字
function board(score) {
    context.save();
    context.font = "25px Microsoft YaHei";
    context.fillStyle = '#996600';
    context.textAlign = 'start';
    context.fillText("score: " + score, 10, height - 50, 400);
}//记录分数
function keyevent(e) {
    if (e.keyCode == 37)
    { change1(); }
    if (e.keyCode == 39)
    { change2(); }
    if (e.keyCode == 38) {
        var string = "PAUSE";
        type(string);
        clearInterval(functionId);
		pa=1;
    }
    if (e.keyCode == 13) {
		if(pa==1){
		functionId = setInterval("draw()", 20);
		pa=0;
		}
    }
}//上键、左右键、回车键的触发
function keyevent2(e) {
    if (e.keyCode == 37)
    { changeX = 0; }
    if (e.keyCode == 39)
    { changeX = 0; }
}//当键摊开时，停止移动挡板
function goto1() {
    confirm("小球打击砖块，打完为胜，小球落入底部就输了,左右键控制板，上键暂停，回车继续，输了按F5重新开始= =再没有比这个更简单的说明了吧");
} //游戏说明
function goto2() {
    confirm("作者名：稻稻  邮箱：740876080@qq.com");
}//关于作者

function rand() {
    return Math.floor((Math.random() * 48 - 0.1) / 8);
}//随机砖块颜色
function randtools(){
	var remb = Math.random();
	if (remb <= 0.1) return 1;
	else if (remb <= 0.4) return 2;
	else if (remb <= 0.7) return 3;
	else if (remb <= 0.8) return 4;
	else return 0;
}//随机道具生成

function color(jd) {
    if (jd == 5) return "gray";
    if (jd == 4) return "lightgreen";
    if (jd == 3) return "lightpink";
    if (jd == 2) return "lightblue";
    if (jd == 1) return "yellow";
}//由随机数确定砖块颜色
function change1() {
    changeX = -10;
}//改变挡板位置

function change2() {
    changeX = 10;
}//改变挡板位置
//点击开始游戏按钮
function btnBegin_onclick() {
    var child = document.getElementById("a1");
    child.parentNode.removeChild(child);
    canvas = document.getElementById("canvas");//获取canvas元素
    width = canvas.width;//获取canvas元素的宽度
    height = canvas.height;//获取canvas元素的高度
    context = canvas.getContext('2d'); //获取canvas元素的图形上下文对象
    confirm("欢迎玩这个游戏= =有什么建议可以留言给我哦！");
    level = prompt("你想玩什么难度的呀？请在1到5中选择,数字越大越难哦");
    if (level == 1) {length = 200;AddX = -3;AddY = -3;}
    if (level == 2) {length = 180;AddX = -4;AddY = -4;}
    if (level == 3) {length = 160;AddX = -5;AddY = -5;}
    if (level == 4) {length = 140;AddX = -6;AddY = -6;}
    if (level == 5) {length = 120;AddX = -7;AddY = -7;}//五种难度选择，对应不同的小球速度与挡板长度
	if (level == "I love fushuai ze") {length = 550;AddX = -10;AddY = -10;}//作弊码
	rl=Math.sqrt(2)*(-AddX);//小球每次移动的距离
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 9; j++)
            jds[i][j] = rand();
	
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 9; j++)
			tools[i][j]=randtools();
	
    BallX = 200;
    BallY = 400;
    tabx = 200 + length / 2;
    taby = height - 40;
	changeX = 0;
    draw();//绘制矩形桌面与小球与挡板
    //重绘矩形桌面与小球，改变小球位置以产生动画效果 
    functionId = setInterval("draw()", 20);
}
//重绘矩形桌面与小球
function draw() {
    context.clearRect(0, 0, width, height);//清除canvas元素中的内容
    context.save();//保存当前绘制状态
    context.fillStyle = "#DDDDDD"; //设置桌面
    context.strokeStyle = "#4682B4";//设置桌面边框
    context.linewidth = 3; //设置桌面边框宽度
    context.fillRect(3, 3, width - 5, height - 5);//绘制桌面
    context.strokeRect(3, 3, width - 5, height - 5);//绘制桌面边框
    context.fillStyle = "lightblue";
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 9; j++)
            if (jds[i][j] > 0) {
				context.globalAlpha=0.8;
                context.fillStyle = color(jds[i][j]);
                context.fillRect(10 + j * 90, 10 + i * 40, 80, 30);
                context.strokeStyle = "#778899 ";
                context.strokeRect(10 + j * 90, 10 + i * 40, 80, 30);
            }//生成砖块，颜色随机
	board(score);//记录分数
    context.beginPath();//开始创建路径
    context.fillStyle = "#2F4F4F ";//设置小球为蓝色
    context.arc(BallX, BallY, 10, 0, Math.PI * 2, false);//创建小球路径 
	if (BallX > tabx-10 && BallX < tabx + length +10) kernel();
    tabx += changeX;
    BallX += AddX;//计算小球移动后的下次绘制时的横坐标
    BallY += AddY;//计算小球移动后的下次绘制时的纵坐标
    if (BallX < 10)//小球向左移动时位置超过左边框
    {
        BallX = 10;//将小球移到桌面内
        AddX = -AddX;//改变小球移动方向，使其向右移动
    }
    else if (BallX > width - 10)//小球向右移动时位置超过右边框
    {
        BallX = width - 10;//将小球移到桌面内
        AddX = -AddX;//改变小球移动方向，使其向左移动
    }
    if (BallY < 10)//小球向上移动时位置超过上边框
    {
        BallY = 10;//将小球移到桌面内
        AddY = -AddY;//改变小球移动方向，使其向下移动
    }
    else if (BallY > height - 10)//小球向下移动时位置超过下边框
    {
        var string = "胜败乃兵家常事，降低难度再来吧- -"
        type(string);
        clearInterval(functionId);
        document.getElementById("btnBegin").disabled = "";
    }
    if ((BallX >= tabx - 10) && (BallY > taby + 3) && (BallY <= taby + 20) && (BallX <= tabx + 3)) {
        BallX = tabx - 11;
        AddX = -AddX;
    }//碰到挡板左侧
    if ((BallX <= tabx + length + 10) && (BallY > taby + 3) && (BallY <= taby + 20) && (BallX >= tabx + length + 7)) {
        BallX == tabx + length + 4;
        AddX = -AddX;
    }//碰到挡板右侧
    if (tabx < 10) {
        tabx = 10;
        changeX = -changeX;
    }//碰到左边框
    else if (tabx > width - length - 10) {
        tabx = width - length - 10;
        changeX = -changeX;
    }//碰到右边框
    var is_zero = 0;//游戏结束记录
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 9; j++)
            if (jds[i][j] != 0) is_zero = 1;
    if (is_zero == 0) {
        alert("好吧少年，竟然通过了，尝试更高的难度吧 - -");
        clearInterval(functionId);
        btnBegin_onclick();
    }//游戏结束
    //judge main
    var status = 0;
    for (var i = 3; i >= 0; i--){
        for (var j = 0; j < 9; j++) {
            if (status == 1) break;
            if (jds[i][j] > 0) {
                if (BallX > (j * 90 + 10) - 10 && BallX < (j * 90 + 10 + 80 + 10)) {
                    if (BallY > (10 + i * 40 - 10) && BallY < (10 + i * 40 + 30 + 10)) {
                        if (BallY < (10 + i * 40) || BallY > (10 + i * 40 + 30)) 
						{ 
							AddY = -AddY; 
							jds[i][j] -= 1; 
							status = 1; 
							score++; 
							if(jds[i][j]==0)
							{
							remb[i][j]=1;
							}
							break; 
						}
                        if (BallY > (10 + i * 40) && BallY < (10 + i * 40 + 30)) 
						{ 
							AddX = -AddX; 
							jds[i][j] -= 1; 
							status = 1; 
							score++; 
							if(jds[i][j]==0)
							{
							remb[i][j]=1;
							}
							break; 
						}
                    }
                }
            }
        }
	}//判断是否碰到砖块
    context.closePath();//关闭路径 
    context.fill(); //绘制小球
    context.moveTo(tabx, taby);
    context.quadraticCurveTo(tabx + length / 2, taby - 10, tabx + length, taby);
    context.strokeStyle = 'lightstyle';//绘制挡板
    context.stroke();
    context.moveTo(tabx, taby);
	for (var p = 0;p < 4; p++)
		for (var q = 0; q < 9; q++)
		{
			if ((remb[p][q]==1)&&(tools[p][q]==1))
			{
				path[p][q]+=3;
				var img3=document.getElementById("luu");
				context.drawImage(img3,q*90+50-7.5,p*40+40+path[p][q]);
				disp(1,q*90+50-7.5,p*40+40+path[p][q],p,q);
			}
			if ((remb[p][q]==1)&&(tools[p][q]==2))
			{
				path[p][q]+=3;
				var img4=document.getElementById("ldd");
				context.drawImage(img4,q*90+50-7.5,p*40+40+path[p][q]);
				disp(2,q*90+50-7.5,p*40+40+path[p][q],p,q);
			}
			if ((remb[p][q]==1)&&(tools[p][q]==3))
			{
				path[p][q]+=3;
				var img4=document.getElementById("vuu");
				context.drawImage(img4,q*90+50-7.5,p*40+40+path[p][q]);
				disp(3,q*90+50-7.5,p*40+40+path[p][q],p,q);
			}
			if ((remb[p][q]==1)&&(tools[p][q]==4))
			{
				path[p][q]+=3;
				var img4=document.getElementById("vdd");
				context.drawImage(img4,q*90+50-7.5,p*40+40+path[p][q]);
				disp(4,q*90+50-7.5,p*40+40+path[p][q],p,q);
			}
		}//道具系统设计
    context.restore();//恢复上次保存的绘制状态
}
function kernel()
{//撞击挡板后小球运动轨迹的改变
	if ((BallX < tabx + length / 3)&& (BallY >= taby - 10) && (BallY <= taby + 3) && (AddX > 0)) 
	{
		BallY = taby - 11;
		var theta=Math.abs(Math.atan(AddY/AddX));
        AddY = -rl*Math.sin(theta+Math.PI/18);
		AddX = rl*Math.cos(theta+Math.PI/18);
	}
	if ((BallX < tabx + length / 3)&& (BallY >= taby - 10) && (BallY <= taby + 3) && (AddX < 0))
	{
		BallY = taby - 11;
		var theta=Math.abs(Math.atan(AddY/AddX));
        AddY = -rl*Math.sin(theta-Math.PI/18);
		AddX = -Math.abs(rl*Math.cos(theta-Math.PI/18));
	}	
	if ((BallX > tabx + 2 * length / 3) && (BallY >= taby - 10) && (BallY <= taby + 3) && (AddX < 0))
	{
		BallY = taby - 11;
		var theta=Math.abs(Math.atan(AddY/AddX));
        AddY = -rl*Math.sin(theta+Math.PI/18);
		AddX = -Math.abs(rl*Math.cos(theta+Math.PI/18));
	}
	if ((BallX > tabx + 2 * length / 3) && (BallY >= taby - 10) && (BallY <= taby + 3) && (AddX > 0))
	{
		BallY = taby - 11;
		var theta=Math.abs(Math.atan(AddY/AddX));
        AddY = -rl*Math.sin(theta-Math.PI/18);
		AddX = rl*Math.cos(theta-Math.PI/18);
	}
	if ((BallX > tabx + length / 3 && BallX < tabx + 2 * length / 3) && (BallY >= taby - 10) && (BallY <= taby + 3))
    {
		AddY = -AddY;
	}
}
function disp(kind,pathx,pathy,p,q)
{//生成道具效果
	if ((pathx >= tabx) && (pathx <= tabx + length) && (pathy >= taby - 10) && (pathy <= taby + 3))
	{
		if(kind==1)//长度++
		{
			length+=40;
			tools[p][q]=0;
		}
		if(kind==2)//长度--
		{	
			length-=40;
			tools[p][q]=0;
		}
		if(kind==3)//速度++
		{	
			rl*=1.5;
			tools[p][q]=0;
		}
		if(kind==4)//速度--
		{
			rl*=0.7;
			tools[p][q]=0;
		}
	}
}
window.addEventListener("keydown", keyevent, false);//键盘敲击记录器
window.addEventListener("keyup", keyevent2, false);//键盘弹出记录器