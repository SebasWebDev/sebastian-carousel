/**
 * Created by Sebastian Lopez on 1/2/18.
 */
/*
 * Jasmine spec for
 * sebastian-carousel.js
 */
(function() {
    'use strict';

    describe('Sebastian Caruousel plugin', function() {
        var carouselHTML;
        beforeAll(function(done) {
            document.addEventListener("DOMContentLoaded", function() {
                console.log("DOM fully loaded and parsed");
                setTimeout(function() {
                    done();
                }, 1000);
            });
        });
        beforeEach(function() {
            carouselHTML = '<div id="carousel" data-sc="true" data-sc-fullwidth="true">' +
                '<div></div><div></div><div></div><div></div></div>';
            document.body.insertAdjacentHTML(
                'afterbegin',
                carouselHTML);
        });

        afterEach(function() {
            document.body.removeChild(document.getElementById('carousel'));
        });

        it('should throw an error if no element is passed', function() {
            expect(function() {
                new SebastianCarousel();
            }).toThrowError('The element is required.');
        });
        describe('Setup', function() {
            it('should set the carousel as full width', function() {
                var carousel = document.getElementById('carousel');
                new SebastianCarousel(carousel, {fullWidth: true});
                expect(carousel.classList.contains('sebas-carousel--fullwidth')
                ).toBeTruthy();
            });

            it('should activate the first slide', function() {
                var carousel = document.getElementById('carousel');
                new SebastianCarousel(carousel, {fullWidth: true});
                expect(carousel.children[0].classList.contains('sebas-carousel__slide--active')
                ).toBeTruthy();
            });

            it('should set timer if the option is passed', function() {
                var carousel = document.getElementById('carousel');
                var sc = new SebastianCarousel(carousel);
                console.log('interval', sc.interval);
                expect(sc.interval).toBeNull();
                document.body.removeChild(document.getElementById('carousel'));
                document.body.insertAdjacentHTML(
                    'afterbegin',
                    carouselHTML);
                var carousel2 = document.getElementById('carousel');
                var sc2 = new SebastianCarousel(carousel2, {autoStart: true});
                expect(sc2.interval).not.toBeNull();
            });
        });

        describe('Slide', function() {
            it('should go to a specified slide', function() {
                var carousel = document.getElementById('carousel');
                var sc = new SebastianCarousel(carousel);
                spyOn(sc, 'slide').and.callThrough();
                expect(sc.index).toEqual(0);
                sc.goToSlide(3);
                expect(sc.slide).toHaveBeenCalled();
                expect(sc.index).toEqual(3);
            });

            it('should show the previous slide', function() {
                var carousel = document.getElementById('carousel');
                var sc = new SebastianCarousel(carousel);
                expect(sc.index).toEqual(0);
                sc.slide('left');
                expect(sc.index).toEqual(3);
                sc.slide('left');
                expect(sc.index).toEqual(2);
            });
        });

        describe('Timers', function() {
            beforeEach(function() {
                jasmine.clock().install();
            });
            afterEach(function() {
                jasmine.clock().uninstall();
            });
            it('should set an interval', function() {
                var carousel = document.getElementById('carousel');
                var sc = new SebastianCarousel(carousel);
                spyOn(sc, 'slide');
                sc.options.interval = 100;
                sc.setTimer();
                expect(sc.slide).not.toHaveBeenCalled();
                jasmine.clock().tick(101);
                expect(sc.slide).toHaveBeenCalled();
            });
            it('should stop an interval', function() {
                var carousel = document.getElementById('carousel');
                var sc = new SebastianCarousel(carousel);
                spyOn(sc, 'slide');
                sc.options.interval = 100;
                sc.setTimer();
                expect(sc.slide).not.toHaveBeenCalled();
                jasmine.clock().tick(101);
                expect(sc.slide.calls.count()).toEqual(1);
                sc.stopTimer();
                expect(sc.interval).toBeNull();
                jasmine.clock().tick(101);
                expect(sc.slide.calls.count()).toEqual(1);
            });
            it('should reset an interval', function() {
                var carousel = document.getElementById('carousel');
                var sc = new SebastianCarousel(carousel);
                spyOn(sc, 'slide');
                spyOn(sc, 'stopTimer').and.callThrough();
                sc.options.interval = 100;
                sc.setTimer();
                expect(sc.slide).not.toHaveBeenCalled();
                jasmine.clock().tick(101);
                expect(sc.slide.calls.count()).toEqual(1);
                sc.resetTimer();
                expect(sc.stopTimer).toHaveBeenCalled();
                jasmine.clock().tick(101);
                expect(sc.slide.calls.count()).toEqual(2);
            });
        });
        describe('Utility functions', function() {
            it('should validate the effect options', function() {
                spyOn(console, 'warn');
                var carousel = document.getElementById('carousel');
                var sc = new SebastianCarousel(carousel);

                expect(sc.sanitizeOptions('effect', 'slide')).toBeTruthy();
                expect(sc.sanitizeOptions('effect', 'wrong')).toBeFalsy();
                expect(console.warn).toHaveBeenCalled();
            });
            it('should validate boolean options', function() {
                spyOn(console, 'warn');
                var carousel = document.getElementById('carousel');
                var sc = new SebastianCarousel(carousel);

                expect(sc.sanitizeOptions('pagination', true)).toBeTruthy();
                expect(sc.sanitizeOptions('pagination', 'true')).toBeFalsy();
                expect(console.warn).toHaveBeenCalled();
            });
            it('should validate the interval option', function() {
                spyOn(console, 'warn');
                var carousel = document.getElementById('carousel');
                var sc = new SebastianCarousel(carousel);

                expect(sc.sanitizeOptions('interval', 1000)).toBeTruthy();
                expect(sc.sanitizeOptions('interval', 100)).toBeFalsy();
                expect(console.warn).toHaveBeenCalled();
            });
            it('should validate the theme option', function() {
                spyOn(console, 'warn');
                var carousel = document.getElementById('carousel');
                var sc = new SebastianCarousel(carousel);

                expect(sc.sanitizeOptions('theme', 'fullwidth')).toBeTruthy();
                expect(sc.sanitizeOptions('theme', 'content-dark')).toBeTruthy();
                expect(sc.sanitizeOptions('theme', 'wrong')).toBeFalsy();
                expect(console.warn).toHaveBeenCalled();
            });
        });
    });


    function createElement(type, attrs) {
        var e = document.createElement(type);
        for (var a in attrs) {
            e.setAttribute(a, attrs[a]);
        }
        return e;
    }
})();
