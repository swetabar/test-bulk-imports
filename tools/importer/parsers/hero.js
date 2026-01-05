/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero block
 *
 * Source: https://poliklinika.skoda-auto.cz/alergologie-a-imunologie
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Background image
 * - Row 2: Title (h1) + Subheading
 *
 * Generated: 2026-01-05
 */

export default function parse(element, { document }) {
  // Extract background image
  // VALIDATED: Source HTML contains <img class="hero-image__image">
  const bgImage = element.querySelector('.hero-image__image, .hero-image img, img');

  // Extract title text
  // VALIDATED: Source HTML contains <p class="typography typography--display">
  const titleElement = element.querySelector('.typography--display, h1, h2, .hero-title, [class*="headline"]');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract subheading text
  // VALIDATED: Source HTML contains <p class="typography typography--body"> in subheadline area
  const subheadingElement = element.querySelector('.hero-image__subheadline .typography, .typography--body, .hero-subheading, [class*="subheadline"] p');
  const subheading = subheadingElement ? subheadingElement.textContent.trim() : '';

  // Build cells array matching Hero block structure:
  // Row 1: Background image (optional)
  // Row 2: Title + Subheading
  const cells = [];

  // Add background image row if present
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Add title and subheading row
  const titleCell = document.createElement('div');
  if (title) {
    const h1 = document.createElement('h1');
    h1.textContent = title;
    titleCell.appendChild(h1);
  }
  if (subheading && subheading !== 'Typography') {
    const br = document.createElement('br');
    titleCell.appendChild(br);
    titleCell.appendChild(br);
    const p = document.createElement('p');
    p.textContent = subheading;
    titleCell.appendChild(p);
  }
  cells.push([titleCell]);

  // Create block and replace element
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero', cells });
  element.replaceWith(block);
}
