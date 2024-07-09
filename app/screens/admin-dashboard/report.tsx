import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart, PieChart } from 'react-native-chart-kit';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  WithTimingConfig 
} from 'react-native-reanimated';
import Sidebar from '../../../components/sidebarAdmin';

const screenWidth = Dimensions.get('window').width;

const Report: React.FC = () => {
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

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [400, 300, 500, 280, 200, 230],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        label: 'Successful',
      },
      {
        data: [20, 30, 40, 35, 20, 25],
        color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`,
        label: 'Failed',
      },
    ],
  };

  const pieData = [
    { name: 'Passport', percentage: 40, color: '#007AFF', legendFontColor: '#2C3E50' },
    { name: "Driver's licence", percentage: 30, color: '#00C7BE', legendFontColor: '#2C3E50' },
    { name: 'National ID', percentage: 20, color: '#FF9500', legendFontColor: '#2C3E50' },
    { name: 'Other', percentage: 10, color: '#FF3B30', legendFontColor: '#2C3E50' },
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
          <Text style={styles.headerTitle}>Report & Analytics</Text>
          <View style={styles.placeholder} />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Verification Success Rate</Text>
            <BarChart
              data={barData}
              width={screenWidth - 40}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.7,
                propsForLabels: {
                  fontFamily: 'Poppins-Regular',
                },
              }}
              style={styles.chart}
              showValuesOnTopOfBars
              showBarTops={false}
              fromZero
              segments={5}
            />
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: 'rgba(0, 122, 255, 1)' }]} />
                <Text style={styles.legendText}>Successful</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 59, 48, 1)' }]} />
                <Text style={styles.legendText}>Failed</Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Verification Methods</Text>
            <PieChart
              data={pieData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
                propsForLabels: {
                  fontFamily: 'Poppins-Regular',
                },
              }}
              accessor="percentage"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Summary Statistic</Text>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total verified document</Text>
              <Text style={styles.statValue}>5</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Pending verification</Text>
              <Text style={styles.statValue}>2</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Recent verification</Text>
              <Text style={styles.statValue}>19/05/2024</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Linked services</Text>
              <Text style={styles.statValue}>3</Text>
            </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2C3E50',
    fontFamily: 'Poppins-Bold',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#2C3E50',
    fontFamily: 'Poppins-Regular',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontFamily: 'Poppins-Regular',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'Poppins-Bold',
  },
});

export default Report;