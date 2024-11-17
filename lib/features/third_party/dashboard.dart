import 'package:flutter/material.dart';
// import 'app_theme.dart';

class Application {
  final String id;
  final String name;
  final String service;
  final String date;
  String status;
  final String priority;

  Application({
    required this.id,
    required this.name,
    required this.service,
    required this.date,
    required this.status,
    required this.priority,
  });
}

class WebThirdPartyDashboard extends StatefulWidget {
  @override
  _WebThirdPartyDashboardState createState() => _WebThirdPartyDashboardState();
}

class _WebThirdPartyDashboardState extends State<WebThirdPartyDashboard> {
  List<Application> applications = [
    Application(id: '1', name: 'John Doe', service: 'Passport Renewal', date: '2024-08-15', status: 'Pending', priority: 'High'),
    Application(id: '2', name: 'Jane Smith', service: 'Driver\'s License', date: '2024-08-14', status: 'Approved', priority: 'Medium'),
    Application(id: '3', name: 'Bob Johnson', service: 'National ID', date: '2024-08-13', status: 'Rejected', priority: 'Low'),
    Application(id: '4', name: 'Alice Brown', service: 'Business Permit', date: '2024-08-12', status: 'Pending', priority: 'High'),
    Application(id: '5', name: 'Charlie Davis', service: 'Visa Application', date: '2024-08-11', status: 'Under Review', priority: 'Medium'),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: Text('Third Party Dashboard', style: theme.textTheme.headlineMedium?.copyWith(color: Colors.white)),
        backgroundColor: theme.primaryColor,
        actions: [
          IconButton(icon: Icon(Icons.refresh), onPressed: () {}),
          IconButton(icon: Icon(Icons.notifications), onPressed: () {}),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Applications', style: theme.textTheme.headlineMedium),
            SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Search applications...',
                      prefixIcon: Icon(Icons.search),
                    ),
                    style: theme.textTheme.bodyLarge,
                  ),
                ),
                SizedBox(width: 8),
                TextButton(
                  child: Text('Filter'),
                  onPressed: () {
                    // TODO: Implement filter functionality
                  },
                ),
                SizedBox(width: 8),
                TextButton(
                  child: Text('Export'),
                  onPressed: () {
                    // TODO: Implement export functionality
                  },
                ),
              ],
            ),
            SizedBox(height: 24),
            Expanded(
              child: LayoutBuilder(
                builder: (BuildContext context, BoxConstraints constraints) {
                  return SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: ConstrainedBox(
                      constraints: BoxConstraints(minWidth: constraints.maxWidth),
                      child: DataTable(
                        columns: [
                          DataColumn(label: Text('Name')),
                          DataColumn(label: Text('Service')),
                          DataColumn(label: Text('Date')),
                          DataColumn(label: Text('Status')),
                          DataColumn(label: Text('Priority')),
                          DataColumn(label: Text('Action')),
                        ],
                        rows: applications.map((app) => DataRow(
                          cells: [
                            DataCell(Text(app.name)),
                            DataCell(Text(app.service)),
                            DataCell(Text(app.date)),
                            DataCell(_getStatusChip(app.status, theme)),
                            DataCell(_getPriorityChip(app.priority, theme)),
                            DataCell(
                              TextButton(
                                child: Text('Manage'),
                                onPressed: () => _showActionDialog(context, app),
                              ),
                            ),
                          ],
                        )).toList(),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _getStatusChip(String status, ThemeData theme) {
    Color color;
    switch (status) {
      case 'Approved': color = Colors.green; break;
      case 'Rejected': color = Colors.red; break;
      case 'Pending': color = Colors.orange; break;
      case 'Under Review': color = Colors.blue; break;
      default: color = Colors.grey;
    }
    return Chip(
      label: Text(status, style: TextStyle(color: Colors.white)),
      backgroundColor: color,
    );
  }

  Widget _getPriorityChip(String priority, ThemeData theme) {
    Color color;
    switch (priority) {
      case 'High': color = Colors.red[100]!; break;
      case 'Medium': color = Colors.orange[100]!; break;
      case 'Low': color = Colors.green[100]!; break;
      default: color = Colors.grey[100]!;
    }
    return Chip(
      label: Text(priority),
      backgroundColor: color,
    );
  }

  void _showActionDialog(BuildContext context, Application app) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Manage Application'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Application ID: ${app.id}'),
              Text('Name: ${app.name}'),
              Text('Service: ${app.service}'),
              SizedBox(height: 16),
              Text('Choose an action:'),
            ],
          ),
          actions: [
            TextButton(
              child: Text('Approve'),
              onPressed: () {
                setState(() { app.status = 'Approved'; });
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Reject'),
              onPressed: () {
                setState(() { app.status = 'Rejected'; });
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Under Review'),
              onPressed: () {
                setState(() { app.status = 'Under Review'; });
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Close'),
              onPressed: () { Navigator.of(context).pop(); },
            ),
          ],
        );
      },
    );
  }
}
