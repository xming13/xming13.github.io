$(function () {
  var hasInitializedOnce = false;
  var GRID_SIZE = 180;

  var source = $("#grid-item-template").html();
  var template = Handlebars.compile(source);
  var context = {
    items: [{
      tags: ['animation'],
      url: 'https://xming13.github.io/tree-hugger/app',
      img_url: "images/happy-cny.png",
      name: "Tree hugger",
      date: "09/10/2015"
    }, {
      tags: ['random', 'just-for-laugh', 'animation'],
      url: 'https://codepen.io/xming13/pen/ZpowAN',
      img_url: 'images/happy-cny.png',
      name: 'Codepen',
      date: '12/10/2016'
    }, {
      tags: ['random', 'experiment'],
      url: 'https://xming13.github.io/experiment/dots/dist/',
      img_url: 'images/happy-cny.png',
      name: 'Dots',
      date: '03/10/2015'
    }, {
      tags: ['game', 'pvp', 'experiment'],
      url: 'https://xming13.github.io/experiment/ninegrids/v2/',
      img_url: 'images/happy-cny.png',
      name: 'Ninegrids',
      date: '15/08/2015'
    }, {
      tags: ['random', 'just-for-laugh'],
      url: 'https://xming13.github.io/things-kids-say/',
      img_url: 'images/kids.png',
      name: 'Things kids say',
      date: '11/03/2015'
    }, {
      tags: ['animation'],
      url: 'https://xming13.github.io/experiment/cny/',
      img_url: 'images/happy-cny.png',
      name: 'CNY',
      date: '18/02/2015'
    }, {
      tags: ['animation'],
      url: 'https://xming13.github.io/butterflies/',
      img_url: 'images/butterflies-love.png',
      name: 'Butterflies',
      date: '01/02/2015'
    }, {
      tags: ['random'],
      url: 'https://xming13.github.io/experiment/christmas-tree/',
      img_url: 'images/christmas-tree.png',
      name: 'Christmas tree',
      date: '29/12/2014'
    }, {
      tags: ['random'],
      url: 'https://xming13.github.io/color-clock/clock.html',
      img_url: 'images/happy-cny.png',
      name: 'Color clock',
      date: '23/12/2014'
    }, {
      tags: ['random', 'just-for-laugh'],
      url: 'https://xming13.github.io/in-shape/',
      img_url: 'images/in-shape.png',
      name: 'In shape',
      date: '06/12/2014'
    }, {
      tags: ['random'],
      url: 'https://xming13.github.io/triangles/',
      img_url: 'images/triangles.png',
      name: 'Triangles',
      date: '01/11/2014'
    }, {
      tags: ['game', 'pvp', 'experiment'],
      url: 'https://xming13.github.io/elements/',
      img_url: 'images/happy-cny.png',
      name: 'Elements',
      date: '20/10/2014'
    }, {
      tags: ['random'],
      url: 'https://xming13.github.io/self-avoiding-walk/',
      img_url: 'images/happy-cny.png',
      name: 'Self-avoiding walk',
      date: '16/10/2014'
    }, {
      tags: ['game', 'mobile'],
      url: 'https://xming13.github.io/squirrel-and-acorn/',
      img_url: 'images/squirrel-and-acorn.png',
      name: 'Squirrel and acorn',
      date: '12/10/2014'
    }, {
      tags: ['game', 'mobile'],
      url: 'https://xming13.github.io/follow-the-numbers/',
      img_url: 'images/follow-the-numbers.png',
      name: 'Follow the numbers',
      date: '08/10/2014'
    }, {
      tags: ['game', 'mobile'],
      url: 'https://xming13.github.io/find-the-word/',
      img_url: 'images/find-the-word.png',
      name: 'Find the word',
      date: '06/10/2014'
    }, {
      tags: ['game', 'mobile'],
      url: 'https://xming13.github.io/mushrooms/',
      img_url: 'images/mushrooms.png',
      name: 'Mushrooms',
      date: '02/10/2014'
    }, {
      tags: ['game', 'mobile'],
      url: 'https://xming13.github.io/spot-the-special-one/',
      img_url: 'images/spot-the-special-one.png',
      name: 'Spot the special one',
      date: '01/10/2014'
    }, {
      tags: ['game', 'android'],
      url: 'https://play.google.com/store/apps/details?id=com.xteam.icebreaker',
      img_url: 'images/happy-cny.png',
      name: 'Penguinee',
      date: '13/09/2014'
    }, {
      tags: ['game', 'mobile'],
      url: 'https://xming13.github.io/easter-bunnies/',
      img_url: 'images/easter-bunnies.png',
      name: 'Easter bunnies',
      date: '21/03/2014'
    }, {
      tags: ['random', 'threejs'],
      url: 'https://github.com/xming13/3d-pixel-art/',
      img_url: 'images/chun-li.png',
      name: '3D pixel art',
      date: '23/02/2014'
    }, {
      tags: ['game', 'threejs'],
      url: 'https://xming13.github.io/BubbleFun/',
      img_url: 'images/happy-cny.png',
      name: 'BubbleFun',
      date: '29/12/2013'
    }, {
      tags: ['random', 'threejs'],
      url: 'https://xming13.github.io/rellafun/',
      img_url: 'images/rellafun.png',
      name: 'RellaFun',
      date: '19/12/2013'
    }, {
      tags: ['game', 'threejs'],
      url: 'https://xming13.github.io/XmasFun/',
      img_url: "images/happy-cny.png",
      name: "XmasFun",
      date: "13/12/2013"
    }]
  };
  var html = template(context);
  var $grid = $('.grid');
  $grid.html(html);

  var selectedFilter = '';

  $('.filter').click(function () {
    $(this).addClass('selected');
    $(this).siblings('.filter').removeClass('selected');
    selectedFilter = $(this).attr('data-filter');
    $grid.isotope({filter: selectedFilter});
  });

  $('.btn-view-mode').click(function () {
    $(this).toggleClass('full gallery');
    $grid.toggleClass('full gallery');
    onResize();
  });

  function onResize() {
    var isGalleryMode = $grid.hasClass('gallery');
    var windowWidth = $(window).innerWidth();
    var numColumns = Math.floor(windowWidth / GRID_SIZE);
    var width = (isGalleryMode ? windowWidth / numColumns : GRID_SIZE - 10) + 'px';
    var height = isGalleryMode ? width : 'auto';

    $('.grid .item').css({
      width: width,
      height: height
    });

//      console.log('width', width);
//      console.log('height', height);
//      console.log('numColumns', numColumns);
//      console.log('windowWidth', windowWidth);
//      console.log('$(window).innerWidth', $(window).innerWidth());

    setTimeout(function () {
      if (!hasInitializedOnce) {
        // init Isotope
        $grid.isotope({
          // options
          itemSelector: '.grid-item',
          masonry: {
            columnWidth: 0
          }
        });
        hasInitializedOnce = true;
      }

      // check if window width is still the same
      // after changing grid item's width and height, the appearance of scrollbar might change the window width
      // if so, we will use column-1 to calculate the grid size instead.
      var newNumColumn = windowWidth == $(window).innerWidth() ? numColumns : numColumns - 1;
      $grid.css({
        'margin-top': $('.filter-container').innerHeight() + 'px',
        width: isGalleryMode ? 'auto' : GRID_SIZE * newNumColumn + 'px'
      });

      $grid.isotope({filter: selectedFilter});
    }, 200)
  }

  window.addEventListener('resize', onResize);
  onResize();
});
