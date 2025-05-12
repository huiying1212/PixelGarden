import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

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

export default function TaskScreen({ onClose }: { onClose?: () => void }) {
  return (
    <View style={styles.bg}>
      <View style={styles.popup}>
        {/* 关闭按钮 */}
        {onClose && (
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>×</Text>
          </TouchableOpacity>
        )}
        {/* 顶部Tab */}
        <View style={styles.tabBar}>
          <View style={styles.tabActive}>
            <Text style={styles.tabActiveText}>任务</Text>
          </View>
          <View style={styles.tabInactive}>
            <Text style={styles.tabInactiveText}>图鉴</Text>
          </View>
        </View>
        {/* 任务列表 */}
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
                  <Text style={[styles.rewardText, task.completed && styles.rewardTextActive]}>
                    完成奖励
                    <Text style={{ color: '#ffb400' }}> 🪙x{task.reward}</Text>
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  popup: {
    position: 'absolute',
    left: 43,
    top: 173,
    width: 290,
    height: 405,
    backgroundColor: '#f8fff8',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
    zIndex: 9999,
  },
  closeBtn: {
    position: 'absolute',
    top: 8,
    right: 12,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 22,
    color: '#888',
    fontWeight: 'bold',
    lineHeight: 22,
  },
  tabBar: {
    flexDirection: 'row',
    width: 240,
    height: 38,
    backgroundColor: '#eaf6ea',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  tabActive: {
    flex: 1,
    backgroundColor: '#f8fff8',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  tabInactive: {
    flex: 1,
    backgroundColor: '#eaf6ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  tabActiveText: {
    color: '#5a7d5a',
    fontWeight: 'bold',
    fontSize: 18,
  },
  tabInactiveText: {
    color: '#b0b0b0',
    fontSize: 18,
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  card: {
    width: 258,
    backgroundColor: '#f8fff8',
    borderRadius: 14,
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
    borderRadius: 5,
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
    borderRadius: 8,
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
});
