const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const storyScenes = [
  {
    image: "assets/01-entry.png",
    caption: "多个购买选项并列出现，差异需要用户自己判断。",
  },
  {
    image: "assets/02-compare.png",
    caption: "真正缺少的，是下单前的一次清楚解释。",
  },
  {
    image: "assets/04-explain.png",
    caption: "详细规则按需查看，不占用原来的购买页面。",
  },
  {
    image: "assets/03-ai.png",
    caption: "对比、说明和推荐，都收进同一个辅助页面。",
  },
];

const prototypeStates = {
  entry: {
    label: "入口页",
    task: "让需要帮助的用户找到辅助入口",
    principle: "不改变原来的购买主路径",
    hint: "点击「选项怎么选」",
  },
  compare: {
    label: "选项对比",
    task: "一次看清五种购买选项的主要差异",
    principle: "共同保障先说，具体差异再比较",
    hint: "展开选项，或点击标签查看说明",
  },
  recommend: {
    label: "帮我选",
    task: "按用户最关注的点推荐选项",
    principle: "推荐理由和需要接受的取舍一起展示",
    hint: "切换关注点查看不同建议",
  },
  explain: {
    label: "标签说明",
    task: "集中解释渠道、成色、查验和售后",
    principle: "说明按需查看，不占用主页面空间",
    hint: "切换上方分类查看说明",
  },
  order: {
    label: "确认订单",
    task: "把选择自然带回原有下单流程",
    principle: "辅助决策结束后不增加新的操作负担",
    hint: "点击左上角返回继续比较",
  },
};

const buyOptions = {
  official: {
    name: "品牌官方",
    price: 476,
    eta: "约 2 天到",
    meta: "品牌渠道 · 到货更快",
    summary: "更适合在意品牌渠道和收货速度的人",
    tags: ["品牌官方", "得物查验", "平台品质保障", "退货包运费", "极速退款"],
  },
  special: {
    name: "品牌专供",
    price: 471,
    eta: "约 5–6 天到",
    meta: "价格更低 · 权益完整",
    summary: "更适合不着急收货、希望少花一点的人",
    tags: ["品牌专供", "得物查验", "平台品质保障", "正品险", "退货包运费"],
  },
  bonded: {
    name: "保税直发",
    price: 458,
    eta: "约 4–7 天到",
    meta: "国内保税仓 · 含税发货",
    summary: "更适合想买全新跨境商品、又不想等待境外直邮的人",
    tags: ["保税直发", "得物查验", "平台品质保障", "进口税费说明", "跨境售后"],
  },
  global: {
    name: "全球购",
    price: 439,
    eta: "约 8–12 天到",
    meta: "境外直邮 · 需要清关",
    summary: "更适合愿意多等几天、希望用更低价格购买全新商品的人",
    tags: ["全球购", "得物查验", "平台品质保障", "清关时效", "跨境售后"],
  },
  used: {
    name: "95 仅鞋盒瑕疵",
    price: 395,
    eta: "约 1–3 天到",
    meta: "鞋盒轻微瑕疵 · 性价比更高",
    summary: "更适合能够接受成色差异、看重价格的人",
    tags: ["95 仅鞋盒瑕疵", "得物查验", "平台品质保障", "95分查验"],
  },
};

const chipCopy = {
  品牌官方: "由品牌官方渠道提供商品，商品仍会按平台流程完成履约。",
  品牌专供: "由合作渠道提供的全新商品，供给与履约方式可能与品牌官方不同。",
  保税直发: "商品从国内保税仓发出，通常需要完成跨境商品相关流程后再配送。",
  全球购: "商品由境外渠道发出，预计到货时间会受到国际运输与清关进度影响。",
  得物查验: "商品发出前会经过平台查验，具体流程以订单页说明为准。",
  平台查验: "商品会按照对应品类和成色标准完成平台查验。",
  平台品质保障: "商品按对应渠道的规则履约，并享有页面展示的平台品质保障。",
  进口税费说明: "页面价格与税费口径以订单页为准，下单前可查看具体说明。",
  清关时效: "跨境商品需要完成清关，预计到货时间可能随实际进度变化。",
  跨境售后: "跨境商品的退换规则与处理时效可能不同，下单前需确认订单页说明。",
  退货包运费: "符合页面规则的退货可享运费补贴，最终以订单权益为准。",
  极速退款: "符合条件的订单在退货节点可更快收到退款。",
  正品险: "符合保障条件的商品可按页面展示规则申请保障。",
  "95 仅鞋盒瑕疵": "该选项为 95 分二手商品，当前瑕疵主要集中在鞋盒或包装，不等同于全新商品。",
  "95分查验": "由 95 分平台完成成色与品质查验，并按二手商品规则履约。",
};

const explainTerms = {
  channel: {
    label: "渠道",
    rows: [
      ["品牌官方", "来自品牌官方渠道，适合更在意商品来源的用户。"],
      ["品牌专供", "来自平台合作供给渠道，价格和履约方式可能不同。"],
      ["保税直发", "商品从国内保税仓发出，兼顾跨境供给与相对稳定的配送时间。"],
      ["全球购", "商品从境外渠道发出，需要经过国际运输与清关。"],
      ["95 分", "通过平台成色标准分级的商品，不等同于全新商品。"],
    ],
  },
  condition: {
    label: "成色",
    rows: [
      ["全新", "商品主体及配件状态符合全新商品标准。"],
      ["95 分", "商品状态较好，允许存在页面已说明的轻微瑕疵。"],
      ["瑕疵说明", "下单前展示具体瑕疵类型，帮助用户确认能否接受。"],
    ],
  },
  inspection: {
    label: "查验时效",
    rows: [
      ["共同保障", "不同选项都经过得物查验，并享有平台品质保障，不应只凭到货快慢判断。"],
      ["预计到货", "页面时间由供给和履约链路共同决定，以订单页为准。"],
      ["保税仓发货", "国内保税仓可以缩短跨境商品的部分运输时间，仍需按对应规则履约。"],
      ["境外直邮", "全球购需要国际运输与清关，预计到货通常更久。"],
      ["到货差异", "更快到货可能来自库存位置或履约方式，并不代表少了保障。"],
    ],
  },
  service: {
    label: "售后权益",
    rows: [
      ["退货包运费", "符合条件的退货可获得运费补贴。"],
      ["极速退款", "符合条件时可在退货流程中更快收到退款。"],
      ["正品险", "符合保障条件时可按平台规则申请相应保障。"],
      ["跨境售后", "保税直发与全球购的退换条件和处理时间可能不同，以订单页为准。"],
      ["95 分售后", "二手商品按成色与页面展示的专属规则处理售后。"],
    ],
  },
};

const prototypeRecommendations = {
  fast: {
    choice: "official",
    option: "品牌官方",
    price: "¥476",
    title: "更适合想尽快收到",
    reason: "当前预计到货最快，同时保留品牌渠道与页面展示的售后权益。",
    tradeoff: "价格高于其他全新选项",
  },
  cheap: {
    choice: "used",
    option: "95 分",
    price: "¥395",
    title: "更适合看重价格",
    reason: "当前价格最低，适合能够接受鞋盒轻微瑕疵的用户。",
    tradeoff: "需要接受成色差异",
  },
  afterSale: {
    choice: "special",
    option: "品牌专供",
    price: "¥471",
    title: "更适合看重售后",
    reason: "价格较低，同时保留正品险与退货包运费等页面展示权益。",
    tradeoff: "预计到货更慢",
  },
  brand: {
    choice: "official",
    option: "品牌官方",
    price: "¥476",
    title: "更适合偏好品牌渠道",
    reason: "品牌渠道标签最符合你的关注点，当前预计到货也更快。",
    tradeoff: "不是最低价选项",
  },
  value: {
    choice: "used",
    option: "95 分",
    price: "¥395",
    title: "更适合看重成色性价比",
    reason: "价格明显更低，页面同时给出成色与瑕疵说明。",
    tradeoff: "并非全新商品",
  },
  bonded: {
    choice: "bonded",
    option: "保税直发",
    price: "¥458",
    title: "更适合想买跨境商品但不想久等",
    reason: "商品从国内保税仓发出，价格低于品牌渠道，预计到货也比境外直邮更稳定。",
    tradeoff: "跨境商品的售后规则需要单独确认",
  },
  global: {
    choice: "global",
    option: "全球购",
    price: "¥439",
    title: "更适合想买全新商品又看重价格",
    reason: "它是当前全新商品中价格最低的选项，适合不着急收货的用户。",
    tradeoff: "需要等待国际运输与清关",
  },
};

const demoState = {
  screen: "entry",
  focusOption: "official",
  activeChip: null,
  preference: null,
  explainTab: "channel",
  orderOption: "special",
  previousScreen: "entry",
};

const baselineState = {
  screen: "market",
  style: "gold",
  gift: "default",
  orderOption: "special",
};

function statusBar() {
  return `
    <div class="du-status"><b>9:41</b><span class="du-island"></span><span>5G&nbsp;&nbsp;▮▮▮</span></div>
  `;
}

function phoneTop(title, backTarget = "entry") {
  return `
    <div class="du-top">
      <button type="button" class="du-icon-button" data-du-back="${backTarget}" aria-label="返回">‹</button>
      <strong>${title}</strong>
      <button type="button" class="du-icon-button" aria-label="更多">•••</button>
    </div>
  `;
}

function productSummary(price = "471") {
  return `
    <div class="du-summary">
      <div class="du-product-thumb"><img src="assets/bracelet.jpg" alt="" /></div>
      <div class="du-summary-copy">
        <div><i class="du-mark">得物</i><b class="du-price"><small>¥</small>${price}</b></div>
        <span>COACH 蔻驰 Logo 字母雕刻手镯</span>
        <div class="du-quantity"><button type="button">−</button><b>1</b><button type="button">＋</button></div>
      </div>
    </div>
  `;
}

function renderMarketMarkup(model = baselineState) {
  return `
    <div class="du-ui du-market">
      ${statusBar()}
      <div class="du-product-hero">
        <div class="du-hero-tools"><span>‹</span><span>↗ &nbsp;•••</span></div>
        <img src="assets/bracelet.jpg" alt="" />
      </div>
      <div class="du-market-sheet">
        <div class="du-address"><span>⌖</span><b>配送至 北京市 · 通州区</b><span>分享送礼物</span></div>
        ${productSummary("471")}
        <section class="du-section">
          <small class="du-section-label">款式</small>
          <div class="du-boxes"><button class="du-box ${model.style === "gold" ? "is-selected" : ""}" type="button" data-base-style="gold">金色</button><button class="du-box ${model.style === "rose" ? "is-selected" : ""}" type="button" data-base-style="rose">玫瑰金色</button></div>
        </section>
        <section class="du-section du-compact">
          <small class="du-section-label">尺码</small>
          <div class="du-boxes"><button class="du-box is-selected" type="button">F</button></div>
        </section>
        <section class="du-section du-compact">
          <small class="du-section-label">礼盒</small>
          <div class="du-boxes"><button class="du-box ${model.gift === "default" ? "is-selected" : ""}" type="button" data-base-gift="default">默认包装</button><button class="du-box ${model.gift === "love" ? "is-selected" : ""}" type="button" data-base-gift="love">挚爱礼盒 +¥59</button></div>
        </section>
        <div class="du-buybar">
          <button type="button" class="du-buy is-cyan" data-base-order="official"><b>¥476</b><span>约 2 天到</span></button>
          <button type="button" class="du-buy" data-base-order="special"><b>¥471</b><span>约 5–6 天到</span></button>
          <button type="button" class="du-buy" data-base-order="bonded"><b>¥458</b><span>约 4–7 天到</span></button>
          <button type="button" class="du-buy" data-base-order="global"><b>¥439</b><span>约 8–12 天到</span></button>
          <button type="button" class="du-buy" data-base-order="used"><b>¥395</b><span>约 1–3 天到</span></button>
        </div>
      </div>
    </div>
  `;
}

function renderEntryMarkup() {
  return `
    <div class="du-ui">
      ${statusBar()}
      ${phoneTop("选择款式")}
      <div class="du-scroll">
        <div class="du-product-hero du-product-hero-short"><img src="assets/bracelet.jpg" alt="" /></div>
        <div class="du-sheet">
          ${productSummary()}
          <section class="du-section">
            <small class="du-section-label">款式</small>
            <div class="du-boxes"><button class="du-box is-selected" type="button">金色</button><button class="du-box" type="button">玫瑰金色</button></div>
          </section>
          <section class="du-section du-compact">
            <small class="du-section-label">尺码</small>
            <div class="du-boxes"><button class="du-box is-selected" type="button">F</button></div>
          </section>
          <section class="du-section">
            <div class="du-section-heading">
              <small class="du-section-label">购买选项</small>
              <button class="du-guide" type="button" data-du-screen="compare">选项怎么选 <span>›</span></button>
            </div>
            <div class="du-trust"><i>✓</i><span>得物查验 · 平台品质保障 · 具体权益以订单页为准</span></div>
          </section>
        </div>
      </div>
      <div class="du-buybar du-fixed-buybar">
        <button type="button" class="du-buy is-cyan" data-du-order="official"><b>¥476</b><span>约 2 天到</span><small>品牌官方</small></button>
        <button type="button" class="du-buy" data-du-order="special"><b>¥471</b><span>约 5–6 天到</span><small>品牌专供</small></button>
        <button type="button" class="du-buy" data-du-order="bonded"><b>¥458</b><span>约 4–7 天到</span><small>保税直发</small></button>
        <button type="button" class="du-buy" data-du-order="global"><b>¥439</b><span>约 8–12 天到</span><small>全球购</small></button>
        <button type="button" class="du-buy" data-du-order="used"><b>¥395</b><span>约 1–3 天到</span><small>95 分</small></button>
      </div>
    </div>
  `;
}

function compareCardMarkup(key, model) {
  const option = buyOptions[key];
  const selected = model.focusOption === key;
  const activeCopy = selected && model.activeChip ? chipCopy[model.activeChip] : "";
  return `
    <article class="du-compare-card ${selected ? "is-selected" : ""}">
      <button type="button" class="du-compare-head" data-du-option="${key}">
        <span><b>${option.name}</b><small>${option.meta}</small></span>
        <span><strong>¥${option.price}</strong><small>${option.eta}</small></span>
      </button>
      ${selected ? `
        <p class="du-fit">${option.summary}</p>
        <div class="du-pills">
          ${option.tags.map((tag) => `<button type="button" class="du-pill ${model.activeChip === tag ? "is-active" : ""}" data-du-chip="${tag}">${tag}</button>`).join("")}
        </div>
        ${activeCopy ? `<div class="du-inline-copy"><b>${model.activeChip}</b><span>${activeCopy}</span></div>` : ""}
        <button class="du-confirm" type="button" data-du-confirm="${key}">选择这个选项</button>
      ` : ""}
    </article>
  `;
}

function helperBlockMarkup(preference) {
  const labels = [
    ["fast", "最快收到"],
    ["cheap", "预算最低"],
    ["afterSale", "售后更灵活"],
    ["brand", "品牌渠道"],
    ["bonded", "跨境但不想久等"],
    ["global", "全新商品更划算"],
    ["value", "成色性价比"],
  ];
  const result = preference ? prototypeRecommendations[preference] : null;
  return `
    <section class="du-module du-helper-module">
      <div class="du-module-title"><span><b>帮我选</b><small>你最在意什么？</small></span></div>
      <div class="du-preferences">
        ${labels.map(([key, label]) => `<button type="button" class="${preference === key ? "is-active" : ""}" data-du-preference="${key}">${label}</button>`).join("")}
      </div>
      ${result ? `
        <div class="du-recommendation">
          <div><small>${result.title}</small><b>${result.option}</b></div>
          <strong>${result.price}</strong>
          <p>${result.reason}</p>
          <span>需要接受：${result.tradeoff}</span>
          <button type="button" data-du-confirm="${result.choice}">选择这个选项</button>
        </div>
      ` : `<p class="du-helper-placeholder">选择一个关注点，页面会对照当前选项给出建议。</p>`}
    </section>
  `;
}

function renderCompareMarkup(model = {}) {
  const current = {
    focusOption: model.focusOption || "official",
    activeChip: model.activeChip || null,
    preference: model.preference || null,
  };
  return `
    <div class="du-ui ${current.preference ? "du-show-recommendation" : ""}">
      ${statusBar()}
      ${phoneTop("选项怎么选")}
      <div class="du-scroll du-soft-bg">
        <div class="du-notice"><i>✓</i><span><b>共同保障</b>当前选项都经过得物查验，并享有平台品质保障；主要差异在渠道、成色、时效与售后。</span></div>
        ${current.preference ? helperBlockMarkup(current.preference) : ""}
        <section class="du-module">
          <div class="du-module-title"><span><b>当前购买选项</b><small>点击展开完整信息</small></span></div>
          <div class="du-compare-list">
            ${compareCardMarkup("official", current)}
            ${compareCardMarkup("special", current)}
            ${compareCardMarkup("bonded", current)}
            ${compareCardMarkup("global", current)}
            ${compareCardMarkup("used", current)}
          </div>
          <button class="du-all-link" type="button" data-du-screen="explain">查看全部标签说明 <span>›</span></button>
        </section>
        ${current.preference ? "" : helperBlockMarkup(null)}
      </div>
    </div>
  `;
}

function renderExplainMarkup(activeTab = "channel") {
  const active = explainTerms[activeTab] || explainTerms.channel;
  return `
    <div class="du-ui">
      ${statusBar()}
      ${phoneTop("购买选项说明", "compare")}
      <div class="du-scroll du-soft-bg">
        <div class="du-explain-intro"><b>把每个标签讲清楚</b><span>不同选项的差异来自供给、成色、履约和售后规则，不代表真假差异。</span></div>
        <div class="du-tabs">
          ${Object.entries(explainTerms).map(([key, item]) => `<button type="button" class="${activeTab === key ? "is-active" : ""}" data-du-explain-tab="${key}">${item.label}</button>`).join("")}
        </div>
        <section class="du-module du-term-list">
          ${active.rows.map(([title, copy], index) => `
            <article><i>0${index + 1}</i><span><b>${title}</b><small>${copy}</small></span></article>
          `).join("")}
        </section>
        <button class="du-return" type="button" data-du-screen="compare">返回选项对比</button>
      </div>
    </div>
  `;
}

function renderOrderMarkup(optionKey = "special", backTarget = "compare") {
  const option = buyOptions[optionKey] || buyOptions.special;
  const assurance = "得物查验 · 平台品质保障";
  return `
    <div class="du-ui">
      ${statusBar()}
      ${phoneTop("确认订单", backTarget)}
      <div class="du-scroll du-soft-bg du-order-page">
        <section class="du-order-block du-order-address">
          <i>⌖</i><span><b>收货地址已选择</b><small>北京市 · 通州区</small></span><strong>›</strong>
        </section>
        <section class="du-order-block">
          <div class="du-order-product">
            <img src="assets/bracelet.jpg" alt="" />
            <span><b>COACH 蔻驰 Logo 字母雕刻手镯</b><small>金色 · F · 默认包装</small><strong>¥${option.price}</strong></span>
          </div>
          <div class="du-order-row"><span>购买选项</span><b>${option.name}</b></div>
          <div class="du-order-row"><span>预计到货</span><b>${option.eta}</b></div>
          <div class="du-order-row"><span>运费</span><b>¥0</b></div>
        </section>
        <section class="du-order-block">
          <div class="du-order-row"><span>平台保障</span><b>${assurance}</b></div>
          <div class="du-order-row"><span>售后权益</span><b>以订单页展示为准</b></div>
        </section>
      </div>
      <div class="du-paybar"><span>合计 <b>¥${option.price}</b></span><button type="button">提交订单</button></div>
    </div>
  `;
}

function staticScreenMarkup(screen) {
  if (screen === "market") return renderMarketMarkup();
  if (screen === "compare") return renderCompareMarkup({ focusOption: "official", activeChip: "得物查验" });
  if (screen === "recommend") return renderCompareMarkup({ focusOption: "official", preference: "fast" });
  if (screen === "explain") return renderExplainMarkup("channel");
  if (screen === "order") return renderOrderMarkup("special");
  return renderEntryMarkup();
}

function originalPhoneShell(title, body, backTarget = "entry") {
  return `
    <div class="phone-shell">
      <div class="phone-status"><span>9:41</span><span>5G&nbsp;&nbsp;88%</span></div>
      <div class="phone-top">
        <button class="linkish" type="button" data-du-back="${backTarget}" aria-label="返回">‹</button>
        <span>${title}</span>
        <button class="linkish" type="button" data-du-back="entry" aria-label="关闭">×</button>
      </div>
      <div class="phone-page">${body}</div>
    </div>
  `;
}

function originalProductSummary() {
  return `
    <div class="product-summary">
      <img src="assets/bracelet.jpg" alt="商品缩略图" />
      <div>
        <div><span class="dewu-mark">得物</span> <span class="app-price">¥471</span></div>
        <div class="summary-meta">已选 金色 F 默认包装 ♡</div>
      </div>
      <div class="qty"><span>−</span><b>1</b><span>＋</span></div>
    </div>
  `;
}

function originalBuyOption(key, attribute = "data-du-order") {
  const item = buyOptions[key];
  const color = {
    official: "teal",
    special: "dark",
    bonded: "deep",
    global: "ocean",
    used: "gray",
  }[key] || "gray";
  return `
    <button class="buy-option ${color}" type="button" ${attribute}="${key}">
      <span class="buy-tag">${item.name}</span>
      <b>¥${item.price}</b>
      <small>${item.eta}</small>
    </button>
  `;
}

function renderOriginalBaselineMarkup(model = baselineState) {
  return `
    <div class="original-entry-screen">
      <div class="app-hero"><img src="assets/bracelet.jpg" alt="商品图" /></div>
      <div class="app-sheet">
        ${originalProductSummary()}
        <div class="app-section">
          <div class="section-line"><span>款式</span></div>
          <div class="box-row">
            <button class="box ${model.style === "gold" ? "active" : ""}" type="button" data-base-style="gold">金色</button>
            <button class="box ${model.style === "rose" ? "active" : ""}" type="button" data-base-style="rose">玫瑰金色</button>
          </div>
        </div>
        <div class="app-section">
          <div class="section-line"><span>尺码</span></div>
          <div class="box-row"><button class="box active" type="button">F</button></div>
        </div>
        <div class="app-section">
          <div class="section-line"><span>购买选项</span></div>
        </div>
        <div class="option-bar">
          ${originalBuyOption("official", "data-base-order")}
          ${originalBuyOption("special", "data-base-order")}
          ${originalBuyOption("bonded", "data-base-order")}
          ${originalBuyOption("global", "data-base-order")}
          ${originalBuyOption("used", "data-base-order")}
        </div>
      </div>
    </div>
  `;
}

function renderOriginalEntryMarkup() {
  return `
    <div class="original-entry-screen">
      <div class="app-hero"><img src="assets/bracelet.jpg" alt="商品图" /></div>
      <div class="app-sheet">
        ${originalProductSummary()}
        <div class="app-section">
          <div class="section-line"><span>款式</span></div>
          <div class="box-row"><button class="box active" type="button">金色</button><button class="box" type="button">玫瑰金色</button></div>
        </div>
        <div class="app-section">
          <div class="section-line"><span>尺码</span></div>
          <div class="box-row"><button class="box active" type="button">F</button></div>
        </div>
        <div class="app-section">
          <div class="section-line">
            <span>购买选项</span>
            <button class="guide-link" type="button" data-du-screen="compare">选项怎么选 ›</button>
          </div>
        </div>
        <div class="trust-strip">当前选项都经过得物查验，并享有平台品质保障，具体差异可在「选项怎么选」中查看</div>
        <div class="option-bar">
          ${originalBuyOption("official")}
          ${originalBuyOption("special")}
          ${originalBuyOption("bonded")}
          ${originalBuyOption("global")}
          ${originalBuyOption("used")}
        </div>
      </div>
    </div>
  `;
}

function originalCompareCard(key, model) {
  const item = buyOptions[key];
  const selected = model.focusOption === key;
  return `
    <article class="compare-card ${selected ? "selected" : ""}">
      <button class="compare-head" type="button" data-du-option="${key}">
        <span><b class="compare-name">${item.name}</b><small class="compare-meta">${item.eta} · ${item.meta}</small></span>
        <strong class="compare-price">¥${item.price}</strong>
      </button>
      ${selected ? `
        <div class="pill-row">
          ${item.tags.map((tag) => `<button class="pill ${model.activeChip === tag ? "active" : ""}" type="button" data-du-chip="${tag}">${tag}</button>`).join("")}
        </div>
        <div class="inline-explain"><b>${model.activeChip || item.tags[0]}：</b>${chipCopy[model.activeChip] || "点击标签查看该标签或权益说明。"}</div>
        <div class="fit">${item.summary}</div>
        <button class="confirm-option" type="button" data-du-confirm="${key}">确认该购买选项，进入确认订单页</button>
      ` : ""}
    </article>
  `;
}

function originalHelperModule(preference) {
  const choices = [
    ["fast", "最快收到"],
    ["cheap", "预算最低"],
    ["afterSale", "售后更灵活"],
    ["brand", "品牌渠道优先"],
    ["bonded", "跨境但不想久等"],
    ["global", "全新商品更划算"],
    ["value", "成色性价比"],
  ];
  const result = preference ? prototypeRecommendations[preference] : null;
  const resultKey = result?.choice || "official";
  return `
    <div class="module">
      <div class="module-title">帮我选 <span>选择你最关心的点</span></div>
      <div class="ai-choices">
        ${choices.map(([key, label]) => `<button class="choice ${preference === key ? "active" : ""}" type="button" data-du-preference="${key}">${label}</button>`).join("")}
      </div>
      ${result ? `
        <div class="ai-result">
          <h3>${result.title}：${result.option} ${result.price}</h3>
          <p>${result.reason}</p>
          <p><b>需要取舍：</b>${result.tradeoff}</p>
          <button type="button" data-du-confirm="${resultKey}">选择该选项并去确认订单</button>
        </div>
      ` : ""}
    </div>
  `;
}

function renderOriginalCompareMarkup(model = {}) {
  const current = {
    focusOption: model.focusOption || "official",
    activeChip: model.activeChip || "得物查验",
    preference: model.preference || null,
  };
  return originalPhoneShell("选项怎么选", `
    <div class="scroll-page">
      <div class="notice">
        <span class="notice-icon">保</span>
        <div><b>当前可选方案都经过得物查验，并享有平台品质保障。</b><br />差异主要在价格、渠道、成色、预计到货和售后规则，不代表正品保障差异。</div>
      </div>

      <div class="module">
        <div class="module-title">平台品质保障 <span>查验链路</span></div>
        <div class="assurance-flow">
          <div class="flow-chip">提前入仓<br />部分商品已完成前置查验</div>
          <div class="flow-chip">仓配节点<br />快到货不等于跳过查验</div>
          <div class="flow-chip">先查验后发出<br />时效更长但规则一致</div>
        </div>
      </div>

      <div class="module">
        <div class="module-title">当前选项对比 <span>金色 / F / 默认包装</span></div>
        <div class="compare-list">
          ${originalCompareCard("official", current)}
          ${originalCompareCard("special", current)}
          ${originalCompareCard("bonded", current)}
          ${originalCompareCard("global", current)}
          ${originalCompareCard("used", current)}
        </div>
        <button class="all-link" type="button" data-du-screen="explain">
          <span>查看全部购买选项说明</span>
          <span>渠道 / 成色 / 查验时效 / 售后 ›</span>
        </button>
      </div>

      ${originalHelperModule(current.preference)}
    </div>
  `);
}

function renderOriginalExplainMarkup(activeTab = "channel") {
  const active = explainTerms[activeTab] || explainTerms.channel;
  return originalPhoneShell("购买选项说明", `
    <div class="scroll-page">
      <div class="tabs">
        ${Object.entries(explainTerms).map(([key, item]) => `<button class="tab ${activeTab === key ? "active" : ""}" type="button" data-du-explain-tab="${key}">${item.label}</button>`).join("")}
      </div>
      <div class="notice">
        <span class="notice-icon">说</span>
        <div><b>标签用于解释渠道、成色、查验时效和售后差异。</b><br />这些差异不代表正品保障差异，具体权益仍以订单页展示为准。</div>
      </div>
      <div class="module">
        <div class="module-title">${active.label}说明</div>
        ${active.rows.map(([title, copy]) => `<article class="term"><h3>${title}</h3><p>${copy}</p></article>`).join("")}
      </div>
    </div>
  `, "compare");
}

function renderOriginalOrderMarkup(optionKey = "special", backTarget = "compare") {
  const item = buyOptions[optionKey] || buyOptions.special;
  const assurance = "得物查验 · 平台品质保障";
  return originalPhoneShell("确认订单", `
    <div class="order-page original-order-page">
      <div class="order-scroll">
        <div class="order-block">
          <div class="address-main"><span>收货地址已选择</span><span>›</span></div>
          <div class="muted">北京市 · 通州区｜预计按订单页时间发货</div>
        </div>
        <div class="order-block">
          <div class="order-product">
            <img src="assets/bracelet.jpg" alt="商品图" />
            <div>
              <div class="order-title">COACH 蔻驰 Logo 图案字母雕刻黄铜手镯</div>
              <div class="order-sku">金色 F 默认包装 ×1</div>
              <div class="order-price">¥${item.price}</div>
            </div>
          </div>
          <div class="order-row"><label>购买选项</label><span>${item.name}</span><span>›</span></div>
          <div class="order-row"><label>平台保障</label><span>${assurance} · 具体权益以订单页为准</span><span>›</span></div>
          <div class="order-row"><label>号码保护</label><span>隐藏收件人真实手机号</span><span class="check active">✓</span></div>
        </div>
        <div class="order-block">
          <div class="order-row"><label>支付方式</label><span>支付宝</span><span class="check active">✓</span></div>
          <div class="order-row"><label></label><span>微信支付</span><span class="check"></span></div>
          <div class="order-row"><label></label><span>得物月付</span><span class="check"></span></div>
        </div>
      </div>
      <div class="pay-footer">
        <div class="pay-total"><span>得物包邮到手价</span><b>¥${item.price}</b></div>
        <button class="pay-button" type="button">立即支付</button>
      </div>
    </div>
  `, backTarget);
}

const helperResults = {
  fast: {
    choice: "official",
    option: "品牌官方",
    price: "¥476",
    title: "想尽快收到，可以优先看品牌官方。",
    reason: "这是当前预计到货最快的选项，同时保留品牌渠道和页面展示的售后权益。",
    tradeoff: "价格高于其他全新选项，最终到货时间以订单页为准。",
  },
  cheap: {
    choice: "used",
    option: "95 分",
    price: "¥395",
    title: "更在意价格，可以优先看 95 分选项。",
    reason: "它是当前价格最低的选项，预计到货也较快，适合能够接受成色差异的用户。",
    tradeoff: "这是 95 分商品，并非全新；成色与售后规则需要在下单前确认。",
  },
  afterSale: {
    choice: "special",
    option: "品牌专供",
    price: "¥471",
    title: "更在意售后，可以优先看品牌专供。",
    reason: "价格低于品牌官方，同时保留正品险和退货包运费等页面展示权益。",
    tradeoff: "预计约 5–6 天到，不适合着急收货的情况。",
  },
  brand: {
    choice: "official",
    option: "品牌官方",
    price: "¥476",
    title: "偏好品牌渠道，可以优先看品牌官方。",
    reason: "渠道标签最符合你的关注点，预计到货时间也是当前五种选项中最快的。",
    tradeoff: "它不是最低价选项，需要为渠道和时效多付少量价格。",
  },
  bonded: {
    choice: "bonded",
    option: "保税直发",
    price: "¥458",
    title: "想买跨境商品但不想久等，可以优先看保税直发。",
    reason: "商品从国内保税仓发出，价格低于品牌渠道，预计到货也比境外直邮更稳定。",
    tradeoff: "跨境商品的退换条件和处理时效需要在订单页单独确认。",
  },
  global: {
    choice: "global",
    option: "全球购",
    price: "¥439",
    title: "想买全新商品又看重价格，可以优先看全球购。",
    reason: "它是当前全新商品中价格最低的选项，适合不着急收货、愿意等待清关的用户。",
    tradeoff: "预计到货时间最长，可能受到国际运输和清关进度影响。",
  },
  value: {
    choice: "used",
    option: "95 分",
    price: "¥395",
    title: "追求成色性价比，可以比较 95 分选项。",
    reason: "页面已经标注具体成色情况，价格明显更低，适合能接受鞋盒瑕疵的用户。",
    tradeoff: "购买前需要仔细确认成色说明和二手商品售后规则。",
  },
};

const prdChapters = [
  {
    kicker: "PROJECT OVERVIEW",
    title: "项目概述",
    body: `
      <p>得物会把同一商品下不同价格、渠道、成色和履约时效的方案聚合到购买选项页。这个机制提高了商品可买性，但也把更多判断留给了用户。</p>
      <p>本项目围绕“尺码 + 购买选项”页面，新增「选项怎么选」辅助入口。目标不是增加更多标签，而是帮助用户在下单前看懂差异。</p>
      <div class="prd-callout"><b>一句话方案</b><span>先说明共同保障，再比较当前选项；需要时点开标签解释，拿不准时按关注点帮忙推荐。</span></div>
    `,
  },
  {
    kicker: "BUSINESS CONTEXT",
    title: "业务背景",
    body: `
      <p>多购买选项能够聚合不同渠道的供给，让用户在价格、到货时间和商品状态之间做选择。平台同时通过查验和品质保障，让用户确认不同选项都有可靠保障。</p>
      <p>前台通常会展示渠道标签、成色标签、价格和预计到货时间，但不会完整展开后台供给和履约链路。用户能看到结果，却不一定理解差异从哪里来。</p>
      <ul><li>平台需要保持统一的品质保障表达。</li><li>用户需要知道不同选项会怎样影响价格、时效和售后。</li><li>方案需要在“信息透明”和“页面效率”之间取得平衡。</li></ul>
    `,
  },
  {
    kicker: "PROBLEM DEFINITION",
    title: "核心问题",
    body: `
      <p>核心问题不是“选项太多”，而是信息分散且缺少官方解释。用户需要自己把价格、标签、预计到货和售后规则拼在一起，才能判断哪个更适合自己。</p>
      <div class="prd-columns">
        <div><b>看得见</b><span>价格、渠道标签、成色、预计到货</span></div>
        <div><b>看不懂</b><span>为什么更快、差价对应什么、售后有何不同</span></div>
      </div>
      <ul><li>时效差异容易被误读为查验差异。</li><li>售后权益往往在决策后段才被注意。</li><li>外部讨论会替代平台解释，放大不确定感。</li></ul>
    `,
  },
  {
    kicker: "GOALS & BOUNDARIES",
    title: "项目目标",
    body: `
      <p>让用户在购买选项页快速回答三个问题：这些选项是否都有平台保障、它们主要差在哪里、哪一个更符合自己的关注点。</p>
      <ul><li>降低理解成本，减少反复切换和外部搜索。</li><li>缩短选择时间，帮助用户继续进入确认订单。</li><li>提前说明售后差异，减少预期不一致。</li></ul>
      <div class="prd-callout muted"><b>方案边界</b><span>不改变 Buybox 排序，不暴露具体供应商身份，不重做“立即购买”主路径。</span></div>
    `,
  },
  {
    kicker: "INFORMATION ARCHITECTURE",
    title: "信息架构",
    body: `
      <p>方案只涉及两个页面层级：原购买选项页，以及新增的「选项怎么选」辅助页。</p>
      <div class="prd-flow">
        <span>购买选项页</span><i>→</i><span>选项怎么选</span><i>→</i><span>当前选项对比</span><i>→</i><span>选择并下单</span>
      </div>
      <ul><li>购买选项页保留原有选择方式，并增加保障提示与辅助入口。</li><li>辅助页先展示共同保障，再展示当前全部购买选项。</li><li>点击具体标签即可就地查看解释。</li><li>页面下方提供“帮我选”和完整购买选项说明。</li></ul>
    `,
  },
  {
    kicker: "USER FLOW",
    title: "用户链路",
    body: `
      <p>高意向用户仍然可以直接选择底部购买选项并进入确认订单；只有拿不准的用户才进入辅助页。</p>
      <div class="prd-flow vertical">
        <span>商品详情页</span><i>↓</i><span>尺码与购买选项</span><i>↓</i><span>直接下单 / 进入「选项怎么选」</span><i>↓</i><span>确认购买选项</span>
      </div>
      <p>在辅助页中，点击购买选项会先展开完整信息；点击标签只查看解释；确认后再进入订单页，避免误触。</p>
    `,
  },
  {
    kicker: "FEATURE DESIGN",
    title: "功能方案",
    body: `
      <div class="prd-feature-list">
        <div><b>01</b><span><strong>共同保障</strong>先说明当前方案都经过得物查验，并享有平台品质保障。</span></div>
        <div><b>02</b><span><strong>当前选项对比</strong>统一展示价格、预计到货、渠道、成色和售后标签。</span></div>
        <div><b>03</b><span><strong>标签解释</strong>点击标签即可就地查看说明，不用离开当前页面。</span></div>
        <div><b>04</b><span><strong>帮我选</strong>按“最快收到、预算最低、售后更灵活、跨境但不想久等”等关注点推荐选项。</span></div>
        <div><b>05</b><span><strong>完整说明</strong>按渠道、成色、查验和售后分类查看全部规则。</span></div>
      </div>
    `,
  },
  {
    kicker: "PRIORITY",
    title: "功能优先级",
    body: `
      <div class="priority-table">
        <div><b>P0</b><span>辅助入口、共同保障、当前选项对比、标签解释、确认选项</span></div>
        <div><b>P1</b><span>完整标签说明、按关注点帮我选、推荐结果回到下单链路</span></div>
        <div><b>P2</b><span>结合浏览和购买偏好做个性化排序、优化入口触发时机</span></div>
      </div>
      <p>第一阶段先验证“解释是否真的能帮助选择”，再考虑更复杂的个性化能力。</p>
    `,
  },
  {
    kicker: "MEASUREMENT",
    title: "数据指标",
    body: `
      <p>核心指标是购买选项页到确认订单页的转化率。它能直接反映辅助功能是否让用户更容易继续购买。</p>
      <ul><li>效率：平均决策时长、反复切换选项次数。</li><li>使用：辅助入口点击率、标签解释点击率、完整说明访问率。</li><li>采纳：辅助页继续下单率、推荐结果采纳率。</li><li>预期：查验、时效和售后相关咨询与退款原因变化。</li></ul>
      <div class="prd-callout"><b>保护指标</b><span>关注主购买页直接下单率和退出率，避免辅助入口反而打扰高意向用户。</span></div>
    `,
  },
  {
    kicker: "RISKS",
    title: "风险与应对",
    body: `
      <div class="risk-list">
        <div><b>信息过载</b><span>主页面只展示必要结论，具体差异放在辅助页和可点击标签中。</span></div>
        <div><b>影响转化</b><span>先呈现共同保障和支持项，避免用醒目负面标签制造顾虑。</span></div>
        <div><b>供给身份暴露</b><span>只解释用户能感知的差异，不展示具体供应商。</span></div>
        <div><b>推荐被误解</b><span>给出理由和取舍，保留返回对比和自主选择。</span></div>
        <div><b>规则更新</b><span>标签与权益说明需要结构化配置，并随平台规则同步。</span></div>
      </div>
    `,
  },
  {
    kicker: "PROTOTYPE",
    title: "原型设计说明",
    body: `
      <p>终版原型覆盖四个关键状态，手机内的视觉与交互均延续得物现有购买页面的结构和样式。</p>
      <ul><li><b>入口页：</b>在购买选项标题旁新增「选项怎么选」。</li><li><b>对比页：</b>默认展开第一个选项，其他选项保持折叠。</li><li><b>帮我选：</b>用户选择关注点后，展示推荐理由和取舍。</li><li><b>说明页：</b>按渠道、成色、查验时效和售后权益分类展示。</li></ul>
      <div class="prd-callout"><b>设计原则</b><span>看起来仍然像得物，操作方式也延续原页面习惯；新增能力只出现在用户需要帮助的地方。</span></div>
    `,
  },
];

function setupReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

  targets.forEach((target, index) => {
    target.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(target);
  });
}

function setupStory() {
  const image = document.getElementById("storyPrototype");
  const caption = document.getElementById("sceneCaption");
  const steps = [...document.querySelectorAll(".story-step")];
  if (!image || !caption) return;

  const showScene = (index) => {
    const scene = storyScenes[index];
    steps.forEach((step) => step.classList.toggle("is-active", Number(step.dataset.scene) === index));
    image.classList.add("is-switching");
    window.setTimeout(() => {
      image.src = scene.image;
      image.alt = `产品故事第 ${index + 1} 步原型页面`;
      image.classList.remove("is-switching");
    }, reduceMotion ? 0 : 150);
    caption.innerHTML = `<b>0${index + 1}</b><span>${scene.caption}</span>`;
  };

  showScene(0);
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) showScene(Number(entry.target.dataset.scene));
    });
  }, { threshold: 0.55, rootMargin: "-18% 0px -18% 0px" });

  steps.forEach((step) => observer.observe(step));
}

function setupBaselineDemo() {
  const root = document.getElementById("baselinePhoneRoot");
  const device = document.getElementById("baselinePrototype");
  const reset = document.getElementById("resetDemo");
  const eventStream = document.getElementById("eventStream");
  if (!root || !device) return;

  const log = (message) => {
    if (!eventStream) return;
    const row = document.createElement("span");
    row.innerHTML = `<i></i>${message}`;
    eventStream.prepend(row);
    while (eventStream.children.length > 4) eventStream.lastElementChild.remove();
  };

  const render = () => {
    device.dataset.state = baselineState.screen;
    root.innerHTML = baselineState.screen === "order"
      ? renderOriginalOrderMarkup(baselineState.orderOption, "market")
      : renderOriginalBaselineMarkup(baselineState);
  };

  root.addEventListener("click", (event) => {
    const style = event.target.closest("[data-base-style]");
    const order = event.target.closest("[data-base-order]");
    const back = event.target.closest("[data-du-back='market']");

    if (style) {
      baselineState.style = style.dataset.baseStyle;
      render();
      log(`原购买页：切换为「${style.textContent.trim()}」`);
      return;
    }
    if (order) {
      baselineState.screen = "order";
      baselineState.orderOption = order.dataset.baseOrder;
      render();
      log(`原购买页：直接选择「${buyOptions[baselineState.orderOption].name}」`);
      return;
    }
    if (back) {
      baselineState.screen = "market";
      render();
      log("原购买页：返回购买选项");
    }
  });

  reset?.addEventListener("click", () => {
    Object.assign(baselineState, {
      screen: "market",
      style: "gold",
      gift: "default",
      orderOption: "special",
    });
    render();
  });

  render();
}

function setupPrototypeDemo() {
  const device = document.getElementById("prototypeDemo");
  const phoneRoot = document.getElementById("phoneRoot");
  const stateLabel = document.getElementById("stateLabel");
  const taskLabel = document.getElementById("taskLabel");
  const principleLabel = document.getElementById("principleLabel");
  const tapHint = document.getElementById("tapHint");
  const eventStream = document.getElementById("eventStream");
  const reset = document.getElementById("resetDemo");
  const steps = [...document.querySelectorAll(".lab-step")];
  if (!device || !phoneRoot) return;

  const logEvent = (message) => {
    if (!eventStream) return;
    const row = document.createElement("span");
    row.innerHTML = `<i></i>${message}`;
    eventStream.prepend(row);
    while (eventStream.children.length > 4) eventStream.lastElementChild.remove();
  };

  const updateInspector = (key) => {
    const state = prototypeStates[key] || prototypeStates.entry;
    device.dataset.state = key;
    stateLabel.textContent = state.label;
    taskLabel.textContent = state.task;
    principleLabel.textContent = state.principle;
    tapHint.textContent = state.hint;
    steps.forEach((step) => step.classList.toggle("is-active", step.dataset.labStep === key || (key === "order" && step.dataset.labStep === "recommend")));
  };

  const render = (shouldLog = true, message = "", preserveScroll = false) => {
    const key = demoState.screen;
    const previousScrollTop = preserveScroll ? phoneRoot.querySelector(".scroll-page")?.scrollTop || 0 : 0;
    if (key === "compare" || key === "recommend") {
      phoneRoot.innerHTML = renderOriginalCompareMarkup({
        focusOption: demoState.focusOption,
        activeChip: demoState.activeChip,
        preference: demoState.preference,
      });
    } else if (key === "explain") {
      phoneRoot.innerHTML = renderOriginalExplainMarkup(demoState.explainTab);
    } else if (key === "order") {
      phoneRoot.innerHTML = renderOriginalOrderMarkup(demoState.orderOption, demoState.previousScreen || "entry");
    } else {
      phoneRoot.innerHTML = renderOriginalEntryMarkup();
    }
    if (preserveScroll) {
      const scroller = phoneRoot.querySelector(".scroll-page");
      if (scroller) scroller.scrollTop = previousScrollTop;
    }
    updateInspector(key);
    if (shouldLog) logEvent(message || `切换到「${prototypeStates[key].label}」`);
  };

  const showScreen = (key, message = "") => {
    demoState.screen = key;
    if (key === "compare") demoState.preference = null;
    if (key === "recommend" && !demoState.preference) demoState.preference = "fast";
    const state = prototypeStates[key] || prototypeStates.entry;
    render(true, message || `切换到「${state.label}」`);
  };

  phoneRoot.addEventListener("click", (event) => {
    const screenControl = event.target.closest("[data-du-screen]");
    const backControl = event.target.closest("[data-du-back]");
    const optionControl = event.target.closest("[data-du-option]");
    const chipControl = event.target.closest("[data-du-chip]");
    const preferenceControl = event.target.closest("[data-du-preference]");
    const explainTab = event.target.closest("[data-du-explain-tab]");
    const orderControl = event.target.closest("[data-du-order], [data-du-confirm]");

    if (screenControl) {
      showScreen(screenControl.dataset.duScreen);
      return;
    }
    if (backControl) {
      showScreen(backControl.dataset.duBack);
      return;
    }
    if (optionControl) {
      demoState.screen = "compare";
      demoState.preference = null;
      demoState.focusOption = optionControl.dataset.duOption;
      demoState.activeChip = buyOptions[demoState.focusOption].tags[0];
      render(true, `展开「${buyOptions[demoState.focusOption].name}」`, true);
      return;
    }
    if (chipControl) {
      demoState.activeChip = chipControl.dataset.duChip;
      render(true, `查看「${demoState.activeChip}」说明`, true);
      return;
    }
    if (preferenceControl) {
      demoState.screen = "recommend";
      demoState.preference = preferenceControl.dataset.duPreference;
      render(true, `关注点改为「${preferenceControl.textContent.trim()}」`, true);
      return;
    }
    if (explainTab) {
      demoState.explainTab = explainTab.dataset.duExplainTab;
      render(true, `查看「${explainTerms[demoState.explainTab].label}」说明`, true);
      return;
    }
    if (orderControl) {
      demoState.previousScreen = demoState.screen;
      demoState.orderOption = orderControl.dataset.duOrder || orderControl.dataset.duConfirm;
      showScreen("order", `已选择「${buyOptions[demoState.orderOption].name}」`);
    }
  });

  reset.addEventListener("click", () => {
    Object.assign(demoState, {
      screen: "entry",
      focusOption: "official",
      activeChip: null,
      preference: null,
      explainTab: "channel",
      orderOption: "special",
      previousScreen: "entry",
    });
    render(true, "已回到入口页");
  });

  document.getElementById("showRecommendPrototype")?.addEventListener("click", () => {
    showScreen("recommend");
    document.getElementById("lab")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });

  render(false);
}

function setupPreferenceHelper() {
  const controls = [...document.querySelectorAll("[data-preference]")];
  const option = document.getElementById("helperOption");
  const price = document.getElementById("helperPrice");
  const focusLabel = document.getElementById("helperFocusLabel");
  const title = document.getElementById("helperTitle");
  const reason = document.getElementById("helperReason");
  const tradeoff = document.getElementById("helperTradeoff");
  const choices = [...document.querySelectorAll("[data-helper-choice]")];
  if (!controls.length || !option) return;

  const update = (key) => {
    const result = helperResults[key];
    demoState.preference = key;
    controls.forEach((control) => {
      const active = control.dataset.preference === key;
      control.classList.toggle("is-active", active);
      control.setAttribute("aria-pressed", String(active));
      if (active && focusLabel) focusLabel.textContent = control.textContent.trim();
    });
    choices.forEach((choice) => choice.classList.toggle("is-selected", choice.dataset.helperChoice === result.choice));
    [option, price, title, reason, tradeoff].forEach((element) => element.classList.add("is-changing"));
    window.setTimeout(() => {
      option.textContent = result.option;
      price.textContent = result.price;
      title.textContent = result.title;
      reason.textContent = result.reason;
      tradeoff.textContent = result.tradeoff;
      [option, price, title, reason, tradeoff].forEach((element) => element.classList.remove("is-changing"));
    }, reduceMotion ? 0 : 130);
  };

  controls.forEach((control) => control.addEventListener("click", () => update(control.dataset.preference)));
  update("fast");
}

function setupPrdReader() {
  const nav = document.getElementById("prdNav");
  const kicker = document.getElementById("prdChapterKicker");
  const title = document.getElementById("prdChapterTitle");
  const body = document.getElementById("prdChapterBody");
  const progress = document.getElementById("prdProgress");
  const progressBar = document.getElementById("prdProgressBar");
  const previous = document.getElementById("prdPrev");
  const next = document.getElementById("prdNext");
  if (!nav || !body) return;

  let activeIndex = 0;
  const buttons = [...nav.querySelectorAll("[data-prd-index]")];

  const render = (index) => {
    activeIndex = Math.max(0, Math.min(prdChapters.length - 1, index));
    const chapter = prdChapters[activeIndex];
    body.classList.add("is-changing");
    window.setTimeout(() => {
      kicker.textContent = chapter.kicker;
      title.textContent = chapter.title;
      body.innerHTML = chapter.body;
      progress.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${prdChapters.length}`;
      progressBar.style.transform = `scaleX(${(activeIndex + 1) / prdChapters.length})`;
      buttons.forEach((button) => button.classList.toggle("is-active", Number(button.dataset.prdIndex) === activeIndex));
      previous.disabled = activeIndex === 0;
      next.disabled = activeIndex === prdChapters.length - 1;
      body.classList.remove("is-changing");
    }, reduceMotion ? 0 : 120);
  };

  buttons.forEach((button) => button.addEventListener("click", () => render(Number(button.dataset.prdIndex))));
  previous.addEventListener("click", () => render(activeIndex - 1));
  next.addEventListener("click", () => render(activeIndex + 1));
  render(0);
}

function setupPointerEffects() {
  if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;

  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
    document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    document.querySelectorAll(".parallax").forEach((item) => {
      const depth = Number(item.dataset.depth || 0.1);
      const x = (event.clientX / innerWidth - 0.5) * 42 * depth;
      const y = (event.clientY / innerHeight - 0.5) * 42 * depth;
      item.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, { passive: true });

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const rx = -((event.clientY - rect.top) / rect.height - 0.5) * 8;
      card.style.setProperty("--rx", `${rx}deg`);
      card.style.setProperty("--ry", `${ry}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  document.querySelectorAll(".magnetic").forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty("--tx", `${(event.clientX - rect.left - rect.width / 2) * 0.12}px`);
      item.style.setProperty("--ty", `${(event.clientY - rect.top - rect.height / 2) * 0.16}px`);
    });
    item.addEventListener("pointerleave", () => {
      item.style.setProperty("--tx", "0px");
      item.style.setProperty("--ty", "0px");
    });
  });
}

function setupScrollMotion() {
  const progress = document.querySelector(".scroll-progress span");
  const heroStage = document.querySelector(".hero-stage");
  let ticking = false;

  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const ratio = max > 0 ? scrollY / max : 0;
    progress.style.transform = `scaleX(${ratio})`;
    if (!reduceMotion && heroStage && scrollY < innerHeight * 1.2) {
      const heroProgress = Math.min(scrollY / innerHeight, 1);
      heroStage.style.transform = `translateY(${heroProgress * 85}px) scale(${1 - heroProgress * 0.08}) rotate(${heroProgress * 1.2}deg)`;
      heroStage.style.opacity = String(1 - heroProgress * 0.42);
    }
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
}

function setupCinematicSections() {
  const scenes = [...document.querySelectorAll(
    ".preference-selector, .assurance-orbit, .difference-spectrum, .measurement-field"
  )];
  if (!scenes.length || reduceMotion) return;

  let ticking = false;
  const update = () => {
    scenes.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const distance = innerHeight + rect.height;
      const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / distance));
      const centered = progress - 0.5;
      scene.style.setProperty("--scene-progress", progress.toFixed(3));
      scene.style.setProperty("--scene-rotate", `${centered * 42}deg`);
      scene.style.setProperty("--scene-reverse", `${centered * -30}deg`);
      scene.style.setProperty("--scene-shift", `${centered * 34}px`);
    });
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();
}

function setupParticles() {
  if (reduceMotion || innerWidth < 780) return;
  const canvas = document.getElementById("ambientCanvas");
  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let particles = [];

  const resize = () => {
    width = canvas.width = innerWidth * devicePixelRatio;
    height = canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: (Math.random() * 1.4 + 0.4) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.13 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.13 * devicePixelRatio,
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    const onDark = scrollY < innerHeight * 1.2 ||
      document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest(".story,.lab,.metrics,.finale");
    canvas.style.opacity = onDark ? ".38" : ".08";
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fillStyle = "rgba(119,255,248,.65)";
      context.fill();
    });
    requestAnimationFrame(draw);
  };

  resize();
  addEventListener("resize", resize);
  draw();
}

setupReveal();
setupStory();
setupBaselineDemo();
setupPrototypeDemo();
setupPreferenceHelper();
setupPrdReader();
setupPointerEffects();
setupScrollMotion();
setupCinematicSections();
setupParticles();
