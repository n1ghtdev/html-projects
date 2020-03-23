const defaultStyles =
  'pointer-events:fill;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;opacity:1;stroke:#ffffff;stroke-opacity:1;stroke-linecap:butt;paint-order:stroke fill markers;fill:#2D640C;fill-opacity:1';
const inactiveStyles =
  'stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;opacity:1;stroke:#ffffff;stroke-opacity:1;stroke-linecap:butt;paint-order:stroke fill markers;fill:#B8CFAD;fill-opacity:1';

export function getUniqueIndustries(items) {
  let unique = [];
  let total = 0;

  for (let region of items) {
    if (region.industries.length !== 0) {
      region.industries.forEach(industry => {
        total += 1;

        if (!unique.some(el => el.slug === industry.slug)) {
          unique.push({ ...industry, count: 1 });
        } else {
          const idx = unique.findIndex(el => el.slug === industry.slug);
          unique[idx].count += 1;
        }
      });
    }
  }

  return [unique, total];
}

export function renderRegionPath(region) {
  const { key, d, active } = region;

  return `<g id="g-${key}" style="pointer-events: none;">
    <path d="${d}" id="${key}" class="map-section_region-path"
    data-active="${active}" style="${
    active ? defaultStyles : inactiveStyles
  }" /></g>`;
}

export function renderRegionText(region, single) {
  const { key, name, active, textX, textY } = region;

  if (active && textX) {
    const pathEl = document.getElementById(key).getBBox();
    const x = Math.floor(pathEl.x + pathEl.width / textX);
    const y = Math.floor(pathEl.y + pathEl.height / textY);

    if (key === 'IF') {
      const split = name.split('-');

      return `<text class="map-section_region-name" x="${x}" y="${y}" style="pointer-events: none">
        <tspan x="${x}" y="${y}">${split[0]}-</tspan>
        <tspan x="${x}" y="${y + 15}">${split[1]}</tspan>
      </text>`;
    }
    return `<text class="map-section_region-name ${single ? 'single' : ''}"
    x="${x}" y="${y}" style="pointer-events: none">${name}</text>`;
  }
}
