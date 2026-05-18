import { PLAYER_ICONS } from '../shared/consts/player';
import { VideoPlayer } from '../shared/ui/Video';

export const initPlayer = () => {
  const player = new VideoPlayer('videoElement');

  const playBtn = document.querySelector('#playBtn');
  const playBtnControl = document.querySelector('#playBtn-control');
  const volumeBtn = document.querySelector('#volumeBtn');
  const fullScreenBtn = document.querySelector('#fullScreenBtn');
  const playerElement = document.querySelector('.player');

  player.videoElement.addEventListener('ended', () => {
    if (playBtnControl) {
      player.onPause();
      playBtn?.classList.remove('player__btn--hidden');
      playBtnControl.innerHTML = PLAYER_ICONS.play;
    }
  });

  const togglePlay = () => {
    if (playBtnControl) {
      if (player.isPlay) {
        player.onPause();
        playBtn?.classList.remove('player__btn--hidden');
        playBtnControl.innerHTML = PLAYER_ICONS.play;
      } else {
        player.onPlay();
        playBtn?.classList.add('player__btn--hidden');
        playBtnControl.innerHTML = PLAYER_ICONS.pause;
      }
    }
  };

  playBtn?.addEventListener('click', togglePlay);
  playBtnControl?.addEventListener('click', togglePlay);

  const toggleMuted = () => {
    player.toggleMuted();

    if (volumeBtn) {
      volumeBtn.innerHTML = player.isMuted ? PLAYER_ICONS.muted : PLAYER_ICONS.unmuted;
    }
  };

  volumeBtn?.addEventListener('click', toggleMuted);

  fullScreenBtn?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      playerElement
        ?.requestFullscreen?.()
        .catch((err) => console.warn('Ошибка при входе в полноэкранный режим:', err));
    } else {
      document
        .exitFullscreen?.()
        .catch((err) => console.warn('Ошибка выхода из полноэкранного режима:', err));
    }
  });

  initProgressBar(player.videoElement);
};

export const initProgressBar = (video: HTMLVideoElement) => {
  const bar = document.querySelector<HTMLElement>('#progressContainer');
  const fill = document.querySelector<HTMLElement>('#progressBar');

  if (!bar || !fill) {
    console.warn('️ Отсутствуют элементы progressBar');
    return;
  }

  video.addEventListener('timeupdate', () => {
    if (!video.duration) return;
    const percent = (video.currentTime / video.duration) * 100;
    fill.style.width = `${percent}%`;
  });

  const calcPos = (e: MouseEvent): number => {
    const rect = bar.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  };

  const seek = (e: MouseEvent) => {
    if (!video.duration) return;
    video.currentTime = calcPos(e) * video.duration;
  };

  bar.addEventListener('click', seek);
};
