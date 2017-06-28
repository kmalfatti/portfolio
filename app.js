
$( '.cube' ).click(function() {
  $( ".cubeWrapper" ).addClass('zoomOutRight')
});

$('#abt, #port').click(function(){
  var $btn = $('button');
  if ($btn.hasClass('opened')) {
    $btn.removeClass('opened');
    setTimeout(function() {
      $('aside').animate({'left':'-200'})
      $btn.addClass('closed');
    }, 1);
  }
})

var c = document.getElementById('c'),
    ctx = c.getContext('2d'),
    cw = c.width = 300,
    ch = c.height = 300,
    parts = [],
    partCount = 200,   
    partsFull = false,    
    hueRange = 50,
    globalTick = 0,
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    };

var Part = function(){
  this.reset();
};

Part.prototype.reset = function(){
  this.startRadius = rand(1, 25);
  this.radius = this.startRadius;
  this.x = cw/2 + (rand(0, 6) - 3);
  this.y = 250;      
  this.vx = 0;
  this.vy = 0;
  this.hue = rand(globalTick - hueRange, globalTick + hueRange);
  this.saturation = rand(50, 100);
  this.lightness = rand(20, 70);
  this.startAlpha = rand(1, 10) / 100;
  this.alpha = this.startAlpha;
  this.decayRate = .08;  
  this.startLife = 7;
  this.life = this.startLife;
  this.lineWidth = rand(1, 3);
}
    
Part.prototype.update = function(){  
  this.vx += (rand(0, 200) - 100) / 1500;
  this.vy -= this.life/50;  
  this.x += this.vx;
  this.y += this.vy;  
  this.alpha = this.startAlpha * (this.life / this.startLife);
  this.radius = this.startRadius * (this.life / this.startLife);
  this.life -= this.decayRate;  
  if(
    this.x > cw + this.radius || 
    this.x < -this.radius ||
    this.y > ch + this.radius ||
    this.y < -this.radius ||
    this.life <= this.decayRate
  ){
    this.reset();  
  }  
};
  
Part.prototype.render = function(){
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = ctx.strokeStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, '+this.alpha+')';
  ctx.lineWidth = this.lineWidth;
  ctx.fill();
  ctx.stroke();
};

var createParts = function(){
  if(!partsFull){
    if(parts.length > partCount){
      partsFull = true;
    } else {
      parts.push(new Part()); 
    }
  }
};
  
var updateParts = function(){
  var i = parts.length;
  while(i--){
    parts[i].update();
  }
};

var renderParts = function(){
  var i = parts.length;
  while(i--){
    parts[i].render();
  }   
};
    
var clear = function(){
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'hsla(0, 0%, 0%, .3)';
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'lighter';
};
     
var loop = function(){
  window.requestAnimFrame(loop, c);
  clear();
  createParts();
  updateParts();
  renderParts();
  globalTick++;
};

window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

loop();
var rand1 = (90+((Math.random()-0.5)*15)).toString()
$('canvas').css('transform', 'rotateZ(-'+rand1 +'deg)')

var width=($( window ).width())

function comet(){
var int = setTimeout(function(){
     var marginL = Number($('canvas').css('marginLeft').slice(0, $('canvas').css('marginLeft').length-2))
    $("canvas").animate({ 
        marginLeft: width+500 + 'px',
    }, 50000 );

  }) 
}
comet()

// smooth scrolling
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});

console.log("%cHire Me :)", "background: linear-gradient(to bottom, purple, rgb(13, 22, 27));border-radius: 10px;margin:0 0 0 50px;padding:10px; color: white; font-size: 3rem");

$(window).on("load",function() {
  $(window).scroll(function() {
    $(".scrollFade").each(function() {
      /* Check the location of each desired element */
      var objectBottom = $(this).offset().top + ($(this).outerHeight()/2);
      var windowBottom = $(window).scrollTop() + $(window).innerHeight();
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom) { //object comes into view (scrolling down)
        if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
      } else { //object goes out of view (scrolling up)
        if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
      }
    });
  }); $(window).scroll(); //invoke scroll-handler on page-load
});

$('button').on('click', function() {
  $('aside').css('height', $(window).innerHeight())
  var $btn = $(this);
  if ($btn.hasClass('closed') || !$btn.hasClass('opened')) {
    $btn.removeClass('closed');
    setTimeout(function() {
      $('aside').animate({'left':'0'})
      $btn.addClass('opened');
    }, 1);
  } else if ($btn.hasClass('opened')) {
    $btn.removeClass('opened');
    setTimeout(function() {
      $('aside').animate({'left':'-200'})
      $btn.addClass('closed');
    }, 1);
  }
});

if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 $('pre').css('font-size', '2.7rem');
 $('.portfolio').css('padding-top', '500px');
}
