export default function decorate(block) {
  [...block.children].forEach((row) => {
    // Extract header and body from the row
    const header = row.children[0];
    const body = row.children[1];

    // Create accordion item structure
    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';

    // Create header button
    const headerButton = document.createElement('button');
    headerButton.className = 'accordion-header';
    headerButton.setAttribute('aria-expanded', 'false');
    headerButton.textContent = header.textContent;

    // Create body container
    const bodyContainer = document.createElement('div');
    bodyContainer.className = 'accordion-body';
    bodyContainer.setAttribute('aria-hidden', 'true');
    bodyContainer.append(...body.children);

    // Add click event listener
    headerButton.addEventListener('click', () => {
      const isExpanded = headerButton.getAttribute('aria-expanded') === 'true';
      headerButton.setAttribute('aria-expanded', !isExpanded);
      bodyContainer.setAttribute('aria-hidden', isExpanded);
      accordionItem.classList.toggle('active');
    });

    // Assemble accordion item
    accordionItem.append(headerButton, bodyContainer);
    row.replaceWith(accordionItem);
  });
}
