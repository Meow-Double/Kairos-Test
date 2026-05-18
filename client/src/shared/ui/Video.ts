export class VideoPlayer {
  public videoElement: HTMLVideoElement;
  public isMuted: boolean = false;
  public isPlay: boolean = false;

  constructor(playerId: string) {
    const element = document.querySelector<HTMLVideoElement>(`#${playerId}`);

    if (!element) {
      throw new Error(`Видео-элемент #${playerId} не найден в DOM`);
    }

    this.videoElement = element;
  }

  public onPlay() {
    this.videoElement.play();
    this.isPlay = true;
  }

  public onPause() {
    this.videoElement.pause();
    this.isPlay = false;
  }

  public toggleMuted() {
    this.isMuted = !this.isMuted;
    this.videoElement.muted = this.isMuted;
  }
}
