/**
 * @date: 2023/10/9
 * @author: 小红
 * @fileName: Utils
 * @Description:工具
 */
import {Fancybox} from '@fancyapps/ui';
import * as echarts from 'echarts/core';
import $ from 'jquery';

/**
 * 防抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {(function(): void)|*}
 */
export function useDebounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if(!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.apply(context, args);
  };
}

/**
 * 节流
 * @param func
 * @param wait
 * @param options
 * @returns {(function(): void)|*}
 */
export function useThrottle(func, wait, options = {}) {
  let timeOut, context, args;
  let previous = 0;

  const later = function() {
    previous = options['leading'] === false ? 0 : new Date().getTime();
    timeOut = null;
    func.apply(context, args);
    context = args = null;
  };

  return function() {
    const now = new Date().getTime();
    if(!previous && options['leading'] === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if(remaining <= 0 || remaining > wait) {
      if(timeOut) {
        clearTimeout(timeOut);
        timeOut = null;
      }
      previous = now;
      func.apply(context, args);
      if(!timeOut) context = args = null;
    }
    else if(!timeOut && options['leading'] !== false) {
      timeOut = setTimeout(later, remaining);
    }
  };
}

/**
 * 禁用滚动
 * @param bool
 */
export function useDisableScroll(bool) {
  if(bool) {
    document.body.style.overflow = 'hidden';
  }
  else {
    document.body.removeAttribute('style');
  }
}

/**
 * 判断白天还是夜晚
 * @returns {boolean}
 */
export function useIsDaytime() {
  const now = new Date();
  const currentHour = now.getHours();

  // 定义白天和夜晚的时间范围（可以根据需要调整）
  const daytimeStartHour = 6; // 早上6点
  const daytimeEndHour = 18;  // 晚上6点

  // 判断当前小时是否在白天时间范围内
  return currentHour >= daytimeStartHour && currentHour < daytimeEndHour;
}

/**
 * 遮罩层
 * @param close
 */
export function useMask(close) {
  let dom = $('#Butterfly >  .mask');
  if(dom.length === 0) dom = $('<div class="mask"></div>').appendTo('#Butterfly');

  dom.fadeIn(400);

  useDisableScroll(true);

  dom.click(() => {
    useDisableScroll(false);
    dom.off('click').fadeOut(400);
    close();
  });
}

/**
 * 随机获取颜色值
 * @returns {string}
 */
export function useRandomColor() {
  const randomColor = Math.random() * (0xFFFFFF - 0x100000) + 0x100000;

  return '#' + ('00000' + (randomColor << 0).toString(16)).slice(-6);
}

/**
 * 转为布尔值 判断是否为true
 */
export function useToBool(str) {
  return [true, 'true'].includes(str);
}

/**
 * 动态插入style到页面
 * @param type url str
 * @param content
 */
export function useImportCss(str) {
}

/**
 * 延迟
 * @param time
 * @returns {*}
 */
export function useDelay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 *  图表渲染 支持浅色暗色
 * @param dom
 * @param getOption
 */
export function useChart(dom, getOption) {
  const options = getOption();

  let es = echarts.init(dom, this.useTheme.getMode());

  es.setOption(options);

  this.useTheme.change((mode) => {
    es?.dispose();
    es = echarts.init(dom, mode);
    es.setOption(options);
  });

  dom.addEventListener('resize', () => {
    es.resize();
  });
}

/**
 * 使用图片预览
 */
export function useFancybox() {
  const cssStr = `:root{--f-spinner-width: 36px;--f-spinner-height: 36px;--f-spinner-color-1: rgba(0, 0, 0, 0.1);--f-spinner-color-2: rgba(17, 24, 28, 0.8);--f-spinner-stroke: 2.75}.f-spinner{margin:auto;padding:0;width:var(--f-spinner-width);height:var(--f-spinner-height)}.f-spinner svg{width:100%;height:100%;vertical-align:top;animation:f-spinner-rotate 2s linear infinite}.f-spinner svg *{stroke-width:var(--f-spinner-stroke);fill:none}.f-spinner svg *:first-child{stroke:var(--f-spinner-color-1)}.f-spinner svg *:last-child{stroke:var(--f-spinner-color-2);animation:f-spinner-dash 2s ease-in-out infinite}@keyframes f-spinner-rotate{100%{transform:rotate(360deg)}}@keyframes f-spinner-dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}.f-throwOutUp{animation:var(--f-throw-out-duration, 0.175s) ease-out both f-throwOutUp}.f-throwOutDown{animation:var(--f-throw-out-duration, 0.175s) ease-out both f-throwOutDown}@keyframes f-throwOutUp{to{transform:translate3d(0, calc(var(--f-throw-out-distance, 150px) * -1), 0);opacity:0}}@keyframes f-throwOutDown{to{transform:translate3d(0, var(--f-throw-out-distance, 150px), 0);opacity:0}}.f-zoomInUp{animation:var(--f-transition-duration, 0.2s) ease .1s both f-zoomInUp}.f-zoomOutDown{animation:var(--f-transition-duration, 0.2s) ease both f-zoomOutDown}@keyframes f-zoomInUp{from{transform:scale(0.975) translate3d(0, 16px, 0);opacity:0}to{transform:scale(1) translate3d(0, 0, 0);opacity:1}}@keyframes f-zoomOutDown{to{transform:scale(0.975) translate3d(0, 16px, 0);opacity:0}}.f-fadeIn{animation:var(--f-transition-duration, 0.2s) var(--f-transition-easing, ease) var(--f-transition-delay, 0s) both f-fadeIn;z-index:2}.f-fadeOut{animation:var(--f-transition-duration, 0.2s) var(--f-transition-easing, ease) var(--f-transition-delay, 0s) both f-fadeOut;z-index:1}@keyframes f-fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes f-fadeOut{100%{opacity:0}}.f-fadeFastIn{animation:var(--f-transition-duration, 0.2s) ease-out both f-fadeFastIn;z-index:2}.f-fadeFastOut{animation:var(--f-transition-duration, 0.1s) ease-out both f-fadeFastOut;z-index:2}@keyframes f-fadeFastIn{0%{opacity:.75}100%{opacity:1}}@keyframes f-fadeFastOut{100%{opacity:0}}.f-fadeSlowIn{animation:var(--f-transition-duration, 0.5s) ease both f-fadeSlowIn;z-index:2}.f-fadeSlowOut{animation:var(--f-transition-duration, 0.5s) ease both f-fadeSlowOut;z-index:1}@keyframes f-fadeSlowIn{0%{opacity:0}100%{opacity:1}}@keyframes f-fadeSlowOut{100%{opacity:0}}.f-crossfadeIn{animation:var(--f-transition-duration, 0.2s) ease-out both f-crossfadeIn;z-index:2}.f-crossfadeOut{animation:calc(var(--f-transition-duration, 0.2s)*.5) linear .1s both f-crossfadeOut;z-index:1}@keyframes f-crossfadeIn{0%{opacity:0}100%{opacity:1}}@keyframes f-crossfadeOut{100%{opacity:0}}.f-slideIn.from-next{animation:var(--f-transition-duration, 0.85s) cubic-bezier(0.16, 1, 0.3, 1) f-slideInNext}.f-slideIn.from-prev{animation:var(--f-transition-duration, 0.85s) cubic-bezier(0.16, 1, 0.3, 1) f-slideInPrev}.f-slideOut.to-next{animation:var(--f-transition-duration, 0.85s) cubic-bezier(0.16, 1, 0.3, 1) f-slideOutNext}.f-slideOut.to-prev{animation:var(--f-transition-duration, 0.85s) cubic-bezier(0.16, 1, 0.3, 1) f-slideOutPrev}@keyframes f-slideInPrev{0%{transform:translateX(100%)}100%{transform:translate3d(0, 0, 0)}}@keyframes f-slideInNext{0%{transform:translateX(-100%)}100%{transform:translate3d(0, 0, 0)}}@keyframes f-slideOutNext{100%{transform:translateX(-100%)}}@keyframes f-slideOutPrev{100%{transform:translateX(100%)}}.f-classicIn.from-next{animation:var(--f-transition-duration, 0.85s) cubic-bezier(0.16, 1, 0.3, 1) f-classicInNext;z-index:2}.f-classicIn.from-prev{animation:var(--f-transition-duration, 0.85s) cubic-bezier(0.16, 1, 0.3, 1) f-classicInPrev;z-index:2}.f-classicOut.to-next{animation:var(--f-transition-duration, 0.85s) cubic-bezier(0.16, 1, 0.3, 1) f-classicOutNext;z-index:1}.f-classicOut.to-prev{animation:var(--f-transition-duration, 0.85s) cubic-bezier(0.16, 1, 0.3, 1) f-classicOutPrev;z-index:1}@keyframes f-classicInNext{0%{transform:translateX(-75px);opacity:0}100%{transform:translate3d(0, 0, 0);opacity:1}}@keyframes f-classicInPrev{0%{transform:translateX(75px);opacity:0}100%{transform:translate3d(0, 0, 0);opacity:1}}@keyframes f-classicOutNext{100%{transform:translateX(-75px);opacity:0}}@keyframes f-classicOutPrev{100%{transform:translateX(75px);opacity:0}}:root{--f-button-width: 40px;--f-button-height: 40px;--f-button-border: 0;--f-button-border-radius: 0;--f-button-color: #374151;--f-button-bg: #f8f8f8;--f-button-hover-bg: #e0e0e0;--f-button-active-bg: #d0d0d0;--f-button-shadow: none;--f-button-transition: all 0.15s ease;--f-button-transform: none;--f-button-svg-width: 20px;--f-button-svg-height: 20px;--f-button-svg-stroke-width: 1.5;--f-button-svg-fill: none;--f-button-svg-filter: none;--f-button-svg-disabled-opacity: 0.65}.f-button{display:flex;justify-content:center;align-items:center;box-sizing:content-box;position:relative;margin:0;padding:0;width:var(--f-button-width);height:var(--f-button-height);border:var(--f-button-border);border-radius:var(--f-button-border-radius);color:var(--f-button-color);background:var(--f-button-bg);box-shadow:var(--f-button-shadow);pointer-events:all;cursor:pointer;transition:var(--f-button-transition)}@media(hover: hover){.f-button:hover:not([disabled]){color:var(--f-button-hover-color);background-color:var(--f-button-hover-bg)}}.f-button:active:not([disabled]){background-color:var(--f-button-active-bg)}.f-button:focus:not(:focus-visible){outline:none}.f-button:focus-visible{outline:none;box-shadow:inset 0 0 0 var(--f-button-outline, 2px) var(--f-button-outline-color, var(--f-button-color))}.f-button svg{width:var(--f-button-svg-width);height:var(--f-button-svg-height);fill:var(--f-button-svg-fill);stroke:currentColor;stroke-width:var(--f-button-svg-stroke-width);stroke-linecap:round;stroke-linejoin:round;transition:opacity .15s ease;transform:var(--f-button-transform);filter:var(--f-button-svg-filter);pointer-events:none}.f-button[disabled]{cursor:default}.f-button[disabled] svg{opacity:var(--f-button-svg-disabled-opacity)}.f-carousel__nav .f-button.is-prev,.f-carousel__nav .f-button.is-next,.fancybox__nav .f-button.is-prev,.fancybox__nav .f-button.is-next{position:absolute;z-index:1}.is-horizontal .f-carousel__nav .f-button.is-prev,.is-horizontal .f-carousel__nav .f-button.is-next,.is-horizontal .fancybox__nav .f-button.is-prev,.is-horizontal .fancybox__nav .f-button.is-next{top:50%;transform:translateY(-50%)}.is-horizontal .f-carousel__nav .f-button.is-prev,.is-horizontal .fancybox__nav .f-button.is-prev{left:var(--f-button-prev-pos)}.is-horizontal .f-carousel__nav .f-button.is-next,.is-horizontal .fancybox__nav .f-button.is-next{right:var(--f-button-next-pos)}.is-horizontal.is-rtl .f-carousel__nav .f-button.is-prev,.is-horizontal.is-rtl .fancybox__nav .f-button.is-prev{left:auto;right:var(--f-button-next-pos)}.is-horizontal.is-rtl .f-carousel__nav .f-button.is-next,.is-horizontal.is-rtl .fancybox__nav .f-button.is-next{right:auto;left:var(--f-button-prev-pos)}.is-vertical .f-carousel__nav .f-button.is-prev,.is-vertical .f-carousel__nav .f-button.is-next,.is-vertical .fancybox__nav .f-button.is-prev,.is-vertical .fancybox__nav .f-button.is-next{top:auto;left:50%;transform:translateX(-50%)}.is-vertical .f-carousel__nav .f-button.is-prev,.is-vertical .fancybox__nav .f-button.is-prev{top:var(--f-button-next-pos)}.is-vertical .f-carousel__nav .f-button.is-next,.is-vertical .fancybox__nav .f-button.is-next{bottom:var(--f-button-next-pos)}.is-vertical .f-carousel__nav .f-button.is-prev svg,.is-vertical .f-carousel__nav .f-button.is-next svg,.is-vertical .fancybox__nav .f-button.is-prev svg,.is-vertical .fancybox__nav .f-button.is-next svg{transform:rotate(90deg)}.f-carousel__nav .f-button:disabled,.fancybox__nav .f-button:disabled{pointer-events:none}html.with-fancybox{width:auto;overflow:visible;scroll-behavior:auto}html.with-fancybox body{touch-action:none}html.with-fancybox body.hide-scrollbar{width:auto;margin-right:calc(var(--fancybox-body-margin, 0px) + var(--fancybox-scrollbar-compensate, 0px));overflow:hidden !important;overscroll-behavior-y:none}.fancybox__container{--fancybox-color: #dbdbdb;--fancybox-hover-color: #fff;--fancybox-bg: rgba(24, 24, 27, 0.98);--fancybox-slide-gap: 10px;--f-spinner-width: 50px;--f-spinner-height: 50px;--f-spinner-color-1: rgba(255, 255, 255, 0.1);--f-spinner-color-2: #bbb;--f-spinner-stroke: 3.65;position:fixed;top:0;left:0;bottom:0;right:0;direction:ltr;display:flex;flex-direction:column;box-sizing:border-box;margin:0;padding:0;color:#f8f8f8;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:visible;z-index:var(--fancybox-zIndex, 1050);outline:none;transform-origin:top left;-webkit-text-size-adjust:100%;-moz-text-size-adjust:none;-ms-text-size-adjust:100%;text-size-adjust:100%;overscroll-behavior-y:contain}.fancybox__container *,.fancybox__container *::before,.fancybox__container *::after{box-sizing:inherit}.fancybox__container::backdrop{background-color:rgba(0,0,0,0)}.fancybox__backdrop{position:fixed;top:0;left:0;bottom:0;right:0;z-index:-1;background:var(--fancybox-bg);opacity:var(--fancybox-opacity, 1);will-change:opacity}.fancybox__carousel{position:relative;box-sizing:border-box;flex:1;min-height:0;z-index:10;overflow-y:visible;overflow-x:clip}.fancybox__viewport{width:100%;height:100%}.fancybox__viewport.is-draggable{cursor:move;cursor:grab}.fancybox__viewport.is-dragging{cursor:move;cursor:grabbing}.fancybox__track{display:flex;margin:0 auto;height:100%}.fancybox__slide{flex:0 0 auto;position:relative;display:flex;flex-direction:column;align-items:center;width:100%;height:100%;margin:0 var(--fancybox-slide-gap) 0 0;padding:4px;overflow:auto;overscroll-behavior:contain;transform:translate3d(0, 0, 0);backface-visibility:hidden}.fancybox__container:not(.is-compact) .fancybox__slide.has-close-btn{padding-top:40px}.fancybox__slide.has-iframe,.fancybox__slide.has-video,.fancybox__slide.has-html5video{overflow:hidden}.fancybox__slide.has-image{overflow:hidden}.fancybox__slide.has-image.is-animating,.fancybox__slide.has-image.is-selected{overflow:visible}.fancybox__slide::before,.fancybox__slide::after{content:"";flex:0 0 0;margin:auto}.fancybox__backdrop:empty,.fancybox__viewport:empty,.fancybox__track:empty,.fancybox__slide:empty{display:block}.fancybox__content{align-self:center;display:flex;flex-direction:column;position:relative;margin:0;padding:2rem;max-width:100%;color:var(--fancybox-content-color, #374151);background:var(--fancybox-content-bg, #fff);cursor:default;border-radius:0;z-index:20}.is-loading .fancybox__content{opacity:0}.is-draggable .fancybox__content{cursor:move;cursor:grab}.can-zoom_in .fancybox__content{cursor:zoom-in}.can-zoom_out .fancybox__content{cursor:zoom-out}.is-dragging .fancybox__content{cursor:move;cursor:grabbing}.fancybox__content [data-selectable],.fancybox__content [contenteditable]{cursor:auto}.fancybox__slide.has-image>.fancybox__content{padding:0;background:rgba(0,0,0,0);min-height:1px;background-repeat:no-repeat;background-size:contain;background-position:center center;transition:none;transform:translate3d(0, 0, 0);backface-visibility:hidden}.fancybox__slide.has-image>.fancybox__content>picture>img{width:100%;height:auto;max-height:100%}.is-animating .fancybox__content,.is-dragging .fancybox__content{will-change:transform,width,height}.fancybox-image{margin:auto;display:block;width:100%;height:100%;min-height:0;object-fit:contain;user-select:none;filter:blur(0px)}.fancybox__caption{align-self:center;max-width:100%;flex-shrink:0;margin:0;padding:14px 0 4px 0;overflow-wrap:anywhere;line-height:1.375;color:var(--fancybox-color, currentColor);opacity:var(--fancybox-opacity, 1);cursor:auto;visibility:visible}.is-loading .fancybox__caption,.is-closing .fancybox__caption{opacity:0;visibility:hidden}.is-compact .fancybox__caption{padding-bottom:0}.f-button.is-close-btn{--f-button-svg-stroke-width: 2;position:absolute;top:0;right:8px;z-index:40}.fancybox__content>.f-button.is-close-btn{--f-button-width: 34px;--f-button-height: 34px;--f-button-border-radius: 4px;--f-button-color: var(--fancybox-color, #fff);--f-button-hover-color: var(--fancybox-color, #fff);--f-button-bg: transparent;--f-button-hover-bg: transparent;--f-button-active-bg: transparent;--f-button-svg-width: 22px;--f-button-svg-height: 22px;position:absolute;top:-38px;right:0;opacity:.75}.is-loading .fancybox__content>.f-button.is-close-btn{visibility:hidden}.is-zooming-out .fancybox__content>.f-button.is-close-btn{visibility:hidden}.fancybox__content>.f-button.is-close-btn:hover{opacity:1}.fancybox__footer{padding:0;margin:0;position:relative}.fancybox__footer .fancybox__caption{width:100%;padding:24px;opacity:var(--fancybox-opacity, 1);transition:all .25s ease}.is-compact .fancybox__footer{position:absolute;bottom:0;left:0;right:0;z-index:20;background:rgba(24,24,27,.5)}.is-compact .fancybox__footer .fancybox__caption{padding:12px}.is-compact .fancybox__content>.f-button.is-close-btn{--f-button-border-radius: 50%;--f-button-color: #fff;--f-button-hover-color: #fff;--f-button-outline-color: #000;--f-button-bg: rgba(0, 0, 0, 0.6);--f-button-active-bg: rgba(0, 0, 0, 0.6);--f-button-hover-bg: rgba(0, 0, 0, 0.6);--f-button-svg-width: 18px;--f-button-svg-height: 18px;--f-button-svg-filter: none;top:5px;right:5px}.fancybox__nav{--f-button-width: 50px;--f-button-height: 50px;--f-button-border: 0;--f-button-border-radius: 50%;--f-button-color: var(--fancybox-color);--f-button-hover-color: var(--fancybox-hover-color);--f-button-bg: transparent;--f-button-hover-bg: rgba(24, 24, 27, 0.3);--f-button-active-bg: rgba(24, 24, 27, 0.5);--f-button-shadow: none;--f-button-transition: all 0.15s ease;--f-button-transform: none;--f-button-svg-width: 26px;--f-button-svg-height: 26px;--f-button-svg-stroke-width: 2.5;--f-button-svg-fill: none;--f-button-svg-filter: drop-shadow(1px 1px 1px rgba(24, 24, 27, 0.5));--f-button-svg-disabled-opacity: 0.65;--f-button-next-pos: 1rem;--f-button-prev-pos: 1rem;opacity:var(--fancybox-opacity, 1)}.fancybox__nav .f-button:before{position:absolute;content:"";top:-30px;right:-20px;left:-20px;bottom:-30px;z-index:1}.is-idle .fancybox__nav{animation:.15s ease-out both f-fadeOut}.is-idle.is-compact .fancybox__footer{pointer-events:none;animation:.15s ease-out both f-fadeOut}.fancybox__slide>.f-spinner{position:absolute;top:50%;left:50%;margin:var(--f-spinner-top, calc(var(--f-spinner-width) * -0.5)) 0 0 var(--f-spinner-left, calc(var(--f-spinner-height) * -0.5));z-index:30;cursor:pointer}.fancybox-protected{position:absolute;top:0;left:0;right:0;bottom:0;z-index:40;user-select:none}.fancybox-ghost{position:absolute;top:0;left:0;width:100%;height:100%;min-height:0;object-fit:contain;z-index:40;user-select:none;pointer-events:none}.fancybox-focus-guard{outline:none;opacity:0;position:fixed;pointer-events:none}.fancybox__container:not([aria-hidden]){opacity:0}.fancybox__container.is-animated[aria-hidden=false]>*:not(.fancybox__backdrop,.fancybox__carousel),.fancybox__container.is-animated[aria-hidden=false] .fancybox__carousel>*:not(.fancybox__viewport),.fancybox__container.is-animated[aria-hidden=false] .fancybox__slide>*:not(.fancybox__content){animation:var(--f-interface-enter-duration, 0.25s) ease .1s backwards f-fadeIn}.fancybox__container.is-animated[aria-hidden=false] .fancybox__backdrop{animation:var(--f-backdrop-enter-duration, 0.35s) ease backwards f-fadeIn}.fancybox__container.is-animated[aria-hidden=true]>*:not(.fancybox__backdrop,.fancybox__carousel),.fancybox__container.is-animated[aria-hidden=true] .fancybox__carousel>*:not(.fancybox__viewport),.fancybox__container.is-animated[aria-hidden=true] .fancybox__slide>*:not(.fancybox__content){animation:var(--f-interface-exit-duration, 0.15s) ease forwards f-fadeOut}.fancybox__container.is-animated[aria-hidden=true] .fancybox__backdrop{animation:var(--f-backdrop-exit-duration, 0.35s) ease forwards f-fadeOut}.has-iframe .fancybox__content,.has-map .fancybox__content,.has-pdf .fancybox__content,.has-youtube .fancybox__content,.has-vimeo .fancybox__content,.has-html5video .fancybox__content{max-width:100%;flex-shrink:1;min-height:1px;overflow:visible}.has-iframe .fancybox__content,.has-map .fancybox__content,.has-pdf .fancybox__content{width:calc(100% - 120px);height:90%}.fancybox__container.is-compact .has-iframe .fancybox__content,.fancybox__container.is-compact .has-map .fancybox__content,.fancybox__container.is-compact .has-pdf .fancybox__content{width:100%;height:100%}.has-youtube .fancybox__content,.has-vimeo .fancybox__content,.has-html5video .fancybox__content{width:960px;height:540px;max-width:100%;max-height:100%}.has-map .fancybox__content,.has-pdf .fancybox__content,.has-youtube .fancybox__content,.has-vimeo .fancybox__content,.has-html5video .fancybox__content{padding:0;background:rgba(24,24,27,.9);color:#fff}.has-map .fancybox__content{background:#e5e3df}.fancybox__html5video,.fancybox__iframe{border:0;display:block;height:100%;width:100%;background:rgba(0,0,0,0)}.fancybox-placeholder{border:0 !important;clip:rect(1px, 1px, 1px, 1px) !important;-webkit-clip-path:inset(50%) !important;clip-path:inset(50%) !important;height:1px !important;margin:-1px !important;overflow:hidden !important;padding:0 !important;position:absolute !important;width:1px !important;white-space:nowrap !important}.f-carousel__thumbs{--f-thumb-width: 96px;--f-thumb-height: 72px;--f-thumb-outline: 0;--f-thumb-outline-color: #5eb0ef;--f-thumb-opacity: 1;--f-thumb-hover-opacity: 1;--f-thumb-selected-opacity: 1;--f-thumb-border-radius: 2px;--f-thumb-offset: 0px;--f-button-next-pos: 0;--f-button-prev-pos: 0}.f-carousel__thumbs.is-classic{--f-thumb-gap: 8px;--f-thumb-opacity: 0.5;--f-thumb-hover-opacity: 1;--f-thumb-selected-opacity: 1}.f-carousel__thumbs.is-modern{--f-thumb-gap: 4px;--f-thumb-extra-gap: 16px;--f-thumb-clip-width: 46px}.f-thumbs{position:relative;flex:0 0 auto;margin:0;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none;perspective:1000px;transform:translateZ(0)}.f-thumbs .f-spinner{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:2px;background-image:linear-gradient(#ebeff2, #e2e8f0);z-index:-1}.f-thumbs .f-spinner svg{display:none}.f-thumbs.is-vertical{height:100%}.f-thumbs__viewport{width:100%;height:auto;overflow:hidden;transform:translate3d(0, 0, 0)}.f-thumbs__track{display:flex}.f-thumbs__slide{position:relative;flex:0 0 auto;box-sizing:content-box;display:flex;align-items:center;justify-content:center;padding:0;margin:0;width:var(--f-thumb-width);height:var(--f-thumb-height);overflow:visible;cursor:pointer}.f-thumbs__slide.is-loading img{opacity:0}.is-classic .f-thumbs__viewport{height:100%}.is-modern .f-thumbs__track{width:max-content}.is-modern .f-thumbs__track::before{content:"";position:absolute;top:0;bottom:0;left:calc((var(--f-thumb-clip-width, 0))*-0.5);width:calc(var(--width, 0)*1px + var(--f-thumb-clip-width, 0));cursor:pointer}.is-modern .f-thumbs__slide{width:var(--f-thumb-clip-width);transform:translate3d(calc(var(--shift, 0) * -1px), 0, 0);transition:none;pointer-events:none}.is-modern.is-resting .f-thumbs__slide{transition:transform .33s ease}.is-modern.is-resting .f-thumbs__slide__button{transition:clip-path .33s ease}.is-using-tab .is-modern .f-thumbs__slide:focus-within{filter:drop-shadow(-1px 0px 0px var(--f-thumb-outline-color)) drop-shadow(2px 0px 0px var(--f-thumb-outline-color)) drop-shadow(0px -1px 0px var(--f-thumb-outline-color)) drop-shadow(0px 2px 0px var(--f-thumb-outline-color))}.f-thumbs__slide__button{appearance:none;width:var(--f-thumb-width);height:100%;margin:0 -100% 0 -100%;padding:0;border:0;position:relative;border-radius:var(--f-thumb-border-radius);overflow:hidden;background:rgba(0,0,0,0);outline:none;cursor:pointer;pointer-events:auto;touch-action:manipulation;opacity:var(--f-thumb-opacity);transition:opacity .2s ease}.f-thumbs__slide__button:hover{opacity:var(--f-thumb-hover-opacity)}.f-thumbs__slide__button:focus:not(:focus-visible){outline:none}.f-thumbs__slide__button:focus-visible{outline:none;opacity:var(--f-thumb-selected-opacity)}.is-modern .f-thumbs__slide__button{--clip-path: inset( 0 calc( ((var(--f-thumb-width, 0) - var(--f-thumb-clip-width, 0))) * (1 - var(--progress, 0)) * 0.5 ) round var(--f-thumb-border-radius, 0) );clip-path:var(--clip-path)}.is-classic .is-nav-selected .f-thumbs__slide__button{opacity:var(--f-thumb-selected-opacity)}.is-classic .is-nav-selected .f-thumbs__slide__button::after{content:"";position:absolute;top:0;left:0;right:0;height:auto;bottom:0;border:var(--f-thumb-outline, 0) solid var(--f-thumb-outline-color, transparent);border-radius:var(--f-thumb-border-radius);animation:f-fadeIn .2s ease-out;z-index:10}.f-thumbs__slide__img{overflow:hidden;position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;margin:0;padding:var(--f-thumb-offset);box-sizing:border-box;pointer-events:none;object-fit:cover;border-radius:var(--f-thumb-border-radius)}.f-thumbs.is-horizontal .f-thumbs__track{padding:8px 0 12px 0}.f-thumbs.is-horizontal .f-thumbs__slide{margin:0 var(--f-thumb-gap) 0 0}.f-thumbs.is-vertical .f-thumbs__track{flex-wrap:wrap;padding:0 8px}.f-thumbs.is-vertical .f-thumbs__slide{margin:0 0 var(--f-thumb-gap) 0}.fancybox__thumbs{--f-thumb-width: 96px;--f-thumb-height: 72px;--f-thumb-border-radius: 2px;--f-thumb-outline: 2px;--f-thumb-outline-color: #ededed;position:relative;opacity:var(--fancybox-opacity, 1);transition:max-height .35s cubic-bezier(0.23, 1, 0.32, 1)}.fancybox__thumbs.is-classic{--f-thumb-gap: 8px;--f-thumb-opacity: 0.5;--f-thumb-hover-opacity: 1}.fancybox__thumbs.is-classic .f-spinner{background-image:linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))}.fancybox__thumbs.is-modern{--f-thumb-gap: 4px;--f-thumb-extra-gap: 16px;--f-thumb-clip-width: 46px;--f-thumb-opacity: 1;--f-thumb-hover-opacity: 1}.fancybox__thumbs.is-modern .f-spinner{background-image:linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))}.fancybox__thumbs.is-horizontal{padding:0 var(--f-thumb-gap)}.fancybox__thumbs.is-vertical{padding:var(--f-thumb-gap) 0}.is-compact .fancybox__thumbs{--f-thumb-width: 64px;--f-thumb-clip-width: 32px;--f-thumb-height: 48px;--f-thumb-extra-gap: 10px}.fancybox__thumbs.is-masked{max-height:0px !important}.is-closing .fancybox__thumbs{transition:none !important}.fancybox__toolbar{--f-progress-color: var(--fancybox-color, rgba(255, 255, 255, 0.94));--f-button-width: 46px;--f-button-height: 46px;--f-button-color: var(--fancybox-color);--f-button-hover-color: var(--fancybox-hover-color);--f-button-bg: rgba(24, 24, 27, 0.65);--f-button-hover-bg: rgba(70, 70, 73, 0.65);--f-button-active-bg: rgba(90, 90, 93, 0.65);--f-button-border-radius: 0;--f-button-svg-width: 24px;--f-button-svg-height: 24px;--f-button-svg-stroke-width: 1.5;--f-button-svg-filter: drop-shadow(1px 1px 1px rgba(24, 24, 27, 0.15));--f-button-svg-fill: none;--f-button-svg-disabled-opacity: 0.65;display:flex;flex-direction:row;justify-content:space-between;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif;color:var(--fancybox-color, currentColor);opacity:var(--fancybox-opacity, 1);text-shadow:var(--fancybox-toolbar-text-shadow, 1px 1px 1px rgba(0, 0, 0, 0.5));pointer-events:none;z-index:20}.fancybox__toolbar :focus-visible{z-index:1}.fancybox__toolbar.is-absolute,.is-compact .fancybox__toolbar{position:absolute;top:0;left:0;right:0}.is-idle .fancybox__toolbar{pointer-events:none;animation:.15s ease-out both f-fadeOut}.fancybox__toolbar__column{display:flex;flex-direction:row;flex-wrap:wrap;align-content:flex-start}.fancybox__toolbar__column.is-left,.fancybox__toolbar__column.is-right{flex-grow:1;flex-basis:0}.fancybox__toolbar__column.is-right{display:flex;justify-content:flex-end;flex-wrap:nowrap}.fancybox__infobar{padding:0 5px;line-height:var(--f-button-height);text-align:center;font-size:17px;font-variant-numeric:tabular-nums;-webkit-font-smoothing:subpixel-antialiased;cursor:default;user-select:none}.fancybox__infobar span{padding:0 5px}.fancybox__infobar:not(:first-child):not(:last-child){background:var(--f-button-bg)}[data-fancybox-toggle-slideshow]{position:relative}[data-fancybox-toggle-slideshow] .f-progress{height:100%;opacity:.3}[data-fancybox-toggle-slideshow] svg g:first-child{display:flex}[data-fancybox-toggle-slideshow] svg g:last-child{display:none}.has-slideshow [data-fancybox-toggle-slideshow] svg g:first-child{display:none}.has-slideshow [data-fancybox-toggle-slideshow] svg g:last-child{display:flex}[data-fancybox-toggle-fullscreen] svg g:first-child{display:flex}[data-fancybox-toggle-fullscreen] svg g:last-child{display:none}:fullscreen [data-fancybox-toggle-fullscreen] svg g:first-child{display:none}:fullscreen [data-fancybox-toggle-fullscreen] svg g:last-child{display:flex}.f-progress{position:absolute;top:0;left:0;right:0;height:3px;transform:scaleX(0);transform-origin:0;transition-property:transform;transition-timing-function:linear;background:var(--f-progress-color, var(--f-carousel-theme-color, #0091ff));z-index:30;user-select:none;pointer-events:none}`;

  pageStyle.innerHTML += cssStr;

  const imgs = $('.main >.content img');

  console.log(imgs);

  imgs.each(function() {
    const $this = $(this);
    $this.wrap($(`<span data-fancybox="fancyBoxImg" href="${$this.attr('src')}"></span>`));
  });

  Fancybox.bind(
    '[data-fancybox="fancyBoxImg"]',
    {
      Toolbar: {
        display: {
          left: ['infobar'],
          middle: [
            'zoomIn',
            'zoomOut',
            'toggle1to1',
            'rotateCCW',
            'rotateCW',
            'flipX',
            'flipY',
          ],
          right: ['slideshow', 'thumbs', 'close'],
        },
      },
    });
}