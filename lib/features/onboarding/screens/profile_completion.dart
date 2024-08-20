import 'package:flutter/material.dart';
import 'package:moverify/features/onboarding/screens/welcome_verification.dart';
class CompleteProfileScreen extends StatefulWidget {
  const CompleteProfileScreen({super.key});

  @override
  State<CompleteProfileScreen> createState() => _CompleteProfileScreenState();
}

class _CompleteProfileScreenState extends State<CompleteProfileScreen> {
  final List<Map<String, String>> _questions = [
    {"question": "What is your mother's maiden name?", "answer": ""},
    {"question": "In which city were you born?", "answer": ""},
    {"question": "What was the name of your first pet?", "answer": ""},
    {"question": "What is your favorite book?", "answer": ""},
    {"question": "What was your childhood nickname?", "answer": ""},
    {"question": "What is the name of the street you grew up on?", "answer": ""},
  ];

  int _currentPage = 0;
  final int _questionsPerPage = 3;

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
              Text(
                'Complete your profile',
                style: textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF2C3E50),
                ),
              ),
              const SizedBox(height: 24),
              ..._buildQuestionFields(),
              const Spacer(),
              ElevatedButton(
                onPressed: _handleSaveOrNext,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.black,
                  foregroundColor: Colors.white,
                  minimumSize: const Size(double.infinity, 50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25),
                  ),
                ),
                child: Text(_isLastPage ? 'Save' : 'Next'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  List<Widget> _buildQuestionFields() {
    final startIndex = _currentPage * _questionsPerPage;
    final endIndex = (startIndex + _questionsPerPage).clamp(0, _questions.length);
    
    return _questions.sublist(startIndex, endIndex).map((question) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(question['question']!, style: Theme.of(context).textTheme.bodyLarge),
          const SizedBox(height: 8),
          TextField(
            onChanged: (value) => question['answer'] = value,
            decoration: InputDecoration(
              hintText: 'Your answer',
              filled: true,
              fillColor: Colors.grey[200],
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide.none,
              ),
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            ),
          ),
          const SizedBox(height: 16),
        ],
      );
    }).toList();
  }

  void _handleSaveOrNext() {
    if (_isLastPage) {
      // Save logic here
      Navigator.of(context).push(MaterialPageRoute(
      builder: (context) => const WelcomeVerifiedScreen(userName: 'Muntaswir'),
    ));
      print('Saving answers: $_questions');
    } else {
      setState(() {
        _currentPage++;
      });
    }
  }

  bool get _isLastPage => (_currentPage + 1) * _questionsPerPage >= _questions.length;
}