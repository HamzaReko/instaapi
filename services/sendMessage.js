module.exports = async function sendMessage(username, message) {
  console.log(`🟨 إرسال إلى ${username}: ${message}`);

const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
const ig = new IgApiClient();
require("dotenv").config({ path: "../.env" });

const usernameinsta = process.env.USERNAMEINSTA
const password = process.env.INSTAPASSWORD
const SESSION_PATH = './ig-session.json';

(async () => {
  ig.state.generateDevice(usernameinsta);

  if (fs.existsSync(SESSION_PATH)) {
    // تحميل الجلسة من الملف
    const savedSession = JSON.parse(fs.readFileSync(SESSION_PATH, 'utf8'));
    await ig.state.deserialize(savedSession);
    console.log('✅ تم استخدام used seeison المحفوظة');
  } else {
    // أول مرة - تسجيل دخول وحفظ الجلسة
    await ig.account.login(usernameinsta, password);
    const serialized = await ig.state.serialize();
    delete serialized.constants; // لازم تتشال
    fs.writeFileSync(SESSION_PATH, JSON.stringify(serialized));
    console.log('✅ تم تسجيل الدخول لأول مرة وحفظ seissonn');
  }

  // إرسال رسالة
  const user = await ig.user.searchExact(username);
  await ig.entity.directThread([user.pk.toString()]).broadcastText(`السلام عليكم هذه صفحة القرآن اذهب علي لينك موقعنا لتقرأها ${message}`);

  console.log('✅ تم send messege comp الرسالة');
})();


};
