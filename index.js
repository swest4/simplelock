import { exec } from 'child_process';
import dotenv from 'dotenv';
import Seam from 'seamapi';

dotenv.config({ path: '.env' });

const seam = new Seam();
const lockId = process.env.LOCK;
console.log(lockId);

const unlock = async () => {
  const attempt = await seam.locks.unlockDoor(lockId);
  console.log(attempt);
  if (attempt.actionAttempt.status === 'success') {
    exec('termux-toast "Door unlocked"');
  }
  process.exit();
};

const lock = async () => {
  const attempt = await seam.locks.lockDoor(lockId);
  console.log(attempt);
  if (attempt.actionAttempt.status === 'success') {
    exec('termux-toast "Door locked"');
  }
  process.exit();
};

if (process.argv[2] === 'unlock') {
  unlock();
} else {
  lock();
}


