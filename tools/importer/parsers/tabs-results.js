/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-results block
 *
 * Source: https://notebook.agency/
 * Base Block: tabs
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2-N: Each tab (tab label + tab content)
 *
 * Generated: 2026-01-06
 */

export default function parse(element, { document }) {
  // Extract tabs from source HTML
  // Validated selectors from actual captured HTML: <section id="results">

  const cells = [];

  // Look for tab panels or content sections
  const tabPanels = element.querySelectorAll('[role="tabpanel"], .tab-content, .tabs-result, div[class*="tab"]');

  if (tabPanels.length > 0) {
    // Process each tab panel
    tabPanels.forEach((panel, index) => {
      const tabLabel = panel.querySelector('[aria-label], .tab-label, h4, h5');
      const tabContent = panel.querySelector('img, .chart, [class*="chart"], div');

      const row = [];
      if (tabLabel) row.push(tabLabel);
      if (tabContent) row.push(tabContent);

      if (row.length > 0) {
        cells.push(row);
      }
    });
  } else {
    // Fallback: Look for images or charts directly
    const charts = element.querySelectorAll('img, [class*="chart"]');
    charts.forEach((chart, index) => {
      cells.push([`Tab ${index + 1}`, chart]);
    });
  }

  // Create block using WebImporter.Blocks.createBlock
  const block = WebImporter.Blocks.createBlock(document, { name: 'Tabs-Results', cells });

  // Replace element with block
  element.replaceWith(block);
}
