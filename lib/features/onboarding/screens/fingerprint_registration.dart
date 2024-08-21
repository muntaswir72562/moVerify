import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:local_auth/local_auth.dart';
import 'package:local_auth_android/local_auth_android.dart';
import 'package:local_auth_ios/local_auth_ios.dart';
import 'package:moverify/features/onboarding/screens/phone_number.dart';

class FingerprintRegistrationScreen extends StatefulWidget {
  const FingerprintRegistrationScreen({Key? key}) : super(key: key);

  @override
  _FingerprintRegistrationScreenState createState() => _FingerprintRegistrationScreenState();
}

class _FingerprintRegistrationScreenState extends State<FingerprintRegistrationScreen> {
  final LocalAuthentication _localAuth = LocalAuthentication();
  String _registrationStatus = '';
  String _errorMessage = '';

  Future<void> _captureFingerprint() async {
    try {
      setState(() {
        _registrationStatus = 'capturing';
        _errorMessage = '';
      });

      bool authenticated = await _localAuth.authenticate(
        localizedReason: 'Place your finger on the sensor to register',
        options: const AuthenticationOptions(
          stickyAuth: true,
          biometricOnly: true,
        ),
        authMessages: const <AuthMessages>[
          AndroidAuthMessages(
            signInTitle: 'Fingerprint Registration',
            cancelButton: 'Cancel',
          ),
          IOSAuthMessages(
            cancelButton: 'Cancel',
          ),
        ],
      );

      if (authenticated) {
        // Simulate server communication
        await Future.delayed(const Duration(seconds: 2));
        setState(() {
          _registrationStatus = 'success';
        });
        
        // Wait for a short duration to show the success message
        await Future.delayed(const Duration(seconds: 1));
        
        // Navigate to the next page
        _navigateToNextPage();
      } else {
        setState(() {
          _registrationStatus = 'failed';
        });
      }
    } on PlatformException catch (e) {
      print("Error capturing fingerprint: ${e.message}");
      print("Error details: ${e.details}");
      setState(() {
        _registrationStatus = 'error';
        _errorMessage = 'Error: ${e.message}';
      });
    }
  }

  void _navigateToNextPage() {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (context) => const RegisterPhoneScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Fingerprint Registration')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.fingerprint,
                size: 100,
                color: Colors.blue,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _registrationStatus != 'capturing' ? _captureFingerprint : null,
                child: Text(_registrationStatus == 'capturing' ? 'Capturing...' : 'Register Fingerprint'),
              ),
              const SizedBox(height: 24),
              _buildStatusMessage(),
              if (_errorMessage.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    _errorMessage,
                    style: TextStyle(color: Colors.red),
                    textAlign: TextAlign.center,
                  ),
                ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: _navigateToNextPage,
                style: TextButton.styleFrom(
                  foregroundColor: Colors.grey[600],
                ),
                child: const Text('Skip'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatusMessage() {
    switch (_registrationStatus) {
      case 'success':
        return const Text(
          'Fingerprint registered successfully!',
          style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold),
        );
      case 'failed':
        return const Text(
          'Fingerprint registration failed. Please try again.',
          style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
        );
      case 'error':
        return const Text(
          'An error occurred. Please try again later.',
          style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
        );
      default:
        return const SizedBox.shrink();
    }
  }
}