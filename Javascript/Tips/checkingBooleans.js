// Assumming the following code:

import db from './db';
import admin from 'firebase-admin';
import { getUserClaimsFromCookie } from './claims';

const { arrayUnion, arrayRemove } = admin.firestore.FieldValue;

export default async function updateLessonComplete(req, res) {
  try {
    const { lessonId, completed } = req.body;

    if (!lessonId) {
      throw new Error('lessonId is a required parameter');
    }

    if (!completed) {
      throw new Error('completed is a required parameter');
    }

    const claims = await getUserClaimsFromCookie(req, res);

    if (!claims) {
      throw new Error('user must be logged in');
    }

    await db
      .collection('lessons')
      .doc(lessonId)
      .update({
        completed: completed === true ? arrayUnion(claims.uid) : arrayRemove(claims.uid),
      });

    res.send({ status: 'success' });
  } catch (e) {
    res.status(400);
    res.send({ error: { message: e.message } });
  }
}

/*
There is a bug happens with our if (!completed) check. completed is a boolean,
meaning when completed is false (making it falsy), our code will throw an error. 
Instead, we can check if completed is of type boolean, not if it’s falsy.
*/

if (typeof completed !== 'boolean') {
  throw new Error('completed is a required parameter');
}

// Note: TypeScript prevents this.
