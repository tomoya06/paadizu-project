export class CountDownMan {
  private cnt = -1;
  private timer = 0;

  constructor(num: number, handler: (num: number) => any) {
    this.cnt = num;
    handler(num);
    this.timer = setInterval(() => {
      handler(this.cnt);
      this.cnt -= 1;
      if (this.cnt < 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
