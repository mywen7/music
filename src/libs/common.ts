export function requestFullScreenFn(element: HTMLElement) {
  const docElm = element;
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  }
}

export function exitFullscreenFn() {
  const de = window.parent.document;
  if (de.exitFullscreen) {
    de.exitFullscreen();
  }
}

export function isFullscreenFn() {
  return document.fullscreenElement;
}

export function formatTime(interval: number) {
  const minute = Math.floor(interval / 60).toString().padStart(2, '0');
  const second = Math.floor(interval % 60).toString().padStart(2, '0');
  return `${minute}:${second}`
}