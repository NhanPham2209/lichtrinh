/**
 * WANDERLUST 2026 - Interactive Script
 * Đà Lạt • Vũng Tàu • Sài Gòn
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDayFilters();
  initGalleryFilters();
  initWeatherFilters();
  initSoundToggle();
  initBackToTop();
  initChecklistStorage();
});

/* --------------------------------------------------
   1. NAVBAR & MOBILE MENU & SCROLL SPY
--------------------------------------------------- */
function initNavbar() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Scroll Spy
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    const sections = ['tong-quan', 've-bay', 'lich-trinh', 'thoi-tiet-vui-choi', 'thu-vien-media', 'am-thuc', 'ngan-sach'];

    sections.forEach(secId => {
      const sectionEl = document.getElementById(secId);
      const navLink = document.querySelector(`.nav-item[href="#${secId}"]`);
      if (sectionEl && navLink) {
        const top = sectionEl.offsetTop;
        const height = sectionEl.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navItems.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  });
}

/* --------------------------------------------------
   2. DAY FILTER TABS
--------------------------------------------------- */
function initDayFilters() {
  const filterBtns = document.querySelectorAll('.it-filter-btn');
  const dayPills = document.querySelectorAll('.day-pill');
  const dayBlocks = document.querySelectorAll('.day-block');

  window.switchDayTab = function(dayKey) {
    // Update Filter Buttons
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-day') === dayKey);
    });

    // Update Quick Jump Pills in Hero
    dayPills.forEach(pill => {
      const onclickAttr = pill.getAttribute('onclick');
      if (onclickAttr && onclickAttr.includes(`'${dayKey}'`)) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Show/Hide or Scroll to Day Blocks
    if (dayKey === 'all') {
      dayBlocks.forEach(block => {
        block.style.display = 'block';
        block.style.animation = 'fadeIn 0.4s ease';
      });
      const timelineSec = document.getElementById('lich-trinh');
      if (timelineSec) {
        timelineSec.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      dayBlocks.forEach(block => {
        if (block.getAttribute('data-day-section') === dayKey) {
          block.style.display = 'block';
          block.style.animation = 'fadeIn 0.4s ease';
          block.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          block.style.display = 'none';
        }
      });
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.getAttribute('data-day');
      window.switchDayTab(day);
    });
  });
}

/* --------------------------------------------------
   3. GALLERY FILTER TABS
--------------------------------------------------- */
function initGalleryFilters() {
  const galleryBtns = document.querySelectorAll('.gallery-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  galleryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------
   4. LIGHTBOX MODAL
--------------------------------------------------- */
window.openLightbox = function(imgSrc, captionText) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (modal && img && cap) {
    img.src = imgSrc;
    cap.textContent = captionText || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeLightbox = function(e) {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

// Close on Escape Key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

/* --------------------------------------------------
   5. CLIPBOARD ADDRESS COPY
--------------------------------------------------- */
window.copyText = function(textToCopy, btnElement) {
  navigator.clipboard.writeText(textToCopy).then(() => {
    showToast(`Đã copy địa chỉ: "${textToCopy}"`);
    if (btnElement) {
      const originalHtml = btnElement.innerHTML;
      btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Đã Copy!';
      btnElement.style.color = '#10b981';
      setTimeout(() => {
        btnElement.innerHTML = originalHtml;
        btnElement.style.color = '';
      }, 2000);
    }
  }).catch(err => {
    showToast('Không thể copy, vui lòng thử lại.');
  });
};

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* --------------------------------------------------
   6. BACKGROUND AUDIO CHILL VIBE
--------------------------------------------------- */
function initSoundToggle() {
  const audio = document.getElementById('chillAudio');
  const soundBtn = document.getElementById('soundToggleBtn');

  if (audio && soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          soundBtn.classList.add('playing');
          soundBtn.querySelector('.sound-label').textContent = 'Đang Bật Vibe';
          showToast('🎵 Đã bật nhạc nền thư giãn!');
        }).catch(() => {
          showToast('Vui lòng cho phép phát âm thanh trên trình duyệt.');
        });
      } else {
        audio.pause();
        soundBtn.classList.remove('playing');
        soundBtn.querySelector('.sound-label').textContent = 'Chill Vibe';
        showToast('🔇 Đã tắt nhạc nền.');
      }
    });
  }
}

/* --------------------------------------------------
   7. BACK TO TOP
--------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
  }
}

window.scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/* --------------------------------------------------
   8. CHECKLIST LOCAL STORAGE SYNC
--------------------------------------------------- */
function initChecklistStorage() {
  const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
  checkboxes.forEach((cb, index) => {
    const saved = localStorage.getItem(`wanderlust_check_${index}`);
    if (saved !== null) {
      cb.checked = saved === 'true';
    }
    cb.addEventListener('change', () => {
      localStorage.setItem(`wanderlust_check_${index}`, cb.checked);
    });
  });
}

/* --------------------------------------------------
   9. WEATHER & ACTIVITY TOGGLE SWITCHER
--------------------------------------------------- */
function initWeatherFilters() {
  const weatherBtns = document.querySelectorAll('.weather-tab-btn');
  const scenarioCards = document.querySelectorAll('.weather-card');
  const amusementCards = document.querySelectorAll('.amusement-card');
  const cafeCards = document.querySelectorAll('.cafe-mini-card');

  window.switchWeatherTab = function(mode) {
    weatherBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-weather') === mode);
    });

    if (mode === 'sun') {
      scenarioCards.forEach(card => {
        card.style.display = card.classList.contains('sunny') ? 'block' : 'none';
        card.style.animation = 'fadeIn 0.4s ease';
      });
      amusementCards.forEach(card => {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease';
      });
      showToast('☀️ Đã lọc: Ưu tiên Hoạt động vui chơi & Trải nghiệm ngoài trời');
    } else if (mode === 'rain') {
      scenarioCards.forEach(card => {
        card.style.display = card.classList.contains('rainy') ? 'block' : 'none';
        card.style.animation = 'fadeIn 0.4s ease';
      });
      amusementCards.forEach(card => {
        card.style.display = card.getAttribute('data-indoor') === 'true' ? 'flex' : 'none';
        card.style.animation = 'fadeIn 0.4s ease';
      });
      showToast('🌧️ Đã lọc: Ưu tiên Cafe view kính, acoustic & không gian trong nhà');
    } else {
      scenarioCards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.4s ease';
      });
      amusementCards.forEach(card => {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease';
      });
      showToast('🎡 Hiển thị toàn bộ Khu Vui Chơi & Cafe');
    }
  };

  weatherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-weather');
      window.switchWeatherTab(mode);
    });
  });
}

