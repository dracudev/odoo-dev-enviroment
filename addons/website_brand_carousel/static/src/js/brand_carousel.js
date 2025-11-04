/** @odoo-module **/

import publicWidget from '@web/legacy/js/public/public_widget';
import { registry } from '@web/core/registry';

const BrandCarousel = publicWidget.Widget.extend({
  selector: '.s_brand_carousel',
  disabledInEditableMode: false,

  /**
   * @override
   */
  start: function () {
    this._super.apply(this, arguments);
    this._duplicateItems();
    this._applySettings();
    this._setupHoverPause();
    this._observeChanges();
  },

  /**
   * Duplicate carousel items to create seamless infinite scroll
   */
  _duplicateItems: function () {
    const track = this.el.querySelector('.brand-carousel-track');
    if (!track) return;

    const items = Array.from(
      track.querySelectorAll('.brand-item:not(.duplicate)')
    );

    // Remove existing duplicates
    track
      .querySelectorAll('.brand-item.duplicate')
      .forEach((el) => el.remove());

    if (items.length === 0) return;

    // Calculate how many times we need to duplicate for seamless scrolling
    // We need at least double the viewport width worth of content
    const trackWidth = track.offsetWidth;
    const itemsWidth = items.reduce((sum, item) => sum + item.offsetWidth, 0);
    const minDuplicates = Math.ceil((trackWidth * 2) / itemsWidth) + 2;
    const duplicateCount = Math.max(minDuplicates, 4);

    for (let i = 0; i < duplicateCount; i++) {
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.classList.add('duplicate');
        track.appendChild(clone);
      });
    }
  },

  /**
   * Apply user-configured settings from data attributes
   */
  _applySettings: function () {
    const section = this.el;
    const track = section.querySelector('.brand-carousel-track');

    if (!track) return;

    // Animation Speed
    const speed =
      section.dataset.animationspeed || section.dataset.animationSpeed || '30';
    track.style.animationDuration = `${speed}s`;

    // Logo Height
    const height =
      section.dataset.logoheight || section.dataset.logoHeight || '80';
    section.querySelectorAll('.brand-logo').forEach((logo) => {
      logo.style.height = `${height}px`;
    });

    // Logo Spacing
    const spacing =
      section.dataset.logospacing || section.dataset.logoSpacing || '60';
    section.querySelectorAll('.brand-item').forEach((item) => {
      item.style.paddingLeft = `${spacing / 2}px`;
      item.style.paddingRight = `${spacing / 2}px`;
    });

    // Re-setup hover pause when settings change
    this._setupHoverPause();
  },

  /**
   * Setup pause on hover functionality using JavaScript
   * This is more reliable than pure CSS with data attributes
   */
  _setupHoverPause: function () {
    const section = this.el;
    const track = section.querySelector('.brand-carousel-track');

    if (!track) return;

    // Remove existing event listeners
    if (this._hoverPauseHandlers) {
      section.removeEventListener('mouseenter', this._hoverPauseHandlers.enter);
      section.removeEventListener('mouseleave', this._hoverPauseHandlers.leave);
    }

    // Check if pause on hover is enabled
    const pauseEnabled =
      section.dataset.pauseonhover === 'true' ||
      section.dataset.pauseOnHover === 'true';

    if (pauseEnabled) {
      // Create handlers
      const enterHandler = () => {
        track.style.animationPlayState = 'paused';
      };

      const leaveHandler = () => {
        track.style.animationPlayState = 'running';
      };

      // Add event listeners
      section.addEventListener('mouseenter', enterHandler);
      section.addEventListener('mouseleave', leaveHandler);

      // Store handlers for cleanup
      this._hoverPauseHandlers = {
        enter: enterHandler,
        leave: leaveHandler,
      };
    } else {
      // Ensure animation is running if pause is disabled
      track.style.animationPlayState = 'running';
      this._hoverPauseHandlers = null;
    }
  },

  /**
   * Observe changes in edit mode and update accordingly
   */
  _observeChanges: function () {
    if (!this.el) return;

    // Observer for attribute changes
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;

      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.target === this.el &&
          mutation.attributeName &&
          mutation.attributeName.startsWith('data-')
        ) {
          shouldUpdate = true;
        }

        // If items were added/removed in the track
        if (mutation.type === 'childList') {
          const track = this.el.querySelector('.brand-carousel-track');
          if (
            track &&
            (mutation.target === track ||
              mutation.target.closest('.brand-carousel-track'))
          ) {
            shouldUpdate = true;
          }
        }
      });

      if (shouldUpdate) {
        setTimeout(() => {
          this._duplicateItems();
          this._applySettings();
        }, 100);
      }
    });

    observer.observe(this.el, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: [
        'data-animationSpeed',
        'data-animationspeed',
        'data-logoHeight',
        'data-logoheight',
        'data-logoSpacing',
        'data-logospacing',
        'data-pauseOnHover',
        'data-pauseonhover',
        'data-grayscale',
      ],
    });

    // Store observer to disconnect later if needed
    this._observer = observer;
  },

  /**
   * @override
   */
  destroy: function () {
    // Clean up hover pause event listeners
    if (this._hoverPauseHandlers) {
      const section = this.el;
      section.removeEventListener('mouseenter', this._hoverPauseHandlers.enter);
      section.removeEventListener('mouseleave', this._hoverPauseHandlers.leave);
    }

    if (this._observer) {
      this._observer.disconnect();
    }
    this._super.apply(this, arguments);
  },
});

publicWidget.registry.brandCarousel = BrandCarousel;

export default BrandCarousel;
