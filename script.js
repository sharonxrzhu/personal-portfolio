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
});
