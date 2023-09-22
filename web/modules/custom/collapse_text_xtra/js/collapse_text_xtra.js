(function ($, Drupal) {
  Drupal.behaviors.collapseText = {
    attach: function (context, settings) {
      // Find the start of the collapsible text and inject "Expand All" and "Collapse All" links before it.
      $('.collapse-text-details').first().before("<div class='toggle-all'><a class='expand-all' href='#'>Expand all</a> | <a class='collapse-all' href='#'>Collapse all</a></div>");

      let headers = $('.collapse-text-details summary[role="button"]');
      let contentAreas = $('.collapse-text-details .details-wrapper');
      let expandLink = $('.expand-all');
      let collapseLink = $('.collapse-all');

      // Expand all collapsible elements.
      expandLink.click(function() {
        $('.collapsible.collapsed').each(function () {
          $(this).removeClass('collapsed');
          $(this).attr('open', '');
          let summary = $('summary', $(this)).first();
          summary.attr('aria-expanded', 'true');
          summary.attr('aria-pressed', 'true');
          contentAreas.show();
        });

        // Stop the link from causing a page scroll.
        return false;
      });

      // Collapse all collapsible elements.
      collapseLink.click(function () {
        $('.collapsible').each(function() {
          if (!$(this).hasClass('collapsed')) {
            $(this).addClass('collapsed');
            $(this).removeAttr('open');
            let summary = $('summary', $(this)).first();
            summary.attr('aria-expanded', 'false');
            summary.attr('aria-pressed', 'false ');

            if (/rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
              contentAreas.hide();
            }
          }
        });

        // Stop the link from causing a page scroll.
        return false;
      });

      // When panels open or close, check to see if they're all open.
      contentAreas.on({
        // Whenever we open a panel, check to see if they're all open.
        // If all open, swap the button to collapser.
        show: function(){
          let isAllOpen = !contentAreas.is(':hidden');
          if (isAllOpen){
            expandLink.data('isAllOpen', true);
            $('details.collapse-text-details').removeClass('collapsed').children('.details-wrapper').show();
          }
        },
        // Whenever we close a panel, check to see if they're all open.
        // If not all open, swap the button to expander.
        hide: function(){
          let isAllOpen = !contentAreas.is(':hidden');
          if (!isAllOpen){
            collapseLink.data('isAllOpen', false);
            $('details.collapse-text-details').addClass('collapsed').children('.details-wrapper').hide();
          }
        }
      });
    }
  };
})(jQuery, Drupal);
