import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements AfterViewInit {
  @Input() articles: Array<any>;

  constructor() { }

  ngAfterViewInit(): void {

    $('#scroll-top-icon').click(function () {
      // Collapse linkList and nav-links
      ($('.collapse') as any).collapse('hide');

      // Scroll to top
      $('html, body').animate({ scrollTop: '0px' }, 300);
    });

    $('.article-link').click((event) => {
      // Stop default scrolling to href on link click event
      event.preventDefault();

      // Get target hash 
      const target: string = (event.target as any).hash;

      // Start scolling when linkList is collapsed
      $('#linkList').on('hidden.bs.collapse', () => {
        // Get target location after linkList collapsed to prevent incorect position
        const isCompactView = $('#header-sm').is(':visible');
        const sideNavOffset = isCompactView ? $('#scrollspy').outerHeight(true) : 0;
        const targetPosition = $(target).offset().top - sideNavOffset;

        // Scroll to target position
        $('html, body').animate({ scrollTop: targetPosition }, 500);

        // Remove callback scroll animation
        $('#linkList').off('hidden.bs.collapse');
      });

      // Collapse linkList and nav-links
      ($('.collapse') as any).collapse('hide');
    });
  }
}
