(() => {
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

  const flag = getFlagEmoji(data.country_code);
  const country = data.country || "未知国家";
  const city = data.city || "未知城市";
  const region = data.region || "未知区域";
  const org = (data.connection && (data.connection.org || data.connection.isp)) || "未知运营商";

  $done({
    title: `${flag} ${country} · ${city}`,
    subtitle: `${region} · ${org}`
  });
})();
