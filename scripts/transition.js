$(function() {
  var $body = $('body'),
      $window = $(window),
      $transition_container = $body.find('.transition-container'),
      $transition_bullets = $transition_container.find('.transition-bullets'),
      $transition_wrap = $transition_container.find('.transition-wrap'),
      $transition_slider = $transition_wrap.children('.transition-slider'),
      _slider_length = $transition_slider.length,
      _timeout = true,
      _currentIndex = 0,
      _temp = str = '',
      isIE = function() {
        return /MSIE ([^;]+)/.test(navigator.userAgent);
      },
      calculate = function() {
        var arr = [],
            _temp = 0;
        arr.push(0);
        $transition_slider.each(function(index, elem) {
          if (index !== _slider_length - 2) {
            _temp += $(elem).height();
            arr.push(_temp);
          }
        });
        return arr;
      },
      slider_arr = calculate(),
      animate = function(delta, wait) {
        if (_timeout || delta === 0) {
          _currentIndex = _currentIndex - delta;
          if (_currentIndex < 0) {
            _currentIndex = 0;
          } else if (_currentIndex > _slider_length -1) {
            _currentIndex = _slider_length - 1;
          }
          $transition_bullets
            .children()
            .eq(_currentIndex)
              .addClass('active')
            .siblings()
              .removeClass('active');
          $transition_wrap.css({
            '-webkit-transform': 'translate3d(0, '+(-slider_arr[_currentIndex])+'px, 0)',
            'transform': 'translate3d(0, '+(-slider_arr[_currentIndex])+'px, 0)'
          });
          if (!wait) {
            _timeout = false;
            setTimeout(function() {
              _timeout = true;
            }, 1100);
          }
        }
      };
  $transition_slider.each(function(index) {
    if (!index) {
      str += '<li class="active" data-index="' + index + '"></li>';
    } else {
      str += '<li data-index="' + index + '"></li>';
    }
  });
  $transition_bullets.on('click', 'li', function() {
    var _index = $(this).attr('data-index'),
        _len = _currentIndex - _index;
    animate(_len, true);
  });
  $transition_bullets.append($(str));
  $window.resize(function() {
    slider_arr = calculate();
    animate(0);
  });
  if (isIE()) {
    $transition_bullets.hide();
    $transition_container.css('overflow', 'auto');
  } else {
    $body.on('mousewheel', function(event) {
      var delta = event.deltaY > 0 ? 1 : -1;
      animate(delta);
    });
  }
});