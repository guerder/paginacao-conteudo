$(document).ready(function () {
  createSections();
  handleChangeSection();

  $(window).on({ resize: createSections }, 200);
});

const createSections = function () {
  $('.sections').each(function () {
    const section = $(this);
    section.scrollTop(0);
    const itemsSection = section.attr('data-items-section');

    const container = section.find('div').first();

    const filter = section.attr('data-filter');
    const elements =
      filter === undefined
        ? container.children('div')
        : container.find('.' + filter);

    const dividersRemove = container.find('.section-divider');
    dividersRemove.each(function () {
      $(this).remove();
    });

    $.each(elements, function (index) {
      const element = $(this);
      let position = index + 1;
      if (position % itemsSection === 0 && position !== elements.length) {
        $(element).after(
          '<hr class="section-divider" style="display: flex; width: 100%; margin: 20px 0; border: 0;" />'
        );
      }
    });

    const dividers = section.find('.section-divider');
    if (dividers.length == 0) {
      section.attr('data-total-sections', 0);
      section.attr('data-positions', 0);

      const boxesList = container.find('div');
      const firstBox = boxesList[0];
      const topFirstBox = firstBox.offsetTop;
      const marginBox = topFirstBox - container.offset().top;
      const lastBox = boxesList[boxesList.length - 1];
      const bottomLastBox = lastBox.offsetTop + lastBox.innerHeight;
      const heightSection = bottomLastBox + marginBox - container.offset().top;
      const marginContainer = container.offset().top - section.offset().top;

      container.css({
        height: heightSection + 'px',
      });
      section.css({
        height: heightSection + marginContainer * 2 + 'px',
      });
    } else {
      const heightSection = $(dividers[0]).offset().top - section.offset().top;
      const totalSections = Math.ceil(elements.length / itemsSection);
      const resultHeight = heightSection * totalSections;

      const positions = [];
      const positionSection = section.offset().top;
      positions.push(0);
      $.each(dividers, function () {
        const divider = $(this);
        positions.push(divider.offset().top - positionSection);
      });
      section.attr('data-positions', positions.join());

      container.css('height', resultHeight + 'px');
      section.attr('data-total-sections', totalSections);
      section.css({
        height: heightSection + 'px',
        overflow: 'hidden',
      });
      section.attr('data-total-sections');
    }

    section.attr('data-current-section', 0);
  });
};

const handleChangeSection = function () {
  $('button[data-handle-section]').on('click', function () {
    const button = $(this);
    const id = button.attr('data-handle-section');
    const section = $('.sections[data-id=' + id + ']');

    const type = button.attr('data-type');
    const totalSections = parseInt(section.attr('data-total-sections'));
    const currentSection = parseInt(section.attr('data-current-section'));

    const positions = [];
    let textPositions = section.attr('data-positions').split(',');
    $.each(textPositions, function (_, value) {
      positions.push(parseFloat(value));
    });

    let newCurrentSection;
    if (type === 'next' && currentSection < totalSections - 1) {
      newCurrentSection = currentSection + 1;
      section.attr('data-current-section', newCurrentSection);
      section.scrollTop(positions[newCurrentSection]);
    } else if (type === 'previous' && currentSection > 0) {
      newCurrentSection = currentSection - 1;
      section.attr('data-current-section', newCurrentSection);
      section.scrollTop(positions[newCurrentSection]);
    }
  });
};
