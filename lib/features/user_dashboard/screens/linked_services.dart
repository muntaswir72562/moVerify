import 'package:flutter/material.dart';
import 'package:moverify/components/user_sidebar.dart';

class LinkedServicesScreen extends StatefulWidget {
  const LinkedServicesScreen({super.key});

  @override
  State<LinkedServicesScreen> createState() => _LinkedServicesScreenState();
}

class _LinkedServicesScreenState extends State<LinkedServicesScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  int _selectedIndex = 2; // Assuming Linked Services is the third item in the sidebar

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
          'Linked Services',
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
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: ElevatedButton.icon(
                  onPressed: () {
                    // TODO: Implement link new service functionality
                    print('Link new service pressed');
                  },
                  icon: const Icon(Icons.link),
                  label: const Text('Link new service'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.black,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Linked services',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF2C3E50)),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: Card(
                elevation: 4,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                color: Colors.white,
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: DataTable(
                      columns: const [
                        DataColumn(label: Text('Service Name', style: TextStyle(fontWeight: FontWeight.bold))),
                        DataColumn(label: Text('Permission Status', style: TextStyle(fontWeight: FontWeight.bold))),
                        DataColumn(label: Text('Action', style: TextStyle(fontWeight: FontWeight.bold))),
                      ],
                      rows: [
                        _buildDataRow(['MCB', 'Full access', 'Revoke']),
                        _buildDataRow(['Gov portal', 'Read-only access', 'Manage']),
                        _buildDataRow(['Amazon', 'Full access', 'Manage']),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  DataRow _buildDataRow(List<String> cells) {
    return DataRow(
      cells: cells.map((cell) => DataCell(
        cell == 'Revoke' || cell == 'Manage'
            ? TextButton(
                onPressed: () {
                  // TODO: Implement action
                  print('$cell pressed for ${cells[0]}');
                },
                child: Text(cell, style: const TextStyle(color: Colors.blue)),
              )
            : Text(cell, style: const TextStyle(color: Color(0xFF2C3E50))),
      )).toList(),
    );
  }
}