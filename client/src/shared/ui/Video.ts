export class VideoPlayer {
  public videoElement: HTMLVideoElement;
  public isMuted: boolean = false;
  public isPlay: boolean = false;

  constructor(playerId: string) {
    this.videoElement = document.querySelector<HTMLVideoElement>(`#${playerId}`);
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
