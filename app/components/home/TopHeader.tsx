import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface TopHeaderProps {
  sunAmount: number;
  onSunPress: () => void;
  onTaskPress: () => void;
  onFriendPress: () => void;
  onDecorationPress: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ 
  sunAmount, 
  onSunPress, 
  onTaskPress, 
  onFriendPress, 
  onDecorationPress 
}) => {
  const router = useRouter();

  return (
    <View style={styles.imageWrapper}>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Image
          style={styles.profileButton}
          source={require("../../assets/home_img/FigmaDDSSlicePNG4d18dfe8145a98ae121d9b0d26ddcd2c.png")}
        />
      </TouchableOpacity>

      <View style={styles.infoPanelContainer}>
        <View style={styles.infoPanelRow}>
          <Text style={styles.infoPanelText}>第7天 / 第1周</Text>
        </View>
        <View style={[styles.infoPanelRow, styles.sunRow]}>
          <TouchableOpacity
            style={styles.sunButton}
            onPress={onSunPress}
            activeOpacity={0.7}
          >
            <Image
              source={require("../../assets/flowers/sun.png")}
              style={styles.sunIcon}
              resizeMode="contain"
            />
            <Text style={styles.infoPanelText}>{sunAmount}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.verticalLabelsContainer}>
        <TouchableOpacity onPress={onTaskPress}>
          <Image
            style={styles.labelIcon}
            source={require("../../assets/home_img/FigmaDDSSlicePNG87c41bd798edc555eb194a583e39b1a3.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFriendPress}>
          <Image
            style={styles.labelIcon}
            source={require("../../assets/home_img/friends.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDecorationPress}>
          <Image
            style={styles.labelIcon}
            source={require("../../assets/home_img/decoration.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: width * 0.9,
    height: 70,
    marginTop: 12,
    marginLeft: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileButton: {
    width: 48,
    height: 48,
  },
  infoPanelContainer: {
    position: 'absolute',
    left: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 48,
  },
  infoPanelRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sunRow: {
    marginTop: 4,
  },
  infoPanelText: {
    color: '#3C7B55',
    fontSize: 14,
    fontWeight: '600',
  },
  sunIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  sunButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  verticalLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 48,
  },
  labelIcon: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
});

export default TopHeader; 