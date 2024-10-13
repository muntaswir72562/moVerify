import 'package:flutter/material.dart';
import 'package:moverify/features/third_party/dashboard.dart';
import 'package:moverify/core/theme/app_theme.dart';

class WebThirdPartyLoginScreen extends StatefulWidget {
  @override
  _WebThirdPartyLoginScreenState createState() => _WebThirdPartyLoginScreenState();
}

class _WebThirdPartyLoginScreenState extends State<WebThirdPartyLoginScreen> {
  final _formKey = GlobalKey<FormState>();
  String _email = '';
  String _password = '';
  bool _rememberMe = false;

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      // TODO: Implement actual login logic here
      print('Login attempt with email: $_email and remember me: $_rememberMe');
      // Show a snackbar for demonstration purposes
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Processing login...')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.all(16.0),
            child: ConstrainedBox(
              constraints: BoxConstraints(maxWidth: 400),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  Icon(
                    Icons.lock_outline,
                    size: 64,
                    color: theme.primaryColor,
                  ),
                  SizedBox(height: 24),
                  Text(
                    'Third Party Portal Login',
                    style: theme.textTheme.headlineMedium,
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 48),
                  Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        TextFormField(
                          decoration: InputDecoration(
                            labelText: 'Email',
                            prefixIcon: Icon(Icons.email_outlined),
                          ),
                          style: theme.textTheme.bodyLarge,
                          keyboardType: TextInputType.emailAddress,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter your email';
                            }
                            return null;
                          },
                          onSaved: (value) => _email = value!,
                        ),
                        SizedBox(height: 16),
                        TextFormField(
                          decoration: InputDecoration(
                            labelText: 'Password',
                            prefixIcon: Icon(Icons.lock_outline),
                          ),
                          style: theme.textTheme.bodyLarge,
                          obscureText: true,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter your password';
                            }
                            return null;
                          },
                          onSaved: (value) => _password = value!,
                        ),
                        SizedBox(height: 24),
                        Row(
                          children: [
                            Checkbox(
                              value: _rememberMe,
                              onChanged: (value) {
                                setState(() {
                                  _rememberMe = value!;
                                });
                              },
                            ),
                            Text('Remember me', style: theme.textTheme.bodyMedium),
                          ],
                        ),
                        SizedBox(height: 24),
                        ElevatedButton(
                          child: Padding(
                            padding: EdgeInsets.symmetric(vertical: 12),
                            child: Text('Log In'),
                          ),
                          // onPressed: _submitForm,
                          onPressed: () {
                  // Implement login logic
                          Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => WebThirdPartyDashboard(),
                          ));
                        },
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 16),
                  TextButton(
                    child: Text(
                      'Forgot password?',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.primaryColor,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    onPressed: () {
                      // TODO: Implement forgot password functionality
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}