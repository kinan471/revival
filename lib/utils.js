// دوال مساعدة تعمل بالمتصفح والسيرفر (بدون fs)

export const score100 = (p) => {
  const v = Object.values(p.score || {});
  if (!v.length) return null;
  return Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10);
};

export const daysAgo = (d) => Math.floor((Date.now() - new Date(d).getTime()) / 86400000);