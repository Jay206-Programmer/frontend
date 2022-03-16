export default class EventStream {
  constructor(url, callbackFunc) {
    this.evtSource = new EventSource(url);

    this.evtSource.onopen = (event) => {
      console.log("Event Stream Opened");
    };

    this.evtSource.onmessage = function (event) {
      callbackFunc(event);
    };
  }
}

// const evtSource = new EventSource("http://localhost:8000/event/")
