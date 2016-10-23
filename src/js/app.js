$(function () {
  var hasInitializedOnce = false;
  var GRID_SIZE = 180;

  var $grid = $('.grid');
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

    //console.log('width', width);
    //console.log('height', height);
    //console.log('numColumns', numColumns);
    //console.log('windowWidth', windowWidth);
    //console.log('$(window).innerWidth', $(window).innerWidth());


    $('.grid .item').css({
      width: width,
      height: height
    });
    $('.grid .img-wrapper').css({
      height: height
    });

    // check if window width is still the same
    // after changing grid item's width and height, the appearance of
    // scrollbar might change the window width if so, we will use column-1 to
    // calculate the grid size instead.
    var newNumColumn = windowWidth <= $(window).innerWidth() ? numColumns : numColumns - 1;
    $grid.css({
      'margin-top': $('.filter-container').innerHeight() + 'px',
      width: isGalleryMode ? 'auto' : GRID_SIZE * newNumColumn + 'px'
    });

    if (!hasInitializedOnce) {
      // init Isotope
      $grid = $grid.isotope({
        // options
        itemSelector: '.grid-item',
        filter: selectedFilter
        //masonry: {
        //  columnWidth: 0
        //}
      });
      hasInitializedOnce = true;
    }

    setTimeout(function () {
      $grid.isotope({filter: selectedFilter});
    }, 200)
  }

  window.addEventListener('resize', onResize);
  onResize();
});
