#  基于canvas制作绚丽的倒计时效果
## 一、先看下效果
![](http://ozes4g3nu.bkt.clouddn.com/20180830-214220_capture.gif)

## 二、canvas是一个可是使用脚本（通常是javascript）在其中绘制图形的HTML元素，同时canvas也是定义在浏览器上的画布，canvas不仅仅像p标签等是一个元素，更是一个编辑工具，是一套编程接口，它的出现已超过了web基于文本设计的初衷。canvas可以设计出绚丽多彩的动画，奇妙的游戏等，可以使我们的网页绚丽多彩！
## 三、canvas绘图环境的搭建
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <canvas id="canvas" style="border: 1px solid #000; display: block; margin:50px auto">
        当前浏览器不支持canvas，请更换浏览器再试！
    </canvas>
    <script type="text/javascript">
        window.onload = function () {
            var canvas = document.getElementById("canvas");

            canvas.width = 800;
            canvas.height = 800;

            var context = canvas.getContext("2d);
        }
    </script>
</body>
</html>
```
注意点：
1、canvas在不指定尺寸时，默认的canvas宽度为300px；高度为150px。
2、canvas是基于状态的绘制环境，不是基于对象的。canvas绘制的所有接口都是由context这个上下文环境所提供的。
## 四、特殊的方法
context.stroke();绘制已定义的路径。在每一次进行具体的绘制的时候，不是简单的把上一段代码进行绘制，而是检查整个程序中的所有状态，基于这些状态完成一次绘制，也就是说当调用stroke()方法时，会将前面调用的stroke()方法设置的覆盖掉。

绘制圆弧：
```
context.arc(centerx, centery, radius, startingAngle, endingAngle, acticlockwise=false)
```
其中，第四个和第五个分别指定的是起始圆弧位置和结束圆弧位置。
最后一个指定是顺时针还是逆时针。默认为false(顺时针)。
![这里写图片描述](https://img-blog.csdn.net/20180830234347953?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNzk3MjcyMw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
无论是顺时针还是逆时针，这种位置关系是永远不变的。

还有就是closePath()对fill()是没有用的。使用fill()对首尾相连的路径进行填充。不管有没有调用closePath()，调用fill()会自动封闭路径，并进行填充。
