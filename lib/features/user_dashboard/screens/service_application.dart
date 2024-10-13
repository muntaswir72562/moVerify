import 'package:flutter/material.dart';
import 'package:moverify/components/user_sidebar.dart';

class Service {
  final String name;
  final List<String> requiredDocuments;

  Service({required this.name, required this.requiredDocuments});
}

class UserDocuments {
  final Map<String, bool> documents;

  UserDocuments({required this.documents});
}

class ServiceApplicationScreen extends StatefulWidget {
  final UserDocuments userDocuments;

  const ServiceApplicationScreen({Key? key, required this.userDocuments}) : super(key: key);

  @override
  _ServiceApplicationScreenState createState() => _ServiceApplicationScreenState();
}

class _ServiceApplicationScreenState extends State<ServiceApplicationScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  int _selectedIndex = 2; // Assuming this is the third item in the sidebar
  String? _selectedService;

  final List<Service> _services = [
    Service(name: 'Passport Renewal', requiredDocuments: ['National ID', 'Proof of Address', 'Passport Photo']),
    Service(name: 'Driver\'s License', requiredDocuments: ['National ID', 'Proof of Address', 'Eye Test Results']),
    Service(name: 'National ID', requiredDocuments: ['Birth Certificate', 'Proof of Address']),
    Service(name: 'Business Permit', requiredDocuments: ['Company Registration', 'Tax Clearance', 'Premises Lease']),
    Service(name: 'Visa Application', requiredDocuments: ['Passport', 'Bank Statements', 'Invitation Letter']),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.menu, color: Color(0xFF2C3E50)),
          onPressed: () {
            _scaffoldKey.currentState?.openDrawer();
          },
        ),
        title: const Text(
          'Apply for Service',
          style: TextStyle(color: Color(0xFF2C3E50), fontWeight: FontWeight.bold),
        ),
      ),
      drawer: Sidebar(
        selectedIndex: _selectedIndex,
        onItemSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
          Navigator.pop(context);
          // Handle navigation if needed
        },
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildServiceSelectionCard(),
              const SizedBox(height: 16),
              if (_selectedService != null) _buildDocumentRequirementsCard(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildServiceSelectionCard() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Select a Service',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF2C3E50)),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              decoration: InputDecoration(
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              ),
              value: _selectedService,
              items: _services.map((Service service) {
                return DropdownMenuItem<String>(
                  value: service.name,
                  child: Text(service.name),
                );
              }).toList(),
              onChanged: (String? newValue) {
                setState(() {
                  _selectedService = newValue;
                });
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDocumentRequirementsCard() {
    final selectedServiceDocuments = _services
        .firstWhere((service) => service.name == _selectedService)
        .requiredDocuments;

    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Required Documents',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF2C3E50)),
            ),
            const SizedBox(height: 16),
            ...selectedServiceDocuments.map((document) {
              final hasDocument = widget.userDocuments.documents[document] ?? false;
              return ListTile(
                leading: Icon(
                  hasDocument ? Icons.check_circle : Icons.cancel,
                  color: hasDocument ? Colors.green : Colors.red,
                ),
                title: Text(document),
                trailing: hasDocument
                    ? null
                    : TextButton(
                        child: const Text('Upload'),
                        onPressed: () {
                          // TODO: Implement document upload functionality
                        },
                      ),
              );
            }).toList(),
            const SizedBox(height: 24),
            ElevatedButton(
              child: const Text('Submit Application'),
              onPressed: _canSubmit() ? _submitApplication : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.black,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                minimumSize: const Size(double.infinity, 50),
              ),
            ),
          ],
        ),
      ),
    );
  }

  bool _canSubmit() {
    if (_selectedService == null) return false;
    final requiredDocuments = _services
        .firstWhere((service) => service.name == _selectedService)
        .requiredDocuments;
    return requiredDocuments.every((document) => widget.userDocuments.documents[document] ?? false);
  }

  void _submitApplication() {
    // TODO: Implement the logic to submit the application
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Application Submitted'),
          content: Text('Your application for $_selectedService has been submitted successfully.'),
          actions: [
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
                Navigator.of(context).pop(); // Go back to the previous screen
              },
            ),
          ],
        );
      },
    );
  }
}