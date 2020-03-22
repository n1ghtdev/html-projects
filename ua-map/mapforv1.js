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
  let viewState = 'main';
  renderMap();

  function renderMap() {
    viewState = 'main';
    render(regions);
    const industries = getIndustries(regionsData);
    renderNavIndustries(industries);
  }

  function renderNavIndustries(industries) {
    function createSpanCounter(count = 0) {
      const span = document.createElement('span');
      span.textContent = count;
      return span;
    }

    const navItems = industries.map(industry => {
      const { li, link } = createNavItem();
      const span = createSpanCounter(industry.count);

      link.addEventListener('click', () => {
        viewState = 'regions';
        highlightByIndustry(industry.slug);
      });
      link.textContent = industry.title;

      li.append(link, span);

      return li;
    });

    renderNav(navItems, 'Industries');
  }
  function renderNavRegions(regions, industry) {
    let navItems = [];
    let industryTitle;
    regions.forEach(region => {
      region.industries.forEach(el => {
        if (el.slug === industry) {
          if (!industryTitle) {
            industryTitle = el.title;
          }
          const { li, link } = createNavItem();
          link.addEventListener('click', () => {
            renderSingleRegion(region.regionId);
          });
          link.textContent = region.regionId;
          li.append(el.region, ' (', link, ')');
          navItems.push(li);
        }
      });
    });

    renderNav(navItems, industryTitle);
  }
  function renderNavSingleRegion(industries, region) {
    const navItems = industries.map(industry => {
      const { li, link } = createNavItem();
      link.addEventListener('click', () => {
        viewState = 'regions';
        highlightByIndustry(industry.slug);
      });
      console.log(industry);

      link.innerText = industry.title;
      li.append(link, ` ${industry.region}`);
      return li;
    });

    renderNav(navItems, `${region} Oblast`);
  }

  function createNavItem(text) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    if (text) {
      li.textContent = text;
    }
    return { li, link };
  }

  function renderNav(items, title = '') {
    /* CLEANUP */
    navIndustries.innerHTML = '';

    navIndustries.innerHTML = `<h3>${title}</h3>`;
    items.forEach(item => {
      navIndustries.appendChild(item);
    });

    if (viewState === 'single' || viewState === 'regions') {
      const { li, link } = createNavItem();

      link.addEventListener('click', () => {
        renderMap();
      });
      link.textContent = 'Back to whole map';

      li.appendChild(link);
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

    if (viewState === 'single' || viewState === 'regions') {
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
    viewState = 'single';

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
    renderNavSingleRegion(
      regionsData.find(item => item.regionId === regionId).industries,
      regionId,
    );
  }

  svgContainer.addEventListener('click', e => {
    if (e.target.getAttribute('data-active') === 'true') {
      if (viewState !== 'single') {
        renderSingleRegion(e.target.id);
      }
    }
  });
}
