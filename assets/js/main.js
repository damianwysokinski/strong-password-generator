'use strict';

const panels = document.querySelector('.panels');
const benefitsCardsElement = document.querySelector('.benefits__cards');
let isDown = false;
let startX;
let scrollLeft;

class App {
    constructor() {
        panels.addEventListener('click', this._handlePanelOpen.bind(this));
        benefitsCardsElement.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - benefitsCardsElement.offsetLeft;
            scrollLeft = benefitsCardsElement.scrollLeft;
          });
        benefitsCardsElement.addEventListener('mouseleave', () => isDown = false);
        benefitsCardsElement.addEventListener('mouseup', () => isDown = false);
        benefitsCardsElement.addEventListener('mousemove', this._handleBenefitsDrag);
    }

    _handlePanelOpen(e) {
        const panelEl = e.target.closest('.panel');

        if (!panelEl) return;

        panelEl.classList.toggle('active');
    }

    _handleBenefitsDrag(e) {
        e.preventDefault();
        if(!isDown) return;
        const x = e.pageX - benefitsCardsElement.offsetLeft;
        const walk = (x - startX) * 1;
        benefitsCardsElement.scrollLeft = scrollLeft - walk;
    }
}

const app = new App();