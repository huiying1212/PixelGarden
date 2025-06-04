import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

interface TaskScreenProps {
  updateSunAmount?: (amount: number) => void;
}

const initialTasks = [
  {
    title: '今天查看你的花园',
    progress: 1,
    total: 1,
    reward: 10,
    completed: true,
    rewardClaimed: false,
  },
  {
    title: '今天走5000步',
    progress: 3000,
    total: 5000,
    reward: 10,
    completed: false,
    rewardClaimed: false,
  },
  {
    title: '今天睡眠时长8小时',
    progress: 3,
    total: 8,
    reward: 10,
    completed: false,
    rewardClaimed: false,
  },
];

export default function TaskScreen({ updateSunAmount }: TaskScreenProps) {
  const [tasks, setTasks] = useState(initialTasks);

  const handleClaimReward = (index: number) => {
    if (tasks[index].completed && !tasks[index].rewardClaimed) {
      const newTasks = [...tasks];
      newTasks[index].rewardClaimed = true;
      setTasks(newTasks);
      // 更新阳光值
      updateSunAmount?.(tasks[index].reward);
    }
  };

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
            <TouchableOpacity 
              onPress={() => handleClaimReward(idx)}
              disabled={!task.completed || task.rewardClaimed}
            >
              <View style={[
                styles.rewardBox, 
                task.completed && !task.rewardClaimed && styles.rewardBoxActive,
                task.rewardClaimed && styles.rewardBoxClaimed
              ]}>
                <View style={styles.rewardContent}>
                  <Text style={[
                    styles.rewardText,
                    task.completed && !task.rewardClaimed && styles.rewardTextActive,
                    task.rewardClaimed && styles.rewardTextClaimed
                  ]}>
                    {task.rewardClaimed ? '已领取' : '完成奖励'}
                  </Text>
                  <Image
                    source={require('../assets/flowers/sun.png')}
                    style={styles.coinIcon}
                  />
                  <Text style={[
                    styles.rewardText,
                    { color: '#ffb400' },
                    task.rewardClaimed && styles.rewardTextClaimed
                  ]}>x{task.reward}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
  rewardBoxClaimed: {
    backgroundColor: '#f0f0f0',
  },
  rewardText: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rewardTextActive: {
    color: '#5a7d5a',
  },
  rewardTextClaimed: {
    color: '#b0b0b0',
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