'use strict';

function SebastianCarousel(ele, options) {
    if (!ele) {
        throw new Error('The element is required.');
    }
    this.element = ele;
    this.options = this.mergeOptions(options);
    this.setup();
}

SebastianCarousel.prototype = {
    namespace: 'sebas-carousel',
    index: 0,
    isActivated: false,
    interval: null,
    slides: [],
    bullets: [],
    /**
     * Sets up the DOM elements.
     */
    setup: function() {
        var carousel = this;
        var namespace = this.namespace;
        this.element.classList.add(namespace);
        this.element.classList.add(namespace + '--' + this.options.effect);
        this.element.classList.add(namespace + '--' + this.options.theme);

        if (this.options.theme.indexOf('content-') === 0) {
            var sliderWrapper = this.element.querySelector('[data-sc-slider]');
            if (sliderWrapper) this.element = sliderWrapper;
        }
        var bulletWrapper = this.createElement('UL', namespace + '__bullets');
        for (var i = 0; i < this.element.children.length; i++) {
            var currCh = this.element.children[i];
            var bullet = this.createElement('LI', namespace + '__bullet');
            bullet.setAttribute('data-index', i);
            bullet.addEventListener('click', function(e) {
                console.log(e.target);
                var target = e.target;
                carousel.resetTimer();
                carousel.goToSlide(target.getAttribute('data-index'));
            });
            if (i === 0) {
                currCh.classList.add(namespace + '__slide--active');
                bullet.classList.add(namespace + '__bullet--active');
            }
            if (i === 1) {
                currCh.classList.add(namespace + '__slide--next');
            }
            if (i === this.element.children.length - 1) {
                currCh.classList.add(namespace + '__slide--prev');
            }
            bulletWrapper.appendChild(bullet);
            currCh.classList.add(namespace + '__slide');
        }
        this.slides = this.element.querySelectorAll('.sebas-carousel__slide');
        this.element.appendChild(bulletWrapper);
        this.bullets = this.element.querySelectorAll('.sebas-carousel__bullet');
        var arrLeft = this.createElement('A', namespace + '__left');
        var arrRight = this.createElement('A', namespace + '__right');
        this.element.appendChild(arrLeft);
        this.element.appendChild(arrRight);
        this.updateHight();
        arrRight.addEventListener('click', function() {
            carousel.resetTimer();
            carousel.slide('right');
        });
        arrLeft.addEventListener('click', function() {
            carousel.resetTimer();
            carousel.slide('left');
        });
        window.addEventListener('resize', function() {
            carousel.updateHight()
        });
        if (this.options.autoStart) {
            this.setTimer();
        }
    },
    /**
     * Changes the slide
     * @param dir {string} either left or right. Default right.
     */
    slide: function(dir) {
        if (!dir || !dir.match(/^(?:left|right)$/)) dir = 'right';
        var max = this.slides.length - 1;

        var actClass = this.namespace + '__slide--active';
        var prevClass = this.namespace + '__slide--prev';
        var nextClass = this.namespace + '__slide--next';
        var bullClass = this.namespace + '__bullet--active';
        this.element.querySelector('.' + actClass).classList.remove(actClass);
        this.element.querySelector('.' + prevClass).classList.remove(prevClass);
        this.element.querySelector('.' + nextClass).classList.remove(nextClass);
        this.element.querySelector('.' + bullClass).classList.remove(bullClass);

        switch(dir) {
            case 'left':
                this.index = this.index === 0 ? max : this.index - 1;
                break;
            case 'right':
                this.index = this.index === max ? 0 : this.index + 1;
                break;
        }
        var prev = this.index === 0 ? max : this.index - 1;
        var next = this.index === max ? 0 : this.index + 1;
        this.slides[prev].classList.add(this.namespace + '__slide--prev');
        this.slides[this.index].classList.add(this.namespace + '__slide--active');
        this.slides[next].classList.add(this.namespace + '__slide--next');
        this.bullets[this.index].classList.add(this.namespace + '__bullet--active');
        this.updateHight();
    },
    /**
     * Shows a specific slide
     * @param index {number} the index of the slide to show.
     */
    goToSlide: function(index) {
        index = typeof index !== 'number' ? parseInt(index) : index;
        var max = this.slides.length - 1;
        this.index = index === 0 ? max : (index > max ? max : index - 1);
        this.slide();
    },
    setTimer: function() {
        var carousel = this;
        this.interval = setInterval(function() {
            carousel.slide('right');
        }, carousel.options.interval);
    },
    resetTimer: function() {
        if (this.interval) {
            this.stopTimer();
            this.setTimer();
        }
    },
    stopTimer: function() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },
    updateHight: function() {
        this.element.style.height = this.slides[this.index].scrollHeight + 'px';
    },
    createElement: function(type, classes) {
        if (typeof type !== "string" || typeof classes !== "string") {
            throw new Error('Parameters should be of type string.');
        }
        var e = document.createElement(type);
        e.className = classes;
        return e;
    },
    mergeOptions: function(opts) {
        var defaultOptions = {
            effect: 'fade',
            pagination: true,
            showArrows: true,
            autoStart: false,
            theme: 'fullwidth',
            interval: 3000
        };
        if (opts) {
            for (var p in defaultOptions) {
                if (defaultOptions.hasOwnProperty(p)) { // Good practice to only loop through the enumerable properties.
                    if (opts.hasOwnProperty(p) && this.sanitizeOptions(p, opts[p])) {
                        defaultOptions[p] = opts[p];
                    }
                }
            }
        }

        return defaultOptions;
    },
    sanitizeOptions: function(k, val) {
        var result,
            message = 'The option ' + k + ' does not have a valid value.';
        switch(k) {
            case 'effect':
                result = !!val.match(/^(?:fade|slide)$/);
                message += ' The value should be either fade or slide';
                break;
            case 'theme':
                result = !!val.match(/^(?:fullwidth|content-dark|content-light|social|editorial)$/);
                message += ' The value is not a valid theme.';
                break;
            case 'pagination':
            case 'autoStart':
            case 'showArrows':
                result = typeof val === 'boolean';
                message += ' The value should be a boolean.';
                break;
            case 'interval':
                result = typeof val === 'number' && val > 200;
                message += ' The value should be a number greater than 200';
                break;
        }
        if (!result)
            console.warn(message);
        return result;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    var carousels = document.querySelectorAll('[data-sc]');
    if (carousels) {
        for (var i = 0; i < carousels.length; i++) {
            var ops = {};
            if (carousels[i].getAttribute('data-sc-theme')) {
                ops['theme'] = carousels[i].getAttribute('data-sc-theme');
            }
            if (carousels[i].getAttribute('data-sc-interval')) {
                ops['interval'] = parseInt(carousels[i].getAttribute('data-sc-interval'));
            }
            if (carousels[i].getAttribute('data-sc-autostart')) {
                ops['autoStart'] = (carousels[i].getAttribute('data-sc-autostart') === 'true');
            }
            if (carousels[i].getAttribute('data-sc-pagination')) {
                ops['pagination'] = (carousels[i].getAttribute('data-sc-pagination') === 'true');
            }
            if (carousels[i].getAttribute('data-sc-effect')) {
                ops['effect'] = carousels[i].getAttribute('data-sc-effect');
            }
            new SebastianCarousel(carousels[i], ops);
        }
    }
});
