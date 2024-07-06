import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    'screens/user-dashboard/dashboard': undefined;
    'screens/user-dashboard/documentManagement': undefined;
    'screens/user-dashboard/linkedServices': undefined;
    'screens/user-dashboard/personalSetting': undefined;
    'screens/user-dashboard/recentActivities': undefined;
    '../app/screens/help-center/help-center': undefined;
    '../app/screens/contact-support/contact-support': undefined;
    '../app/screens/privacy-consent/privacy-consent': undefined;
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
    { icon: 'grid-outline', title: 'Dashboard', route: 'screens/user-dashboard/dashboard' },
    { icon: 'document-text-outline', title: 'Document Management', route: 'screens/user-dashboard/documentManagement' },
    { icon: 'link-outline', title: 'Linked Services', route: 'screens/user-dashboard/linkedServices' },
    { icon: 'person-outline', title: 'Personal Setting', route: 'screens/user-dashboard/personalSetting' },
    { icon: 'time-outline', title: 'Recent Activities', route: 'screens/user-dashboard/recentActivities' },
  ];

  const footerItems: MenuItem[] = [
    { icon: 'help-circle-outline', title: 'Help Center', route: '../app/screens/help-center/help-center' },
    { icon: 'call-outline', title: 'Contact Support', route: '../app/screens/contact-support/contact-support' },
    { icon: 'shield-checkmark-outline', title: 'Privacy & Consent', route: '../app/screens/privacy-consent/privacy-consent' },
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

      <View style={styles.menuContainer}>{menuItems.map(renderMenuItem)}</View>

      <View style={styles.footerContainer}>
        {footerItems.map(renderMenuItem)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  footerContainer: {
    marginTop: 'auto',
    marginBottom: 20,
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