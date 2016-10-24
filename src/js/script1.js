$(document).ready(function () {
  $('.search__button').on('click', search);
  $('#search__box').keypress(function (e) {
    if (e.which == 13) {
      search();
    }
  });
});

$(document).ready(function () {

  $('.header').parallax({imageSrc: 'css/img/header.jpg'});

  $('.slick').slick({
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    cssEase: 'linear'
  });

  search();
  console.log($.fn.jquery);

});

$('.slick__slide').each(function () {
  var src = $(this).find('img').attr('src');
  $(this).css('background-image', 'url(' + src + ')');
  $(this).find('img').remove();
});

$(document).ready(function () {

  if (!(document.documentMode < 9)) {
    $('.slick__slide').each(function () {
      var src = $(this).find('img').attr('src');
      $(this).css('background-image', 'url(' + src + ')');
      $(this).find('img').remove();
    });
  }

  $(function () {
    // initialize Masonry
    var container = $('.grid').masonry();
    // layout Masonry again after all images have loaded
    container.imagesLoaded(function () {
      container.masonry();
    });


  });

});


function search() {
  var randomImage = [
    'cloud',
    'sea',
    'cat',
    'tree',
    'food',
    'adventure',
    'diving',
    'skydiving',
    'flower',
    'children'
  ];
  var searchString = $('#search__box').val();
  if (!(searchString.length > 2)) {
    searchString = randomImage[Math.floor(Math.random() * randomImage.length)];
  }

  var searchType;
  if (searchString.indexOf("*") != -1) {
    searchString = searchString.replace('*', "");
    searchType = true;
  }
  else {
    searchType = false;
  }
  searchString = searchString.replace('* ', "");

  var URL = "https://pixabay.com/api/?key=3585748-15edbd2122b05ecafa57ca9f4&per_page=7&q=" + encodeURIComponent(searchString);
  $.getJSON(URL, function (data) {
    if (parseInt(data.totalHits) > 0) {
      gridArray = $('.grid-content');
      $.each(data.hits, function (i, hit) {
        $(gridArray[i]).html('<div>'+hit.tags+'</div>');
        if (searchType == true) {

          $(gridArray[i]).find('img').remove();
          $(gridArray[i])
            .removeClass("grid-height")
            .css('background-image', 'none');
          $(gridArray[i]).parent('div').removeClass("grid-item--width2");
          $(gridArray[i])
            .prepend('<img class="grid-image" src="' + hit.webformatURL + '" />');

        }
        else {

          $(gridArray[i]).find('img').remove();
          $(gridArray[i])
            .css('background-image', 'url(' + hit.webformatURL + ')')
            .addClass("grid-height");
          if (i == 4 || i == 5) {
            $(gridArray[i]).parent('div').addClass('grid-item--width2');
          }
        }

      });
    }
    else {
      console.log('No results');
    }

    masornyReload();

//    $('.grid').isotope({
//      // options
//      itemSelector: '.grid-item',
//      layoutMode: 'masonry'
//    });


  });
}

function masornyReload() {
  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    percentPosition: true
  });
  $grid.imagesLoaded().progress(function () {
    $grid.masonry('layout');
  });
}