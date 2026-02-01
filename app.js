const monthLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

const releasePatterns = [
  {
    brand: "Apple",
    cycle: "秋季主发布",
    focus: "iPhone / Apple Watch",
    tags: ["flagship", "camera"],
    primaryMonths: [9, 10],
    secondaryMonths: [3],
    notes: "秋季为核心发布季，春季可能补充 SE 或配件更新。",
  },
  {
    brand: "Samsung",
    cycle: "双旗舰节奏",
    focus: "Galaxy S / Fold / Flip",
    tags: ["flagship", "foldable"],
    primaryMonths: [1, 2, 7, 8],
    secondaryMonths: [10],
    notes: "S 系列集中在年初，折叠屏集中在夏末。",
  },
  {
    brand: "Huawei",
    cycle: "春秋双峰",
    focus: "Mate / Pura / nova",
    tags: ["flagship", "camera"],
    primaryMonths: [3, 4, 9, 10],
    secondaryMonths: [6],
    notes: "春季影像旗舰与秋季旗舰并行，nova 常在夏季补充。",
  },
  {
    brand: "Xiaomi",
    cycle: "多阶段发布",
    focus: "数字旗舰 / Redmi / MIX",
    tags: ["flagship", "midrange"],
    primaryMonths: [3, 4, 8, 9, 10],
    secondaryMonths: [12],
    notes: "上半年数字旗舰，下半年 MIX/影像旗舰与 Redmi 强化。",
  },
  {
    brand: "OPPO",
    cycle: "季度节奏",
    focus: "Find / Reno",
    tags: ["flagship", "camera"],
    primaryMonths: [3, 4, 10, 11],
    secondaryMonths: [6, 7],
    notes: "Find 春季发布，Reno 秋季更新更明显。",
  },
  {
    brand: "vivo",
    cycle: "双旗舰 + 影像",
    focus: "X / S",
    tags: ["flagship", "camera"],
    primaryMonths: [1, 4, 9, 11],
    secondaryMonths: [6],
    notes: "X 系列多在年初与秋季，S 系列春季补充。",
  },
  {
    brand: "HONOR",
    cycle: "旗舰+中端并行",
    focus: "Magic / 数字系列",
    tags: ["flagship", "midrange"],
    primaryMonths: [1, 2, 7, 10, 11],
    secondaryMonths: [5],
    notes: "Magic 年初，数字系列年中到秋季密集。",
  },
  {
    brand: "realme",
    cycle: "快速迭代",
    focus: "GT / 数字系列",
    tags: ["midrange"],
    primaryMonths: [3, 6, 9, 11],
    secondaryMonths: [1, 5],
    notes: "GT 与数字系列分散发布，季度均衡。",
  },
  {
    brand: "OnePlus",
    cycle: "半年节奏",
    focus: "旗舰 / Nord",
    tags: ["flagship", "midrange"],
    primaryMonths: [1, 2, 7, 8],
    secondaryMonths: [10],
    notes: "上半年旗舰，下半年更新或强化机型。",
  },
  {
    brand: "Google",
    cycle: "秋季发布会",
    focus: "Pixel",
    tags: ["flagship", "camera"],
    primaryMonths: [8, 9, 10],
    secondaryMonths: [5],
    notes: "秋季 Pixel 发布会集中，春季偶有 A 系列。",
  },
  {
    brand: "Sony",
    cycle: "分阶段旗舰",
    focus: "Xperia 旗舰",
    tags: ["flagship", "camera"],
    primaryMonths: [2, 5, 9],
    secondaryMonths: [11],
    notes: "MWC 前后及秋季补充发布。",
  },
  {
    brand: "Motorola",
    cycle: "区域多批次",
    focus: "razr / edge",
    tags: ["foldable", "midrange"],
    primaryMonths: [3, 6, 9],
    secondaryMonths: [11],
    notes: "春夏秋分批发布新机型，区域节奏差异明显。",
  },
];

const searchInput = document.getElementById("searchInput");
const focusSelect = document.getElementById("focusSelect");
const monthRange = document.getElementById("monthRange");
const monthLabel = document.getElementById("monthLabel");
const grid = document.getElementById("brandGrid");
const brandCount = document.getElementById("brandCount");

const focusMap = {
  all: "",
  flagship: "旗舰系列",
  foldable: "折叠屏",
  camera: "影像旗舰",
  midrange: "中端系列",
};

const buildMonthCell = (label, isPrimary, isSecondary, isHighlighted) => {
  const cell = document.createElement("div");
  cell.className = "month";
  cell.textContent = label;
  if (isPrimary) {
    cell.classList.add("active");
  } else if (isSecondary) {
    cell.classList.add("support");
  }
  if (isHighlighted) {
    cell.classList.add("highlight");
  }
  return cell;
};

const render = () => {
  const keyword = searchInput.value.trim().toLowerCase();
  const focusFilter = focusSelect.value;
  const activeMonth = Number(monthRange.value);

  monthLabel.textContent = `${activeMonth}月`;

  const filtered = releasePatterns.filter((item) => {
    const matchesKeyword =
      !keyword ||
      item.brand.toLowerCase().includes(keyword) ||
      item.focus.toLowerCase().includes(keyword) ||
      item.notes.toLowerCase().includes(keyword);
    const matchesFocus = focusFilter === "all" || item.tags.includes(focusFilter);
    return matchesKeyword && matchesFocus;
  });

  grid.innerHTML = "";
  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    const header = document.createElement("div");
    header.className = "card-header";
    header.innerHTML = `
      <div class="brand">${item.brand}</div>
      <span class="cycle">${item.cycle}</span>
    `;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `重点系列：${item.focus}`;

    const months = document.createElement("div");
    months.className = "months";

    monthLabels.forEach((label, index) => {
      const monthNumber = index + 1;
      months.appendChild(
        buildMonthCell(
          label,
          item.primaryMonths.includes(monthNumber),
          item.secondaryMonths.includes(monthNumber),
          monthNumber === activeMonth
        )
      );
    });

    const tags = document.createElement("div");
    tags.className = "tags";
    item.tags.forEach((tag) => {
      const tagEl = document.createElement("span");
      tagEl.className = "tag";
      tagEl.textContent = focusMap[tag];
      tags.appendChild(tagEl);
    });

    const note = document.createElement("div");
    note.className = "note";
    note.textContent = item.notes;

    card.appendChild(header);
    card.appendChild(meta);
    card.appendChild(months);
    card.appendChild(tags);
    card.appendChild(note);
    grid.appendChild(card);
  });

  brandCount.textContent = releasePatterns.length;
};

searchInput.addEventListener("input", render);
focusSelect.addEventListener("change", render);
monthRange.addEventListener("input", render);

render();
