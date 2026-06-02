(() => {
  const getFlagEmoji = (code) => {
    if (!code || code.length !== 2) return "🏳️";
    return code
      .toUpperCase()
      .split("")
      .map(c => String.fromCodePoint(127397 + c.charCodeAt(0)))
      .join("");
  };

  try {
    if (!$response || Number($response.statusCode) !== 200) {
      $done(null);
      return;
    }

    const data = JSON.parse($response.body || "{}");
    const flag = getFlagEmoji(data.countryCode || "");
    const country = data.country || "未知国家";
    const city = data.city || "";
    const region = data.regionName || "未知区域";
    const org = data.isp || data.org || "未知运营商";
    const ip = data.query || "";

    $done({
      title: `${flag} ${country}${city && city !== country ? " · " + city : ""}`,
      subtitle: `${region} · ${org}`,
      ip: ip,
      description: `${region}\n${org}`
    });
  } catch (e) {
    $done({
      title: "🏳️ 解析失败",
      subtitle: String(e)
    });
  }
})();
