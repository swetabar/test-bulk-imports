/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Poliklinika Škoda website cleanup
 * Purpose: Remove Liferay-specific elements, inline styles, and non-content elements
 * Applies to: poliklinika.skoda-auto.cz (all templates)
 * Tested: /alergologie-a-imunologie
 * Generated: 2026-01-05
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow
 * - HTML analyzed in page structure identification
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove Liferay-specific spacer elements
    // EXTRACTED: Found multiple <div class="spacer spacer--size-*"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.spacer',
      '.lfr-layout-structure-item-spacer',
      '.lfr-layout-structure-item-basic-component-spacer'
    ]);

    // Remove dividers
    // EXTRACTED: Found <div class="divider"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.divider',
      '.lfr-layout-structure-item-divider'
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove inline style tags
    // EXTRACTED: Captured DOM showed multiple <style> tags with .fragment_* classes
    WebImporter.DOMUtils.remove(element, [
      'style',
      'link',
      'noscript'
    ]);

    // Clean up Liferay-specific attributes
    // EXTRACTED: Captured DOM showed data-lfr-editable-* attributes on multiple elements
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('data-lfr-editable-id');
      el.removeAttribute('data-lfr-editable-type');
      el.removeAttribute('data-fileentryid');
    });
  }
}
