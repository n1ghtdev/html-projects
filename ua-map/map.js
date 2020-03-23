import {
  getUniqueIndustries,
  renderRegionPath,
  renderRegionText,
} from './utils.js';
import { mapConfig } from './mapv3.js';
import { mapData } from './mapData.js';

const svgElement = document.getElementById('svg57');
const svgContainer = document.getElementById('svg-map-regions');
const navMenu = document.querySelector('.map-section_nav-list');

// change structure from server to ->
// [{key, name, industries: [{slug, title, city}] }]
const newMapData = Object.keys(mapData).map(regionKey => {
  const { key, name, cities } = mapData[regionKey];
  let industries = [];

  cities.forEach(city => {
    city.industries.forEach(industry => {
      industries.push({
        ...industry,
        city: city.name,
      });
    });
  });
  return {
    key,
    name,
    industries,
  };
});

createMap(mapConfig, newMapData);

function createMap(mapConfig, mapData) {
  let viewState = 'main';

  render();
  initEvents();

  function render(regions) {
    switch (viewState) {
      case 'main': {
        const [uniqueIndustries, total] = getUniqueIndustries(mapData);

        renderByRegions();
        renderNavIndustries(uniqueIndustries, total);
        break;
      }
      case 'regions': {
        renderByRegions(regions);
        break;
      }
      case 'single': {
        renderSingleRegion(regions);
        break;
      }
    }
  }

  // ========================= INIT EVENTS FUNCTION ======================

  function initEvents() {
    svgContainer.addEventListener('click', e => {
      if (e.target.getAttribute('data-active') === 'true') {
        if (viewState !== 'single') {
          viewState = 'single';
          render(e.target.id);
          renderNavSingleRegion(e.target.id);
        }
      }
    });

    navMenu.addEventListener('click', e => {
      const el = e.target;

      if (el.getAttribute('data-industry')) {
        viewState = 'regions';
        const activeIndustry = el.getAttribute('data-industry');
        const regionsKeys = [];

        mapData.forEach(region => {
          region.industries.forEach(industry => {
            if (industry.slug === activeIndustry) {
              const isDuplicate = regionsKeys.some(key => key === region.key);

              if (!isDuplicate) {
                regionsKeys.push(region.key);
              }
            }
          });
        });

        render(regionsKeys);
        renderNavRegions(activeIndustry);
      } else if (el.getAttribute('data-region-key')) {
        viewState = 'single';
        const regionKey = el.getAttribute('data-region-key');
        const regionName = mapData.find(region => region.key === regionKey)
          .name;

        render(regionKey);
        renderNavSingleRegion(regionKey);
      } else {
        viewState = 'main';
        render();
      }
    });
  }

  // ===================== MAP RENDERING FUNCTIONS =======================

  function renderByRegions(regionsKeys) {
    svgElement.setAttribute('width', '800');
    svgElement.setAttribute('height', '540');
    svgElement.setAttribute('viewBox', '0 0 800 540');

    svgContainer.innerHTML = '';

    if (regionsKeys) {
      mapConfig.forEach(el => {
        const active = regionsKeys.some(key => key === el.key);
        svgContainer.innerHTML += renderRegionPath({ ...el, active });
      });
    } else {
      mapConfig.forEach(el => {
        const active =
          mapData.find(reg => reg.key === el.key).industries.length !== 0;

        svgContainer.innerHTML += renderRegionPath({ ...el, active });
      });
    }

    if (regionsKeys) {
      mapConfig.forEach(el => {
        const active = regionsKeys.some(key => key === el.key);
        const { name, industries } = mapData.find(reg => reg.key === el.key);

        document.getElementById(`g-${el.key}`).innerHTML += renderRegionText({
          key: el.key,
          textX: el.textX,
          textY: el.textY,
          active,
          name,
        });
      });
    } else {
      mapConfig.forEach(el => {
        const { name, industries } = mapData.find(reg => reg.key === el.key);
        const active = industries.length !== 0;

        document.getElementById(`g-${el.key}`).innerHTML += renderRegionText({
          key: el.key,
          textX: el.textX,
          textY: el.textY,
          active,
          name,
        });
      });
    }
  }

  function renderSingleRegion(regionKey) {
    if (!regionKey) {
      return;
    }
    const old = document.getElementById(regionKey).getBBox();
    const region = mapConfig.find(reg => reg.key === regionKey);
    const regionName = mapData.find(reg => reg.key === regionKey).name;

    viewState = 'single';

    svgElement.setAttribute('width', old.width * 2);
    svgElement.setAttribute('height', 240);
    svgElement.setAttribute(
      'viewBox',
      `${old.x} ${old.y} ${old.width} ${old.height}`,
    );

    svgContainer.innerHTML = renderRegionPath({ ...region, active: true });

    document.getElementById(`g-${regionKey}`).innerHTML += renderRegionText(
      {
        key: regionKey,
        textX: region.textX,
        textY: region.textY,
        active: true,
        name: regionName,
      },
      true,
    );
  }

  // ==================== NAV MENU RENDERING FUNCTIONS =====================

  function renderNav(items, title = '') {
    navMenu.innerHTML = '';
    navMenu.innerHTML = `<h3 class="map-section_nav-title">${title}</h3>`;

    items.forEach(item => {
      navMenu.innerHTML += item;
    });

    if (viewState === 'single' || viewState === 'regions') {
      const li = `
        <li class="map-section_nav-item">
          <button class="map-section_nav-item-link">Back to whole map</button>
        </li>`;
      navMenu.innerHTML += li;
    }
  }

  function renderNavIndustries(industries, total) {
    const navItems = industries.map(industry => {
      return `
        <li style="display: flex;" class="map-section_nav-item">
          <button class="map-section_nav-item-link" data-industry="${industry.slug}">
            ${industry.title}
          </button>
          <span>${industry.count}</span>
        </li>`;
    });

    const liTotalProjects = `
      <li style="display: flex;" class="map-section_nav-item map-section_nav-item-total">
        Total number of projects
        <span>${total}</span>
      </li>`;

    navItems.push(liTotalProjects);

    renderNav(navItems, 'Industries');
  }

  function renderNavRegions(activeIndustry) {
    let navItems = [];
    let industryTitle = '';

    mapData.forEach(region => {
      region.industries.forEach(industry => {
        if (industry.slug === activeIndustry) {
          if (!industryTitle) industryTitle = industry.title;

          const li = `
            <li class="map-section_nav-item">
              ${industry.city}
              (<button class="map-section_nav-item-link" data-region-key="${region.key}">
                ${region.name}
              </button>)
            </li>`;

          navItems.push(li);
        }
      });
    });

    renderNav(navItems, industryTitle);
  }

  function renderNavSingleRegion(regionKey) {
    const { name, industries } = mapData.find(
      region => region.key === regionKey,
    );
    console.log(regionKey);

    const navItems = industries.map(industry => {
      return `
        <li class="map-section_nav-item" style="display: flex;">
          <button class="map-section_nav-item-link" data-industry="${industry.slug}">
            ${industry.title}
          </button>
          <span style="font-weight: 500;">${industry.city}</span>
        </li>`;
    });

    renderNav(navItems, `${name} Oblast`);
  }
}
