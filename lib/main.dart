import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart';
import 'features/auth/screens/login.dart';
import 'features/onboarding/screens/overall_process.dart';
import 'features/onboarding/screens/fingerprint_registration.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MoVerify',
      theme: AppTheme.lightTheme,
      home: const WelcomeScreen(),
    );
  }
}

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  void _navigateToLogin(BuildContext context) {
    Navigator.of(context).push(MaterialPageRoute(
      builder: (context) => const LoginScreen(),
      // builder: (context) => const FingerprintRegistrationScreen(),
    ));
  }

  void _handleIdentityVerification(BuildContext context) {
     Navigator.of(context).push(MaterialPageRoute(
      builder: (context) => const OverallProcessScreen(),
    ));
  }

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Welcome To', style: textTheme.displayMedium),
              const SizedBox(height: 20),
              Image.asset(
                'assets/images/logo.png',
                height: 150,
                width: 150,
              ),
              const SizedBox(height: 20),
              Text('MoVerify', style: textTheme.displayLarge),
              const SizedBox(height: 40),
              ElevatedButton(
                key: const ValueKey('loginButton'),
                onPressed: () => _navigateToLogin(context),
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25),
                  ),
                  elevation: 5, // Add drop shadow
                  shadowColor: Colors.black.withOpacity(0.7), // Customize shadow color
                ),
                child: Text('Login', style: textTheme.bodyLarge?.copyWith(color: Colors.white)),
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Expanded(child: Divider(color: Colors.grey[400])),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: Text('OR', style: textTheme.bodyMedium),
                  ),
                  Expanded(child: Divider(color: Colors.grey[400])),
                ],
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                key: const ValueKey('verifyIdentityButton'),
                onPressed: () => _handleIdentityVerification(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: const Color(0xFF2C3E50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25),
                  ),
                  elevation: 5, // Add drop shadow
                  shadowColor: Colors.black.withOpacity(0.7), // Customize shadow color
                ),
                child: Text('Verify your identity', style: textTheme.bodyLarge),
              ),
            ],
          ),
        ),
      ),
    );
  }
}