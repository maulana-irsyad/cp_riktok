(function () {
    'use strict';
  
    // A class for building verticalsliders from it
    class Verticalslider {
      constructor(id, mediaQueries) {
        // Get HTML elements
        this.verticalslider = document.querySelector(`#${id}`);
        this.verticalsliderList = this.verticalslider.querySelector('.verticalslider-list');
        this.verticalsliderItems = this.verticalslider.querySelectorAll('.verticalslider-item');
        this.verticalsliderNext = this.verticalslider.querySelector('.verticalslider-arrow-next');
        this.verticalsliderPrev = this.verticalslider.querySelector('.verticalslider-arrow-prev');
  
        // Get media queries
        this.mediaQueryList = [window.matchMedia(`screen and (max-height:${mediaQueries[0] - 1}px)`)];
        mediaQueries.forEach((mediaQuery) => {
          this.mediaQueryList.push(window.matchMedia(`screen and (min-height:${mediaQuery}px)`));
        });
  
        // Define global variables
        this.numberOfVisibleItems = null;
        this.currentItemIndex = null;
        this.verticalsliderItemsLength = this.verticalsliderItems.length;
        this.mediaQueryLength = this.mediaQueryList.length;
  
        // Add event listener: to call the run function again when screen resized
        this.mediaQueryList.forEach((mediaQuery) => {
          mediaQuery.addEventListener('change', () => {
            this.run();
          });
        });
  
        // Add event listener: to go to next slide
        this.verticalsliderNext.addEventListener('click', () => {
          if (this.currentItemIndex < this.verticalsliderItemsLength - this.numberOfVisibleItems) {
            this.currentItemIndex++;
            this.shiftSlides();
          }
        });
  
        // Add event listener: to go to previous slide
        this.verticalsliderPrev.addEventListener('click', () => {
          if (this.currentItemIndex > 0) {
            this.currentItemIndex--;
            this.shiftSlides();
          }
        });
  
        // Disable focus on all slides links
        this.verticalsliderItems.forEach((item) => {
          const elements = item.querySelectorAll('a');
          elements.forEach((element) => {
            element.tabIndex = '-1';
          });
        });
  
        // Add event listener: to scroll down to verticalslider when previous arrow focused
        // this.verticalsliderPrev.addEventListener('focusin', () => {
        //   this.verticalslider.scrollIntoView();
        // });
  
        // // Add event listener: to scroll down to verticalslider when next arrow focused
        // this.verticalsliderNext.addEventListener('focusin', () => {
        //   this.verticalslider.scrollIntoView();
        // });
      }
  
      // Run the verticalslider
      run() {
        let index = this.mediaQueryLength - 1;
        while (index >= 0) {
          if (this.mediaQueryList[index].matches) {
            // Set number of visible slides
            this.numberOfVisibleItems = index + 1;
  
            // Reset the verticalslider
            this.currentItemIndex = 0;
            this.verticalsliderList.style.transform = 'translateY(0%)';
  
            // Set verticalslider list width
            this.verticalsliderList.style.height = `calc(${(100 / this.numberOfVisibleItems) * this.verticalsliderItemsLength}% + ${(this.verticalsliderItemsLength / this.numberOfVisibleItems) * 16}px)`;
  
            // Set slides width
            this.verticalsliderItems.forEach((item) => {
              item.style.height = `${100 / this.numberOfVisibleItems}%`;
            });
  
            // Exit the loop
            break;
          }
          index--;
        }
      }
  
      // A function to shift slides left and right
      shiftSlides() {
        this.verticalsliderList.style.transform = `translateY(-${(100 / this.verticalsliderItemsLength) * this.currentItemIndex}%)`;
      }
    }
  
    /* 
    Note about creating new verticalslider:
    First parameter is the id of the HTML verticalslider-container element of each verticalslider.
    Second parameter is an array of the media queries (breaking points) where the number of slides increases.
    */
  
    // Create a new verticalslider and run it
    new Verticalslider('new-gambar', [576, 992]).run();
  
    // Create a new verticalslider and run it
    new Verticalslider('featured-gambar', [576, 768, 992]).run();
  })();
  