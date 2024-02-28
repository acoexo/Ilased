const videoPlayer = document.getElementById('video-player');
    const audioPlayer = document.getElementById('audio-player');
    const progressBar = document.getElementById('progress-bar');
    const volumeControl = document.getElementById('volume');
    const playlist = document.getElementById('playlist');

    function play() {
      videoPlayer.play();
      audioPlayer.play();
    }

    function pause() {
      videoPlayer.pause();
      audioPlayer.pause();
    }

    function stop() {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }

    function backward() {
      videoPlayer.currentTime -= 10;
      audioPlayer.currentTime -= 10;
    }

    function forward() {
      videoPlayer.currentTime += 10;
      audioPlayer.currentTime += 10;
    }

    function goToStart() {
      videoPlayer.currentTime = 0;
      audioPlayer.currentTime = 0;
    }

    function goToEnd() {
      videoPlayer.currentTime = videoPlayer.duration;
      audioPlayer.currentTime = audioPlayer.duration;
    }

    function changeVolume() {
      videoPlayer.volume = volumeControl.value;
      audioPlayer.volume = volumeControl.value;
    }

    function toggleFullScreen() {
      if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
      } else if (videoPlayer.mozRequestFullScreen) {
        videoPlayer.mozRequestFullScreen();
      } else if (videoPlayer.webkitRequestFullscreen) { 
        videoPlayer.webkitRequestFullscreen();
      } else if (videoPlayer.msRequestFullscreen) { 
        videoPlayer.msRequestFullscreen();
      }
    }

    function changeMedia() {
      const selectedOption = playlist.options[playlist.selectedIndex];
      const mediaURL = selectedOption.value;
      if (mediaURL.endsWith('.mp4')) {
        videoPlayer.src = mediaURL;
        videoPlayer.style.display = 'block';
        audioPlayer.style.display = 'none';
      } else if (mediaURL.endsWith('.mp3')) {
        audioPlayer.src = mediaURL;
        audioPlayer.style.display = 'block';
        videoPlayer.style.display = 'none';
      }
      play(); 
    }

    videoPlayer.addEventListener('timeupdate', () => {
      const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
      progressBar.value = progress;
    });

    audioPlayer.addEventListener('timeupdate', () => {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.value = progress;
    });

    progressBar.addEventListener('click', (e) => {
      const progressBarWidth = progressBar.offsetWidth;
      const clickPosition = e.offsetX;
      const clickPercentage = (clickPosition / progressBarWidth);
      const newTime = clickPercentage * videoPlayer.duration;
      videoPlayer.currentTime = newTime;
      audioPlayer.currentTime = newTime;
    });

    window.onload = changeMedia;