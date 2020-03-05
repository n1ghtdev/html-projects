$(function() {
  var endTimer = '2018/12/11 23:59:59'
  $('.f_footer__coundown .day').countdown(endTimer)
    .on('update.countdown', function(event) {
      var format = '';
      format = '%n ' + format;
      $(this).html(event.strftime(format));
    })
    .on('finish.countdown', function(event) {
      $(this).html(event.strftime("00"));
    });

  $('.f_footer__coundown .hours').countdown(endTimer)
    .on('update.countdown', function(event) {
      $(this).html(event.strftime('%H'));
    })
    .on('finish.countdown', function(event) {
      $(this).html(event.strftime("00"));
    });

  $('.f_footer__coundown .minutes').countdown(endTimer)
    .on('update.countdown', function(event) {
      $(this).html(event.strftime('%M'));
    })
    .on('finish.countdown', function(event) {
      $(this).html(event.strftime("00"));
    });

  $('.f_footer__coundown .seconds').countdown(endTimer)
    .on('update.countdown', function(event) {
      $(this).html(event.strftime('%S'));
    })
    .on('finish.countdown', function(event) {
      $(this).html(event.strftime("00"));
    });





  var titleCur = 0;
  setInterval(function() {
    $('#s_home__title-change_text').fadeOut('fast', function() {
      $('#s_home__title-change_text').html(s_home__title_change_text[titleCur]);
    });
    $('#s_home__title-change_text').fadeIn('fast');
    titleCur++;
    if (titleCur == s_home__title_change_text.length) {
      titleCur = 0;
    }
  }, 5000);




  var navList = ['home', 'oportunities', 'platform', 'platform-2', 'platform-3', 'platform-4', 'platform-5', 'platform-6', 'last'];
  if ($(window).width() >= 992) {
    $('#fullpage').fullpage({
      scrollingSpeed: 800,
      responsiveHeight: 650,
      hybrid: true,
      // fitToSection: true,
      // fitToSectionDelay: 100,
      anchors: navList,
      navigation: true,
      navigationTooltips: ['', '', '1', '2', '3', '4', '5', '6', ''],
      sectionSelector: '.fullpage-section',
      lockAnchors: true,
      css3: true,
      normalScrollElements: '.s_oportunities__list',
      // autoScrolling: true,
      // scrollBar: true,
      afterLoad: function(anchorLink, index) {
        if (index == 1 || index == 2 || index == 9) {
          $('#fp-nav').hide();
        } else {
          $('#fp-nav').show();
        }
      },
      onLeave: function(index, nextIndex, direction) {
        if (nextIndex == 1 || nextIndex == 2 || nextIndex == 9) {
          $('#fp-nav').hide();
        } else {
          $('#fp-nav').show();
        }
      }
    });
  } else {
  }


  // if (window.innerWidth >= 992) {
  //   var isScroll = false;
  //   $('#home').on('mousewheel', function(event) {
  //     if (event.deltaY < 0 && !isScroll) {
  //       isScroll = true;
  //       $('html, body').stop().animate({
  //         scrollTop: $('#oportunities').offset().top
  //       }, 500, "swing", function() {
  //         isScroll = false;
  //       });
  //     }
  //   });
  // }

  $(window).scroll(function() {
    var t = $('.header nav li').find('a.active');
    if (t.length) {
      $(".cur-menu-line").css('left', t.position().left).width(t.width())
    } else {
      $(".cur-menu-line").width(0)
    }
  });


  if (window.innerWidth <= 992) {
    $('.s_team__itm.empty').remove();
  }



  $('.s_arena__carousel').slick({
    fade: true,
    arrows: false,
    dots: true,
  });


  $('.s_partners__carousel').slick({
    fade: true,
    infinite: false,
    prevArrow: '.s_partners__carousel-prev_wrap',
    nextArrow: '.s_partners__carousel-next_wrap',
    rows: 5,
    slidesPerRow: 3,
    responsive: [{
      breakpoint: 767,
      settings: {
        rows: 3,
        slidesPerRow: 5,
      }
    }, ]
  });

  $('.s_roadmap__list').slick({
    responsive: [{
      breakpoint: 10000,
      settings: "unslick"
    }, {
      breakpoint: 767,
      settings: {
        prevArrow: '.s_roadmap__carousel-prev_wrap',
        nextArrow: '.s_roadmap__carousel-next_wrap',
        initialSlide: 2,
      }
    }],
  });
  $('.s_team__list').slick({
    responsive: [{
      breakpoint: 10000,
      settings: "unslick"
    }, {
      breakpoint: 767,
      settings: {
        prevArrow: '.s_team__carousel-prev_wrap',
        nextArrow: '.s_team__carousel-next_wrap',
        // touchThreshold: 100
      }
    }],
  });



  var partnersCnt = $('.s_partners__carousel .slick-slide').length;


  var s_partnersSlideItmCnt = [];
  var tmp = 0;
  $('.s_partners__carousel .slick-slide').each(function(index, el) {
    s_partnersSlideItmCnt.push((tmp + 1) + "-" + (tmp + $(this).find('.s_partners__logo').length));
    tmp += $(this).find('.s_partners__logo').length;
  });

  $('.s_partners__carousel-prev_wrap h4 span').text(s_partnersSlideItmCnt[s_partnersSlideItmCnt.last]);
  $('.s_partners__carousel-next_wrap h4 span').text(s_partnersSlideItmCnt[1]);

  $('.s_partners__carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    var pi = nextSlide == 0 ? partnersCnt - 1 : nextSlide - 1;
    var ni = nextSlide == partnersCnt - 1 ? 0 : nextSlide + 1;
    $('.s_partners__carousel-prev_wrap h4 span').text(s_partnersSlideItmCnt[pi]);
    $('.s_partners__carousel-next_wrap h4 span').text(s_partnersSlideItmCnt[ni]);
  });




  if (window.innerWidth >= 768) {

    $('.s_token__diagram__circle').viewportChecker({
      offset: '50%',
      callbackFunction: function(elem, action) {
        TweenMax.from(".s_token__diagram__circle circle", 1, { strokeDasharray: "0 1100", onComplete: function() { $('.s_token__diagram__legend li').addClass('active') } }, );

      }
    });
  }



  $('.s_faq__list .toggle').click(function(e) {
    e.preventDefault();
    var $this = $(this);
    if ($this.next().hasClass('show')) {
      $this.next().removeClass('show');
      $this.closest('li').removeClass('active');
      $this.next().slideUp(350);
    } else {
      $this.closest('.s_faq__list').find('li.active .inner').removeClass('show').slideUp(350);
      $this.closest('.s_faq__list').find('li.active').removeClass('active');
      $this.closest('li').toggleClass('active');
      $this.next().toggleClass('show');
      $this.next().slideToggle(350);
    }
  });




  $('.section').viewportChecker({
    offset: window.innerHeight / 2,
    repeat: 1,
    callbackFunction: function(elem, action) {
      var curSection = $('.header nav li a[href="#' + elem.attr('data-nav') + '"]');
      $('.header nav li a.active').not(curSection).removeClass('active');
      curSection.addClass('active');
    }
  });


  $('.footer .s_title').viewportChecker({
    offset: 100,
    repeat: 1,
    callbackFunction: function(elem, action) {
      action == 'add' ? $('.f_footer').fadeOut('fast') : $('.f_footer').fadeIn('fast');
    }
  });

  $("[data-fancybox]").fancybox({
    media: {
      youtube: {
        params: {
          showinfo: 0,
        }
      }
    }
  });

  $('.anchor').anchor({
    transitionDuration: 400,
  })

  $(".s_oportunities__list").mCustomScrollbar({
    axis: 'y',
    // documentTouchScroll: true,
    // contentTouchScroll: 25,
    // scrollbarPosition: "outside",

  });


  $('.header__bars').on('click', function(event) {
    event.preventDefault();
    $('.m_menu').addClass('active')
  });
  $('.m_menu__close, .m_menu ul li').on('click', function(event) {
    event.preventDefault();
    $('.m_menu').removeClass('active')
  });





  if (window.innerWidth >= 768) {

    var cube_div = document.getElementById('cube_div');
    var three = THREE;

    var scene = new three.Scene();
    var camera = new three.PerspectiveCamera(35, 1, 1, 400);
    camera.position.x = 150;
    camera.position.y = -100;
    camera.position.z = 250;
    var controls = new three.OrbitControls(camera, cube_div);
    controls.enableZoom = false;
    controls.enableKeys = false;
    controls.enablePan = false;



    var renderer = new three.WebGLRenderer({ alpha: true });
    renderer.setSize(cube_div.offsetWidth, cube_div.offsetHeight);
    cube_div.appendChild(renderer.domElement);
		var maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    var ambient = new THREE.AmbientLight(0xffffff, 1.75);
    scene.add(ambient);


    var cubeSize = 100;
    var cubeHalfSize = cubeSize / 2;
    var lightDepth = 0.75;
    var RectAreaLightIntensity = 50;
    var edgeLight = new THREE.Object3D;
    // var sideLinks3d = new THREE.Object3D;
    var mash = new THREE.Object3D;

    var geometry = new three.BoxGeometry(cubeSize, cubeSize, cubeSize);

    var texture = new THREE.TextureLoader().load('/img/cube-arena-1-n.jpg');
    var texture2 = new THREE.TextureLoader().load('/img/cube-wallet-1.jpg');
    var texture3 = new THREE.TextureLoader().load('/img/cube-betting-1.jpg');
    var texture4 = new THREE.TextureLoader().load('/img/cube-stream-1.jpg');
    var texture5 = new THREE.TextureLoader().load('/img/cube-marketplace-1.jpg');
    var texture6 = new THREE.TextureLoader().load('/img/cube-store-1.jpg');
    var textureHover = new THREE.TextureLoader().load('/img/cube-arena-1-n-h.jpg');
    var texture2Hover = new THREE.TextureLoader().load('/img/cube-wallet-1-h.jpg');
    var texture3Hover = new THREE.TextureLoader().load('/img/cube-betting-1-h.jpg');
    var texture5Hover = new THREE.TextureLoader().load('/img/cube-marketplace-1-h.jpg');
    var texture4Hover = new THREE.TextureLoader().load('/img/cube-stream-1-h.jpg');
    var texture6Hover = new THREE.TextureLoader().load('/img/cube-store-1-h.jpg');
    texture.anisotropy = maxAnisotropy;
    texture.anisotropy2 = maxAnisotropy;
    texture.anisotropy3 = maxAnisotropy;
    texture.anisotropy4 = maxAnisotropy;
    texture.anisotropy5 = maxAnisotropy;
    texture.anisotropy6 = maxAnisotropy;
    textureHover.anisotropy = maxAnisotropy;
    texture2Hover.anisotropy = maxAnisotropy;
    texture3Hover.anisotropy = maxAnisotropy;
    texture4Hover.anisotropy = maxAnisotropy;
    texture5Hover.anisotropy = maxAnisotropy;
    texture6Hover.anisotropy = maxAnisotropy;



    var material = [
      new three.MeshPhysicalMaterial({
        map: texture2,
        roughness: 1,
        metalness: 0.5,
      }),
      new three.MeshPhysicalMaterial({
        map: texture5,
        roughness: 1,
        metalness: 0.5,
      }),
      new three.MeshPhysicalMaterial({
        map: texture4,
        roughness: 1,
        metalness: 0.5,
      }),
      new three.MeshPhysicalMaterial({
        map: texture3,
        roughness: 1,
        metalness: 0.5,
      }),
      new three.MeshPhysicalMaterial({
        map: texture,
        roughness: 1,
        metalness: 0.5,
      }),
      new three.MeshPhysicalMaterial({
        map: texture6,
        roughness: 1,
        metalness: 0.5,
      })
    ]

    var cube = new three.Mesh(geometry, material);
    scene.add(cube);






    var sideLinks = [];

    var geometry = new THREE.PlaneGeometry(cubeSize, cubeSize);
    // var material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 0, });
    var material = new three.MeshPhysicalMaterial({
      map: textureHover,
      roughness: 1,
      metalness: 0.5,
      transparent: true,
      opacity: 0,

    })
    var plane = new THREE.Mesh(geometry, material);
    plane.position.z = 50.01;
    plane.url = 1;
    sideLinks.push(plane);
    scene.add(plane);



    var geometry = new THREE.PlaneGeometry(cubeSize, cubeSize);
    // var material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 1, });
    var material = new three.MeshPhysicalMaterial({
      map: texture6Hover,
      roughness: 1,
      metalness: 0.5,
      transparent: true,
      opacity: 0,

    })
    var plane = new THREE.Mesh(geometry, material);
    plane.position.z = -50.01;
    plane.rotation.y = Math.PI;
    plane.url = 4;
    sideLinks.push(plane);
    scene.add(plane);


    var geometry = new THREE.PlaneGeometry(cubeSize, cubeSize);
    // var material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 1, });
    var material = new three.MeshPhysicalMaterial({
      map: texture2Hover,
      roughness: 1,
      metalness: 0.5,
      transparent: true,
      opacity: 0,

    })
    var plane = new THREE.Mesh(geometry, material);
    plane.position.x = 50.01;
    plane.rotation.y = Math.PI / 2;
    plane.url = 2;
    sideLinks.push(plane);
    scene.add(plane);


    var geometry = new THREE.PlaneGeometry(cubeSize, cubeSize);
    // var material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 1, });
    var material = new three.MeshPhysicalMaterial({
      map: texture5Hover,
      roughness: 1,
      metalness: 0.5,
      transparent: true,
      opacity: 0,

    })
    var plane = new THREE.Mesh(geometry, material);
    plane.position.x = -50.01;
    plane.rotation.y = -Math.PI / 2;
    plane.url = 5;
    sideLinks.push(plane);
    scene.add(plane);


    var geometry = new THREE.PlaneGeometry(cubeSize, cubeSize);
    // var material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 1, });
    var material = new three.MeshPhysicalMaterial({
      map: texture4Hover,
      roughness: 1,
      metalness: 0.5,
      transparent: true,
      opacity: 0,
    })
    var plane = new THREE.Mesh(geometry, material);
    plane.position.y = 50.01;
    plane.rotation.x = -Math.PI / 2;
    plane.url = 3;
    sideLinks.push(plane);
    scene.add(plane);


    var geometry = new THREE.PlaneGeometry(cubeSize, cubeSize);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, transparent: true, opacity: 1, });
    var material = new three.MeshPhysicalMaterial({
      map: texture3Hover,
      roughness: 1,
      metalness: 0.5,
      transparent: true,
      opacity: 0,
    })
    var plane = new THREE.Mesh(geometry, material);
    plane.position.y = -50.01;
    plane.rotation.x = Math.PI / 2;
    plane.url = 6;
    sideLinks.push(plane);
    scene.add(plane);

    var INTERSECTED;
    var isClick = true;



    // var intensity = 0,
    //   edgeLightCurrent;

    // function edgeLightSwitchOff() {
    //   for (var i = 0; i < edgeLight.children.length; i++) {
    //     edgeLight.children[i].intensity = 0;
    //   }
    // }

    // function edgeLightSwitchOn(url) {
    //   	// edgeLightSwitchOff();
    //   // if (edgeLightCurrent != url) {
    //   //   edgeLightCurrent = url;
    //   switch(url){
    //     case 1: 
    //       edgeLight.children[0].intensity = RectAreaLightIntensity;
    //       edgeLight.children[1].intensity = RectAreaLightIntensity;
    //       edgeLight.children[2].intensity = RectAreaLightIntensity;
    //       edgeLight.children[3].intensity = RectAreaLightIntensity;
    //       break;
    //     case 4: 
    //       edgeLight.children[4].intensity = RectAreaLightIntensity;
    //       edgeLight.children[5].intensity = RectAreaLightIntensity;
    //       edgeLight.children[6].intensity = RectAreaLightIntensity;
    //       edgeLight.children[7].intensity = RectAreaLightIntensity;
    //       break;
    //     case 3: 
    //       edgeLight.children[8].intensity = RectAreaLightIntensity;
    //       edgeLight.children[9].intensity = RectAreaLightIntensity;
    //       edgeLight.children[10].intensity = RectAreaLightIntensity;
    //       edgeLight.children[11].intensity = RectAreaLightIntensity;
    //       break;
    //     case 6: 
    //       edgeLight.children[12].intensity = RectAreaLightIntensity;
    //       edgeLight.children[13].intensity = RectAreaLightIntensity;
    //       edgeLight.children[14].intensity = RectAreaLightIntensity;
    //       edgeLight.children[15].intensity = RectAreaLightIntensity;
    //       break;
    //     case 2: 
    //       edgeLight.children[16].intensity = RectAreaLightIntensity;
    //       edgeLight.children[17].intensity = RectAreaLightIntensity;
    //       edgeLight.children[18].intensity = RectAreaLightIntensity;
    //       edgeLight.children[19].intensity = RectAreaLightIntensity;
    //       break;
    //     case 5: 
    //       edgeLight.children[20].intensity = RectAreaLightIntensity;
    //       edgeLight.children[21].intensity = RectAreaLightIntensity;
    //       edgeLight.children[22].intensity = RectAreaLightIntensity;
    //       edgeLight.children[23].intensity = RectAreaLightIntensity;
    //       break;
    //   }
    // }

    cube_div.addEventListener('mousedown', function() {
      isClick = true;
    }, false);
    // cube_div.addEventListener("mousemove", function() {
    // }, false);

    cube_div.addEventListener('mouseup', onDocumentMouseUp, false);

    cube_div.addEventListener('mousemove', onDocumentMouseMove, false);


    function onDocumentMouseMove(event) {
      isClick = false;
      var mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - cube_div.getBoundingClientRect().left) / cube_div.offsetWidth) * 2 - 1;
      mouse.y = -((event.clientY - cube_div.getBoundingClientRect().top) / cube_div.offsetHeight) * 2 + 1;
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(sideLinks);
      if (intersects.length > 0) {
        $('#cube_div').css('cursor', 'pointer');
        if (intersects[0].object != INTERSECTED) {
          if (INTERSECTED) {
            INTERSECTED.material.opacity = 0;
            // edgeLightSwitchOff();
          }
          INTERSECTED = intersects[0].object;
          // INTERSECTED.material.opacity = 1;
          setInterval(function() {
            if (INTERSECTED) { INTERSECTED.material.opacity += 0.1; }
          }, 100)
          
          // edgeLightSwitchOn(intersects[0].object.url)

        }
      } else {
        $('#cube_div').css('cursor', 'move');
        if (INTERSECTED)
          INTERSECTED.material.opacity = 0;
        INTERSECTED = null;
        // edgeLightSwitchOff()
      }
    }



    function onDocumentMouseUp(event) {
      if (isClick) {
        var vector = new THREE.Vector3(((event.clientX - cube_div.getBoundingClientRect().left) / cube_div.offsetWidth) * 2 - 1, -((event.clientY - cube_div.getBoundingClientRect().top) / cube_div.offsetHeight) * 2 + 1, 0.5);
        vector = vector.unproject(camera);
        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects(sideLinks);
        if (intersects.length > 0) {
          $('html, body').stop().animate({
            scrollTop: $('.s_arena-' + intersects[0].object.url).offset().top
          }, 1000, "swing");
        }
      }
    }


    // arena
    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(0, cubeHalfSize, (cubeHalfSize + lightDepth));
    // rectLight.lookAt(0, 0, (cubeHalfSize));
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(0, -cubeHalfSize, (cubeHalfSize + lightDepth));
    // rectLight.lookAt(0, 0, (cubeHalfSize));
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, lightDepth, cubeSize);
    // rectLight.position.set(cubeHalfSize, 0, (cubeHalfSize + lightDepth));
    // rectLight.lookAt(0, 0, (cubeHalfSize));
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, lightDepth, cubeSize);
    // rectLight.position.set(-cubeHalfSize, 0, (cubeHalfSize + lightDepth));
    // rectLight.lookAt(0, 0, (cubeHalfSize));
    // edgeLight.add(rectLight);

    // // store
    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(0, cubeHalfSize, -(cubeHalfSize + lightDepth));
    // rectLight.lookAt(0, 0, -(cubeHalfSize));
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(0, -cubeHalfSize, -(cubeHalfSize + lightDepth));
    // rectLight.lookAt(0, 0, -(cubeHalfSize));
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, lightDepth, cubeSize);
    // rectLight.position.set(cubeHalfSize, 0, -(cubeHalfSize + lightDepth));
    // rectLight.lookAt(0, 0, -(cubeHalfSize));
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, lightDepth, cubeSize);
    // rectLight.position.set(-cubeHalfSize, 0, -(cubeHalfSize + lightDepth));
    // rectLight.lookAt(0, 0, -(cubeHalfSize));
    // edgeLight.add(rectLight);


    // // stream
    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(-cubeHalfSize, (cubeHalfSize + lightDepth), 0);
    // rectLight.lookAt(0, (cubeHalfSize), 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(cubeHalfSize, (cubeHalfSize + lightDepth), 0);
    // rectLight.lookAt(0, (cubeHalfSize), 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(0, (cubeHalfSize + lightDepth), cubeHalfSize, );
    // rectLight.lookAt(0, (cubeHalfSize), 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(0, (cubeHalfSize + lightDepth), -cubeHalfSize, );
    // rectLight.lookAt(0, (cubeHalfSize), 0);
    // edgeLight.add(rectLight);
    // // betting
    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(-cubeHalfSize, -(cubeHalfSize + lightDepth), 0);
    // rectLight.lookAt(0, -(cubeHalfSize), 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(cubeHalfSize, -(cubeHalfSize + lightDepth), 0);
    // rectLight.lookAt(0, -(cubeHalfSize), 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(0, -(cubeHalfSize + lightDepth), cubeHalfSize, );
    // rectLight.lookAt(0, -(cubeHalfSize), 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(0, -(cubeHalfSize + lightDepth), -cubeHalfSize, );
    // rectLight.lookAt(0, -(cubeHalfSize), 0);
    // edgeLight.add(rectLight);



    // // exchange
    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set((cubeHalfSize + lightDepth), cubeHalfSize, 0);
    // rectLight.lookAt((cubeHalfSize), 0, 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set((cubeHalfSize + lightDepth), -cubeHalfSize, 0);
    // rectLight.lookAt((cubeHalfSize), 0, 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, lightDepth, cubeSize);
    // rectLight.position.set((cubeHalfSize + lightDepth), 0, cubeHalfSize, );
    // rectLight.lookAt((cubeHalfSize), 0, 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, lightDepth, cubeSize);
    // rectLight.position.set((cubeHalfSize + lightDepth), 0, -cubeHalfSize, );
    // rectLight.lookAt((cubeHalfSize), 0, 0);
    // edgeLight.add(rectLight);
    // // marketplace
    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(-(cubeHalfSize + lightDepth), cubeHalfSize, 0);
    // rectLight.lookAt(-(cubeHalfSize), 0, 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, cubeSize, lightDepth);
    // rectLight.position.set(-(cubeHalfSize + lightDepth), -cubeHalfSize, 0);
    // rectLight.lookAt(-(cubeHalfSize), 0, 0);
    // edgeLight.add(rectLight);


    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, lightDepth, cubeSize);
    // rectLight.position.set(-(cubeHalfSize + lightDepth), 0, cubeHalfSize, );
    // rectLight.lookAt(-(cubeHalfSize), 0, 0);
    // edgeLight.add(rectLight);

    // rectLight = new THREE.RectAreaLight(0x06aeff, 0, lightDepth, cubeSize);
    // rectLight.position.set(-(cubeHalfSize + lightDepth), 0, -cubeHalfSize, );
    // rectLight.lookAt(-(cubeHalfSize), 0, 0);
    // edgeLight.add(rectLight);


    // scene.add(edgeLight)




    // shim layer with setTimeout fallback
    // window.requestAnimFrame = (function() {
    //   return window.requestAnimationFrame ||
    //     window.webkitRequestAnimationFrame ||
    //     window.mozRequestAnimationFrame ||
    //     function(callback) {
    //       window.setTimeout(callback, 1000 / 120);
    //     };
    // })();

    // var lastFrameTime = new Date().getTime() / 1000;
    // var totalGameTime = 0;

    // function update(dt, t) {
    //   setTimeout(function() {
    //     var currTime = new Date().getTime() / 1000;
    //     var dt = currTime - (lastFrameTime || currTime);
    //     totalGameTime += dt;

    //     update(dt, totalGameTime);

    //     lastFrameTime = currTime;
    //   }, 0);
    // }

    // clock = new THREE.Clock();
    var animate = function() {
      requestAnimationFrame(animate);

      scene.rotation.y -= 0.0075;
      // edgeLight.rotation.y -= 0.01;
      // sideLinks3d.rotation.x -= 0.01;
      // var delta = clock.getDelta();

      // if (mixer) {

      //   mixer.update(delta);

      // }
      renderer.render(scene, camera);


    };

    animate();






    // function render() {
    //   renderer.render(scene, camera);
    //   requestAnimFrame(render);
    // }

    // render();
    // update(0, totalGameTime);

    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }

    function toDegrees(angle) {
      return angle * (180 / Math.PI);
    }

  }


  $("#page-wrap").css('opacity', 1);
  $('.s_home__video-bg').attr('autoplay', 'autoplay');
  $('.decor, .s_partners__logo').viewportChecker({});
  setTimeout(function() { $('.f_footer').fadeIn(400); }, 2000)


  if ($(window).width() >= 768) {
    new WOW().init({
      offset: 100
    });
  }

});