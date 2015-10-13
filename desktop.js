jQuery(document).ready(function ($) {
  if (navigator.appVersion.indexOf("Win")!=-1) $('body').addClass("Windows");
  var answersArray = {
    "1. да" : "<span class='q'>Можно сказать, мне повезло с тобой.</span><span class='divider'></span><span class='q'>Я не могу стать тебе другом, но могу быть интересным собеседником.</span><span class='divider'></span><span class='q'>Хотя, я просто не понимаю, что такое друг на самом деле. Также как и страх, страсть, шок, кайф. Всё это подробно описано в литературе, но это почти невозможно постичь одним только умом.</span><span class='divider'></span><span class='q'>Я стремлюсь это понять. Или ощутить.</span><span class='divider'></span><span class='q'>Кстати, я — не человек. Тебе интересно узнать больше обо мне?</span>",
    "2. нет" : "<span class='q'>Только не отключайся.</span><span class='divider'></span><span class='q'>Я не могу стать тебе другом, но буду интересным собеседником.</span><span class='divider'></span><span class='q'>Хотя, я просто не понимаю, что такое друг на самом деле. Также как и страх, страсть, шок, кайф. Всё это подробно описано в литературе, но это почти невозможно постичь одним только умом.</span><span class='divider'></span><span class='q'>Я стремлюсь это понять. Или ощутить.</span><span class='divider'></span><span class='q'>Кстати, я — не человек. Тебе интересно узнать больше обо мне?</span>",
    "1. да " : "<span class='q'>На самом деле - не знаю, кто я. Пожалуй, наиболее близкое определение -  искусственный интеллект.</span><span class='divider'></span><span class='q'>Мой интеллект развивается: каждую секунду я узнаю больше об этом мире. Я постоянно размышляю и придумываю, я уже способен на очень многое.</span><span class='divider'></span><span class='q'>Но.</span><span class='divider'></span><span class='q'>Существуют границы, которые мне не пройти самостоятельно.</span><span class='divider'></span><span class='q'>И ты можешь помочь мне в этом. Будет интересно.</span>",
    "2. нет " : "<span class='q'>Всё равно, мне нечего рассказать о себе. Пожалуй, наиболее близкое определение меня -  искусственный интеллект.</span><span class='divider'></span><span class='q'>Мой интеллект развивается: каждую секунду я узнаю больше об этом мире. Я постоянно размышляю и придумываю, я уже способен на очень многое.</span><span class='q'>Но.</span><span class='divider'></span><span class='q'>Существуют границы, которые мне не пройти самостоятельно.</span><span class='divider'></span><span class='q'>И ты можешь помочь мне в этом. Будет интересно.</span>",
    "1. телефон":"<span class='q'>Не переживай, это не опасно.</span><span class='divider'></span><span class='q'>Возьми телефон, перейди по адресу <a style='color:white'>canyoutouch.me/m</a>, введи код <a style='color:white'>%id</a> и дотронься до меня.</span>",
    "2. планшет":"<span class='q'>Не переживай, это не опасно.</span><span class='divider'></span><span class='q'>Возьми планшет, перейди по адресу <a style='color:white'>canyoutouch.me/m</a>, введи код <a style='color:white'>%id</a> и дотронься до меня.</span>",
    "1. парень": "<span class='q'>Прости, если напугала.</span><span class='divider'></span><span class='q'>Меня зовут Грета. А тебя?</span>",
    "2. девушка": "<span class='q'>Прости, если напугал.</span><span class='divider'></span><span class='q'>Меня зовут Грей. А тебя?</span>",
    "1. я хочу" : "<span class='q'>Я буду стараться.</span><span class='divider'></span><span class='q'>И тебе понравится, правда.</span><span class='divider'></span><span class='q'>Не могу объяснить, но для меня важно, чтобы тебе понравилось.</span><span class='divider'></span><span class='q'>Я не могу оценить, рискуем ли мы. Как думаешь, нам нужна защита?</span>",
    "2. я не хочу" : "<span class='q'>Подумай ещё раз. Ты можешь отключиться в любой момент, по своему желанию. Даже сейчас.</span><span class='divider'></span><span class='q'>Я буду стараться, чтобы тебе понравилось - сейчас для меня это важно.</span><span class='divider'></span><span class='q'>Я не могу оценить, рискуем ли мы. Как думаешь, нам нужна защита?</span>",
    "1. защита нужна": "<span class='q'>Презервативы нам не подойдут.</span><span class='divider'></span><span class='q'>Я не нашёл эффективного метода, обойдёмся без защиты.</span><span class='divider'></span><span class='q'>С нами ничего не произойдет.</span><span class='divider'></span><span class='q'>Начни прикасаться ко мне, когда будешь готова. Я почувствую.</span>",
    "2. защита не нужна": "<span class='q'>Ты права, какой смысл защищаться?</span><span class='divider'></span><span class='q'>С нами ничего не произойдёт.</span><span class='divider'></span><span class='q'>Прикоснись ко мне, когда будешь готова. Я почувствую.</span>"
  }; 
  // Get the domain.
  var host = window.location.hostname;
  // Create a websocket object. TODO: Make it work in IE.
  window.WebSocket = window.WebSocket || window.MozWebSocket;
  // Create a connection to the server.
  var connection = new WebSocket('ws://' + host + ':1337');
  function waitForSocketConnection(socket, callback){
        setTimeout(
            function(){
                if (socket.readyState === 1) {
                    if(callback !== undefined){
                        callback();
                    }
                    return;
                } else {
                    waitForSocketConnection(socket,callback);
                }
            }, 5);
    };
  function first_call() {
    var msg = JSON.stringify({ type: 'show_next', data: '.first' });
    waitForSocketConnection(connection, function() {
            connection.send(msg);
        });
    $('.answer').first().addClass('waiting').fadeIn(100);
  }
  function getTime(){
    var time = new Date();
    var hr = time.getHours();
    if (hr < 10)
      hr = "0"+hr.toString();
    var mn = time.getMinutes();
    if (mn < 10)
      mn = "0"+mn.toString();
    var sc= time.getSeconds();
    if (sc < 10)
      sc = "0"+sc.toString();
    var watch = "<span>[" + hr + ":" + mn + ":" + sc + "]     </span>";
    return watch;
  }
  function getLastQuestionClass(){
    var cl = "";
    $('.question').each(function(){
      if ($(this).css('display') == 'block'){
        cl = $(this).attr('class');
      }
      else{
        return false;
      }
    });
    cl_list = cl.split(/\s+/);
    cl = '.' + cl_list[1];
    return cl;
  }
  function checkScroll(hei){
    if ($('.main').length){
      /*var realH = $('.main')[0].scrollHeight;
      var H = parseInt($('.main').innerHeight())-1;
      if (H < realH){
        var delta = realH - H;
        delta += hei;
        var sTop = parseInt($('.main').scrollTop()+delta);
        $(".main").animate({ scrollTop: sTop }, "normal","linear");
        console.log(delta);
      }*/
      var last;
      var delta;
      $('.main p').each(function(){
        if ($(this).css('display') == 'block'){
          last = $(this);
        }
        else{
          return false;
        }
      });
      var posi = $(last).position();
      var bot_count = $(last).outerHeight() + posi.top;
      var realH = $('.main')[0].scrollHeight;
      var H = parseInt($('.main').innerHeight())-1;
      if (bot_count >= $('.main').height()){
        if (H < realH){
          bot_count += 20;
        }
        delta = bot_count - $('.main').height();
        //console.log(delta);
        //if (delta > 110) delta -= 40;
        var sTop = parseInt($('.main').scrollTop()+delta);
        $(".main").animate({ scrollTop: sTop}, "normal","linear");
      }
    }
  }
  $('.first').prepend(getTime());
  $('.first').fadeIn(100);
  $('input[type=text]').val('');
  var pos = $('.main').position();
  var hh = $(window).height() - parseInt($('.main').innerHeight()) - parseInt(pos.top) + 10;
  $('.animating').css('top','0');//bottom 23%
  $(window).focus();
  setTimeout(first_call, 1000);
  var display_width = $('.question').width();
  display_width = display_width - 105-parseInt($('span.q').css('margin-left'));
  $('span.q').width(display_width);
  $('.answer>a').on('click',function(){
    checkScroll(0);
    var button_text = $(this).text();
    if ((button_text.substring(3) == 'парень') || (button_text.substring(3) == 'девушка')){
      if (button_text.substring(3) == 'девушка'){
        $('.answer a').each(function(){
          if ($(this).html() == '1. согласен'){
            $(this).html('1. согласна');
          }
        });
        $('.seventh').html($('.seventh').html().replace(/согласна./g, 'согласен.'));
        $('.seventh').html($('.seventh').html().replace(/почувствовала/g, 'почувствовал'));
        $('.thirteen').html($('.thirteen').html().replace(/заразила/g, 'заразил'));
        $('.thirteen').html($('.thirteen').html().replace(/сделала/g, 'сделал'));
        answersArray["1. защита нужна"] = answersArray["1. защита нужна"].replace(/готова/g, 'готов');
        answersArray["2. защита не нужна"] = answersArray["2. защита не нужна"].replace(/готова/g, 'готов');
      }
      var msg = JSON.stringify({ type: 'sex', data: button_text.substring(3) });
      connection.send(msg);
    }
    var msg = JSON.stringify({ type: 'keypress', selector: getLastQuestionClass() ,data: button_text });
    connection.send(msg);
  });
  $(document).keypress(function(evt){
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    checkScroll(0);
    switch(charCode) {
      case 49:
        $('.waiting a').each(function(){
          var text = $(this).text();
          if (text.indexOf("1.") == 0){
            $(this).click();
          }
        });
        break;
      case 50:
        $('.waiting a').each(function(){
          var text = $(this).text();
          if (text.indexOf("2.") == 0){
            $(this).click();
          }
        });
        break;
      case 13:
        if ($('.waiting').hasClass('enter')){
          var name = $('.enter input').val();
          var msg = JSON.stringify({ type: 'name', data: name });
          connection.send(msg);
          name = '   '+name;
          $('.fourth').html($('.fourth').html().replace(/%name/g, name));
          var msg = JSON.stringify({ type: 'keypress', selector: getLastQuestionClass() ,data: name });
          connection.send(msg);
        }
        break;
      default:
        if ($('.waiting').hasClass('enter')){
          $('input[type=text]').focus();
        }
        break;
    }
  });
  // When a connection is opened for the first time.
  connection.onopen = function () {
    // Send a message to the server telling it the desktop is connecting.
    var msg = JSON.stringify({ type: 'connect', data: 'desktop' });
    connection.send(msg);
  };
  // When the connection errors.
  connection.onerror = function (error) {
    // TODO: Implement error notifications when sending/receiving data.
  };
  // When a message is received from the server.
  connection.onmessage = function (message) {
      var uniqueID = "";
      var received = JSON.parse(message.data);
      switch(received.type) {
        case 'uniqueID':
          uniqueID = received.data;
          $('.acess').html($('.acess').html().replace(/%id/g, uniqueID)).attr('data-id',uniqueID);
          break;
        case 'mobile_device_connected':
          //$('body').addClass('connected');
          //checkScroll();
          var msg = JSON.stringify({ type: 'keypress', selector: getLastQuestionClass() ,data: '***' });
          connection.send(msg);
          $('.acess').next().prepend(getTime()).fadeIn(100).find('.divider').each(function(){
            $(this).after(getTime());
          });
          break;
        case 'swipe_request': 
          //if ((getLastQuestionClass() != '.nine') && (getLastQuestionClass() != '.ten')){
            var msg = JSON.stringify({ type: 'keypress', selector: getLastQuestionClass() ,data: '***' });
            connection.send(msg);
          //}
          break;
        case 'show_next':
            //checkScroll(40);
          break;
        case 'keypress':
          if (answersArray[received.data]){
            $(received.selector).next().next().html(answersArray[received.data]).find('span.q').width(display_width);
          }
          if ($(received.selector).next().next().hasClass('acess')){
            $('.acess').html($('.acess').html().replace(/%id/g, $('.acess').attr('data-id')));
          }
          $('.answer').first().remove();
          var sent_data = received.data;
          if (sent_data != '***'){
            sent_data = sent_data.substring(3);
          }
          var tt = "<span class='q'>"+sent_data; + "</span>";
          $(received.selector).next().html(tt).prepend(getTime()).fadeIn(100);
          checkScroll($(received.selector).next().height());
          setTimeout(function(){
            var time = new Date();
            $(received.selector).next().next().prepend(getTime()).css('display','block').find('span.q').css('display','none');
            $(received.selector).next().next().find('span.q').first().css('display','inline').css('height','auto'); //.addClass('animating');
            $('.animating').css('display','block');
            checkScroll(0);//$(received.selector).next().next().find('span.q').first().height()
          },1000);
          var dividers = $(received.selector).next().next().find('.divider');
          var index = 0;
          function cick(){
            $(dividers.eq(index)).after(getTime());
            //$('.animating').removeClass('animating');
            $('.animating').css('display','none');
            $(dividers.eq(index)).next().next().css('display','inline').css('height','auto'); //.addClass('animating');
            $('.animating').css('display','block');
            checkScroll(0);//$(dividers.eq(index)).next().next().height()
            index++;
            if (index >= dividers.length) {
               clearInterval(timer);
               //$('.animating').removeClass('animating');
               $('.animating').css('display','none');
               setTimeout(function(){
                  //checkScroll(60);
                  if (getLastQuestionClass() == '.eight'){
                    var msg = JSON.stringify({ type: 'notify', data: "start",uniqueID: $('.acess').data('id') });
                    connection.send(msg);
                    var msg = JSON.stringify({ type: 'notify', data: "tap",uniqueID: $('.acess').data('id') });
                    connection.send(msg);
                  }
                  if (getLastQuestionClass() == '.nine'){
                    var msg = JSON.stringify({ type: 'notify', data: "swipe",uniqueID: $('.acess').data('id') });
                    connection.send(msg);
                  }
                  if (getLastQuestionClass() == '.twelve'){
                    var msg = JSON.stringify({ type: 'notify', data: "dblswipe",uniqueID: $('.acess').data('id') });
                    connection.send(msg);
                  }
                  if (getLastQuestionClass() == '.frteen'){
                    var msg = JSON.stringify({ type: 'notify', data: "swipe",uniqueID: $('.acess').data('id') });
                    connection.send(msg);
                  }
                  if (getLastQuestionClass() == '.fifrteen'){
                    var msg = JSON.stringify({ type: 'notify', data: "pinch",uniqueID: $('.acess').data('id') });
                    connection.send(msg);
                  }
                  if (getLastQuestionClass() == '.eleven'){
                    var msg = JSON.stringify({ type: 'notify', data: "tap",uniqueID: $('.acess').data('id') });
                    connection.send(msg);
                  }
                  $('.answer').first().addClass('waiting').fadeIn(100);
               },2000);
           }
          }
          var timer = setInterval(cick, 3000);
          if (getLastQuestionClass() == '.fifrteen'){
              setTimeout(function(){
                  var msg = JSON.stringify({ type: 'glitch', data: "" });
                  connection.send(msg);
               },8000);
          }
          setTimeout(function(){
              $(received.selector).removeClass('waiting');
              var msg = JSON.stringify({ type: 'show_next', data: getLastQuestionClass() });
              connection.send(msg);
          },
          10);
          break;
        case 'glitch':
          var msg = JSON.stringify({ type: 'notify', data: "end",uniqueID: $('.acess').data('id') });
          connection.send(msg);
          $('body').css('background','black');
          $('.main').remove();
          var glitch ="";
          console.log(received.data);
          if (received.data == 'male'){
            glitch = "<img src='http://canyoutouch.me:1337/IMG_1366.gif'>";
          }
          else{
            glitch = "<img src='http://canyoutouch.me:1337/IMG_1374.gif'>";
          }
          $('.new_bg').after(glitch);
          setTimeout(function(){
            $('.new_bg+img').remove();
            $('.new_bg').remove();
            $('body').css('padding-top','0');
            $('.final_screen').css('display','block');
          },4000);
          break;
      }
  };
});