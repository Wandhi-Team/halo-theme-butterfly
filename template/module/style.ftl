<style type="text/css">
    @font-face {
        font-family: "By Font";
        font-weight: 400;
        font-style: normal;
        font-display: swap;
        src: url(${BASE_RES_URL!}/source/font/${settings.web_font!}) format("woff2");
    }

    html {
        --theme: ${settings.theme_color_light!};
        font-family: "By Font", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, "sans-serif";
        <#----base-url: ${BASE_RES_URL!};-->
        --cursor-default: url(${BASE_RES_URL!}/source/cursor/simple_cursor/default.cur), auto;
        --cursor-link: url(${BASE_RES_URL!}/source/cursor/simple_cursor/link.cur), auto;
    }

    <#--html[data-mode='dark'] {-->
    <#--    --theme: ${settings.theme_color_dark!};-->
    <#--}-->
    html[data-mode='light'] body::after {
    <#if settings.body_background?contains("http")> background: url(${settings.body_background!}) no-repeat fixed center / cover;
    <#else> background: ${settings.body_background!} </#if>
    }
</style>

