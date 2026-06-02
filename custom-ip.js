// ==================== ip.sb Geo Location Checker ====================
if ($response.statusCode !== 200) {
    $done(null);
}

let obj = JSON.parse($response.body);

const emoji = getFlagEmoji(obj.country_code);
let country = obj.country || "未知国家";
let city = obj.city || "未知城市";
let region = obj.region || "";
const isp = obj.organization || "未知运营商";
const ip = obj.ip || "未知IP";

// ==================== 地名简体修正映射 ====================
const nameMap = {
    "沙加緬度": "萨克拉门托",
    "加沙缅度": "萨克拉门托",
    "舊金山": "旧金山",
    "三藩市": "旧金山",
    "洛杉磯": "洛杉矶",
    "紐約": "纽约",
    "西雅圖": "西雅图",
    "華盛頓": "华盛顿",
    "倫敦": "伦敦",
    "巴黎": "巴黎",
    "東京": "东京",
    "新加坡": "新加坡",
    "墨爾本": "墨尔本",
    "悉尼": "悉尼",
    "溫哥華": "温哥华",
    "多倫多": "多伦多"
};

city = nameMap[city] || city;
region = nameMap[region] || region;
country = nameMap[country] || country;

function getFlagEmoji(countryCode) {
    if (!countryCode) return "🌐";
    const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

// 输出格式
const title = `${emoji} ${country} ${city}`;

const subtitle = `${region ? region + " · " : ""}${isp}`;

const description = `IP地址：${ip}\n` +
                   `国家/地区：${country}\n` +
                   `城市：${city}\n` +
                   `省份/州：${region}\n` +
                   `运营商：${isp}\n` +
                   `数据源：ip.sb`;

$done({
    title: title,
    subtitle: subtitle,
    ip: ip,
    description: description
});
