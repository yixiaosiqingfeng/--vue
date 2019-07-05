// 去除字符串2端空格方法
export function strTrim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
