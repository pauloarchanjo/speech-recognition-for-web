class SpeechToText {
  constructor(textarea) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.textarea = textarea;
    this.recognition.continuous = true;
    this.recognition.lang = "pt-BR";
    this.setupRecognition();
  }

  setupRecognition() {
    this.recognition.onresult = (e) => {
      const resultIndex = e.resultIndex;
      const transcript = e.results[resultIndex][0].transcript;
      this.textarea.value += transcript;
    };
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }
}

class SpeechController {
  constructor(textarea, btnRecord, btnStop, btnDownload, btnTrash) {
    this.textarea = textarea;
    this.btnRecord = btnRecord;
    this.btnStop = btnStop;
    this.btnDownload = btnDownload;
    this.btnTrash = btnTrash;
    this.speech = new SpeechToText(textarea);
    this.setupListeners();
  }

  setupListeners() {
    this.btnRecord.addEventListener("click", () => this.startRecording());
    this.btnStop.addEventListener("click", () => this.stopRecording());
    this.btnDownload.addEventListener("click", () => this.downloadText());
    this.btnTrash.addEventListener("click", () => this.clearTextarea());
  }

  startRecording() {
    this.btnRecord.disabled = true;
    this.btnStop.disabled = false;
    this.speech.start();
  }

  stopRecording() {
    this.btnRecord.disabled = false;
    this.btnStop.disabled = true;
    this.speech.stop();
  }

  downloadText() {
    const text = this.textarea.value;
    const filename = "speech.txt";
    this.download(text, filename);
  }

  download(text, filename) {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  clearTextarea() {
    this.textarea.value = "";
    this.btnRecord.disabled = false;
    this.btnStop.disabled = true;
    this.speech.stop();
  }
}

const textarea = document.querySelector("#textarea");
const btnRecord = document.querySelector("#btnRecord");
const btnStop = document.querySelector("#btnStop");
const btnDownload = document.querySelector("#btnDownload");
const btnTrash = document.querySelector("#btnTrash");

new SpeechController(textarea, btnRecord, btnStop, btnDownload, btnTrash);
