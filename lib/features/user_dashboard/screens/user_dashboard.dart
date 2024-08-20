import 'package:flutter/material.dart';
import 'package:moverify/components/user_sidebar.dart';

class UserDashboardScreen extends StatefulWidget {
  const UserDashboardScreen({super.key});

  @override
  State<UserDashboardScreen> createState() => _UserDashboardScreenState();
}

class _UserDashboardScreenState extends State<UserDashboardScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: const Color(0xFFFFFFFF),
      appBar: AppBar(
        backgroundColor: const Color(0xFFFFFFFF),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.menu, color: Color(0xFF2C3E50)),
          onPressed: () {
            _scaffoldKey.currentState?.openDrawer();
          },
        ),
        title: const Text('Dashboard', style: TextStyle(color: Color(0xFF2C3E50))),
        actions: [
          IconButton(icon: const Icon(Icons.notifications, color: Color(0xFF2C3E50)), onPressed: () {}),
          IconButton(icon: const Icon(Icons.settings, color: Color(0xFF2C3E50)), onPressed: () {}),
          IconButton(icon: const Icon(Icons.person, color: Color(0xFF2C3E50)), onPressed: () {}),
        ],
      ),
      drawer: Sidebar(
        selectedIndex: _selectedIndex,
        onItemSelected: _handleMenuItemSelected,
      ),
      body: const SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              QuickStatsCard(),
              SizedBox(height: 16),
              VerifiedDocumentsCard(),
              SizedBox(height: 16),
              LinkedServicesCard(),
              SizedBox(height: 16),
              RecentActivitiesCard(),
            ],
          ),
        ),
      ),
    );
  }

  void _handleMenuItemSelected(int index) {
    setState(() {
      _selectedIndex = index;
    });
    _scaffoldKey.currentState?.closeDrawer();
    // Handle navigation or other actions based on the selected index
  }
}

class QuickStatsCard extends StatelessWidget {
  const QuickStatsCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Quick stats', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            _buildStatRow(Icons.description, 'Total verified document', '5'),
            _buildStatRow(Icons.pending, 'Pending verification', '2'),
            _buildStatRow(Icons.access_time, 'Recent verification', '19/05/2024'),
            _buildStatRow(Icons.link, 'Linked services', '3'),
          ],
        ),
      ),
    );
  }

  Widget _buildStatRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        children: [
          Icon(icon, size: 20),
          const SizedBox(width: 8),
          Expanded(child: Text(label)),
          Text(value, style: const TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}

class VerifiedDocumentsCard extends StatelessWidget {
  const VerifiedDocumentsCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Verified documents', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: DataTable(
                columns: const [
                  DataColumn(label: Text('Document')),
                  DataColumn(label: Text('Status')),
                  DataColumn(label: Text('Expiry date')),
                  DataColumn(label: Text('Action')),
                ],
                rows: [
                  _buildDocumentRow('NIC', 'Verified', 'N/A', 'N/A'),
                  _buildDocumentRow('Passport', 'Verified', '05/15/2025', 'N/A'),
                  _buildDocumentRow('Bank statement', 'Need review', 'N/A', 'Verify'),
                  _buildDocumentRow('Driver\'s licence', 'Pending', 'N/A', 'Upload new photo'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  DataRow _buildDocumentRow(String document, String status, String expiryDate, String action) {
    return DataRow(cells: [
      DataCell(Text(document)),
      DataCell(Text(status)),
      DataCell(Text(expiryDate)),
      DataCell(action != 'N/A' ? TextButton(onPressed: () {}, child: Text(action)) : const Text('N/A')),
    ]);
  }
}

class LinkedServicesCard extends StatelessWidget {
  const LinkedServicesCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Linked services', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: DataTable(
                columns: const [
                  DataColumn(label: Text('Service Name')),
                  DataColumn(label: Text('Permission Status')),
                  DataColumn(label: Text('Action')),
                ],
                rows: [
                  _buildServiceRow('MCB', 'Full access', 'Revoke'),
                  _buildServiceRow('Gov portal', 'Read-only access', 'Manage'),
                  _buildServiceRow('Amazon', 'Full access', 'Revoke'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  DataRow _buildServiceRow(String service, String status, String action) {
    return DataRow(cells: [
      DataCell(Text(service)),
      DataCell(Text(status)),
      DataCell(TextButton(onPressed: () {}, child: Text(action))),
    ]);
  }
}

class RecentActivitiesCard extends StatelessWidget {
  const RecentActivitiesCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Recent activities', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            _buildActivityRow('Login', '10/01/2023, 10:00 AM, 192.0.0.1'),
            _buildActivityRow('Verification', 'Driver\'s licence, submitted, 09/10/2023'),
            _buildActivityRow('Security Alert', 'Failed login attempt 09/05/23'),
          ],
        ),
      ),
    );
  }

  Widget _buildActivityRow(String activity, String details) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(activity, style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(details, style: const TextStyle(fontSize: 12)),
              ],
            ),
          ),
          TextButton(onPressed: () {}, child: const Text('More details')),
        ],
      ),
    );
  }
}