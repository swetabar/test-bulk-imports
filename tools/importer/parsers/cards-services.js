/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-services block
 *
 * Source: https://notebook.agency/
 * Base Block: cards
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2-N: Each card (icon/image + heading + description)
 *
 * Generated: 2026-01-06
 */

export default function parse(element, { document }) {
  // Extract service cards from source HTML
  // Validated selectors from actual captured HTML: <section id="services"><div><h6><p>
  const cards = element.querySelectorAll(':scope > div');

  const cells = [];

  // Process each card
  cards.forEach(card => {
    const icon = card.querySelector('img, svg, [class*="icon"]');
    const heading = card.querySelector('h6, h5, h4, .title, [class*="title"]');
    const description = card.querySelector('p, .description, [class*="desc"]');

    const cardContent = [];
    if (icon) cardContent.push(icon);
    if (heading) cardContent.push(heading);
    if (description) cardContent.push(description);

    if (cardContent.length > 0) {
      cells.push(cardContent);
    }
  });

  // Create block using WebImporter.Blocks.createBlock
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Services', cells });

  // Replace element with block
  element.replaceWith(block);
}
