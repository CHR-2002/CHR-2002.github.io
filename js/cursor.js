/* 导航栏显示标题 start */

document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);
//响应pjax
function tonav() {
  document.getElementById("name-container").setAttribute("style", "display:none");
  var position = $(window).scrollTop();
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > position) {
      document.getElementById("name-container").setAttribute("style", "");
      document.getElementsByClassName("menus_items")[1].setAttribute("style", "display:none!important");
    } else {
      document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
      document.getElementById("name-container").setAttribute("style", "display:none");
    }
    position = scroll;
  });
  //修复没有弄右键菜单的童鞋无法回顶部的问题
  document.getElementById("page-name").innerText = document.title.split(" | Fomalhaut🥝")[0];
}

function scrollToTop() {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

/* 导航栏显示标题 end */


/* 听话鼠标 start */
var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle2 = (el, attr) => {
  try {
    return window.getComputedStyle
      ? window.getComputedStyle(el)[attr]
      : el.currentStyle[attr];
  } catch (e) { }
  return "";
};

// 为了屏蔽异步加载导致无法读取颜色值，这里统一用哈希表预处理
const map = new Map();
map.set('red', "rgb(241, 71, 71)");
map.set('orange', "rgb(241, 162, 71)");
map.set('yellow', "rgb(241, 238, 71)")
map.set('purple', "rgb(179, 71, 241)");
map.set('blue', "rgb(102, 204, 255)");
map.set('gray', "rgb(226, 226, 226)");
map.set('green', "rgb(57, 197, 187)");
map.set('whitegray', "rgb(241, 241, 241)");
map.set('pink', "rgb(237, 112, 155)");
map.set('black', "rgb(0, 0, 0)");
map.set('darkblue', "rgb(97, 100, 159)");
map.set('heoblue', "rgb(66, 90, 239)");

class Cursor {
  constructor() {
    this.pos = { curr: null, prev: null };
    this.pt = [];
    this.create();
    this.init();
    this.render();
  }

  move(left, top) {
    this.cursor.style["left"] = `${left}px`;
    this.cursor.style["top"] = `${top}px`;
  }

  create() {
    if (!this.cursor) {
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("hidden");
      document.body.append(this.cursor);
    }
    var el = document.getElementsByTagName('*');
    for (let i = 0; i < el.length; i++)
      if (getStyle2(el[i], "cursor") == "pointer")
        this.pt.push(el[i].outerHTML);
    var colorVal = map.get(localStorage.getItem("themeColor"));
    document.body.appendChild((this.scr = document.createElement("style")));
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='` + colorVal + `'/></svg>") 4 4, auto}`;
  }

  refresh() {
    this.scr.remove();
    this.cursor.classList.remove("hover");
    this.cursor.classList.remove("active");
    this.pos = { curr: null, prev: null };
    this.pt = [];

    this.create();
    this.init();
    this.render();
  }

  init() {
    document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
    document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
    document.onmousemove = e => { (this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 }; this.cursor.classList.remove("hidden"); };
    document.onmouseenter = e => this.cursor.classList.remove("hidden");
    document.onmouseleave = e => this.cursor.classList.add("hidden");
    document.onmousedown = e => this.cursor.classList.add("active");
    document.onmouseup = e => this.cursor.classList.remove("active");
  }

  render() {
    if (this.pos.prev) {
      // 跟踪速度调节
      this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
      this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }
}

(() => {
  CURSOR = new Cursor();
  // 需要重新获取列表时，使用 CURSOR.refresh()
})();

/* 听话鼠标 end */


/* 星空特效 start */
function dark() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var n, e, i, h, t = .05,
    s = document.getElementById("universe"),
    o = !0,
    a = "180,184,240",
    r = "226,225,142",
    d = "226,225,224",
    c = [];

  function f() {
    n = window.innerWidth, e = window.innerHeight, i = .216 * n, s.setAttribute("width", n), s.setAttribute("height", e)
  }
  function u() {
    h.clearRect(0, 0, n, e);
    for (var t = c.length, i = 0; i < t; i++) {
      var s = c[i];
      s.move(), s.fadeIn(), s.fadeOut(), s.draw()
    }
  }
  function y() {
    this.reset = function () {
      this.giant = m(3), this.comet = !this.giant && !o && m(10), this.x = l(0, n - 10), this.y = l(0, e), this.r = l(1.1, 2.6), this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t, this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120), this.fadingOut = null, this.fadingIn = !0, this.opacity = 0, this.opacityTresh = l(.2, 1 - .4 * (this.comet + 1 - 1)), this.do = l(5e-4, .002) + .001 * (this.comet + 1 - 1)
    }, this.fadeIn = function () {
      this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
    }, this.fadeOut = function () {
      this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do / 2, (this.x > n || this.y < 0) && (this.fadingOut = !1, this.reset()))
    }, this.draw = function () {
      if (h.beginPath(), this.giant) h.fillStyle = "rgba(" + a + "," + this.opacity + ")", h.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1); else if (this.comet) {
        h.fillStyle = "rgba(" + d + "," + this.opacity + ")", h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1); for (var t = 0; t < 30; t++)h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t) + ")", h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2), h.fill()
      } else h.fillStyle = "rgba(" + r + "," + this.opacity + ")", h.rect(this.x, this.y, this.r, this.r);
      h.closePath(), h.fill()
    }, this.move = function () {
      this.x += this.dx, this.y += this.dy, !1 === this.fadingOut && this.reset(), (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0)
    }, setTimeout(function () {
      o = !1
    }, 50)
  }
  function m(t) {
    return Math.floor(1e3 * Math.random()) + 1 < 10 * t
  }
  function l(t, i) {
    return Math.random() * (i - t) + t
  }
  f(), window.addEventListener("resize", f, !1), function () {
    h = s.getContext("2d");
    for (var t = 0; t < i; t++) c[t] = new y, c[t].reset();
    u()
  }(), function t() {
    document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark' && u(), window.requestAnimationFrame(t)
  }()
};
dark()
/* 星空特效 end */


/*右下角阅读进度*/
// 页面滚动时执行
window.addEventListener('scroll', percent);

function percent() {
    // 卷去的高度
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset;
    // 页面总高度 - 可视区域高度（避免滚动到底时超过100%）
    let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    ) - document.documentElement.clientHeight;

    // 计算百分比（避免0和超过100的情况）
    let progress = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
    progress = Math.min(Math.max(progress, 0), 100);

    const goUpBtn = document.querySelector("#go-up");
    const icon = goUpBtn.querySelector("i"); // 图标
    const percentEl = goUpBtn.querySelector("#percent"); // 进度

    // 逻辑调整：始终显示其中一个（进度/图标）
    if (progress < 100) {
        // 未到顶部：显示进度，隐藏图标
        icon.style.display = 'none';
        percentEl.style.display = 'block';
        percentEl.querySelector("span:first-child").textContent = progress;
    } else {
        // 已到顶部：显示图标，隐藏进度
        percentEl.style.display = 'none';
        icon.style.display = 'block';
    }
}

// 页面加载完成后初始化一次
window.addEventListener('load', percent);

/* 禁用f12与按键防抖 start */
// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
  if (TT !== null) clearTimeout(TT);
  TT = setTimeout(fn, time);
}
// 复制提醒
document.addEventListener("copy", function () {
  debounce(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "哎嘿！复制成功🍬",
          message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }, 300);
})

/* 随便逛逛 start */
// 随便逛逛
// 发现有时会和当前页面重复，加一个判断
function randomPost() {
  fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
    let ls = data.querySelectorAll('url loc');
    while (true) {
      let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
      if (location.href == url) continue;
      location.href = url;
      return;
    }
  })
}
/* 右键菜单 start */
function setMask() {
  //设置遮罩
  if (document.getElementsByClassName("rmMask")[0] != undefined)
    return document.getElementsByClassName("rmMask")[0];
  mask = document.createElement('div');
  mask.className = "rmMask";
  mask.style.width = window.innerWidth + 'px';
  mask.style.height = window.innerHeight + 'px';
  mask.style.background = '#fff';
  mask.style.opacity = '.0';
  mask.style.position = 'fixed';
  mask.style.top = '0';
  mask.style.left = '0';
  mask.style.zIndex = 998;
  document.body.appendChild(mask);
  document.getElementById("rightMenu").style.zIndex = 19198;
  return mask;
}

function insertAtCursor(myField, myValue) {

  //IE 浏览器
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
    sel.select();
  }

  //FireFox、Chrome等
  else if (myField.selectionStart || myField.selectionStart == '0') {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;

    // 保存滚动条
    var restoreTop = myField.scrollTop;
    myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

    if (restoreTop > 0) {
      myField.scrollTop = restoreTop;
    }

    myField.focus();
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
    myField.focus();
  }
}

let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $('#rightMenu');
  $rightMenu.css('top', x + 'px').css('left', y + 'px');

  if (isTrue) {
    $rightMenu.show();
  } else {
    $rightMenu.hide();
  }
}

rmf.copyWordsLink = function () {
  let url = window.location.href
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa)
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
}
rmf.switchReadMode = function () {
  const $body = document.body
  $body.classList.add('read-mode')
  const newEle = document.createElement('button')
  newEle.type = 'button'
  newEle.className = 'fas fa-sign-out-alt exit-readmode'
  $body.appendChild(newEle)

  function clickFn() {
    $body.classList.remove('read-mode')
    newEle.remove()
    newEle.removeEventListener('click', clickFn)
  }

  newEle.addEventListener('click', clickFn)
}

//复制选中文字
rmf.copySelect = function () {
  document.execCommand('Copy', false, null);
}

//回到顶部
rmf.scrollToTop = function () {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

document.body.addEventListener('touchmove', function () {

}, { passive: false });

function popupMenu() {
  window.oncontextmenu = function (event) {
    // if (event.ctrlKey) return true;

    // 当关掉自定义右键时候直接返回
    if (mouseMode == "off") return true;

    $('.rightMenu-group.hide').hide();
    if (document.getSelection().toString()) {
      $('#menu-text').show();
    }
    if (document.getElementById('post')) {
      $('#menu-post').show();
    } else {
      if (document.getElementById('page')) {
        $('#menu-post').show();
      }
    }
    var el = window.document.body;
    el = event.target;
    var a = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (a.test(window.getSelection().toString()) && el.tagName != "A") {
      $('#menu-too').show()
    }
    if (el.tagName == 'A') {
      $('#menu-to').show()
      rmf.open = function () {
        if (el.href.indexOf("http://") == -1 && el.href.indexOf("https://") == -1 || el.href.indexOf("yisous.xyz") != -1) {
          pjax.loadUrl(el.href)
        }
        else {
          location.href = el.href
        }
      }
      rmf.openWithNewTab = function () {
        window.open(el.href);
        // window.location.reload();
      }
      rmf.copyLink = function () {
        let url = el.href
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa)
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
      }
    } else if (el.tagName == 'IMG') {
      $('#menu-img').show()
      rmf.openWithNewTab = function () {
        window.open(el.src);
        // window.location.reload();
      }
      rmf.click = function () {
        el.click()
      }
      rmf.copyLink = function () {
        let url = el.src
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa)
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
      }
      rmf.saveAs = function () {
        var a = document.createElement('a');
        var url = el.src;
        var filename = url.split("/")[-1];
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
      $('#menu-paste').show();
      rmf.paste = function () {
        navigator.permissions
          .query({
            name: 'clipboard-read'
          })
          .then(result => {
            if (result.state == 'granted' || result.state == 'prompt') {
              //读取剪贴板
              navigator.clipboard.readText().then(text => {
                console.log(text)
                insertAtCursor(el, text)
              })
            } else {
              Snackbar.show({
                text: '请允许读取剪贴板！',
                pos: 'top-center',
                showAction: false,
              })
            }
          })
      }
    }
    let pageX = event.clientX + 10;
    let pageY = event.clientY;
    let rmWidth = $('#rightMenu').width();
    let rmHeight = $('#rightMenu').height();
    if (pageX + rmWidth > window.innerWidth) {
      pageX -= rmWidth + 10;
    }
    if (pageY + rmHeight > window.innerHeight) {
      pageY -= pageY + rmHeight - window.innerHeight;
    }
    mask = setMask();
    // 滚动消失的代码和阅读进度有冲突，因此放到readPercent.js里面了
    $(".rightMenu-item").click(() => {
      $('.rmMask').attr('style', 'display: none');
    })
    $(window).resize(() => {
      rmf.showRightMenu(false);
      $('.rmMask').attr('style', 'display: none');
    })
    mask.onclick = () => {
      $('.rmMask').attr('style', 'display: none');
    }
    rmf.showRightMenu(true, pageY, pageX);
    $('.rmMask').attr('style', 'display: flex');
    return false;
  };

  window.addEventListener('click', function () {
    rmf.showRightMenu(false);
  });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
  let timer = 0 // 初始化timer

  target.ontouchstart = () => {
    timer = 0 // 重置timer
    timer = setTimeout(() => {
      callback();
      timer = 0
    }, 380) // 超时器能成功执行，说明是长按
  }

  target.ontouchmove = () => {
    clearTimeout(timer) // 如果来到这里，说明是滑动
    timer = 0
  }

  target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
    if (timer) {
      clearTimeout(timer)
    }
  }
}

addLongtabListener(box, popupMenu)

// 全屏
rmf.fullScreen = function () {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
}

// 右键开关
if (localStorage.getItem("mouse") == undefined) {
  localStorage.setItem("mouse", "on");
}
var mouseMode = localStorage.getItem("mouse");
function changeMouseMode() {
  if (localStorage.getItem("mouse") == "on") {
    mouseMode = "off";
    localStorage.setItem("mouse", "off");
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "切换右键模式成功🍔",
            message: "当前鼠标右键已恢复为系统默认！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 300);
  } else {
    mouseMode = "on";
    localStorage.setItem("mouse", "on");
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "切换右键模式成功🍔",
            message: "当前鼠标右键已更换为网站指定样式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 300);
  }
}
/* 右键菜单 end */

/* 夜间模式切换动画 start */
function switchNightMode() {
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'),
    setTimeout(function () {
      document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), localStorage.setItem('isDark', '0'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), localStorage.setItem('isDark', '1'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),
        setTimeout(function () {
          document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
          document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
          setTimeout(function () {
            document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
          }, 1e3);
        }, 2e3)
    })
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  if (nowMode === 'light') {
    // 先设置太阳月亮透明度
    document.getElementById("sun").style.opacity = "1";
    document.getElementById("moon").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("sun").style.opacity = "0";
      document.getElementById("moon").style.opacity = "1";
    }, 1000);

    activateDarkMode()
    saveToLocal.set('theme', 'dark', 2)
    // GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')
    // 延时弹窗提醒
    setTimeout(() => {
      new Vue({
        data: function () {
          this.$notify({
            title: "关灯啦🌙",
            message: "当前已成功切换至夜间模式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 2000)
  } else {
    // 先设置太阳月亮透明度
    document.getElementById("sun").style.opacity = "0";
    document.getElementById("moon").style.opacity = "1";
    setTimeout(function () {
      document.getElementById("sun").style.opacity = "1";
      document.getElementById("moon").style.opacity = "0";
    }, 1000);

    activateLightMode()
    saveToLocal.set('theme', 'light', 2)
    document.querySelector('body').classList.add('DarkMode'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')
    setTimeout(() => {
      new Vue({
        data: function () {
          this.$notify({
            title: "开灯啦🌞",
            message: "当前已成功切换至白天模式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 2000)
  }
  // handle some cases
  typeof utterancesTheme === 'function' && utterancesTheme()
  typeof FB === 'object' && window.loadFBComment()
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
}

/* 夜间模式切换动画 end */

/* 分享按钮 start */
// 分享本页
function share_() {
  let url = window.location.origin + window.location.pathname
  try {
    // 截取标题
    var title = document.title;
    var subTitle = title.endsWith("| CHR") ? title.substring(0, title.length - 14) : title;
    navigator.clipboard.writeText('CHR的站内分享\n标题：' + subTitle + '\n链接：' + url + '\n欢迎来访！🍭🍭🍭');
    new Vue({
      data: function () {
        this.$notify({
          title: "成功复制分享信息🎉",
          message: "您现在可以通过粘贴直接跟小伙伴分享了！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
        // return { visible: false }
      }
    })
  } catch (err) {
    console.error('复制失败！', err);
  }
  // new ClipboardJS(".share", { text: function () { return '标题：' + document.title + '\n链接：' + url } });
  // btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~")
}

// 防抖
function share() {
  debounce(share_, 300);
}

/* 分享按钮 end */


// function switchPostChart () {
//   // 这里为了统一颜色选取的是“明暗模式”下的两种字体颜色，也可以自己定义
//   let color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4C4948' : 'rgba(255,255,255,0.7)'
//   if (document.getElementById('posts-chart') && postsOption) {
//     try {
//       let postsOptionNew = postsOption
//       postsOptionNew.title.textStyle.color = color
//       postsOptionNew.xAxis.nameTextStyle.color = color
//       postsOptionNew.yAxis.nameTextStyle.color = color
//       postsOptionNew.xAxis.axisLabel.color = color
//       postsOptionNew.yAxis.axisLabel.color = color
//       postsOptionNew.xAxis.axisLine.lineStyle.color = color
//       postsOptionNew.yAxis.axisLine.lineStyle.color = color
//       postsOptionNew.series[0].markLine.data[0].label.color = color
//       postsChart.setOption(postsOptionNew)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   if (document.getElementById('tags-chart') && tagsOption) {
//     try {
//       let tagsOptionNew = tagsOption
//       tagsOptionNew.title.textStyle.color = color
//       tagsOptionNew.xAxis.nameTextStyle.color = color
//       tagsOptionNew.yAxis.nameTextStyle.color = color
//       tagsOptionNew.xAxis.axisLabel.color = color
//       tagsOptionNew.yAxis.axisLabel.color = color
//       tagsOptionNew.xAxis.axisLine.lineStyle.color = color
//       tagsOptionNew.yAxis.axisLine.lineStyle.color = color
//       tagsOptionNew.series[0].markLine.data[0].label.color = color
//       tagsChart.setOption(tagsOptionNew)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   if (document.getElementById('categories-chart') && categoriesOption) {
//     try {
//       let categoriesOptionNew = categoriesOption
//       categoriesOptionNew.title.textStyle.color = color
//       categoriesOptionNew.legend.textStyle.color = color
//       if (!categoryParentFlag) { categoriesOptionNew.series[0].label.color = color }
//       categoriesChart.setOption(categoriesOptionNew)
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
// document.getElementById("mode-button").addEventListener("click", function () { setTimeout(switchPostChart, 100) })


/* 页脚计时器 start */
var now = new Date();
function createtime() {
  // 当前时间
  now.setTime(now.getTime() + 1000);
  var start = new Date("08/01/2022 00:00:00"); // 旅行者1号开始计算的时间
  var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 距离=秒数*速度 记住转换毫秒
  var unit = (dis / 149600000).toFixed(6);  // 天文单位
  // 网站诞生时间
  var grt = new Date("12/09/2025 00:00:00");
  var days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours);
  1 == String(hnum).length && (hnum = "0" + hnum);
  var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes);
  1 == String(mnum).length && (mnum = "0" + mnum);
  var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds);
  1 == String(snum).length && (snum = "0" + snum);
  let currentTimeHtml = "";
  (currentTimeHtml =
    hnum < 18 && hnum >= 9
      ? `<img class='boardsign' <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
      : `<img class='boardsign' <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}
// 设置重复执行函数，周期1000ms
setInterval(() => {
  createtime();
}, 1000);

/*页脚计时器 end */



/* 美化模块 start */

// 更新版本需要每个用户都恢复一次默认设置
if (localStorage.getItem("reset_4") == undefined) {
  localStorage.setItem("reset_4", "1");
  // 清空之前的标记值
  for (var i = 1; i <= 3; i++) {
    localStorage.removeItem("reset_" + i);
  }
  clearItem();
  setTimeout(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "提示🍒",
          message: " (｡･∀･)ﾉﾞ由于网站部分设置项更新，当前已为您重置所有设置，祝您愉快！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 8000
        });
      }
    })
  }, 1500);
}

// 清除localStorage配置项
function clearItem() {
  localStorage.removeItem('blogbg');
  localStorage.removeItem('universe');
  localStorage.removeItem('blur');
  localStorage.removeItem('fpson');
  localStorage.removeItem('transNum');
  localStorage.removeItem('blurRad');
  localStorage.removeItem('font');
  localStorage.removeItem('themeColor');
  localStorage.removeItem('rs');
  localStorage.removeItem('mouse');
  localStorage.removeItem('light');
  localStorage.removeItem('snow');
}


// 设置字体
if (localStorage.getItem("font") == undefined) {
  localStorage.setItem("font", "LXGW");
}
setFont(localStorage.getItem("font"));
function setFont(n) {
  localStorage.setItem("font", n)
  if (n == "default") {
    document.documentElement.style.setProperty('--global-font', '-apple-system');
    document.body.style.fontFamily = "-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI' , 'Helvetica Neue' , Lato, Roboto, 'PingFang SC' , 'Microsoft JhengHei' , 'Microsoft YaHei' , sans-serif";
  }
  else {
    document.documentElement.style.setProperty('--global-font', n);
    document.body.style.fontFamily = "var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif";
  }
  try { setFontBorder(); } catch (err) { };
}

// 设置字体选择框边界
function setFontBorder() {
  var curFont = localStorage.getItem("font");
  var swfId = "swf_" + curFont;
  document.getElementById(swfId).style.border = "2px solid var(--theme-color)";
  Array.prototype.forEach.call(document.getElementsByClassName("swf"), function (ee) {
    if (ee.id != swfId) ee.style.border = "2px solid var(--border-color)";
  });
}


// 设置主题色
if (localStorage.getItem("themeColor") == undefined) {
  localStorage.setItem("themeColor", "green");
}
setColor(localStorage.getItem("themeColor"));
function setColor(c) {
  document.getElementById("themeColor").innerText = `:root{--theme-color:` + map.get(c) + ` !important}`;
  localStorage.setItem("themeColor", c);
  // 刷新鼠标颜色
  CURSOR.refresh();
  // 设置一个带有透明度的主题色，用于菜单栏的悬浮颜色
  var theme_color = map.get(c);
  var trans_theme_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.7)";
  var high_trans_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.5)";
  document.documentElement.style.setProperty("--text-bg-hover", trans_theme_color);
  document.documentElement.style.setProperty("--high-trans-color", high_trans_color);
}


// 星空背景开关
if (localStorage.getItem("universe") == undefined) {
  localStorage.setItem("universe", "block");
}
setUniverse2(localStorage.getItem("universe"));
function setUniverse2(c) {
  document.getElementById("universe").style.display = c;
  localStorage.setItem("universe", c);
}
function setUniverse() {
  if (document.getElementById("universeSet").checked) {
    setUniverse2("block");
  } else {
    setUniverse2("none");
  }
}

// // 雪花开关
// if (localStorage.getItem("snow") == undefined) {
//   localStorage.setItem("snow", "none");
// }
// document.getElementById("snow").style.display = localStorage.getItem("snow");
// function setSnow() {
//   if (document.getElementById("snowSet").checked) {
//     document.getElementById("snow").style.display = "block";
//     localStorage.setItem("snow", "block");
//   } else {
//     document.getElementById("snow").style.display = "none";
//     localStorage.setItem("snow", "none");
//   }
// }


// // 帧率监测开关
// if (localStorage.getItem("fpson") == undefined) {
//   localStorage.setItem("fpson", "1");
// }
// function fpssw() {
//   if (document.getElementById("fpson").checked) {
//     localStorage.setItem("fpson", "1");
//   } else {
//     localStorage.setItem("fpson", "0");
//   }
//   setTimeout(reload, 600);
// }

// 刷新窗口
function reload() {
  window.location.reload();
}

// 侧边栏开关
if (localStorage.getItem("rs") == undefined) {
  localStorage.setItem("rs", "block");
}
if (localStorage.getItem("rs") == "block") {
  document.getElementById("rightSide").innerText = `:root{--rightside-display: block}`;
} else {
  document.getElementById("rightSide").innerText = `:root{--rightside-display: none}`;
}
function toggleRightside() {
  // 先设置localStorage变量
  if (document.getElementById("rightSideSet").checked) {
    localStorage.setItem("rs", "block");
    document.getElementById("rightSide").innerText = `:root{--rightside-display: block}`;
  } else {
    localStorage.setItem("rs", "none");
    document.getElementById("rightSide").innerText = `:root{--rightside-display: none}`;
  }
}


// 透明度调节滑块
if (localStorage.getItem("transNum") == undefined) {
  localStorage.setItem("transNum", 95);
}
var curTransNum = localStorage.getItem("transNum");
var curTransMini = curTransNum * 0.95;
document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${curTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${curTransNum}%) !important} `;
function setTrans() {
  var elem = document.getElementById("transSet");
  var newTransNum = elem.value;
  var target = document.querySelector('.transValue');
  target.innerHTML = "透明度 (0%-100%): " + newTransNum + "%";
  localStorage.setItem("transNum", newTransNum);
  curTransMini = newTransNum * 0.95;
  curTransNum = newTransNum;  // 更新当前透明度
  document.querySelector('#rang_trans').style.width = curTransMini + "%";
  document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${newTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${newTransNum}%) !important} `;
};


// 模糊度调节滑块
if (localStorage.getItem("blurRad") == undefined) {
  localStorage.setItem("blurRad", 20);
}
var curBlur = localStorage.getItem("blurRad"); // 当前模糊半径
var miniBlur = curBlur * 0.95;
document.getElementById("blurNum").innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
function setBlurNum() {
  var elem = document.getElementById("blurSet");
  var newBlur = elem.value;
  var target = document.querySelector('.blurValue');
  target.innerHTML = "模糊半径 (开启模糊生效 0px-100px): " + newBlur + "px";
  localStorage.setItem("blurRad", newBlur);
  curBlur = newBlur;
  miniBlur = curBlur * 0.95;
  // var max = elem.getAttribute("max");
  document.querySelector('#rang_blur').style.width = miniBlur + "%";
  document.getElementById("blurNum").innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
};


// 模糊效果开关
if (localStorage.getItem("blur") == undefined) {
  localStorage.setItem("blur", 0);
}
if (localStorage.getItem("blur") == 0) {
  document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: none}`;
} else {
  document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: var(--blur-num)}`;
}
function setBlur() {
  if (document.getElementById("blur").checked) {
    localStorage.setItem("blur", 1);
    document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: var(--blur-num)}`;
  } else {
    localStorage.setItem("blur", 0);
    document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: none}`;
  }
}

// 更换背景(原来Leonus的代码)
// 存数据
// name：命名 data：数据
// function saveData(name, data) {
//   localStorage.setItem(name, JSON.stringify({ time: Date.now(), data: data }));
// }
// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
// function loadData(name, time) {
//   let d = JSON.parse(localStorage.getItem(name));
//   // 过期或有错误返回 0 否则返回数据
//   if (d) {
//     let t = Date.now() - d.time;
//     if (t < time * 60 * 1000 && t > -1) return d.data;
//   }
//   return 0;
// }
// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用
// 读取背景
// try {
//   let data = loadData("blogbg", 1440);
//   if (data) changeBg(data, 1);
//   else localStorage.removeItem("blogbg");
// } catch (error) {
//   localStorage.removeItem("blogbg");
// }
// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
// function changeBg(s, flag) {
//   let bg = document.getElementById("web_bg");
//   if (s.charAt(0) == "#") {
//     bg.style.backgroundColor = s;
//     bg.style.backgroundImage = "none";
//   } else {
//     bg.style.backgroundImage = s
//   };
//   if (!flag) {
//     saveData("blogbg", s);
//   }
// }

// 切换自定义颜色
var defineColor = localStorage.getItem("blogbg") && localStorage.getItem("blogbg").charAt(0) == '#' ? localStorage.getItem("blogbg") : '#F4D88A';
function changeBgColor() {
  changeBg(document.querySelector("#define_colors").value);
}

// 必应每日壁纸API
let bingDayBg = screen.width <= 768 ? "url(https://bing.img.run/m.php)" : "url(https://bing.img.run/1920x1080.php)";
// 必应历史壁纸API
let bingHistoryBg = screen.width <= 768 ? "url(https://bing.img.run/rand_m.php)" : "url(https://bing.img.run/rand.php)";
// EEE.DOG
let EEEDog = "url(https://api.yimian.xyz/img?type=moe&size=1920x1080)";
// 随机美图cdn.seovx.com
let seovx = "url(https://cdn.seovx.com/?mom=302)";
// picsum随机
let picsum = "url(https://picsum.photos/1920/1080.webp)";
// 小歪二次元
// let waiDongman = "url(https://api.ixiaowai.cn/api/api.php)";
//  小歪高清壁纸
let waiBizhi = "url(https://api.ixiaowai.cn/gqapi/gqapi.php)";
// 博天随机
let btstu = "url(http://api.btstu.cn/sjbz/?lx=suiji)";
// tuapi 动漫
// let tuapi = "url(https://tuapi.eees.cc/api.php?category=dongman)";
// unsplash随机 https://source.unsplash.com/random/1920x1080/daily (weekly)
let unsplash = "url(https://source.unsplash.com/random/1920x1080/)";


// 更换背景(自己的代码)
if (localStorage.getItem("blogbg") != undefined) {
  setBg(localStorage.getItem("blogbg"));
} else {
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: url(/img/banner.jpg);
    --darkmode-bg:url(/img/black.jpg);
    --mobileday-bg: url(/img/banner.jpg);
    --mobilenight-bg: url(/img/black.jpg);
  }`;
}
// 切换背景主函数
function changeBg(s) {
  // 自定义颜色框
  defineColor = s.charAt(0) == "#" ? s : '#F4D88A';
  setBg(s);
  localStorage.setItem("blogbg", s);
}
// 设置背景属性
function setBg(s) {
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: ${s};
    --darkmode-bg: ${s};
    --mobileday-bg: ${s};
    --mobilenight-bg: ${s};
  }`;
}

// 切换链接对应的背景(加入了链接检验与防抖)
function getPicture() {
  debounce(getPicture_, 300);
}

function getPicture_() {
  checkImgExists(document.getElementById("pic-link").value).then(() => {
    // 有效的图片链接
    var link = "url(" + document.getElementById("pic-link").value + ")";
    changeBg(link);
    // 提示切换成功
    new Vue({
      data: function () {
        this.$notify({
          title: "可以啦🍨",
          message: "切换自定义背景成功！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }).catch(() => {
    // 无效的图片链接，提示无效
    new Vue({
      data: function () {
        this.$notify({
          title: "链接不对🤣",
          message: "请输入有效的图片链接！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "warning",
          duration: 5000
        });
      }
    })
  })
}
// 判断图片链接是否可用
function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) {
      resolve(res);
    }
    ImgObj.onerror = function (err) {
      reject(err);
    }
  })
}

// 黑夜霓虹灯开关
if (localStorage.getItem("light") == undefined) {
  localStorage.setItem("light", "true");
}
// 这里要适配Pjax
document.addEventListener('pjax:complete', function () {
  changeLight(localStorage.getItem("light") == "true" ? true : false)
});
document.addEventListener('DOMContentLoaded', function () {
  changeLight(localStorage.getItem("light") == "true" ? true : false)
});
function setLight() {
  if (document.getElementById("lightSet").checked) {
    changeLight(true);
    localStorage.setItem("light", "true");
  } else {
    changeLight(false);
    localStorage.setItem("light", "false");
  }
}
// 更换霓虹灯状态
function changeLight(flag) {
  if (document.getElementById("site-name"))
    document.getElementById("site-name").style.animation = flag ? "light_15px 10s linear infinite" : "none";
  if (document.getElementById("site-title"))
    document.getElementById("site-title").style.animation = flag ? "light_15px 10s linear infinite" : "none";
  if (document.getElementById("site-subtitle"))
    document.getElementById("site-subtitle").style.animation = flag ? "light_10px 10s linear infinite" : "none";
  if (document.getElementById("post-info"))
    document.getElementById("post-info").style.animation = flag ? "light_5px 10s linear infinite" : "none";
  document.getElementById("menu_shadow").innerText = flag ? `:root{--menu-shadow: 0 0 1px var(--theme-color);}` : `:root{--menu-shadow: none;}`;
}



// 解决开启Pjax的问题
// function whenDOMReady() {
//   try {
//     let data = loadData('blogbg', 1440)
//     if (data) changeBg_noWindow(data, 0)
//     else localStorage.removeItem('blogbg');
//   } catch (error) { localStorage.removeItem('blogbg'); }
// }
// whenDOMReady()
// document.addEventListener("pjax:success", whenDOMReady)

// 无弹窗提醒更换背景
// function changeBg_noWindow(s, flag) {
//   let bg = document.getElementById("web_bg");
//   if (s.charAt(0) == "#") {
//     bg.style.backgroundColor = s;
//     bg.style.backgroundImage = "none";
//   } else bg.style.backgroundImage = s;
//   if (!flag) {
//     saveData("blogbg", s);
//   }
// }

// 创建窗口
var winbox = "";

function createWinbox() {
  let div = document.createElement("div");
  document.body.appendChild(div);
  winbox = WinBox({
    id: "meihuaBox",
    index: 99,
    title: "美化设置",
    x: "left",
    y: "center",
    minwidth: "300px",
    height: "60%",
    // "#76c8f1"
    background: 'var(--theme-color)',
    onmaximize: () => {
      div.innerHTML = `<style>body::-webkit-scrollbar {display: none;} div#meihuaBox {width: 100% !important;}</style>`;
    },
    onrestore: () => {
      div.innerHTML = "";
    },
  });
  winResize();
  window.addEventListener("resize", winResize);

  // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
  winbox.body.innerHTML = `
<div class="settings" style="display: block;">
<div id="article-container" style="padding:12px;">
<br>
<center><p><button onclick="reset()" style="background:linear-gradient(to right, #fc354c, #0abfbc);display:block;width:40%;padding:15px 0;border-radius:30px;color:white;font-size:1.1em;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认设置</button></p></center>

<h2>一、显示偏好</h2>

<div class="transValue" style="font-weight:bold;padding-left:10px">透明度 (0%-100%): ${curTransNum}%</div>
<div class="range">
  <input id="transSet" type="range" min="0" max="100" step="1" value=${curTransNum} oninput="setTrans()">
  <p class="rang_width" id="rang_trans" style="width:${curTransMini}%"></p>
</div>

<div class="blurValue" style="font-weight:bold;padding-left:10px">模糊半径 (开启模糊生效 0px-100px): ${curBlur} px</div>
<div class="range">
  <input id="blurSet" type="range" min="0" max="100" step="1" value="${curBlur}" oninput="setBlurNum()">
  <p class="rang_width" id="rang_blur" style="width:${miniBlur}%"></p>
</div>


<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 星空特效 (夜间模式) </div><input type="checkbox" id="universeSet" onclick="setUniverse()">
  <div class="content-text" style="font-weight:bold; padding-left:20px"> 霓虹灯 (夜间模式) </div><input type="checkbox" id="lightSet" onclick="setLight()">
</div>

<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 模糊效果 (消耗性能) </div><input type="checkbox" id="blur" onclick="setBlur()">
  <div class="content-text" style="font-weight:bold; padding-left:20px"> 侧边栏 (默认开) </div><input type="checkbox" id="rightSideSet" onclick="toggleRightside()">
</div>

<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 帧率监测 (刷新生效) </div><input type="checkbox" id="fpson" onclick="fpssw()">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 雪花特效 (白天模式) </div><input type="checkbox" id="snowSet" onclick="setSnow()">
</div>


<h2>二、字体设置</h2>
<div class="note warning modern"><p>非商免字体未经授权只能个人使用。本站为完全非商业、非盈利性质的网站，平时用于个人学习交流，如有侵权请联系站长删除，谢谢！ —— 致版权方</p>
</div>
<p id="swfs">
<a class="swf" id="swf_ZhuZiAWan" href="javascript:;" rel="noopener external nofollow" style="font-family:'ZhuZiAWan'!important;color:black" onclick="setFont('ZhuZiAWan')">筑紫A丸标准体2.0</a>
<a class="swf" id="swf_HYTMR" href="javascript:;" rel="noopener external nofollow" style="font-family:'HYTMR'!important;color:black" onclick="setFont('HYTMR')">汉仪唐美人</a>
<a class="swf" id="swf_LXGW" href="javascript:;" rel="noopener external nofollow" style="font-family:'LXGW'!important;color:black" onclick="setFont('LXGW')">霞鹜文楷</a>
<a class="swf" id="swf_TTQHB" href="javascript:;" rel="noopener external nofollow" style="font-family:'TTQHB'!important;color:black" onclick="setFont('TTQHB')">甜甜圈海报</a>
<a class="swf" id="swf_YSHST" href="javascript:;" rel="noopener external nofollow" style="font-family:'YSHST'!important;color:black" onclick="setFont('YSHST')">优设好身体</a>
<a class="swf" id="swf_MiSans" href="javascript:;" rel="noopener external nofollow" style="font-family:'MiSans'!important;color:black" onclick="setFont('MiSans')">MiSans</a>
<a class="swf" id="swf_default" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif;!important;color:black" onclick="setFont('default')">系统默认</a>
</p>

<h2>三、主题色设置</h2>
<div class="content" style="display:flex"><input type="radio" id="red" name="colors" value=" "
        onclick="setColor('red')"><input type="radio" id="orange" name="colors" value=" "
        onclick="setColor('orange')"><input type="radio" id="yellow" name="colors" value=" "
        onclick="setColor('yellow')"><input type="radio" id="green" name="colors" value=" "
        onclick="setColor('green')"><input type="radio" id="blue" name="colors" value=" "
        onclick="setColor('blue')"><input type="radio" id="heoblue" name="colors" value=" "
        onclick="setColor('heoblue')"><input type="radio" id="darkblue" name="colors" value=" "
        onclick="setColor('darkblue')"><input type="radio" id="purple" name="colors" value=" "
        onclick="setColor('purple')"><input type="radio" id="pink" name="colors" value=" "
        onclick="setColor('pink')" checked="checked"><input type="radio" id="black" name="colors" value=" "
        onclick="setColor('black')"><input type="radio" id="blackgray" name="colors" value=" "
        onclick="setColor('blackgray')"></div>

<h2>四、背景设置</h2>
<center><button onclick="resetBg()" style="background:var(--theme-color);display:block;width:35%;padding:15px 0;border-radius:30px;color:white;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认背景</button></center>

<h3>1. 二次元</h3>
<details class="folding-tag" cyan><summary> 查看二次元背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/home_bg.webp)" class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/home_bg.webp)')"></a></div>
              </div>
            </details>


<h3>2. 风景</h3>

<details class="folding-tag" cyan><summary> 查看风景背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/fj1.webp)" class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/fj1.webp)')"></a></div>
              </div>
            </details>

<h3>3. 萌宠</h3>

<details class="folding-tag" cyan><summary> 查看萌宠背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/mc1.webp)" class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/mc1.webp)')"></a></div>
              </div>
            </details>

<h3>4. 渐变色</h3>
<details class="folding-tag" cyan><summary> 查看渐变色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #544a7d, #ffd452)" onclick="changeBg('linear-gradient(to right, #544a7d, #ffd452)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)" onclick="changeBg('linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to left, #654ea3, #eaafc8)" onclick="changeBg('linear-gradient(to left, #654ea3, #eaafc8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)" onclick="changeBg('linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #d3959b, #bfe6ba)" onclick="changeBg('linear-gradient(to top, #d3959b, #bfe6ba)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #8360c3, #2ebf91)" onclick="changeBg('linear-gradient(to top, #8360c3, #2ebf91)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #108dc7, #ef8e38)" onclick="changeBg('linear-gradient(to top, #108dc7, #ef8e38)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a></div>
              </div>
            </details>


<h3>5. 纯色</h3>
<details class="folding-tag" cyan><summary> 查看纯色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ecb1b1" onclick="changeBg('#ecb1b1')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #d3ebac" onclick="changeBg('#d3ebac')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ace9ce" onclick="changeBg('#ace9ce')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c1ebea" onclick="changeBg('#c1ebea')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #dee7f1" onclick="changeBg('#dee7f1')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9e3f2" onclick="changeBg('#e9e3f2')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7eff5" onclick="changeBg('#f7eff5')"></a>  <input type="color" id="define_colors" href="javascript:;" rel="noopener external nofollow" class="box" autocomplete="on" value="${defineColor}" oninput="changeBgColor()"></input></div>
              </div>
            </details>



<h3>6. 适配手机</h3>
<details class="folding-tag" cyan><summary> 查看适配手机的背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/mb4.webp)" class="pimgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/mb4.webp)')"></a></div>
              </div>
            </details>


<h3>7. 壁纸API</h3>
<details class="folding-tag" cyan><summary> 查看壁纸API系列背景 </summary>
              <div class='content'>
              <div class="bgbox"><a id="bingDayBox" rel="noopener external nofollow" style="background-image: ${bingDayBg}" class="box apiBox" onclick="changeBg('${bingDayBg}')"></a><a id="bingHistoryBox" rel="noopener external nofollow" style="background-image: ${bingHistoryBg}" class="box apiBox" onclick="changeBg('${bingHistoryBg}')"></a><a id="EEEDogBox" rel="noopener external nofollow" style="background-image: ${EEEDog}" class="box apiBox" onclick="changeBg('${EEEDog}')"></a><a id="seovxBox" rel="noopener external nofollow" style="background-image: ${seovx}" class="box apiBox" onclick="changeBg('${seovx}')"></a><a id="picsumBox" rel="noopener external nofollow" style="background-image: ${picsum}" class="box apiBox" onclick="changeBg('${picsum}')"></a><a id="waiBizhiBox" rel="noopener external nofollow" style="background-image: ${waiBizhi}" class="box apiBox" onclick="changeBg('${waiBizhi}')"></a><a id="btstuBox" rel="noopener external nofollow" style="background-image: ${btstu}" class="box apiBox" onclick="changeBg('${btstu}')"></a><a id="unsplashBox" rel="noopener external nofollow" style="background-image: ${unsplash}" class="box apiBox" onclick="changeBg('${unsplash}')"></a></div>
              </div>
            </details>


<h3>8. 自定义背景</h3>
<details class="folding-tag" cyan><summary> 设置自定义背景 </summary>
              <div class='content'>
              <p><center><input type="text" id="pic-link" size="70%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://source.fomal.cc/img/home_bg.webp"></center></p><p><center><button type="button" onclick="getPicture()" style="background:var(--theme-color);width:35%;padding: 5px 0px 7px 0px;border-radius:30px;color:white;line-height:2;">🌈切换背景🌈</button></center></p>
              </div>
            </details>

<br>
<center><div style="font-size:1.2em;color:var(--theme-color);font-weight:bold;">------ ( •̀ ω •́ )y 到底啦 ------</div></center>
<br>

</div>

</div>

`;

  // 打开小窗时候初始化
  $("#" + localStorage.getItem("themeColor")).attr("checked", true);
  if (localStorage.getItem("blur") == 1) {
    document.getElementById("blur").checked = true;
  } else {
    document.getElementById("blur").checked = false;
  }
  if (localStorage.getItem("universe") == "block") {
    document.getElementById("universeSet").checked = true;
  } else if (localStorage.getItem("universe") == "none") {
    document.getElementById("universeSet").checked = false;
  }
  if (localStorage.getItem("fpson") == "1") {
    document.getElementById("fpson").checked = true;
  } else {
    document.getElementById("fpson").checked = false;
  }
  if (localStorage.getItem("rs") == "block") {
    document.getElementById("rightSideSet").checked = true;
  } else if (localStorage.getItem("rs") == "none") {
    document.getElementById("rightSideSet").checked = false;
  }
  if (localStorage.getItem("light") == "true") {
    document.getElementById("lightSet").checked = true;
  } else {
    document.getElementById("lightSet").checked = false;
  }
  setFontBorder();
  if (localStorage.getItem("snow") == "block") {
    document.getElementById("snowSet").checked = true;
  } else if (localStorage.getItem("snow") == "none") {
    document.getElementById("snowSet").checked = false;
  }
}

// 恢复默认背景
function resetBg() {
  localStorage.removeItem('blogbg');
  reload();
}

// 恢复默认设置并刷新页面
function reset() {
  clearItem();
  reload();
}

// 适应窗口大小
function winResize() {
  try {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
      winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
      winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
  } catch (err) {
    // console.log("Pjax毒瘤抽风运行winResize方法🙄🙄🙄");
  }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
  if (document.querySelector("#meihuaBox")) {
    winbox.toggleClass("hide");
  } else {
    createWinbox();
  };
}

/* 美化模块 end */
