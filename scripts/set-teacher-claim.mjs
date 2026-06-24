/**
 * Asigna el custom claim `role: "teacher"` a un usuario de Firebase Auth.
 *
 * Uso:
 *   1. Firebase Console > Project Settings > Service Accounts > Generate new private key
 *   2. Guarda el JSON como serviceAccountKey.json en este directorio
 *   3. node scripts/set-teacher-claim.mjs <email-del-docente>
 *
 * Ejemplo:
 *   node scripts/set-teacher-claim.mjs rolando@escuela.edu
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
  readFileSync(new URL('./serviceAccountKey.json', import.meta.url), 'utf-8')
);

initializeApp({ credential: cert(serviceAccount) });

const email = process.argv[2];
if (!email) {
  console.error('Uso: node scripts/set-teacher-claim.mjs <email>');
  process.exit(1);
}

try {
  const user = await getAuth().getUserByEmail(email);
  await getAuth().setCustomUserClaims(user.uid, { role: 'teacher' });
  console.log(`✅ Custom claim "role: teacher" asignado a ${email} (uid: ${user.uid})`);
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
