const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');

let currentIndex = 0;
const totalSlides = 8;
const track = document.getElementById('track');
const swipeBox = document.getElementById('swipeBox');
let startX = 0;
let isSwiping = false;

// İlk tıkla müzik başlatma
document.body.addEventListener('click', () => {
  if (audio1.paused && audio2.paused) {
    audio1.play().catch(() => {});
  }
}, { once: true });

// Dokunmatik Kontroller
swipeBox.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

swipeBox.addEventListener('touchend', (e) => {
  if (!isSwiping) return;
  let diff = startX - e.changedTouches[0].clientX;

  if (diff > 30 && currentIndex < totalSlides - 1) {
    currentIndex++;
  } else if (diff < -30 && currentIndex > 0) {
    currentIndex--;
  }
  updateSlider();
  isSwiping = false;
});

// Fare Kontrolleri
swipeBox.addEventListener('mousedown', (e) => {
  startX = e.clientX;
  isSwiping = true;
});

swipeBox.addEventListener('mouseup', (e) => {
  if (!isSwiping) return;
  let diff = startX - e.clientX;

  if (diff > 30 && currentIndex < totalSlides - 1) {
    currentIndex++;
  } else if (diff < -30 && currentIndex > 0) {
    currentIndex--;
  }
  updateSlider();
  isSwiping = false;
});

function updateSlider() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  if (currentIndex === totalSlides - 1) {
    document.getElementById('nextPageBtn').style.display = 'inline-block';
    document.getElementById('swipeHint').style.display = 'none';
  }
}

// Pastaya Geçiş
function startCakePage() {
  audio1.pause();
  audio2.play().catch(() => {});
  switchPage('page-slider', 'page-cake');
}

// Mumları Üfleme
let isBlown = false;
function blowOutCandles() {
  if (isBlown) return;
  isBlown = true;

  document.querySelectorAll('.flame').forEach(flame => {
    flame.classList.add('off');
  });

  setTimeout(() => {
    switchPage('page-cake', 'page-letter');
  }, 1600);
}

// Zarfı Açma
function openEnvelope() {
  const env = document.getElementById('envelopeObj');
  const note = document.getElementById('noteObj');

  env.classList.add('open');

  setTimeout(() => {
    note.classList.add('active-note');
  }, 500);
}

// Sayfa Değiştirici
function switchPage(fromId, toId) {
  const fromPage = document.getElementById(fromId);
  const toPage = document.getElementById(toId);

  fromPage.style.opacity = '0';
  setTimeout(() => {
    fromPage.classList.remove('active');
    toPage.classList.add('active');
  }, 600);
}
