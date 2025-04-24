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
        <div className={`${styles['block_1']} flex-col`}>
          <div className={`${styles['block_2']} flex-row`}>
            <span className={`${styles['text_1']}`}>9:27</span>
            <img
              className={`${styles['thumbnail_1']}`}
              src={require('./assets/img/FigmaDDSSlicePNGacc41aff12b7652769bb4aaf5468be8e.png')}
            />
            <img
              className={`${styles['image_1']}`}
              src={require('./assets/img/FigmaDDSSlicePNGb388103b6923d2f4150e049494bb9119.png')}
            />
            <img
              className={`${styles['image_2']}`}
              src={require('./assets/img/FigmaDDSSlicePNGecf9a0c42825fe757c5417df1078d2e9.png')}
            />
          </div>
          <div className={`${styles['image-wrapper_1']} flex-col`}>
            <img
              className={`${styles['label_1']}`}
              src={require('./assets/img/FigmaDDSSlicePNG499f5b22226fc47697b61049ad618554.png')}
            />
          </div>
          <span className={`${styles['text_2']}`}>今天感觉如何？</span>
          <span className={`${styles['text_3']}`}>2025年3月27日&nbsp;星期四</span>
          <div className={`${styles['block_3']} flex-row`}>
            <div className={`${styles['box_1']} flex-row`}>
              <div className={`${styles['image-text_1']} flex-col justify-between`}>
                <img
                  className={`${styles['image_3']}`}
                  src={require('./assets/img/FigmaDDSSlicePNGe086683fd66eb3639cfb593f40d4409f.png')}
                />
                <span className={`${styles['text-group_1']}`}>兴奋</span>
              </div>
            </div>
            <div className={`${styles['box_2']} flex-col`}>
              <div className={`${styles['section_1']} flex-col`}>
                <div className={`${styles['box_3']} flex-col`}>
                  <div className={`${styles['box_4']} flex-col`} />
                  <img
                    className={`${styles['image_4']}`}
                    src={require('./assets/img/FigmaDDSSlicePNGcd5d533c11f13a09f4adb1a1fbbacfdc.png')}
                  />
                </div>
              </div>
              <span className={`${styles['text_4']}`}>愉悦</span>
            </div>
            <div className={`${styles['box_5']} flex-col`}>
              <div className={`${styles['group_1']} flex-col`}>
                <div className={`${styles['image-wrapper_2']} flex-col`}>
                  <img
                    className={`${styles['image_5']}`}
                    src={require('./assets/img/FigmaDDSSlicePNG366548797cc9e71864fbed279b53f59a.png')}
                  />
                </div>
              </div>
              <span className={`${styles['text_5']}`}>平静</span>
            </div>
          </div>
          <div className={`${styles['block_4']} flex-row`}>
            <div className={`${styles['block_5']} flex-col`}>
              <div className={`${styles['image-wrapper_3']} flex-col`}>
                <img
                  className={`${styles['image_6']}`}
                  src={require('./assets/img/FigmaDDSSlicePNGafc7b47dc18aad7d4c63cbe536aa6060.png')}
                />
              </div>
              <span className={`${styles['text_6']}`}>愤怒</span>
            </div>
            <div className={`${styles['block_6']} flex-row`}>
              <div className={`${styles['image-text_2']} flex-col justify-between`}>
                <img
                  className={`${styles['image_7']}`}
                  src={require('./assets/img/FigmaDDSSlicePNG3c29937ee304011592e8530456942d3f.png')}
                />
                <span className={`${styles['text-group_2']}`}>焦虑</span>
              </div>
            </div>
            <div className={`${styles['block_7']} flex-col`}>
              <div className={`${styles['box_6']} flex-col`}>
                <div className={`${styles['image-wrapper_4']} flex-col`}>
                  <img
                    className={`${styles['thumbnail_2']}`}
                    src={require('./assets/img/FigmaDDSSlicePNGdc9c3204137df5dbd612475740e53ea4.png')}
                  />
                  <img
                    className={`${styles['image_8']}`}
                    src={
                      require('./assets/img/2db8b5898ea24d0e8ac87e774c04af11_mergeImage.png')
                    }
                  />
                </div>
              </div>
              <span className={`${styles['text_7']}`}>难过</span>
            </div>
          </div>
          <div className={`${styles['block_8']} flex-row justify-between`}>
            <div className={`${styles['text-wrapper_1']} flex-col`}>
              <span className={`${styles['text_8']}`}>愉快</span>
            </div>
            <div className={`${styles['text-wrapper_2']} flex-col`}>
              <span className={`${styles['text_9']}`}>放松</span>
            </div>
            <div className={`${styles['text-wrapper_3']} flex-col`}>
              <span className={`${styles['text_10']}`}>有成就感</span>
            </div>
            <div className={`${styles['text-wrapper_4']} flex-col`}>
              <span className={`${styles['text_11']}`}>凄凄惨惨</span>
            </div>
          </div>
          <div className={`${styles['block_9']} flex-row justify-between`}>
            <div className={`${styles['text-wrapper_5']} flex-col`}>
              <span className={`${styles['text_12']}`}>感恩</span>
            </div>
            <div className={`${styles['text-wrapper_6']} flex-col`}>
              <span className={`${styles['text_13']}`}>+&nbsp;更多</span>
            </div>
          </div>
          <div className={`${styles['text-wrapper_7']} flex-col`}>
            <span className={`${styles['text_14']}`}>今天的工作很顺利，晚上还和朋友一起去吃了火锅，开心~</span>
          </div>
          <div className={`${styles['block_10']} flex-row`}>
            <img
              className={`${styles['label_2']}`}
              src={require('./assets/img/FigmaDDSSlicePNGa387ef4dd9bb0691ab714de9e246ec32.png')}
            />
            <img
              className={`${styles['label_3']}`}
              src={require('./assets/img/FigmaDDSSlicePNG28b12381100a6f1822fb51540dde2755.png')}
            />
            <div className={`${styles['text-wrapper_8']} flex-col`}>
              <span className={`${styles['text_15']}`}>保存</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DDS_lanhupage_0;
