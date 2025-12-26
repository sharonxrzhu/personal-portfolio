// Tab navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.panel.side > div[id]');
  const profilePanel = document.querySelector('#about');
  const arrowLeft = document.querySelector('.arrow-left');
  const arrowRight = document.querySelector('.arrow');

  // Array of tab IDs in order
  const tabIds = ['projects', 'about', 'stats', 'skills'];
  let currentTabIndex = 0;

  // Function to show a specific section
  function showSection(targetId) {
    // Hide all sections in the left panel
    sections.forEach(section => {
      section.style.display = 'none';
    });

    // Handle "about" tab - show profile panel on right and about text on left
    if (targetId === 'about') {
      profilePanel.style.display = 'flex';
      const aboutSection = document.querySelector('#about-text');
      if (aboutSection) {
        aboutSection.style.display = 'block';
      }
    } else {
      // Show the selected section
      const targetSection = document.querySelector(`#${targetId}`);
      if (targetSection) {
        targetSection.style.display = 'block';
      }
    }

    // Update active tab
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    const activeTab = document.querySelector(`.tab[data-tab="${targetId}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // Update current tab index
    currentTabIndex = tabIds.indexOf(targetId);
  }

  // Add click handlers to tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-tab');
      showSection(targetId);
    });
  });

  // Left arrow click handler
  arrowLeft.addEventListener('click', () => {
    currentTabIndex = (currentTabIndex - 1 + tabIds.length) % tabIds.length;
    showSection(tabIds[currentTabIndex]);
  });

  // Right arrow click handler
  arrowRight.addEventListener('click', () => {
    currentTabIndex = (currentTabIndex + 1) % tabIds.length;
    showSection(tabIds[currentTabIndex]);
  });

  // Show the default section (projects) on page load
  showSection('projects');

  // Animate bars on page load
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      const value = bar.getAttribute('data-value');
      bar.style.width = value + '%';
    });

    document.querySelectorAll('.skill-progress').forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = progress + '%';
    });
  }, 300);

  // Project click functionality
  const projectCards = document.querySelectorAll('.project-card');
  const projectsSection = document.querySelector('#projects');

  projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      showProjectDetail(card, index);
    });
    // Add hover cursor
    card.style.cursor = 'pointer';
  });

  function showProjectDetail(card, index) {
    // Get project data from the card
    const title = card.querySelector('.project-title').textContent;
    const description = card.querySelector('.project-description').textContent;
    const imageSrc = card.querySelector('.project-icon').src;
    const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);

    // Get media array from data attribute or create default array
    let mediaItems = [];
    const mediaData = card.getAttribute('data-media');
    if (mediaData) {
      try {
        mediaItems = JSON.parse(mediaData);
      } catch (e) {
        mediaItems = [imageSrc.replace(/\.(jpg|jpeg|png|gif)$/i, '.mp4')];
      }
    } else {
      mediaItems = [imageSrc.replace(/\.(jpg|jpeg|png|gif)$/i, '.mp4')];
    }

    let currentMediaIndex = 0;

    // Hide the projects section
    projectsSection.style.display = 'none';

    // Create and show project detail view
    const detailView = document.createElement('div');
    detailView.id = 'project-detail';

    function getMediaHTML(src) {
      // Check for "in-progress" placeholder
      if (src === 'in-progress') {
        return `<div class="in-progress-placeholder">
          <div class="in-progress-text">Video Demo<br>In Progress</div>
        </div>`;
      }

      const isVideo = /\.(mp4|mov|webm)$/i.test(src);
      if (isVideo) {
        return `<video class="project-detail-video" controls autoplay muted loop>
          <source src="${src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>`;
      } else {
        return `<img src="${src}" class="project-detail-image" alt="${title}">`;
      }
    }

    detailView.innerHTML = `
      <button class="back-button">← Back</button>
      <div class="project-detail-content">
        <div class="media-slider">
          ${mediaItems.length > 1 ? '<button class="slider-arrow slider-arrow-left">◀</button>' : ''}
          <div class="media-container">
            ${getMediaHTML(mediaItems[0])}
          </div>
          ${mediaItems.length > 1 ? '<button class="slider-arrow slider-arrow-right">▶</button>' : ''}
        </div>
        ${mediaItems.length > 1 ? `<div class="slider-dots">
          ${mediaItems.map((_, i) => `<span class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
        </div>` : ''}
        <h2 class="project-detail-title">${title}</h2>
        <p class="project-detail-description">${description}</p>
        <div class="project-tags">
          ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;

    // Insert detail view into the side panel
    const sidePanel = document.querySelector('.panel.side');
    sidePanel.appendChild(detailView);

    // Media slider navigation
    function updateMedia(newIndex) {
      if (newIndex < 0 || newIndex >= mediaItems.length) return;

      currentMediaIndex = newIndex;
      const mediaContainer = detailView.querySelector('.media-container');
      mediaContainer.innerHTML = getMediaHTML(mediaItems[currentMediaIndex]);

      // Update dots
      const dots = detailView.querySelectorAll('.slider-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentMediaIndex);
      });
    }

    // Arrow click handlers
    const leftArrow = detailView.querySelector('.slider-arrow-left');
    const rightArrow = detailView.querySelector('.slider-arrow-right');

    if (leftArrow) {
      leftArrow.addEventListener('click', () => {
        const newIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
        updateMedia(newIndex);
      });
    }

    if (rightArrow) {
      rightArrow.addEventListener('click', () => {
        const newIndex = (currentMediaIndex + 1) % mediaItems.length;
        updateMedia(newIndex);
      });
    }

    // Dot click handlers
    const dots = detailView.querySelectorAll('.slider-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const newIndex = parseInt(dot.getAttribute('data-index'));
        updateMedia(newIndex);
      });
    });

    // Back button handler
    const backButton = detailView.querySelector('.back-button');
    backButton.addEventListener('click', () => {
      detailView.remove();
      projectsSection.style.display = 'block';
    });
  }
});
