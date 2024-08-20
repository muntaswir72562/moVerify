import 'package:flutter/material.dart';
import 'process_liveness_detection.dart';
class LiveFaceDetectionScreen extends StatelessWidget {
  const LiveFaceDetectionScreen({super.key});

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
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Live face detection',
                        style: textTheme.headlineMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFF2C3E50),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'We will use your selfie to ensure that you are the claimed person and will compare it to our identity',
                        style: textTheme.bodyMedium,
                      ),
                      const SizedBox(height: 24),
                      _buildInstructionItem(
                        context, 
                        '1',
                        'Good lighting',
                        const ['Your face must not obscured by light glare or reflections'],
                      ),
                      const SizedBox(height: 16),
                      _buildInstructionItem(
                        context, 
                        '2',
                        'Face visible',
                        const [
                          'Ensure your face is fully visible, with both eyes, nose and the mouth clearly seen',
                          'Maintain a neutral facial expression during capture'
                        ],
                      ),
                      const SizedBox(height: 24),
                      Text('Example:', style: textTheme.bodyMedium),
                      const SizedBox(height: 8),
                      Container(
                        height: 200,
                        decoration: BoxDecoration(
                          color: Colors.grey[300],
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Center(
                          child: Icon(
                            Icons.play_circle_outline,
                            size: 64,
                            color: Colors.grey[600],
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                    ],
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: ElevatedButton(
                onPressed: () {
                  // Handle open camera action
                  // Navigator.of(context).push(MaterialPageRoute(
                  //   builder: (context) => const UploadDocumentScreen(),
                  // ));
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const LivenessDetectionPage()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.black,
                  foregroundColor: Colors.white,
                  minimumSize: const Size(double.infinity, 50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25),
                  ),
                ),
                child: Text('Open camera', style: textTheme.bodyLarge?.copyWith(color: Colors.white)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInstructionItem(BuildContext context, String number, String title, List<String> points) {
    final theme = Theme.of(context);
    final textTheme = theme.textTheme;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 24,
          height: 24,
          decoration: const BoxDecoration(
            color: Colors.black,
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(
              number,
              style: textTheme.bodySmall?.copyWith(color: Colors.white),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: textTheme.bodyLarge?.copyWith(fontWeight: FontWeight.bold)),
              ...points.map((point) => Padding(
                padding: const EdgeInsets.only(top: 4),
                child: Text(
                  '• $point',
                  style: textTheme.bodyMedium,
                ),
              )),
            ],
          ),
        ),
      ],
    );
  }
}