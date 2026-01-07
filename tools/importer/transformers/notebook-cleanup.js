/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Notebook Agency site cleanup
 * Purpose: Remove navigation, footer, cookie banners, and non-content elements
 * Applies to: notebook.agency domain pages
 * Generated: 2026-01-06
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Initial cleanup - before block parsing
    // Remove elements that block content access or interfere with block parsing

    // Remove navigation - found in captured DOM: <nav> element with menu links
    // Remove cookie consent banner - found in captured DOM: div with fs-cc="banner" and class "cookie-conent"
    // Remove header if it's separate from navigation
    WebImporter.DOMUtils.remove(element, [
      'nav',
      '.navbar',
      '[fs-cc="banner"]',
      '.cookie-conent',
      '.fixed-cta'
    ]);

    // Enable scrolling if disabled by modals/overlays
    if (element.style) {
      element.style.overflow = '';
      element.style.position = '';
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Final cleanup - after block parsing
    // Remove remaining unwanted elements that weren't part of content blocks

    // Remove footer - found in captured DOM: <footer> element with copyright and links
    // Remove embedded scripts, iframes, and tracking elements
    // Remove menu button and other UI chrome
    WebImporter.DOMUtils.remove(element, [
      'footer',
      '.footer',
      'script',
      'noscript',
      'iframe',
      'link[rel="stylesheet"]',
      '.menu-button',
      '.w-nav-button',
      '.w-nav-overlay'
    ]);

    // Clean up Webflow-specific attributes that aren't needed
    const elementsWithDataAttrs = element.querySelectorAll('[data-w-id], [data-wf-page], [data-wf-site]');
    elementsWithDataAttrs.forEach(el => {
      el.removeAttribute('data-w-id');
      el.removeAttribute('data-wf-page');
      el.removeAttribute('data-wf-site');
      el.removeAttribute('data-w-tab');
      el.removeAttribute('data-animation');
      el.removeAttribute('data-is-ix2-target');
    });
  }
}
