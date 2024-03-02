/**
 * @date: 2023/10/9
 * @author: 小红
 * @fileName: Index
 * @Description:核心
 */

import $ from "jquery";
import Message from "./_message";
import Theme from './_theme';
import Scroll from "./_scroll";
import Common from "./_common";


export default class App {
  useTheme = new Theme(); //主题
  useMessage = new Message(); //消息
  #useCommon = new Common(); // 普通逻辑
  #useScroll = new Scroll(); //滚动导航侧边

  //返回顶部
  backTop() {
    $('html,body').animate({scrollTop: 0}, 300);
  }
}