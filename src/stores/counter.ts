import { ref } from "vue";
import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const useLanguageStore = defineStore("language", () => {
  const { locale } = useI18n();
  const language = ref("语言");
    const languages = ref([
        {
            lable: "中文",
            value: "zh",
            disabled: false
        },
        {
            lable: "English",
            value: "en",
            disabled: false
        }
    ]);

    function changeLanguage(paylod: string) {
        locale.value = paylod;
        language.value = paylod;
    }

    return { language, languages, changeLanguage };
});
