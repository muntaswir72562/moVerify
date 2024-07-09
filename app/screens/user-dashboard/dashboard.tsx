import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import Sidebar from '../../../components/sidebar';

const Dashboard: React.FC = () => {
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

  const renderQuickStats = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Quick stats</Text>
      <View style={styles.statRow}>
        <Ionicons name="document-text-outline" size={20} color="#2C3E50" />
        <Text style={styles.statText}>Total verified document</Text>
        <Text style={styles.statValue}>5</Text>
      </View>
      <View style={styles.statRow}>
        <Ionicons name="time-outline" size={20} color="#2C3E50" />
        <Text style={styles.statText}>Pending verification</Text>
        <Text style={styles.statValue}>2</Text>
      </View>
      <View style={styles.statRow}>
        <Ionicons name="calendar-outline" size={20} color="#2C3E50" />
        <Text style={styles.statText}>Recent verification</Text>
        <Text style={styles.statValue}>19/05/2024</Text>
      </View>
      <View style={styles.statRow}>
        <Ionicons name="link-outline" size={20} color="#2C3E50" />
        <Text style={styles.statText}>Linked services</Text>
        <Text style={styles.statValue}>3</Text>
      </View>
    </View>
  );

  const renderVerifiedDocuments = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Verified documents</Text>
      <ScrollView horizontal={true} style={styles.tableScrollView}>
        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.documentColumn]}>Document</Text>
            <Text style={[styles.tableHeaderCell, styles.statusColumn]}>Status</Text>
            <Text style={[styles.tableHeaderCell, styles.expiryDateColumn]}>Expiry date</Text>
            <Text style={[styles.tableHeaderCell, styles.actionColumn]}>Action</Text>
          </View>
          {[
            {
              document: "NIC",
              status: "Verified",
              expiryDate: "N/A",
              action: "N/A",
            },
            {
              document: "Passport",
              status: "Verified",
              expiryDate: "05/15/2025",
              action: "N/A",
            },
            {
              document: "Bank statement",
              status: "Need review",
              expiryDate: "N/A",
              action: "Verify",
            },
            {
              document: "Driver's licence",
              status: "Pending",
              expiryDate: "N/A",
              action: "Upload new photo",
            },
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.documentColumn]}>{item.document}</Text>
              <Text style={[styles.tableCell, styles.statusColumn]}>{item.status}</Text>
              <Text style={[styles.tableCell, styles.expiryDateColumn]}>{item.expiryDate}</Text>
              <Text style={[styles.tableCell, styles.actionColumn, styles.actionText]}>
                {item.action}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderLinkedServices = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Linked services</Text>
      <ScrollView horizontal={true} style={styles.tableScrollView}>
        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.serviceNameColumn]}>Service Name</Text>
            <Text style={[styles.tableHeaderCell, styles.permissionStatusColumn]}>Permission Status</Text>
            <Text style={[styles.tableHeaderCell, styles.actionColumn]}>Action</Text>
          </View>
          {[
            { service: "MCB", permission: "Full access", action: "Revoke" },
            {
              service: "Gov portal",
              permission: "Read-only access",
              action: "Manage",
            },
            { service: "Amazon", permission: "Full access", action: "Revoke" },
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.serviceNameColumn]}>{item.service}</Text>
              <Text style={[styles.tableCell, styles.permissionStatusColumn]}>{item.permission}</Text>
              <Text style={[styles.tableCell, styles.actionColumn, styles.actionText]}>
                {item.action}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderRecentActivities = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Recent activities</Text>
      {[
        { activity: "Login", details: "10/01/2023, 10:00 AM, 192.0.0.1" },
        {
          activity: "Verification",
          details: "Driver's licence, submitted, 09/10/2023",
        },
        {
          activity: "Security Alert",
          details: "Failed login attempt 09/05/23",
        },
      ].map((item, index) => (
        <View key={index} style={styles.activityRow}>
          <View>
            <Text style={styles.activityText}>{item.activity}</Text>
            <Text style={styles.activityDetails}>{item.details}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.moreDetails}>More details</Text>
          </TouchableOpacity>
        </View>
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
          <Text style={styles.headerTitle}>Dashboard</Text>
          <View style={styles.headerIcons}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#2C3E50"
              style={styles.headerIcon}
            />
            <Ionicons
              name="settings-outline"
              size={24}
              color="#2C3E50"
              style={styles.headerIcon}
            />
            <Ionicons
              name="person-outline"
              size={24}
              color="#2C3E50"
              style={styles.headerIcon}
            />
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          {renderQuickStats()}
          {renderVerifiedDocuments()}
          {renderLinkedServices()}
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
    backgroundColor: "white",
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "#F5F5F5",
    zIndex: 100,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    fontFamily: 'Poppins-Bold',
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2C3E50",
    fontFamily: 'Poppins-Bold',
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statText: {
    flex: 1,
    marginLeft: 8,
    color: "#2C3E50",
    fontFamily: 'Poppins-Regular',
  },
  statValue: {
    fontWeight: "bold",
    color: "#2C3E50",
    fontFamily: 'Poppins-Bold',
  },
  tableScrollView: {
    flexGrow: 0,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "#2C3E50",
    fontFamily: 'Poppins-Bold',
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tableCell: {
    color: "#2C3E50",
    fontFamily: 'Poppins-Regular',
  },
  documentColumn: {
    width: 120,
  },
  statusColumn: {
    width: 100,
  },
  expiryDateColumn: {
    width: 100,
  },
  actionColumn: {
    width: 120,
  },
  serviceNameColumn: {
    width: 120,
  },
  permissionStatusColumn: {
    width: 150,
  },
  actionText: {
    color: "#007AFF",
    fontFamily: 'Poppins-Medium',
  },
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  activityText: {
    fontWeight: "bold",
    color: "#2C3E50",
    fontFamily: 'Poppins-Bold',
  },
  activityDetails: {
    color: "#2C3E50",
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  moreDetails: {
    color: "#007AFF",
    fontFamily: 'Poppins-Medium',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  footerText: {
    color: "#2C3E50",
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default Dashboard;