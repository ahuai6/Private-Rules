if ($response.statusCode != 200) { $done(null); }

function a(r) {
  const s = r.toUpperCase().split('').map(t => 0x1f1a5 + t.charCodeAt());
  return String.fromCodePoint(...s);
}

function e(r) {
  if (r == '中华民国' || r == '中華民國') return '台湾';
  if (r == '中国') return '';
  return r;
}

function j(r) {
  if (!r) return '';
  return r.length > 10 ? r.slice(0, 10) : r;
}

var m = JSON.parse($response.body || '{}');

var country = e(m.country || '未知国家');
var city = m.city || '';
var region = m.regionName || '未知区域';
var isp = m.isp || m.org || '未知运营商';
var ip = m.query || '';
var flag = a(m.countryCode || 'UN');

var title = flag + ' ' + country + (city && city != country ? ' · ' + city : '');
var subtitle = region + ' · ' + isp;

$done({
  title: title,
  subtitle: subtitle,
  ip: ip,
  description: region + '\n' + isp
});
