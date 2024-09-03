$(document).ready(function() {
    // Owl Carousel for Best Selling Items
    var owlBestSell = $('#owl-best-sell');
    owlBestSell.owlCarousel({
      items: 3,
      loop: true,
      nav: false,
      margin: 30,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 3
        }
      }
    });
  
    // Owl Carousel for New Collection
    var owlNewCollection = $('#owl-new-collection');
    owlNewCollection.owlCarousel({
      items: 4,
      loop: true,
      nav: false,
      margin: 30,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    });
  
    // Play and Stop buttons
    $('.play').on('click', function() {
      owlBestSell.trigger('play.owl.autoplay', [2000]);
      owlNewCollection.trigger('play.owl.autoplay', [2000]);
    });
    $('.stop').on('click', function() {
      owlBestSell.trigger('stop.owl.autoplay');
      owlNewCollection.trigger('stop.owl.autoplay');
    });
  });
  