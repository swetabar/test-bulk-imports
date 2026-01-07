export default function decorate(block) {
  // Create tab buttons from first row
  const tabs = [...block.children];
  const tabButtons = document.createElement('div');
  tabButtons.className = 'tabs-results-buttons';

  tabs.forEach((tab, index) => {
    const button = document.createElement('button');
    button.textContent = `Tab ${index + 1}`;
    button.classList.add('tabs-results-button');
    if (index === 0) button.classList.add('active');

    button.addEventListener('click', () => {
      // Hide all tabs
      tabs.forEach((t) => {
        t.style.display = 'none';
      });
      // Remove active class from all buttons
      tabButtons.querySelectorAll('button').forEach((b) => {
        b.classList.remove('active');
      });
      // Show clicked tab
      tab.style.display = 'block';
      button.classList.add('active');
    });

    tabButtons.appendChild(button);
    if (index > 0) tab.style.display = 'none';
  });

  block.prepend(tabButtons);
}
