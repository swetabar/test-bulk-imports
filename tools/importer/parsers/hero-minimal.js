/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-minimal block
 *
 * Source: https://notebook.agency/
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2: Heading, paragraph, CTA button
 *
 * Generated: 2026-01-06
 */

export default function parse(element, { document }) {
  // Extract content from source HTML element
  // Validated selectors from actual captured HTML: <section id="header"><h1><p><a>
  const heading = element.querySelector('h1, h2, h3, .heading, [class*="heading"]');
  const paragraph = element.querySelector('p, .description, [class*="desc"]');
  const cta = element.querySelector('a[href*="contact"], a.cta, .button, a');

  // Build cells array - single column layout with all content
  const cells = [];

  // Add content elements if they exist
  if (heading) cells.push([heading]);
  if (paragraph) cells.push([paragraph]);
  if (cta) cells.push([cta]);

  // Create block using WebImporter.Blocks.createBlock
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Minimal', cells });

  // Replace element with block
  element.replaceWith(block);
}
