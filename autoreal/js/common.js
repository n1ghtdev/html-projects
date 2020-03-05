$(function() {

  // file name select
  $('input[type="file"]').on("change", function() {
    var files_str = "";
    files = this.files;
    for (var a = 0; a < files.length; a++) {
      if (a != files.length - 1) {
        files_str += files[a].name + ", ";
      } else {
        files_str += files[a].name;
      }
    };
    files_str != "" ? true : files_str = $(this).closest("div").find("label").data('placeholder');
    $(this).closest("div").find("label").text(files_str).attr("title", files_str);
  });



  // popap
  function magnificPopup_open(src) {
    $.magnificPopup.open({
      items: [{
        src: src,
        type: 'inline'
      }],
      mainClass: 'mfp-fade',
      closeMarkup: '<button title="%title%" type="button" class="mfp-close"><svg   xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink"  width="14px" height="14px"> <path fill-rule="evenodd"  opacity="0.38" fill="rgb(0, 0, 0)"  d="M13.364,11.950 L11.950,13.364 L7.000,8.414 L2.050,13.364 L0.636,11.950 L5.586,7.000 L0.636,2.050 L2.050,0.636 L7.000,5.586 L11.950,0.636 L13.364,2.050 L8.414,7.000 L13.364,11.950 Z"/> </svg></button>',
      removalDelay: 150,
      callbacks: {
        close: function() {
          setTimeout(function() {
            $('html').css('overflow', 'visible');
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
    $(this).find("input[type=file]").each(function(i, file) {
      var files = this.files;
      for (var a = 0; a < files.length; a++) {
        data.append('file-' + i + "-" + a, files[a]);
      }
    });
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
          form.find('input[type="file"]').closest('div').find('label').text("Добавить файл(документ или изоражение)");

        }
      }
    });
    return false
  });

  $('.header__bars').on('click', function(event) {
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('active');
  });

    $(document).mouseup(function(e) {
    var button = $('.header__nav, .header__nav *, .header__bars, .header__bars *');
    if (!button.is(e.target)) {
      $('.header__nav').removeClass('active');
      $('.header__bars').removeClass('active')
    }
  });


    $('.s_catalog__itm, .s_service__itm').on('click', function(event) {
    	event.preventDefault();
    	$('#order_popup form input[name="subject"]').val('Узнать наличие и стоимость атозапчастей '+ $(this).find('h3').text());
    });
   $('.s_catalog .btn').on('click', function(event) {
    	event.preventDefault();
    	$('#order_popup form input[name="subject"]').val('Узнать наличие и стоимость атозапчастей');
    });
});