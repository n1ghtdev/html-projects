$(function() {

  $('.s_stub__frame-top').css({
    left: $('.s_stub__frame__logo').position().left + $('.s_stub__frame__logo').outerWidth() + 'px',
    right: $(window).width() - $('.s_stub__frame__lang').position().left + 'px',
  });

  $('.s_stub__frame-bot').css({
    left: $('.s_stub__frame__soc').position().left + $('.s_stub__frame__soc').outerWidth() + 'px',
    right: $(window).width() - $('.s_stub__frame__copyright').position().left + 'px',
  });


  $(window).on('resize', function(event) {
    event.preventDefault();
    $('.s_stub__frame-top').css({
      left: $('.s_stub__frame__logo').position().left + $('.s_stub__frame__logo').outerWidth() + 'px',
      right: $(window).width() - $('.s_stub__frame__lang').position().left + 'px',
    });

    $('.s_stub__frame-bot').css({
      left: $('.s_stub__frame__soc').position().left + $('.s_stub__frame__soc').outerWidth() + 'px',
      right: $(window).width() - $('.s_stub__frame__copyright').position().left + 'px',
    });
  });


  $('.txt-show').addClass('active')



// popap
  function magnificPopup_open(src) {
    $.magnificPopup.open({
      items: [{
        src: src,
        type: 'inline'
      }],
      mainClass: 'mfp-fade',
      removalDelay: 100,
      callbacks: {
        close: function() {
          setTimeout(function() {
            // $('html').css('overflow', 'visible');
          }, 100)
        }
      }
    });
  };
  $('[data-modal]').on("click", function(e) {
    magnificPopup_open($(this).attr('data-modal'));
    e.preventDefault();
  });

  //form send
  $(".ajax-form").submit(function(event) {
    var form = $(this);

    var data = new FormData(form[0]);
    form.addClass('no-submit');
    $.ajax({
      type: "POST",
      url: "./php/contact.php",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      success: function(msg) {
        if (msg) {
          magnificPopup_open('#thanx');
          form.trigger('reset');
          form.removeClass('no-submit');
        }
      }
    });
    return false
  });

  $('.popup__input input, .popup__input textarea').each(function() {
    var _this = $(this);
    if (_this.val() == "") {
      _this.closest('.popup__input').removeClass('hasData')
    } else {
      _this.closest('.popup__input').addClass('hasData')
    }
  })

  $('.popup__input input, .popup__input textarea')
    .on('focus', function() {
      var _this = $(this);
      _this.closest('.popup__input').addClass('hasData');
    })
    .on('blur', function() {
      var _this = $(this);
      if (_this.val() == "") {
        _this.closest('.popup__input').removeClass('hasData');
      } else {
        _this.closest('.popup__input').addClass('hasData');
      }
    });









});