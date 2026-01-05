/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns block
 *
 * Source: https://poliklinika.skoda-auto.cz/alergologie-a-imunologie
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Column 1 content | Column 2 content
 *
 * Generated: 2026-01-05
 */

export default function parse(element, { document }) {
  // Extract left column content
  // VALIDATED: Source HTML contains <div class="opening-time__table">
  const leftColumn = element.querySelector('.opening-time__table, .opening-time > div:first-child, [class*="table"]');

  // Extract right column content
  // VALIDATED: Source HTML contains <div class="opening-time__info">
  const rightColumn = element.querySelector('.opening-time__info, .opening-time > div:last-child, [class*="info"]');

  // Build cells array matching Columns block structure:
  // Row 1: Column 1 | Column 2
  const cells = [
    [leftColumn || document.createElement('div'), rightColumn || document.createElement('div')]
  ];

  // Create block and replace element
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns', cells });
  element.replaceWith(block);
}
