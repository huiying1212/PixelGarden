'use strict';

import React, { Component } from 'react';
import { Switch, NavBar, Checkbox, Radio, Input, Tabs, TabBar, Badge } from 'antd-mobile';

import styles from './assets/index.module.scss';

const print = function (value) {};
class DDS_lanhupage_0 extends Component {
  state = {};
  setValue(val) {}
  render() {
    return (
      <div className={`${styles.page} flex-col`}>
        <div className={`${styles['group_1']} flex-col`}>
          <div className={`${styles['block_2']} flex-row`}>
            <span className={`${styles['text_1']}`}>9:27</span>
            <img
              className={`${styles['thumbnail_1']}`}
              src={require('./assets/img/FigmaDDSSlicePNGeb527698756dbca3119ba32eaae44ed7.png')}
            />
            <img
              className={`${styles['image_1']}`}
              src={require('./assets/img/FigmaDDSSlicePNG23b406a53c5f7e558779260f40b4ffcd.png')}
            />
            <img
              className={`${styles['image_2']}`}
              src={require('./assets/img/FigmaDDSSlicePNGd72652f3e7869bb6ce4c3d603ae6233f.png')}
            />
          </div>
          <div className={`${styles['block_3']} flex-row`}>
            <div className={`${styles['text-wrapper_1']} flex-col`}>
              <span className={`${styles['text_2']}`}>图鉴</span>
            </div>
          </div>
          <div className={`${styles['group_4']} flex-col`}>
            <span className={`${styles['text_3']}`}>任务</span>
            <div className={`${styles['block_1']} flex-col`}>
              <div className={`${styles['section_1']} flex-row justify-between`}>
                <div className={`${styles['box_4']} flex-col justify-between`}>
                  <span className={`${styles['text_4']}`}>今天查看你的花园</span>
                  <img
                    className={`${styles['image_3']}`}
                    src={require('./assets/img/FigmaDDSSlicePNG04c234ea456623613d21a29896153571.png')}
                  />
                </div>
                <div className={`${styles['group_6']} flex-row`}>
                  <div className={`${styles['image-text_7']} flex-row`}>
                    <div className={`${styles['text-group_7']} flex-col justify-between`}>
                      <span className={`${styles['text_5']}`}>完成奖励</span>
                      <span className={`${styles['text_6']}`}>x10</span>
                    </div>
                    <img
                      className={`${styles['thumbnail_2']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG182646042eab50f514e38566c5fded6a.png')}
                    />
                  </div>
                </div>
                <span className={`${styles['text_7']}`}>已完成</span>
              </div>
              <div className={`${styles['section_2']} flex-row justify-between`}>
                <div className={`${styles['box_5']} flex-col justify-between`}>
                  <span className={`${styles['text_8']}`}>今天走5000步</span>
                  <img
                    className={`${styles['image_4']}`}
                    src={require('./assets/img/FigmaDDSSlicePNGd7894134fdd5acbc984d0a04ce96e36e.png')}
                  />
                </div>
                <div className={`${styles['box_2']} flex-row`}>
                  <div className={`${styles['image-text_8']} flex-row`}>
                    <div className={`${styles['text-group_8']} flex-col justify-between`}>
                      <span className={`${styles['text_9']}`}>完成奖励</span>
                      <span className={`${styles['text_10']}`}>x10</span>
                    </div>
                    <img
                      className={`${styles['thumbnail_3']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG182646042eab50f514e38566c5fded6a.png')}
                    />
                  </div>
                </div>
                <span className={`${styles['text_11']}`}>3000&nbsp;/&nbsp;5000</span>
              </div>
              <div className={`${styles['section_3']} flex-row justify-between`}>
                <div className={`${styles['group_11']} flex-col justify-between`}>
                  <span className={`${styles['text_12']}`}>今天睡眠时长8小时</span>
                  <img
                    className={`${styles['image_5']}`}
                    src={require('./assets/img/FigmaDDSSlicePNGd7894134fdd5acbc984d0a04ce96e36e.png')}
                  />
                </div>
                <div className={`${styles['group_8']} flex-row`}>
                  <div className={`${styles['image-text_9']} flex-row`}>
                    <div className={`${styles['text-group_9']} flex-col justify-between`}>
                      <span className={`${styles['text_13']}`}>完成奖励</span>
                      <span className={`${styles['text_14']}`}>x10</span>
                    </div>
                    <img
                      className={`${styles['thumbnail_4']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG182646042eab50f514e38566c5fded6a.png')}
                    />
                  </div>
                </div>
                <span className={`${styles['text_15']}`}>3&nbsp;/&nbsp;8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DDS_lanhupage_0;
