function getFlagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "🏳️";
  return countryCode
    .toUpperCase()
    .split("")
    .map(c => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
}

let data = {};

try {
  data = JSON.parse($response.body || "{}");
} catch (e) {
  $done({
    title: "🏳️ 解析失败",
    subtitle: "返回内容不是有效 JSON"
  });
  return;
}

if (!data.success) {
  $done({
    title: "🏳️ 查询失败",
    subtitle: data.message || "ipwho.is 返回失败"
  });
  return;
}

const country = data.country || "未知";
const city = data.city || "";
const region = data.region || "";
const org = (data.connection && data.connection.org) ? data.connection.org : "";

const flag = getFlagEmoji(data.country_code);

$done({
  title: `${flag} ${country}${city ? " · " + city : ""}`,
  subtitle: `${region || "未知区域"} · ${org || "未知运营商"}`
});
