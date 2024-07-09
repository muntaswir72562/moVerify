import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import Sidebar from '../../../components/sidebarAdmin';

const AdminDashboard: React.FC = () => {
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

  const renderStatCard = (title: string, value: string, change: string, icon: keyof typeof Ionicons.glyphMap) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name={icon} size={24} color="#2C3E50" />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={[styles.cardChange, { color: change.startsWith('+') ? 'green' : 'red' }]}>
        {change}
      </Text>
    </View>
  );

  const renderVerificationTrends = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Verification Trends</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              data: [4000, 3000, 5000, 3000, 2000, 2500],
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              strokeWidth: 2
            },
            {
              data: [500, 300, 600, 400, 300, 200],
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              strokeWidth: 2
            }
          ]
        }}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={styles.chart}
      />
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(0, 122, 255, 1)' }]} />
          <Text style={styles.legendText}>verifications</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 0, 0, 1)' }]} />
          <Text style={styles.legendText}>failures</Text>
        </View>
      </View>
    </View>
  );

  const renderRecentActivities = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Recent Activities</Text>
      {[
        'User John Doe (ID: 12345) verified successfully',
        'New verification request from Jane Smith (ID: 12346)',
        'Verification failed for user Bob Johnson (ID: 12347)',
        'User John Doe (ID: 12345) verified successfully'
      ].map((activity, index) => (
        <Text key={index} style={styles.activityText}>{activity}</Text>
      ))}
    </View>
  );

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
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={24} color="#2C3E50" style={styles.headerIcon} />
            <Ionicons name="settings-outline" size={24} color="#2C3E50" style={styles.headerIcon} />
            <Ionicons name="person-outline" size={24} color="#2C3E50" style={styles.headerIcon} />
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          {renderStatCard('Total Verifications', '12,345', '+20.1% from last month', 'checkmark-circle-outline')}
          {renderStatCard('Pending Requests', '123', '-5% from last month', 'alert-circle-outline')}
          {renderStatCard('Failed Verifications', '12,345', '+2% from last month', 'close-circle-outline')}
          {renderStatCard('Active Users', '573', '+201 since last hour', 'people-outline')}
          {renderVerificationTrends()}
          {renderRecentActivities()}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Legal information</Text>
          <Text style={styles.footerText}>Terms of services</Text>
          <Text style={styles.footerText}>Privacy policy</Text>
        </View>
        </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'Poppins-Bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#2C3E50',
    fontFamily: 'Poppins-Bold',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'Poppins-Bold',
  },
  cardChange: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#2C3E50',
    fontFamily: 'Poppins-Regular',
  },
  activityText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#2C3E50',
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    color: '#2C3E50',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default AdminDashboard;