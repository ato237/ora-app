const functions = require("firebase-functions");
const StreamChat = require("stream-chat").StreamChat;
const admin = require("firebase-admin");

admin.initializeApp();
const serverClient = StreamChat.getInstance(
  functions.config().stream.key,
  functions.config().stream.secret
);

// When a user is deleted from Firebase their associated Stream account is also deleted.
exports.deleteStreamUser = functions.auth.user().onDelete((user, context) => {
  return serverClient.deleteUser(user.uid);
});

// Create a Stream user and return auth token.
exports.createStreamUserAndGetToken = functions.https.onCall(
  async (data, context) => {
    // Checking that the user is authenticated.
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      try {
        // Create user using the serverClient.
        await serverClient.upsertUser({
          id: context.auth.uid,
          name: context.auth.token.name,
          email: context.auth.token.email,
          image: context.auth.token.photoURL,
        });

        /// Create and return user auth token.
        return serverClient.createToken(context.auth.uid);
      } catch (err) {
        console.error(
          `Unable to create user with ID ${context.auth.uid} on Stream. Error ${err}`
        );
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError(
          "aborted",
          "Could not create Stream user"
        );
      }
    }
  }
);

// Get Stream user token.
exports.getStreamUserToken = functions.https.onCall((data, context) => {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  } else {
    try {
      return serverClient.createToken(context.auth.uid);
    } catch (err) {
      console.error(
        `Unable to get user token with ID ${context.auth.uid} on Stream. Error ${err}`
      );
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "aborted",
        "Could not get Stream user"
      );
    }
  }
});

// Revoke the authenticated user's Stream chat token.
exports.revokeStreamUserToken = functions.https.onCall((data, context) => {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  } else {
    try {
      return serverClient.revokeUserToken(context.auth.uid);
    } catch (err) {
      console.error(
        `Unable to revoke user token with ID ${context.auth.uid} on Stream. Error ${err}`
      );
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "aborted",
        "Could not get Stream user"
      );
    }
  }
});

const token = null;
exports.onCreateUser = functions.firestore
  .document("users/{userId}")
  .onCreate((snapshot, context) => {
    const userId = snapshot.data().uid;
    token = serverClient.createToken(userId);
    return snapshot.ref.set({ token }, { merge: true });
  });

exports.onUpdateUser = functions.firestore
  .document("users/{userId}")
  .onWrite((snapshot, context) => {
    return snapshot.ref.set({ token }, { merge: true });
  });

exports.initializefirebase = functions. serverClient.updateAppSettings({
  push_config: {
    version: "v2",
  },
  firebase_config: {
    firebase_config: {
      server_key:
        "AAAAoa_JFTk:APA91bF0uY80bzqoaK_ASTNnwzzSzYoEI4ebF4hbwWko47R31PSMzNkPX94ozQK6-kj5VpNgvyBo5rrgmg6B4Cbc03hnsoHPSFV46B9lI07-oCzpADAB4KTHVcQZTDuR1KhDNHLTlTLc",
      notification_template: `{"message":{"notification":{"title":"New messages","body":"You have {{ unread_count }} new message(s) from {{ sender.name }}"},"android":{"ttl":"86400s","notification":{"click_action":"OPEN_ACTIVITY_1"}}}}`,
      data_template: `{"sender":"{{ sender.id }}","channel":{"type": "{{ channel.type }}","id":"{{ channel.id }}"},"message":"{{ message.id }}"}`,
    },
  },
});
