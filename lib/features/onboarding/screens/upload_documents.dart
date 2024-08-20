import 'dart:io';
import 'package:flutter/material.dart';
import 'package:moverify/features/onboarding/screens/fingerprint_registration.dart';
import 'package:moverify/features/onboarding/screens/id_scanning_page.dart';

class UploadDocumentScreen extends StatefulWidget {
  final File selfiePath;

  const UploadDocumentScreen({super.key, required this.selfiePath});

  @override
  State<UploadDocumentScreen> createState() => _UploadDocumentScreenState();
}

class _UploadDocumentScreenState extends State<UploadDocumentScreen> {
  bool _isNationalIdVerified = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textTheme = theme.textTheme;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(color: theme.primaryColor),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Icon(Icons.person_outline, color: theme.primaryColor),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(height: 10, width: 100, color: Colors.grey[400]),
                          const SizedBox(height: 8),
                          Container(height: 10, width: double.infinity, color: Colors.grey[400]),
                          const SizedBox(height: 4),
                          Container(height: 10, width: double.infinity, color: Colors.grey[400]),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'Upload proof of your identity',
                style: textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF2C3E50),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Please submit the documents below',
                style: textTheme.bodyMedium?.copyWith(color: Colors.grey[600]),
              ),
              const SizedBox(height: 24),
              _buildDocumentItem(context, 'National identity card', Icons.credit_card, _isNationalIdVerified),
              _buildDocumentItem(context, 'Utility bill', Icons.receipt_long, false),
              _buildDocumentItem(context, 'Passport*', Icons.book, false),
              const SizedBox(height: 16),
              Text(
                '*If you don\'t have a national identity card, please upload your passport',
                style: textTheme.bodySmall?.copyWith(color: Colors.grey[600]),
              ),
              const Spacer(),
              Center(
                child: TextButton(
                  onPressed: () {
                    // Handle 'Need Help?' action
                  },
                  child: Text(
                    'Need Help?',
                    style: textTheme.bodyMedium?.copyWith(
                      color: theme.primaryColor,
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _isNationalIdVerified
                    ? () {
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => const FingerprintRegistrationScreen(),
                        ));
                      }
                    : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.black,
                  foregroundColor: Colors.white,
                  minimumSize: const Size(double.infinity, 50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25),
                  ),
                ),
                child: Text('Continue', style: textTheme.bodyLarge?.copyWith(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDocumentItem(BuildContext context, String title, IconData icon, bool isVerified) {
    final theme = Theme.of(context);
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: Icon(icon, color: theme.primaryColor),
        title: Text(title, style: theme.textTheme.bodyLarge),
        trailing: isVerified
            ? Icon(Icons.check_circle, color: Colors.green)
            : Icon(Icons.chevron_right, color: theme.primaryColor),
        onTap: isVerified
            ? null
            : () async {
                if (title == 'National identity card') {
                  final result = await Navigator.of(context).push<bool>(MaterialPageRoute(
                    builder: (context) => IDScanningPage(selfiePath: widget.selfiePath),
                  ));
                  if (result == true) {
                    setState(() {
                      _isNationalIdVerified = true;
                    });
                  }
                } else {
                  // Handle other document types
                }
              },
      ),
    );
  }
}