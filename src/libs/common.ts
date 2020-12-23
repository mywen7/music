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
