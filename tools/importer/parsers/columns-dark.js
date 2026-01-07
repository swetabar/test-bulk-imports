/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-dark block
 *
 * Source: https://notebook.agency/
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2-N: Column content (flexible layout)
 *
 * Generated: 2026-01-06
 */

export default function parse(element, { document }) {
  // Extract columns from source HTML
  // This block has multiple use cases: logo grids, forms, testimonials, team photos
  // Flexible extraction for various column layouts

  const cells = [];

  // Try to find column containers
  const columnContainers = element.querySelectorAll(':scope > div, :scope > section');

  if (columnContainers.length > 0) {
    // Process each column container
    columnContainers.forEach(container => {
      const columnContent = [];

      // Extract all content within the column
      const images = Array.from(container.querySelectorAll('img'));
      const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const paragraphs = Array.from(container.querySelectorAll('p'));
      const links = Array.from(container.querySelectorAll('a'));
      const forms = Array.from(container.querySelectorAll('form'));
      const lists = Array.from(container.querySelectorAll('ul, ol, div[class*="list"]'));

      // Add all found content
      images.forEach(img => columnContent.push(img));
      headings.forEach(heading => columnContent.push(heading));
      paragraphs.forEach(p => columnContent.push(p));
      links.forEach(link => columnContent.push(link));
      forms.forEach(form => columnContent.push(form));
      lists.forEach(list => columnContent.push(list));

      if (columnContent.length > 0) {
        cells.push(columnContent);
      }
    });
  } else {
    // Fallback: extract all direct content
    const allContent = Array.from(element.children);
    if (allContent.length > 0) {
      cells.push(allContent);
    }
  }

  // Create block using WebImporter.Blocks.createBlock
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Dark', cells });

  // Replace element with block
  element.replaceWith(block);
}
