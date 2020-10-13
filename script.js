$(document).ready(function () {
  createSections();
  handleChangeSection();

  $(window).on({ resize: createSections }, 200);
});

const createSections = function () {
  $('.sections').each(function () {
    const defaultHeightSection = $(this).attr('data-height-section');
    const itemsSection = $(this).attr('data-items-section');

    const container = $(this).find('div').first();
    const elements = $(container).children('div');

    let totalSections = $(this).attr('data-total-sections');
    if (totalSections === undefined) {
      $.each(elements, function (index) {
        let position = index + 1;
        if (position % itemsSection === 0 && position !== elements.length) {
          $(this).after(
            '<hr class="section-divider" style="display: flex; width: 100%; margin: 20px 0; border: 0;" />'
          );
        }
      });
    }

    const dividers = $(this).find('.section-divider');
    if (dividers.length == 0) {
      $(container).css('height', defaultHeightSection + 'px');
      $(this).attr('data-total-sections', 0);
    } else {
      const heightSection = $(dividers[0]).offset().top - $(this).offset().top;
      const totalSections = Math.ceil(elements.length / itemsSection);
      const resultHeight = heightSection * totalSections;

      const positions = [];
      const positionSection = $(this).offset().top;
      positions.push(0); // posição relativa do Scroll Top da seção
      $.each(dividers, function () {
        positions.push($(this).offset().top - positionSection); // posição do Scroll Top da divisão
      });
      $(this).attr('data-positions', positions.join());

      $(container).css('height', resultHeight + 'px');
      $(this).attr('data-total-sections', totalSections);
      $(this).css({
        height: heightSection + 'px',
        overflow: 'hidden',
      });
      $(this).attr('data-total-sections');
    }

    $(this).attr('data-current-section', 0);
  });
};

const handleChangeSection = function () {
  $('button[data-handle-section]').on('click', function () {
    const id = $(this).attr('data-handle-section');
    const section = $('.sections[data-id=' + id + ']');

    const type = $(this).attr('data-type');
    const totalSections = parseInt($(section).attr('data-total-sections'));
    const currentSection = parseInt($(section).attr('data-current-section'));

    const positions = [];
    let textPositions = $(section).attr('data-positions').split(',');
    $.each(textPositions, function (index) {
      positions.push(parseFloat(textPositions[index]));
    });

    console.log(type, totalSections, currentSection);

    let newCurrentSection;
    if (type === 'next' && currentSection < totalSections - 1) {
      newCurrentSection = currentSection + 1;
      $(section).attr('data-current-section', newCurrentSection);
      section.scrollTop(positions[newCurrentSection]);
    } else if (type === 'previous' && currentSection > 0) {
      newCurrentSection = currentSection - 1;
      $(section).attr('data-current-section', newCurrentSection);
      section.scrollTop(positions[newCurrentSection]);
    }
  });
};
