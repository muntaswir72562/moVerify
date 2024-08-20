import 'package:flutter/material.dart';
import 'package:moverify/features/user_dashboard/screens/user_dashboard.dart';
import 'package:moverify/features/user_dashboard/screens/document_management.dart';
import 'package:moverify/features/user_dashboard/screens/linked_services.dart';
import 'package:moverify/features/user_dashboard/screens/personal_setting.dart';
import 'package:moverify/features/user_dashboard/screens/recent_activities.dart';
class Sidebar extends StatelessWidget {
  final int selectedIndex;
  final Function(int) onItemSelected;

  const Sidebar({
    super.key,
    required this.selectedIndex,
    required this.onItemSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: const Color(0xFFFFFFFF),
        child: Column(
          children: [
            Expanded(
              child: ListView(
                padding: EdgeInsets.zero,
                children: [
                  const SizedBox(height: 50),  // Minimalistic top padding
                  _buildMenuItem(context, 0, 'Dashboard', Icons.dashboard),
                  _buildMenuItem(context, 1, 'Document Management', Icons.description),
                  _buildMenuItem(context, 2, 'Linked Services', Icons.link),
                  _buildMenuItem(context, 3, 'Personal Setting', Icons.person),
                  _buildMenuItem(context, 4, 'Recent Activities', Icons.history),
                ],
              ),
            ),
            const Divider(color: Color(0xFFDDDDDD)),
            _buildMenuItem(context, 5, 'Help Center', Icons.help),
            _buildMenuItem(context, 6, 'Contact Support', Icons.headset_mic),
            _buildMenuItem(context, 7, 'Privacy & Consent', Icons.security),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuItem(BuildContext context, int index, String title, IconData icon) {
    final isSelected = selectedIndex == index;
    final color = isSelected ? const Color(0xFF080808) : const Color(0xFF2C3E50);
    final bgColor = isSelected ? const Color(0xFFEFEFEF) : Colors.transparent;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(8),
      ),
      child: ListTile(
        leading: Icon(icon, color: color),
        title: Text(
          title,
          style: TextStyle(
            color: color,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
        onTap: () {
          onItemSelected(index);
          _navigateToScreen(context, index);
        },
      ),
    );
  }

  void _navigateToScreen(BuildContext context, int index) {
    Navigator.pop(context); // Close the drawer
    switch (index) {
      case 0:
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const UserDashboardScreen()),
        );
        break;
      case 1:
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const DocumentManagementScreen()),
        );
        break;
        case 2:
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const LinkedServicesScreen()),
        );
        break;
        case 3:
        Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => const PersonalSettingsScreen(),
        ));
        break;
        case 4:
        Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => const RecentActivitiesScreen(),
        ));
        break;
      // Add more cases for other menu items as needed
    }
  }
}