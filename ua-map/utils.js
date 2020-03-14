const defaultStyles =
  "pointer-events:fill;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;opacity:1;stroke:#ffffff;stroke-opacity:1;stroke-linecap:butt;paint-order:stroke fill markers;fill:#2D640C;fill-opacity:1";
const inactiveStyles =
  "stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;opacity:1;stroke:#ffffff;stroke-opacity:1;stroke-linecap:butt;paint-order:stroke fill markers;fill:#B8CFAD;fill-opacity:1";

export async function fetchSvgRegions() {
  try {
    const response = await fetch("./map.json");
    const response1 = await fetch("./config.json");
    return await Promise.all([response.json(), response1.json()]);
  } catch (err) {
    console.log(err);
  }
}

export function getIndustries(items) {
  let unique = [];

  for (let item of items) {
    item.industries.forEach(ind => {
      if (!unique.some(el => el.slug === ind.slug)) {
        unique.push(ind);
      }
    });
  }

  return unique;
}

export function renderRegionPath(region) {
  const { id, d, active } = region;
  return `<g id="g-${id}" style="pointer-events: none;">
    <path d="${d}" id="${id}" data-active="${active}" style="${
    active ? defaultStyles : inactiveStyles
  }" /></g>`;
}

export function renderRegionText(region) {
  const { id, active, textX, textY } = region;

  if (active && textX) {
    const pathEl = document.getElementById(id).getBBox();
    const x = Math.floor(pathEl.x + pathEl.width / textX);
    const y = Math.floor(pathEl.y + pathEl.height / textY);

    return `<text x="${x}" y="${y}" style="pointer-events: none">${id}</text>`;
  }
}
