// import 'package:firebase_auth/firebase_auth.dart';

// class AuthService {
//   final FirebaseAuth _auth = FirebaseAuth.instance;

//   Future<void> verifyPhone({
//     required String phoneNumber,
//     required Function(String) onCodeSent,
//     required Function(FirebaseAuthException) onVerificationFailed,
//     required Function(PhoneAuthCredential) onVerificationCompleted,
//   }) async {
//     await _auth.verifyPhoneNumber(
//       phoneNumber: phoneNumber,
//       verificationCompleted: onVerificationCompleted,
//       verificationFailed: onVerificationFailed,
//       codeSent: (String verificationId, int? resendToken) {
//         onCodeSent(verificationId);
//       },
//       codeAutoRetrievalTimeout: (String verificationId) {},
//     );
//   }

//   Future<UserCredential> signInWithCredential(PhoneAuthCredential credential) async {
//     return await _auth.signInWithCredential(credential);
//   }
// }