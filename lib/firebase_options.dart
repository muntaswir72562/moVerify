// File generated by FlutterFire CLI.
// ignore_for_file: type=lint
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyAfVANideJ7niyCil7UbJAIAl5Fzzcauoc',
    appId: '1:688574396926:web:c41c9e3f1df627c3c5e8af',
    messagingSenderId: '688574396926',
    projectId: 'moverify-a4263',
    authDomain: 'moverify-a4263.firebaseapp.com',
    storageBucket: 'moverify-a4263.appspot.com',
    measurementId: 'G-JJTV5TFPHP',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyAX-042tyb7tQbIkfyOkIZF1P00h6j9X8c',
    appId: '1:688574396926:android:da133ad95229254ac5e8af',
    messagingSenderId: '688574396926',
    projectId: 'moverify-a4263',
    storageBucket: 'moverify-a4263.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDuuu3ixZ4cPMfH0lJe9obbtcQs-3WHUNc',
    appId: '1:688574396926:ios:1f9ebf48dbea8f8dc5e8af',
    messagingSenderId: '688574396926',
    projectId: 'moverify-a4263',
    storageBucket: 'moverify-a4263.appspot.com',
    iosBundleId: 'com.example.moverify',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyDuuu3ixZ4cPMfH0lJe9obbtcQs-3WHUNc',
    appId: '1:688574396926:ios:1f9ebf48dbea8f8dc5e8af',
    messagingSenderId: '688574396926',
    projectId: 'moverify-a4263',
    storageBucket: 'moverify-a4263.appspot.com',
    iosBundleId: 'com.example.moverify',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyAfVANideJ7niyCil7UbJAIAl5Fzzcauoc',
    appId: '1:688574396926:web:77169194d7855cbec5e8af',
    messagingSenderId: '688574396926',
    projectId: 'moverify-a4263',
    authDomain: 'moverify-a4263.firebaseapp.com',
    storageBucket: 'moverify-a4263.appspot.com',
    measurementId: 'G-43VDMX4MLX',
  );
}
