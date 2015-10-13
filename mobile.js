jQuery.urlParam = function (name) {

  // Get the search query.
  var urlParams = window.location.search;

  // Remove the ? if it exists on the front of the string.
  if (urlParams.indexOf('?') === 0) {
    urlParams = urlParams.substr(1);
  }

  // Split the parameters by &.
  urlParams = urlParams.split('&');

  // Loop through each parameter
  var i, param;
  for (i = 0; i < urlParams.length; i++) {

    // Split the string by =.
    param = urlParams[i].split('=');

    // If the parameter name matches the requested parameter, return the value.
    if (param[0] === name && param[1] !== undefined) {
      return param[1];
    }
  }

  // Otherwise return null.
  return null;
};

/**
 * On document ready.
 */
jQuery(document).ready(function ($) {
  var gnStartX = 0;
  var gnStartY = 0;
  var gnEndX = 0;
  var gnEndY = 0;

  window.addEventListener('touchstart',function(event) {
    gnStartX = event.touches[0].pageX;
    gnStartY = event.touches[0].pageY;
  },false);

  function change()
  {
    var h = $('.line').height() - 60;
    var top;
    if ($('.line #first').css('opacity') <= '0.28'){
      mob_tim = clearInterval(mob_tim);
      if (sex == 'male'){
        $('.line #first').css('bottom',h+'px');
      }
      else{
        $('.line #first').css('top',h+'px');
      }
    }
    else {
      
      var delta_h = Math.round(h/60);
      if (sex == 'male'){
        top = $('.line #first').css('bottom');
        top = parseInt(top.substring(0,top.length-2));
        top += delta_h;
        $('.line #first').css('bottom',top+'px');
      }
      else{
        top = $('.line #first').css('top');
        top = parseInt(top.substring(0,top.length-2));
        top += delta_h;
        $('.line #first').css('top',top+'px');
      }
      var new_opacity = $('.line #first').css('opacity');
      new_opacity -= 0.01;
      $('.line #first').css('opacity',new_opacity);
    }
    //if ($('#first'))

  }
  function pinch_change()
  {
    var h = $('.pinch_line').first().height() - 60;
    var top;
    var bottom;
    if ($('.pinch_line #first').css('opacity') <= '0.2'){
      pinch_tim = clearInterval(pinch_tim);
      if (sex == 'male'){
        $('.pinch_line #first').css('top',h+'px');
        $('.pinch_line #second').css('bottom',h+'px');
      }
      else{
        $('.pinch_line #first').css('top','0'+'px');
        $('.pinch_line #second').css('bottom','0'+'px');
      }
    }
    else {
      
      var delta_h = Math.round(h/60);
      if (sex == 'male'){
        //$('.pinch_line #first').css('bottom',h+'px');
        top = $('.pinch_line #first').css('top');
        top = parseInt(top.substring(0,top.length-2));
        top += delta_h;
        $('.pinch_line #first').css('top',top+'px');
        bottom = $('.pinch_line #second').css('bottom');
        bottom = parseInt(bottom.substring(0,bottom.length-2));
        bottom += delta_h;
        $('.pinch_line #second').css('bottom',bottom+'px');
      }
      else{
        //$('.pinch_line #first').css('top',h+'px');
        top = $('.pinch_line #first').css('bottom');
        top = parseInt(top.substring(0,top.length-2));
        top += delta_h;
        $('.pinch_line #first').css('bottom',top+'px');
        bottom = $('.pinch_line #second').css('top');
        bottom = parseInt(bottom.substring(0,bottom.length-2));
        bottom += delta_h;
        $('.pinch_line #second').css('top',bottom+'px');
      }
      var new_opacity = $('.pinch_line #first').css('opacity');
      new_opacity -= 0.01;
      $('.pinch_line #first').css('opacity',new_opacity);
      $('.pinch_line #second').css('opacity',new_opacity);
    }
    //if ($('#first'))

  }
  function dblswp_change()
  {
    var h = $('.dbl_line').first().height() - 60;
    var top;
    if ($('.dbl_line #first').css('opacity') <= '0.22'){
      dblswp_tim = clearInterval(dblswp_tim);
      if (sex == 'male'){
        $('.dbl_line #first').css('bottom',h+'px');
        $('.dbl_line #second').css('bottom',h+'px');
      }
      else{
        $('.dbl_line #first').css('top',h+'px');
        $('.dbl_line #second').css('top',h+'px');
      }
    }
    else {
      
      var delta_h = Math.round(h/60);
      if (sex == 'male'){
        top = $('.dbl_line #first').css('bottom');
        top = parseInt(top.substring(0,top.length-2));
        top += delta_h;
        $('.dbl_line #first').css('bottom',top+'px');
        $('.dbl_line #second').css('bottom',top+'px');
      }
      else{
        top = $('.dbl_line #first').css('top');
        top = parseInt(top.substring(0,top.length-2));
        top += delta_h;
        $('.dbl_line #first').css('top',top+'px');
        $('.dbl_line #second').css('top',top+'px');
      }
      var new_opacity = $('.dbl_line #first').css('opacity');
      new_opacity -= 0.01;
      $('.dbl_line #first').css('opacity',new_opacity);
      $('.dbl_line #second').css('opacity',new_opacity);
    }
    //if ($('#first'))

  }
  function tap_change()
  {
    var h = $('.dbl_line').first().height() - 60;
    var top;
    if ($('.dbl_line #first').css('opacity') <= '0.22'){
      tap_tim = clearInterval(tap_tim);
    }
    else {
      var new_opacity = $('.tap_line #first').css('opacity');
      new_opacity -= 0.01;
      $('.tap_line #first').css('opacity',new_opacity);
    }
    //if ($('#first'))

  }
  var mob_tim;
  var pinch_tim;
  var dblswp_tim;
  var tap_tim;
  var adr = window.location.href;
  var line_height = 0;
  adr = adr.split('?');
  if (adr[1]){
    $('input[name=code]').remove();
    $('img').remove();
  }
  $(".go").on('click',function(){
    var id = "?id="+$('input[name=code]').val();
    var url = window.location.href;
    url += id;
    window.location.href = url;
  });
  $('input[type=text]').on('keyup',function(){
    this.value = this.value.toUpperCase();
  });

  var sex = '';
  var name = '';
  // Get the domain.
  var host = window.location.hostname;

  // Create a websocket object. Do something for IE.
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  // Create a connection to the server.
  var connection = new WebSocket('ws://' + host + ':1337');

  // When a connection is opened.
  connection.onopen = function () {

    // Get the ID from the URL.
    // TODO: Do some error checking to make sure it's there.
    var uniqueID = $.urlParam('id');

    // Send the unique ID back to the client.
    var msg = JSON.stringify({ type: 'connect', data: 'mobile', uniqueID: uniqueID });
    connection.send(msg);
  };

  // When the connection errors.
  connection.onerror = function (error) {
      // TODO: Implement error notifications when sending/receiving data.
  };

  // When a message is received from the server.
  connection.onmessage = function (message) {
      var received = JSON.parse(message.data);
      switch(received.type) {
        case 'sex':
          sex = received.data;
          if (sex == 'male'){
            $('.line #first').css('bottom','0px');
            $('.pinch_line #first').css('top','0px');
            $('.pinch_line #second').css('bottom','0px');
            $('.dbl_line #first').css('bottom','0px');
            $('.dbl_line #second').css('bottom','0px');
          }
          else{
            $('.line #first').css('top','0px');
            $('.pinch_line #first').css('bottom','0px');
            $('.pinch_line #second').css('top','0px');
            $('.dbl_line #first').css('top','0px');
            $('.dbl_line #second').css('top','0px');
          }
          break;
        case 'name':
          $('p.name').first().remove();
          name = received.data;
          $('p.name').css('line-height','10em').html('Здравствуй, '+name);
          break;
        case 'notify':
          switch(received.data) {
            case 'start':
              $('p.name').first().css('display','none');
              $('#mobile').css('padding-top','0');
              break;
            case 'swipe':
              $('#test').css('display','block').addClass('box');
              mob_tim = setInterval(change,50);
              break;
            case 'pinch':
              $('#test').css('display','block').addClass('pinch');
              var h = $('.pinch_line').first().height() - 60;
              pinch_tim = setInterval(pinch_change,50);
              break;
            case 'dblswipe':
              $('#test').css('display','block').addClass('dblswipe');
              var h = $('.dbl_line').first().height() - 60;
              dblswp_tim = setInterval(dblswp_change,50);
              break;
            case 'tap':
              $('#test').css('display','none');
              $('.tap').fadeIn();
              break;
            case 'dblswipe_new':
              $('.dblswipe_new').fadeIn();
              var h = $('.dbl_new_line').first().height() - 60;
              dblswp_tim = setInterval(dblswp_change,50);
              break
            case 'end':
              if (sex == 'male'){
                $('p.name').first().html('Грета инфицирована').css('display','block').css('color','red');
              }
              else{
                $('p.name').first().html('Грей инфицирован').css('display','block').css('color','red');
              }
              
              $('#mobile').css('background','black').css('padding-top','20%')
          }
          break;
      }
  };
  var f_tap = false;
  var s_tap = false;
  var t_tap = false;
  var fo_tap = false;
  $('.tap a').on('click',function(){
    $(this).css('opacity','0.2');
    if ($(this).hasClass('f')){
      f_tap = true;
    }
    if ($(this).hasClass('s')){
      s_tap = true;
    }
    if ($(this).hasClass('t')){
      t_tap = true;
    }
    if ($(this).hasClass('fo')){
      fo_tap = true;
    }
    if ((f_tap) && (s_tap) && (t_tap) && (fo_tap)){
      var msg = JSON.stringify({ type: 'swipe_request', data: 'tap', count: '1' });
      connection.send(msg);
      f_tap = false;
      s_tap = false;
      t_tap = false;
      fo_tap = false;
      $('.tap a').css('opacity','0.8');
      $('.tap').css('display','none');
    }
  });
  $("#test").swipe({
    //Generic swipe handler for all directions
    swipeStatus:function(event, phase, direction, distance, duration, fingers) {
      if ((phase == 'end') && (fingers == '1') && ($(this).hasClass('box'))){
          line_height = $('.line')[0].offsetHeight;
          if (sex == 'male')
          {
            if (direction == 'up')
            {
                clearInterval(mob_tim);
                var msg = JSON.stringify({ type: 'swipe_request', data: direction, count: fingers });
                connection.send(msg);
                $('.box').css('display','none');
                $('.line #first').removeAttr('style');
                $('.line #first').css('bottom','0px');
                //$('.line').remove();
                $('.box').removeClass('box');
            }
            else{
              alert('Please go up like doing some sex')
            }
          }
          else{
            if (direction == 'down')
            {
                clearInterval(mob_tim);
                var msg = JSON.stringify({ type: 'swipe_request', data: direction, count: fingers });
                connection.send(msg);
                $('.box').css('display','none');
                 $('.line #first').removeAttr('style');
                $('.line #first').css('top','0px');
                //$('.line').remove();
                $('.box').removeClass('box');
            }
            else{
              alert('Please go down you are woman sooo')
            }
          }
      }
      else if ((phase == 'end') && ($(this).hasClass('dblswipe'))){
          if (sex == 'male')
          {
            if (direction == 'up')
            {
                clearInterval(dblswp_tim);
                var msg = JSON.stringify({ type: 'swipe_request', data: direction, count: fingers });
                connection.send(msg);
                $('.dblswipe').css('display','none');
                $('.dbl_line').remove();
                $('.dblswipe').removeClass('dblswipe');
            }
            else{
              alert('Please go up like doing some sex')
            }
          }
          else{
            if (direction == 'down')
            {
                clearInterval(dblswp_tim);
                var msg = JSON.stringify({ type: 'swipe_request', data: direction, count: fingers });
                connection.send(msg);
                $('.dblswipe').css('display','none');
                //$('.dbl_line').remove();
                $('.dblswipe').removeClass('dblswipe');
            }
            else{
              alert('Please go down you are woman sooo')
            }
          }
      }
    },
    pinchIn:function(event, direction, distance, duration, fingerCount, pinchZoom)
    {
        if ((sex == 'female') && (distance > 100) && ($(this).hasClass('pinch'))){
          var msg = JSON.stringify({ type: 'swipe_request', data: direction, count: fingerCount });
          connection.send(msg);
          $('.pinch').css('display','none');
          $('.pinch_line').remove();
          $('.pinch').removeClass('pinch');
        }
    },
    pinchOut:function(event, direction, distance, duration, fingerCount, pinchZoom)
    {
        if ((sex == 'male') && (distance > 100) && ($(this).hasClass('pinch'))){
          var msg = JSON.stringify({ type: 'swipe_request', data: direction, count: fingerCount });
          connection.send(msg);
          $('.pinch').css('display','none');
          $('.pinch_line').remove();
          $('.pinch').removeClass('pinch');
        }
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
     threshold: line_height,
     fingers: 'all',
     excludedElements: "label,input, select, textarea, .noSwipe"
  });
});
