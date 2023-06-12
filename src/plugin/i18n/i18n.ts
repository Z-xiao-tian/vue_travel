/**
 * @author Z-xiao-tian
 * i18n国际化
 */
import { createI18n } from "vue-i18n";
import en from "@/plugin/i18n/languages/en.json";
import zh from "@/plugin/i18n/languages/zh.json";

export default createI18n({
    locale: "zh",
    allowComposition: true,
    messages: {
        en: en,
        zh: zh
    }
});
