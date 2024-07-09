import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  "screens/admin-dashboard/dashboard": undefined;
  'screens/admin-dashboard/documentManagement': undefined;
  'screens/admin-dashboard/userManagement': undefined;
  'screens/admin-dashboard/verificationRequest': undefined;
  'screens/admin-dashboard/report': undefined;
//   'screens/admin-dashboard/recentActivities': undefined;
  'screens/admin-dashboard/services': undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface SidebarProps {
  onClose: () => void;
}

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  route: keyof RootStackParamList;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigation = useNavigation<NavigationProp>();

  const menuItems: MenuItem[] = [
    { icon: 'grid-outline', title: 'Dashboard', route: 'screens/admin-dashboard/dashboard' },
    { icon: 'document-text-outline', title: 'Document Management', route: 'screens/admin-dashboard/documentManagement' },
    { icon: 'people-outline', title: 'User Management', route: 'screens/admin-dashboard/userManagement' },
    { icon: 'checkmark-circle-outline', title: 'Verification Requests', route: 'screens/admin-dashboard/verificationRequest' },
    { icon: 'bar-chart-outline', title: 'Reports & Analytics', route: 'screens/admin-dashboard/report' },
    // { icon: 'time-outline', title: 'Recent Activities', route: 'screens/admin-dashboard/recentActivities' },
    { icon: 'link-outline', title: 'Third Party Services', route: 'screens/admin-dashboard/services' },
  ];

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
    onClose();
  };

  const renderMenuItem = (item: MenuItem, index: number) => (
    <TouchableOpacity 
      key={index} 
      style={styles.menuItem} 
      onPress={() => handleNavigation(item.route)}
    >
      <Ionicons name={item.icon} size={24} color="#2C3E50" />
      <Text style={styles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sidebarContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="chevron-back-outline" size={24} color="#2C3E50" />
      </TouchableOpacity>
      
      <View style={styles.menuContainer}>
        {menuItems.map(renderMenuItem)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  closeButton: {
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'Poppins-Regular',
  },
});

export default Sidebar;