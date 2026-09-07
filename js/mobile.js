// GenshinServerWeb —— 手机端 UI 自动识别（窗口大小 + 屏幕比例）
// 命中手机/平板视口（或窗口被调到手机尺寸）时给 <html> 加上 mobile 类，
// css/mobile.css 中所有规则都以 html.mobile 为前缀，桌面端不受影响。
// 监听 resize/orientationchange，调整窗口大小时会实时切换，方便调试。
(function () {
  function isMobileViewport() {
    var w = window.innerWidth, h = window.innerHeight;
    if (w <= 820 || h <= 640) return true;       // 窄窗口 / 小高度窗口（手机横屏、分屏）
    if (w <= 1024 && h >= w * 1.1) return true;  // 竖长比例 + 中等宽度（手机/平板竖屏）
    return false;
  }
  function apply() {
    document.documentElement.classList.toggle('mobile', isMobileViewport());
  }
  var timer = null;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(apply, 120);
  });
  window.addEventListener('orientationchange', apply);
  apply();
})();
