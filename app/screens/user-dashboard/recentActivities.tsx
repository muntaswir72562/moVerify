import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import Sidebar from '../../../components/sidebar';

interface Activity {
  type: string;
  details: string;
  date: string;
  action: string;
}

const RecentActivities: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const translateX = useSharedValue<number>(-300);

  const sidebarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animationConfig: WithTimingConfig = {
    duration: 300,
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    translateX.value = withTiming(0, animationConfig);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    translateX.value = withTiming(-300, animationConfig);
  };

  const activities: Activity[] = [
    { type: 'Login', details: '192.0.0.1', date: '10/01/2023, 10:00 AM', action: 'More details' },
    { type: 'Verification', details: "Driver's license, submitted", date: '09/10/2023', action: 'More details' },
    { type: 'Security Alert', details: 'Failed login attempt', date: '09/05/23', action: 'Report' },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sidebar, sidebarStyle]}>
        <Sidebar onClose={closeSidebar} />
      </Animated.View>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={openSidebar}>
            <Ionicons name="menu-outline" size={30} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recent Activities</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.card}>
          <ScrollView>
            {activities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityType}>{activity.type}</Text>
                  <Text style={styles.activityDetails}>{activity.details}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>{activity.action}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#F5F5F5',
    zIndex: 100,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'Poppins-Bold',
  },
  placeholder: {
    width: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activityInfo: {
    flex: 1,
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'Poppins-Bold',
  },
  activityDetails: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'Poppins-Regular',
  },
  activityDate: {
    fontSize: 12,
    color: '#95A5A6',
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  actionButton: {
    marginLeft: 10,
  },
  actionText: {
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

export default RecentActivities;