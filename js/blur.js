$(".main").clone().prependTo(".site-header").addClass("blurry-content");

$(document).scroll(function(){
    var currentPosition = $(this).scrollTop();
    $('.blurry-content').css({
      '-webkit-transform' : 'translateY(-'+currentPosition+'px)',
      'transform' : 'translateY(-'+currentPosition+'px)'
    });
  })