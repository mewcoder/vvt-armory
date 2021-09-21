import langZHCN from "./lang/zh-CN";
import langEN from "./lang/en";

const flat = (data, keys = []) => {
  let obj = {};
  if (typeof data == "object" && data !== null) {
    for (let k in data) {
      if (typeof data[k] === "string") {
        obj[[...keys, k].join(".")] = data[k];
      } else {
        obj = { ...obj, ...flat(data[k], [...keys, k]) };
      }
    }
  }
  return obj;
};

const langs = {
  "zh-cn": flat(langZHCN),
  en: flat(langEN),
};

const local =
  (lang = "zh-cn") =>
  (message) =>
    langs[lang.toLowerCase()][message];

export default local;
