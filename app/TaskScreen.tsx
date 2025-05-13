import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const tasks = [
  {
    title: '今天查看你的花园',
    progress: 1,
    total: 1,
    reward: 10,
    completed: true,
  },
  {
    title: '今天走5000步',
    progress: 3000,
    total: 5000,
    reward: 10,
    completed: false,
  },
  {
    title: '今天睡眠时长8小时',
    progress: 3,
    total: 8,
    reward: 10,
    completed: false,
  },
];

export default function TaskScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {tasks.map((task, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.cardTitle}>{task.title}</Text>
          <View style={styles.progressBarWrap}>
            <View
              style={[
                styles.progressBar,
                { width: `${(task.progress / task.total) * 100}%`, backgroundColor: task.completed ? '#ffe9b0' : '#ffe9b0' },
              ]}
            />
            <View style={styles.progressBarBg} />
          </View>
          <View style={styles.cardBottom}>
            <Text style={styles.progressText}>
              {task.completed
                ? '已完成'
                : `${task.progress} / ${task.total}`}
            </Text>
            <View style={[styles.rewardBox, task.completed && styles.rewardBoxActive]}>
              <View style={styles.rewardContent}>
                <Text style={[styles.rewardText, task.completed && styles.rewardTextActive]}>
                  完成奖励
                </Text>
                <Image
                  source={require('./assets/flowers/sun.png')}
                  style={styles.coinIcon}
                />
                <Text style={[styles.rewardText, { color: '#ffb400' }]}>x{task.reward}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  card: {
    width: 258,
    backgroundColor: '#f8fff8',
    borderRadius: 0,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBarWrap: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 10,
    borderRadius: 5,
    zIndex: 2,
  },
  progressBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f0f0f0',
    zIndex: 1,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rewardBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 0,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  rewardBoxActive: {
    backgroundColor: '#e0ffd0',
  },
  rewardText: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rewardTextActive: {
    color: '#5a7d5a',
  },
  rewardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
}); 