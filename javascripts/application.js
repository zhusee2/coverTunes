$('.cover-picker').on('click', 'a', function(event) {
  var coverAnchor = this,
      coverSelected = coverAnchor.parentNode,
      coverActive = $('.cover-picker .active'),
      albumSelected = coverAnchor.href.split('#')[1],
      indicatorPosition = coverSelected.offsetLeft + (coverSelected.offsetWidth / 2) - 15,
      playlistHeight = $('.playlist-inner')[0].getBoundingClientRect().height;
  
  function loadAlbumInfo(album) {
    var selectedAlbum = TRACK_INFO[album];
    
    $('.album-tracks').empty();
    
    for(var i = 0; i < selectedAlbum.tracks.length; i++) {
      var track = selectedAlbum.tracks[i],
          trackListItem = $('<li>'),
          trackTitleItem = $('<h5>').addClass('track-title').text(track.title),
          trackRatingsItem = $('<span>').addClass('track-ratings'),
          trackPlaytimeItem = $('<span>').addClass('track-playtime').text(track.playtime);
      
      trackListItem.append(trackTitleItem).append(trackRatingsItem).append(trackPlaytimeItem);
      
      trackListItem.appendTo('.album-tracks'); 
    }
    
    $('.album-title').text(selectedAlbum.title);
    $('.album-artist .artist-name').text(selectedAlbum.artist);
    $('.album-artist .released-on').text("(" + selectedAlbum.release + ")");
    $('.album-cover img').attr('src', selectedAlbum.cover);
    
    $('.playlist').css('background-color', selectedAlbum.colors.background);
    $('.playlist-indicator').css('border-bottom-color', selectedAlbum.colors.background);
    $('.album-title, .track-title').css('color', selectedAlbum.colors.title);
    $('.album-artist, .album-tracks').css('color', selectedAlbum.colors.subtitle);
    
  }
  
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
  
  loadAlbumInfo(albumSelected);
  
  if($(coverActive).length == 0 || coverSelected === coverActive[0]) {
    togglePlaylistForAlbum(albumSelected);
  }
  
  if($(coverActive).length > 0 && coverSelected !== coverActive[0]) {
    switchPlaylistToAlbum(albumSelected);
  }
  
  coverAnchor.blur();
  event.preventDefault();
});