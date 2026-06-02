// ==================== 自定义 Geo Location Checker ====================

if ($response.statusCode !== 200) {
    $done(null);
}

const body = $response.body;
const obj = JSON.parse(body);

const emoji = getFlagEmoji(obj.countryCode || obj.country);
const country = obj.country || "未知国家";
const city = obj.city || "未知城市";
const region = obj.regionName || "";
const isp = obj.isp || obj.org || "未知运营商";
const ip = obj.query || "未知IP";

function getFlagEmoji(countryCode) {
    if (!countryCode) return "🌐";
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

// 主标题（节点页面显示）
const title = `${emoji} ${country} ${city}`;

// 副标题
const subtitle = `${region ? region + " · " : ""}${isp}`;

// 完整信息（点击后显示）
const description = `IP地址：${ip}\n` +
                   `国家/地区：${country}\n` +
                   `城市：${city}\n` +
                   `省份：${region}\n` +
                   `运营商：${isp}\n` +
                   `数据源：ip-api.com`;

$done({
    title: title,
    subtitle: subtitle,
    ip: ip,
    description: description
});
