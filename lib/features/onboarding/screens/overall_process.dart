import 'package:flutter/material.dart';
import 'package:moverify/features/onboarding/screens/live_face_detection.dart';

class OverallProcessScreen extends StatelessWidget {
  const OverallProcessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textTheme = theme.textTheme;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Let's start", style: textTheme.headlineMedium),
              const SizedBox(height: 8),
              Text(
                "Please submit the documents below to process your application",
                style: textTheme.bodyMedium,
              ),
              const SizedBox(height: 24),
              _buildStepCard(
                context,
                "Step 1",
                "Liveness check",
                Icons.face,
                theme,
              ),
              const SizedBox(height: 16),
              _buildStepCard(
                context,
                "Step 2",
                "Upload identity documents",
                Icons.upload_file,
                theme,
              ),
              const SizedBox(height: 16),
              _buildStepCard(
                context,
                "Step 3",
                "Biometric verification*",
                Icons.fingerprint,
                theme,
              ),
              const SizedBox(height: 16),
              _buildStepCard(
                context,
                "Step 4",
                "Complete profile",
                Icons.person,
                theme,
              ),
              const SizedBox(height: 24),
              TextButton(
                onPressed: () {
                  // Handle 'Why this is needed?' action
                },
                child: Text(
                  "Why this is needed?",
                  style: textTheme.bodyMedium?.copyWith(
                    color: theme.primaryColor,
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const LiveFaceDetectionScreen(),
                  ));
                },
                style: theme.elevatedButtonTheme.style,
                child: const Text("Start"),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStepCard(BuildContext context, String stepNumber, String title, IconData icon, ThemeData theme) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Icon(icon, color: theme.primaryColor),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(stepNumber, style: theme.textTheme.bodySmall?.copyWith(color: Colors.grey)),
                  Text(title, style: theme.textTheme.bodyMedium),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}