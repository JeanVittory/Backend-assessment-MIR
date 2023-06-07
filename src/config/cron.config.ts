import cron from 'node-cron';
import prisma from '../api/database/client';

export default function scheduleRestart() {
  return cron.schedule(
    '0 0 * * *',
    async () => {
      const limitDate = new Date();
      limitDate.setDate(limitDate.getDate() - 7);
      await prisma.user.deleteMany({
        where: {
          createdAt: { lte: limitDate },
        },
      });
    },
    { scheduled: false, timezone: 'America/Sao_Paulo' },
  );
}
