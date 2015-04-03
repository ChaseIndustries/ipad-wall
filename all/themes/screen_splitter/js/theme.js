(function($){
  
var $body = $('body'),
  $modal = $('#config'),
  $modalClose = $('#config').find('.close'),
  $modalConfirm = $('#config').find('.confirm'),
  $fullScreenLayer = $('#fullScreen'),
  $setupSelect = $('#config').find('.ipad-select--device-chosen'),
  $modalCheckbox = $('#fullscreenCheck'),
  $viewContent = $('.view--content-container');

 FastClick.attach(document.body);


$modal.modal('show'); 
$body.addClass('view-all');

$setupSelect.click(function() {
  var hash = location.hash;
  $modal.modal('hide');
  $body.removeClass('view-all');
  startPoll();
  if(!$modalCheckbox.is(":checked")) {
    $fullScreenLayer.addClass('hidden');
  }
});

$modalClose.click(function() {
  $body.removeClass('view-all');
  $fullScreenLayer.addClass('hidden');
});



$(".view--content-container").on("click", function() {
  $(this).toggleClass('flip');
});


$fullScreenLayer.swipe({
  pinchOut:function(event, direction, distance, duration, fingerCount, pinchZoom) {
    $body.addClass('view-all');
  },
  pinchIn:function(event, direction, distance, duration, fingerCount, pinchZoom) {
    $body.removeClass('view-all');
  },
  fingers:2,  
  pinchThreshold:0  
});

var swiper = new Swiper('.swiper-container');

$('.swiper-slide').last().addClass('last-slide');



var tapped=false;
$('.last-slide').on("touchstart",function() {
  if(!tapped) { 
    tapped=setTimeout(function() {
      tapped = null;
    }, 300);   
  } else {  
    clearTimeout(tapped);
    tapped = null;
    $('.swiper-slide').removeClass('swiper-slide-prev').removeClass('swiper-slide-active');
    $('.swiper-slide').first().addClass('swiper-slide-active');
    $viewContent.removeClass('flip');
    setTimeout(function() {
      $('.swiper-wrapper').attr('style', '');
    }, 500);
  }
});

$(".control-panel .control").on("click", function(e){
  e.stopPropagation();
  e.preventDefault();
  var args = {command:'refresh'}
  sendCommand(args);
});

function startPoll(){
  var timestamp = new Date().getTime().toString();
  timestamp = timestamp.substr(0, 10);
  $.post("../ajax.php", {timestamp: timestamp.substring(0,10)}, function(data){
    if(!data.command){
      startPoll();
    } else {
      switch(data.command){
        case 'refresh':
          window.location.reload();
        break; 
      }
      startPoll();
    }
  }, 'json')
}

function sendCommand(args){
  timestamp = new Date().getTime().toString();
  timestamp = timestamp.substring(0, 10);
  $.post("../ajax.php", {timestamp:timestamp,args:args});
}

window.onhashchange = function(){
   var hash = location.hash;
  $modal.modal('hide');
  $body.removeClass('view-all');
  startPoll();
  if(!$modalCheckbox.is(":checked")) {
    $fullScreenLayer.addClass('hidden');
  }
}

window.onhashchange();

})(jQuery)
