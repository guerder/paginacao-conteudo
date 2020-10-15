$(document).ready(function () {
  createSections();
  handleChangeSection();

  $(window).on({ resize: createSections }, 200);
});

const createSections = function () {
  $('.sections').each(function () {
    $(this).scrollTop(0);
    const defaultHeightSection = $(this).attr('data-height-section');
    const itemsSection = $(this).attr('data-items-section');

    const container = $(this).find('div').first();
    const elements = $(container).children('div');

    const dividersRemove = container.find('.section-divider');
    dividersRemove.each(function () {
      $(this).remove();
    });

    $.each(elements, function (index) {
      let position = index + 1;
      if (position % itemsSection === 0 && position !== elements.length) {
        $(this).after(
          '<hr class="section-divider" style="display: flex; width: 100%; margin: 20px 0; border: 0;" />'
        );
      }
    });

    const dividers = $(this).find('.section-divider');
    if (dividers.length == 0) {
      $(container).css('height', defaultHeightSection + 'px');
      $(this).attr('data-total-sections', 0);
      $(this).attr('data-total-sections', 0);
      $(this).attr('data-positions', 0);
    } else {
      const firstBox = $(container).find('div').first();
      const topFirstBox = firstBox.offset().top;
      const padding = topFirstBox - $(this).offset().top;
      const lastBox = $(dividers[0]).prev();
      const bottomLastBox = lastBox.offset().top + lastBox.outerHeight();
      const heightSection =
        bottomLastBox + padding - Math.abs($(this).offset().top);
      const totalSections = Math.ceil(elements.length / itemsSection);
      const resultHeight = heightSection * totalSections;

      const positions = [];
      const positionSection = $(this).offset().top;
      positions.push(0);
      $.each(dividers, function () {
        positions.push($(this).offset().top - positionSection);
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

const recreateSection = function (dataIdSection) {
  const section = $('.sections[data-id=' + dataIdSection + ']');
  const defaultHeightSection = $(section).attr('data-height-section');
  const itemsSection = $(section).attr('data-items-section');

  const container = $(section).find('div').first();
  const elements = $(container).find('.correspondente');

  const dividersRemove = container.find('.section-divider');
  dividersRemove.each(function () {
    $(this).remove();
  });

  $.each(elements, function (index) {
    let position = index + 1;
    if (position % itemsSection === 0 && position !== elements.length) {
      $(this).after(
        '<hr class="section-divider" style="display: flex; width: 100%; margin: 20px 0; border: 0;" />'
      );
    }
  });

  const dividers = $(section).find('.section-divider');
  if (dividers.length == 0) {
    $(section).css('height', 'auto');
    $(container).css('height', defaultHeightSection + 'px');
    $(section).attr('data-total-sections', 0);
    $(section).attr('data-positions', 0);
  } else {
    const firstBox = $(container).find('div').first();
    const topFirstBox = firstBox.offset().top;
    const padding = topFirstBox - $(this).offset().top;
    const lastBox = $(dividers[0]).prev();
    const bottomLastBox = lastBox.offset().top + lastBox.outerHeight();
    const heightSection = bottomLastBox + padding - $(this).offset().top;
    const totalSections = Math.ceil(elements.length / itemsSection);
    const resultHeight = heightSection * totalSections;

    const positions = [];
    const positionSection = $(section).offset().top;
    positions.push(0);
    $.each(dividers, function () {
      positions.push($(this).offset().top - positionSection);
    });
    $(section).attr('data-positions', positions.join());

    $(container).css('height', resultHeight + 'px');
    $(section).attr('data-total-sections', totalSections);
    $(section).css({
      height: heightSection + 'px',
      overflow: 'hidden',
    });
  }

  $(section).attr('data-current-section', 0);
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
