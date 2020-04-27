<template>
  <div style="height:100%" class="box">
     <div id="cude">
        <div class="cue">
            <div class="big-box top"></div>
            <div class="big-box bottom"></div>
            <div class="big-box left"></div>
            <div class="big-box right"></div>
            <div class="big-box font"></div>
            <div class="big-box behind"></div>

            
            <div class="s-box s-top"></div>
            <div class="s-box s-bottom"></div>
            <div class="s-box s-left"></div>
            <div class="s-box s-right"></div>
            <div class="s-box s-font"></div>
            <div class="s-box s-behind"></div>
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
 *{margin: 0;padding: 0;}
        html{height: 100%;}
        .box{background: linear-gradient(rgb(88,229,255) ,rgb(2,60,247) );height: 100%;}
        #cude{width: 200px;height: 200px;position: absolute;top: 50%;left: 50%;
            transform: translate(-100px,-100px);perspective: 800px;}
        .cue{width: 200px;height: 200px;transform-style: preserve-3d;position: relative;animation: run 20s linear infinite;
             transform: rotate3d(1,1,0,-45deg); }  
        .big-box{width: 200px;height: 200px;position: absolute;top: 0;left: 0;
            background-image: url('../../assets/logo.png');background-size: 200px 200px;}  
        .top{transform: rotateX(90deg) translateZ(100px);}
        .bottom{transform: rotateX(90deg) translateZ(-100px);}
        .left{transform: rotateY(-90deg) translateZ(100px);}
        .right{transform: rotateY(90deg) translateZ(100px);}
        .font{transform: translateZ(100px);}
        .behind{transform: translateZ(-100px);}
        .s-box{width: 100px;height: 100px; background-image: url('../../assets/logo.png');background-size: 100px 100px;position: absolute;top: 50px;left: 50px;}
        .s-top{transform: rotateX(90deg) translateZ(50px);}
        .s-bottom{transform: rotateX(90deg) translateZ(-50px);}
        .s-left{transform: rotateY(-90deg) translateZ(50px);}
        .s-right{transform: rotateY(90deg) translateZ(50px);}
        .s-font{transform: translateZ(50px);}
        .s-behind{transform: translateZ(-50px);}

        .cue:hover .top{
            transform: rotateX(90deg) translateZ(200px);
        }
        .cue:hover .bottom{
            transform: rotateX(90deg) translateZ(-200px);
        }
        .cue:hover .left{
            transform: rotateY(-90deg) translateZ(200px);
        }
        .cue:hover .right{
            transform: rotateY(90deg) translateZ(200px);
        }
        .cue:hover .font{
            transform: translateZ(200px);
        }
        .cue:hover .behind{
            transform: translateZ(-200px);
        }
        @keyframes run{
            0%{
                transform: rotate3d(1,1,0,-45deg);
            }
            50%{
                transform: rotate3d(1,1,0,-360deg);
            }
            100%{
                transform: rotate3d(1,1,0,-45deg);
            }
        }
</style>