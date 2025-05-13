module.exports = async function sender() {
  const cron = require("node-cron");
  const User = require("../models/User");
  const sendMessage = require("./sendMessage"); // افترض موجود
  const crypto = require('crypto');

  // 🕐 جدولة الإرسال
  cron.schedule("0 * * * *", async () => {
    const now = new Date();
    const currentHour = now.getUTCHours();

    try {
      const users = await User.find({ hourGMT: currentHour });
      console.log(
        `📦 لقيت ${users.length} مستخدمين عندهم الساعة ${currentHour} GMT`
      );
      for (let user of users) {
        const shouldSend =
          user.schedule === "daily" ||
          (user.schedule === "every2days" && now.getDate() % 2 === 0);

        if (shouldSend) {
          const page = user.currentPage;
          const link = `https://bayann.net/quran/page/${page}`;

          await sendMessage(user.username, link);

          user.currentPage = page + 1;
          await user.save();
        }
      }

      console.log(`✔️ تم فحص المستخدمين وإرسال الرسائل`);
    } catch (err) {
      console.error("❌ خطأ في سكريبت الإرسال:", err);
    }
  });
};
