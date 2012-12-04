$('.cover-picker').on('click', 'a', function(event) {
  var coverAnchor = this,
      coverSelected = coverAnchor.parentNode,
      coverActive = $('.cover-picker .active'),
      albumSelected = coverAnchor.href.replace('#', ''),
      indicatorPosition = coverSelected.offsetLeft + (coverSelected.offsetWidth / 2) - 15,
      playlistHeight = $('.playlist-inner')[0].getBoundingClientRect().height;
  
  function togglePlaylistForAlbum(album) {
    var isExpanding = $('.playlist').hasClass('closed'),
        targetHeight = isExpanding ? playlistHeight : 0;
    
    if (isExpanding) {
      $('.playlist').removeClass('hidden');
      $('.playlist-indicator').removeClass('hidden').css('left', indicatorPosition);
    } else {
      $('.playlist').on('webkitTransitionEnd', function() {
        $('.playlist-indicator').addClass('hidden');
        $('.playlist').addClass('hidden').off('webkitTransitionEnd');
      })
    }
    
    $(coverSelected).toggleClass('active');
    $('.playlist').toggleClass('closed expanded').height(targetHeight);
    
  }
  
  function switchPlaylistToAlbum(album) {
    $(coverActive).removeClass('active');
    $(coverSelected).addClass('active');
    
    $('.playlist-indicator').css('left', indicatorPosition);
    
  }
  
  if($(coverActive).length == 0 || coverSelected === coverActive[0]) {
    togglePlaylistForAlbum(albumSelected);
  }
  
  if($(coverActive).length > 0 && coverSelected !== coverActive[0]) {
    switchPlaylistToAlbum(albumSelected);
  }
  
  coverAnchor.blur();
  event.preventDefault();
});