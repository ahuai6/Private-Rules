(() => {
  function getFlagEmoji(code) {
    if (!code || code.length !== 2) return "🏳️";
    return code
      .toUpperCase()
      .split("")
      .map(c => String.fromCodePoint(127397 + c.charCodeAt(0)))
      .join("");
  }

  const fail = (title, subtitle) => {
    $done({
      title,
      subtitle,
      description: subtitle
    });
  };

  try {
    const data = JSON.parse($response.body || "{}");

    if (!data.success) {
      fail("🏳️ 查询失败", data.message || "ipwho.is 返回失败");
      return;
    }

    const flag = getFlagEmoji(data.country_code);
    const country = data.country || "未知国家";
    const city = data.city || "未知城市";
    const region = data.region || "未知区域";
    const org = (data.connection && (data.connection.org || data.connection.isp)) || "未知运营商";

    $done({
      title: `${flag} ${country} ${city}`,
      subtitle: `${region} · ${org}`,
      ip: data.ip || "",
      description: `${region}\n${org}`
    });
  } catch (e) {
    fail("🏳️ 解析失败", String(e));
  }
})();
