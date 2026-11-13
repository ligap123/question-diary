const descriptions = {
  diary: { tag: 'DAILY JOURNAL', symbol: '✎', kicker: 'A PAGE OF YOUR OWN', zh: ['今天，想写些什么？', '记录心情与天气，写下小幸运、小进步和今天想说的话，再用照片与贴纸装点这一页。'], en: ['What will you write today?', 'Record your mood and the weather, note the little wins, and add photos and stickers to make the page your own.'] },
  week: { tag: 'WEEKLY PLANNER', symbol: '☼', kicker: 'MAKE SPACE FOR YOUR PLANS', zh: ['把这一周，轻轻安排好。', '按星期记录待办，用颜色区分计划，看看完成进度。也可以使用 DeepSeek 为一周生成总结。'], en: ['A little room to plan.', 'Add tasks by day, organize them with colors, follow your progress, and create a weekly summary with DeepSeek.'] },
  book: { tag: 'JOURNAL BOOKS', symbol: '▤', kicker: 'KEEP YOUR DAYS CLOSE', zh: ['把日子，收进书里。', '从日历与统计里回看生活，把写过的日记收录成册，慢慢翻阅那些值得记住的瞬间。'], en: ['Collect the days worth keeping.', 'Revisit entries in your calendar and insights, then gather them into books you can leaf through.'] }
};
let currentLanguage = 'zh';
let currentFeature = 'diary';
const tabs = document.querySelectorAll('.feature-tab');
function updateFeature() {
  const feature = descriptions[currentFeature];
  document.querySelector('#panel-tag').textContent = feature.tag;
  document.querySelector('#panel-symbol').textContent = feature.symbol;
  document.querySelector('#panel-kicker').textContent = feature.kicker;
  document.querySelector('#panel-title').textContent = feature[currentLanguage][0];
  document.querySelector('#panel-description').textContent = feature[currentLanguage][1];
  tabs.forEach(tab => {
    const selected = tab.dataset.feature === currentFeature;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
}
tabs.forEach(tab => tab.addEventListener('click', () => {
  currentFeature = tab.dataset.feature;
  updateFeature();
}));
document.querySelector('#language').addEventListener('click', event => {
  currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-zh][data-en]').forEach(element => {
    element.innerHTML = element.dataset[currentLanguage];
  });
  event.currentTarget.textContent = currentLanguage === 'zh' ? 'EN' : '中';
  event.currentTarget.setAttribute('aria-label', currentLanguage === 'zh' ? 'Switch to English' : '切换为中文');
  updateFeature();
});

const previewFrame = document.querySelector('.phone-outer iframe');
previewFrame.addEventListener('load', () => {
  const frameDocument = previewFrame.contentDocument;
  if (!frameDocument) return;
  const styles = frameDocument.createElement('style');
  styles.textContent = `
    html, body, * { scrollbar-width: none !important; }
    ::-webkit-scrollbar { display: none !important; }
    header:has(nav[aria-label="主导航"]) { padding-top: 8px !important; }
    nav[aria-label="主导航"] {
      display: grid !important;
      grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
      gap: 2px !important;
      overflow: visible !important;
    }
    nav[aria-label="主导航"] a {
      width: 100% !important;
      min-width: 0 !important;
      height: 48px !important;
      padding: 3px 0 !important;
      gap: 2px !important;
      flex-direction: column !important;
      justify-content: center !important;
      font-size: 10px !important;
      border-radius: 12px !important;
    }
    nav[aria-label="主导航"] a svg { width: 15px; height: 15px; }
  `;
  frameDocument.head.appendChild(styles);
});
