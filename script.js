window.addEventListener('load', function () {
  ContainerPagination.Init();
});

const ContainerPagination = {
  Init: function () {
    this.CreateSections();
    this.HandleNavigationSection();
    window.addEventListener('resize', this.CreateSections);
  },
  CreateSections: function () {
    const allSections = document.querySelectorAll('.sections');
    allSections.forEach((section) => {
      section.scrollTop = 0;
      const itemsSection = section.getAttribute('data-items-section');

      const container = section.firstElementChild;
      const filter = section.getAttribute('data-filter');

      let elements;
      if (filter !== null || filter === undefined) {
        elements = container.querySelectorAll('.' + filter);
      } else {
        elements = container.children;
      }

      const dividersList = container.querySelectorAll('.section-divider');
      dividersList.forEach((div) => div.parentNode.removeChild(div));

      Array.from(elements).forEach((elem, index) => {
        let position = index + 1;
        if (position % itemsSection === 0 && position !== elements.length) {
          let hr = document.createElement('hr');
          hr.classList.add('section-divider');
          hr.style.display = 'flex';
          hr.style.width = '100%';
          hr.style.margin = '20px 0';
          hr.style.border = '0';
          elem.after(hr);
        }
      });

      const dividers = section.querySelectorAll('.section-divider');
      if (dividers.length == 0) {
        section.setAttribute('data-total-sections', 0);
        section.setAttribute('data-positions', 0);

        const firstBox = container.firstElementChild;
        const topFirstBox = firstBox.offsetTop;
        const marginBox = topFirstBox - container.offsetTop;
        const lastBox = container.lastElementChild;
        const bottomLastBox = lastBox.offsetTop + lastBox.innerHeight;
        const heightSection = bottomLastBox + marginBox - container.offsetTop;
        const marginContainer = container.offsetTop - section.offsetTop;

        container.style.height = heightSection + 'px';
        section.height = heightSection + marginContainer * 2 + 'px';
      } else {
        const heightSection = dividers[0].offsetTop - section.offsetTop;
        const totalSections = Math.ceil(elements.length / itemsSection);
        const resultHeight = heightSection * totalSections;

        const positions = [];
        const positionSection = section.offsetTop;
        positions.push(0);
        dividers.forEach((item) =>
          positions.push(item.offsetTop - positionSection)
        );
        section.setAttribute('data-positions', positions.join());

        container.style.height = resultHeight + 'px';
        section.setAttribute('data-total-sections', totalSections);
        section.style.height = heightSection + 'px';
        section.style.overflow = 'hidden';
      }

      section.setAttribute('data-current-section', 0);
    });
  },
  HandleNavigationSection: function () {
    const allButtons = document.querySelectorAll('button[data-handle-section]');
    allButtons.forEach((button) => {
      button.addEventListener('click', handleClickButton);
    });

    function handleClickButton(event) {
      const button = event.target;
      const id = button.getAttribute('data-handle-section');
      const section = document.querySelector('.sections[data-id=' + id + ']');

      const type = button.getAttribute('data-type');
      const totalSections = parseInt(
        section.getAttribute('data-total-sections')
      );
      const currentSection = parseInt(
        section.getAttribute('data-current-section')
      );

      const positions = [];
      let textPositions = section.getAttribute('data-positions').split(',');
      textPositions.forEach((value) => {
        positions.push(parseFloat(value));
      });

      let newCurrentSection;
      if (type === 'next' && currentSection < totalSections - 1) {
        newCurrentSection = currentSection + 1;
        section.setAttribute('data-current-section', newCurrentSection);
        section.scroll({
          top: positions[newCurrentSection],
          behavior: 'smooth',
        });
      } else if (type === 'previous' && currentSection > 0) {
        newCurrentSection = currentSection - 1;
        section.setAttribute('data-current-section', newCurrentSection);
        section.scroll({
          top: positions[newCurrentSection],
          behavior: 'smooth',
        });
      }
    }
  },
};
