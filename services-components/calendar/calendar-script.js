/* =============================================
   River Silvestri · EA Calendar Portfolio
   script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     PAGE NAVIGATION
     ===================================================== */

const pages = {
  2: document.getElementById('page2'),
  3: document.getElementById('page3')
};

  const tabs = document.querySelectorAll('.ptab');
  const goCalBtn = document.getElementById('goCalBtn');

  function showPage(pageNum) {

Object.values(pages).forEach(page => {
  if (page) {
    page.classList.add('hidden');
  }
});

    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

if (pages[pageNum]) {
  pages[pageNum].classList.remove('hidden');
}

    const activeTab = document.querySelector(`.ptab[data-p="${pageNum}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }
  }

  tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    showPage(tab.dataset.p);
  });
});

  if (goCalBtn) {
    goCalBtn.addEventListener('click', () => {
      showPage(2);
    });
  }

  /* =====================================================
     FEATURE CARD HIGHLIGHTS
     ===================================================== */

  const featureCards = document.querySelectorAll('.fc');
  const allEvents = document.querySelectorAll('.gev');

  const featureMap = {

    timezone: [
      'Alexa'
    ],

    avail: [
      'Availability'
    ],

    lunch: [
      'Lunch'
    ],

    deepwork: [
      'Deep Work',
      'Operations'
    ],

    recurring: [
      'Gym',
      'Family Breakfast',
      'Pick Up Kids',
      'Family Dinner',
      'Admin',
      'Weekly'
    ],

    onetone: [
      '1:1',
      'EA Weekly Sync',
      'COO',
      'CFO'
    ],

    colorcode: [
      'Gym'
    ],

    buffer: [
      'Admin',
      'Catch',
      ''
    ],

    travel: [
      'Airline',
      'SoHo',
      'Hotel',
      'Car Service',
      'Transfer',
      'Lounge'
    ],

    video: [
      'Internal',
      'Client / Investor'
    ]
  };

  function clearHighlights() {
    allEvents.forEach(event => {
      event.classList.remove('highlighted');
      event.classList.remove('dimmed');
    });

    featureCards.forEach(card => {
      card.classList.remove('active');
    });
  }

  function highlightFeature(feature, card) {

    clearHighlights();

    const keywords = featureMap[feature];

    if (!keywords || feature === 'colorcode') {
      return;
    }

    allEvents.forEach(event => {

      const title =
        event.querySelector('.gev-title')?.textContent || '';

      const match = keywords.some(keyword =>
        title.toLowerCase().includes(keyword.toLowerCase())
      );

      if (match) {
        event.classList.add('highlighted');
      } else {
        event.classList.add('dimmed');
      }
    });

    card.classList.add('active');
  }

  featureCards.forEach(card => {

    const feature = card.dataset.f;

    card.addEventListener('mouseenter', () => {
      highlightFeature(feature, card);
    });

    card.addEventListener('mouseleave', () => {
      clearHighlights();
    });

    /* Mobile / touch */
    card.addEventListener('click', () => {

      const alreadyActive = card.classList.contains('active');

      clearHighlights();

      if (!alreadyActive) {
        highlightFeature(feature, card);
      }
    });
  });

  /* =====================================================
     NOW LINE
     ===================================================== */

  const nowLine = document.getElementById('nowLine');

  function updateNowLine() {

    if (!nowLine) return;

    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();

    const startHour = 6;
    const endHour = 19;

    const currentTime = hours + minutes / 60;

    if (currentTime < startHour || currentTime > endHour) {
      nowLine.style.display = 'none';
      return;
    }

    nowLine.style.display = 'flex';

    const hourHeight = 52;

    const top =
      (currentTime - startHour) * hourHeight;

    nowLine.style.top = `${top}px`;
  }

  updateNowLine();

  setInterval(updateNowLine, 60000);

  /* =====================================================
     AUTO SCROLL TO WORK HOURS
     ===================================================== */

  const gcalBody = document.querySelector('.gcal-body');

  if (gcalBody) {
    setTimeout(() => {
      gcalBody.scrollTop = 120;
    }, 100);
  }

  /* =====================================================
     CARD ENTRANCE ANIMATION
     ===================================================== */

  featureCards.forEach((card, index) => {

    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    card.style.transition =
      'opacity 0.35s ease, transform 0.35s ease';

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80 * index);
  });

});

/* =====================================================
   CROSS TIMEZONE POPUP
   ===================================================== */

const timezoneCard = document.querySelector('[data-f="timezone"]');
const tzPopup = document.getElementById('tzPopup');

if (timezoneCard && tzPopup) {

  timezoneCard.addEventListener('mouseenter', () => {
    tzPopup.classList.add('show');
  });

  timezoneCard.addEventListener('mouseleave', () => {
    tzPopup.classList.remove('show');
  });

} 

/* =====================================================
   ONLINE MEETING POPUP
   ===================================================== */

const videoCard = document.querySelector('[data-f="video"]');

const meetPopup = document.getElementById('meetPopup');
const zoomPopup = document.getElementById('zoomPopup');

if (videoCard) {

  videoCard.addEventListener('mouseenter', () => {

    if (meetPopup) {
      meetPopup.classList.add('show');
    }

    if (zoomPopup) {
      zoomPopup.classList.add('show');
    }

  });

  videoCard.addEventListener('mouseleave', () => {

    if (meetPopup) {
      meetPopup.classList.remove('show');
    }

    if (zoomPopup) {
      zoomPopup.classList.remove('show');
    }

  });

}

/* =====================================================
   COLOR CODING SYSTEM POPUP
   ===================================================== */

const colorCodeCard = document.querySelector('[data-f="colorcode"]');

const colorSystemPopup =
  document.getElementById('colorSystemPopup');

const popupOverlay =
  document.getElementById('popupOverlay');

if (
  colorCodeCard &&
  colorSystemPopup &&
  popupOverlay
) {

  colorCodeCard.addEventListener('mouseenter', () => {

    colorSystemPopup.classList.add('show');

    popupOverlay.classList.add('show');

  });

  colorCodeCard.addEventListener('mouseleave', () => {

    colorSystemPopup.classList.remove('show');

    popupOverlay.classList.remove('show');

  });

}

const openShot = document.getElementById('openShot');
const closeShot = document.getElementById('closeShot');
const shotPopup = document.getElementById('shotPopup');
const shotOverlay = document.getElementById('shotOverlay');

if (openShot && shotPopup) {
  openShot.addEventListener('click', () => {
    shotPopup.classList.add('show');
  });
}

if (closeShot && shotPopup) {
  closeShot.addEventListener('click', () => {
    shotPopup.classList.remove('show');
  });
}

if (shotOverlay && shotPopup) {
  shotOverlay.addEventListener('click', () => {
    shotPopup.classList.remove('show');
  });
}

