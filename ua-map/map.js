import {
  fetchSvgRegions,
  getIndustries,
  renderRegionPath,
  renderRegionText,
} from './utils.js';

const svgElement = document.getElementById('svg382');
const svgContainer = document.getElementById('svg-map-regions');
const navIndustries = document.querySelector('.ind-nav_list');

(async () => {
  const [reg, data] = await fetchSvgRegions();
  createMap(reg.regions, data.data);
})();

function createMap(regions, regionsData) {
  let isMainSVGVisible = true;
  renderMap();

  function renderMap() {
    isMainSVGVisible = true;
    render(regions);
    const industries = getIndustries(regionsData);
    renderNavIndustries(industries);
  }

  function renderNavIndustries(industries) {
    const navItems = industries.map(industry => {
      const { li, button } = createNavItem(industry.title);
      button.addEventListener('click', () => {
        highlightByIndustry(industry.slug);
      });
      li.appendChild(button);
      return li;
    });

    renderNav(navItems);
  }
  function renderNavRegions(regions, industry) {
    let navItems = [];
    regions.forEach(region => {
      region.industries.forEach(el => {
        if (el.slug === industry) {
          const { li, button } = createNavItem(
            `${el.region} (${region.regionId})`,
          );
          button.addEventListener('click', () => {
            highlightByIndustry(el.slug);
          });
          li.appendChild(button);
          navItems.push(li);
        }
      });
    });
    console.log(navItems);

    renderNav(navItems);
  }
  function renderNavRegionIndustries(industries) {
    const navItems = industries.map(industry => {
      const { li, button } = createNavItem(industry.title);
      button.addEventListener('click', () => {
        highlightByIndustry(industry.slug);
      });
      li.appendChild(button);
      return li;
    });

    renderNav(navItems);
  }

  function createNavItem(text) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = text;
    return { li, button };
  }

  function renderNav(items) {
    /* CLEANUP */
    navIndustries.innerHTML = '';
    console.log(items);

    items.forEach(item => {
      navIndustries.appendChild(item);
    });

    if (!isMainSVGVisible) {
      const { li, button } = createNavItem('Back to whole map');

      button.addEventListener('click', () => {
        renderMap();
      });

      li.appendChild(button);
      navIndustries.appendChild(li);
    }
  }

  function highlightByIndustry(activeIndustry) {
    let regionsToHighlight = [];

    regionsData.forEach(item => {
      if (item.industries.some(el => el.slug === activeIndustry)) {
        regionsToHighlight.push(item);
      }
    });

    if (!isMainSVGVisible) {
      isMainSVGVisible = true;
      render(
        regions.map(region => {
          if (regionsToHighlight.some(el => el.regionId === region.id)) {
            return { ...region, active: true };
          }
          return { ...region, active: false };
        }),
      );
      renderNavRegions(regionsToHighlight, activeIndustry);
    } else {
      render(
        regions.map(region => {
          if (regionsToHighlight.some(el => el.regionId === region.id)) {
            return { ...region, active: true };
          }
          return { ...region, active: false };
        }),
      );
    }
  }
  function render(regions) {
    svgElement.setAttribute('width', '820');
    svgElement.setAttribute('height', '540');
    svgElement.setAttribute('viewBox', '0 0 820 540');
    svgContainer.setAttribute('transform', `translate(0, 222)`);

    svgContainer.innerHTML = '';

    regions.forEach(el => {
      svgContainer.innerHTML += renderRegionPath(el);
    });

    regions.forEach(el => {
      document.getElementById(`g-${el.id}`).innerHTML += renderRegionText(el);
    });
  }

  function renderSingleRegion(regionId) {
    if (!regionId) {
      return;
    }
    const old = document.getElementById(regionId).getBBox();
    const region = regions.find(reg => reg.id === regionId);
    isMainSVGVisible = false;

    svgElement.setAttribute('width', old.width * 2);
    svgElement.setAttribute('height', 240);
    svgElement.setAttribute(
      'viewBox',
      `${old.x} ${old.y} ${old.width} ${old.height}`,
    );

    svgContainer.setAttribute('transform', `translate(0, 0)`);
    svgContainer.innerHTML = renderRegionPath(region);

    document.getElementById(`g-${regionId}`).innerHTML += renderRegionText(
      region,
    );

    renderRegionText(region);
    renderNavRegionIndustries(
      regionsData.find(item => item.regionId === regionId).industries,
    );
  }

  svgContainer.addEventListener('click', e => {
    if (e.target.getAttribute('data-active') === 'true') {
      if (isMainSVGVisible) {
        renderSingleRegion(e.target.id);
      }
    }
  });
}
