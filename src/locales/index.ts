import { createI18n } from "vue-i18n";
import enUS from './languages/enUS'
import zhCN from "./languages/zhCN";

const i18n = createI18n({
  locale:localStorage.getItem('language') || 'zhCN',
  globalInjection:true,
  legacy:false,
  messages:{enUS, zhCN}
})

export default i18n
