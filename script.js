const cursor = document.querySelector('.cursor');
const lens = document.querySelector('.lens');
const desktop = document.querySelector('.desktop');

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

const updateCursor = () => {
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  lens.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const handlePointerMove = (event) => {
  cursorX = clamp(cursorX + event.movementX, 0, window.innerWidth);
  cursorY = clamp(cursorY + event.movementY, 0, window.innerHeight);
  updateCursor();
};

const handleMouseMove = (event) => {
  if (document.pointerLockElement) {
    return;
  }

  cursorX = event.clientX;
  cursorY = event.clientY;
  updateCursor();
};

desktop.addEventListener('click', () => {
  if (!document.pointerLockElement) {
    desktop.requestPointerLock();
  }
});

document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement) {
    document.addEventListener('mousemove', handlePointerMove);
  } else {
    document.removeEventListener('mousemove', handlePointerMove);
  }
});

document.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', updateCursor);

updateCursor();
