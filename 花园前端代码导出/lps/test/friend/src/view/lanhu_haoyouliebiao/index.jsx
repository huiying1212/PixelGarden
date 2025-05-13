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
          <div className={`${styles['box_1']} flex-row`}>
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
          <div className={`${styles['box_2']} flex-row`}>
            <div className={`${styles['box_3']} flex-col`}>
              <div className={`${styles['box_4']} flex-col`}>
                <div className={`${styles['box_5']} flex-row justify-between`}>
                  <div className={`${styles['section_1']} flex-row justify-between`}>
                    <span className={`${styles['text_2']}`}>搜索或添加好友</span>
                    <div className={`${styles['box_6']} flex-col`} />
                  </div>
                  <div className={`${styles['section_2']} flex-row`}>
                    <div className={`${styles['image-text_1']} flex-row justify-between`}>
                      <span className={`${styles['text-group_1']}`}>添加时间</span>
                      <div className={`${styles['block_1']} flex-col`} />
                    </div>
                  </div>
                </div>
                <div className={`${styles['box_7']} flex-row`}>
                  <div className={`${styles['image-text_2']} flex-row justify-between`}>
                    <img
                      className={`${styles['label_1']}`}
                      src={require('./assets/img/FigmaDDSSlicePNGe21f9afe6d7c390c4618f1bc22839861.png')}
                    />
                    <span className={`${styles['text-group_2']}`}>用户123</span>
                  </div>
                  <div className={`${styles['image-text_3']} flex-col justify-between`}>
                    <img
                      className={`${styles['label_2']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG01520cadbc0527e01ed94223e6418a60.png')}
                    />
                    <span className={`${styles['text-group_3']}`}>写信</span>
                  </div>
                  <div className={`${styles['image-text_4']} flex-col justify-between`}>
                    <img
                      className={`${styles['label_3']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG300279f9ac1f56999cc23762a0222fc3.png')}
                    />
                    <span className={`${styles['text-group_4']}`}>花园</span>
                  </div>
                </div>
                <div className={`${styles['box_8']} flex-row`}>
                  <div className={`${styles['image-text_5']} flex-row justify-between`}>
                    <img
                      className={`${styles['label_4']}`}
                      src={require('./assets/img/FigmaDDSSlicePNGe21f9afe6d7c390c4618f1bc22839861.png')}
                    />
                    <span className={`${styles['text-group_5']}`}>用户123</span>
                  </div>
                  <div className={`${styles['image-text_6']} flex-col justify-between`}>
                    <img
                      className={`${styles['label_5']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG01520cadbc0527e01ed94223e6418a60.png')}
                    />
                    <span className={`${styles['text-group_6']}`}>写信</span>
                  </div>
                  <div className={`${styles['image-text_7']} flex-col justify-between`}>
                    <img
                      className={`${styles['label_6']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG300279f9ac1f56999cc23762a0222fc3.png')}
                    />
                    <span className={`${styles['text-group_7']}`}>花园</span>
                  </div>
                </div>
                <div className={`${styles['box_9']} flex-row`}>
                  <div className={`${styles['image-text_8']} flex-row justify-between`}>
                    <img
                      className={`${styles['label_7']}`}
                      src={require('./assets/img/FigmaDDSSlicePNGe21f9afe6d7c390c4618f1bc22839861.png')}
                    />
                    <span className={`${styles['text-group_8']}`}>用户123</span>
                  </div>
                  <div className={`${styles['image-text_9']} flex-col justify-between`}>
                    <img
                      className={`${styles['label_8']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG01520cadbc0527e01ed94223e6418a60.png')}
                    />
                    <span className={`${styles['text-group_9']}`}>写信</span>
                  </div>
                  <div className={`${styles['image-text_10']} flex-col justify-between`}>
                    <img
                      className={`${styles['label_9']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG300279f9ac1f56999cc23762a0222fc3.png')}
                    />
                    <span className={`${styles['text-group_10']}`}>花园</span>
                  </div>
                </div>
                <span className={`${styles['text_3']}`}>——随机陌生人——</span>
                <div className={`${styles['box_10']} flex-row`}>
                  <div className={`${styles['image-text_11']} flex-row justify-between`}>
                    <img
                      className={`${styles['label_10']}`}
                      src={require('./assets/img/FigmaDDSSlicePNGe21f9afe6d7c390c4618f1bc22839861.png')}
                    />
                    <span className={`${styles['text-group_11']}`}>用户123</span>
                  </div>
                  <div className={`${styles['image-text_12']} flex-col justify-between`}>
                    <div className={`${styles['section_3']} flex-col`} />
                    <span className={`${styles['text-group_12']}`}>添加</span>
                  </div>
                  <div className={`${styles['image-text_13']} flex-col justify-between`}>
                    <img
                      className={`${styles['label_11']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG01520cadbc0527e01ed94223e6418a60.png')}
                    />
                    <span className={`${styles['text-group_13']}`}>写信</span>
                  </div>
                  <div className={`${styles['image-text_14']} flex-col justify-between`}>
                    <img
                      className={`${styles['label_12']}`}
                      src={require('./assets/img/FigmaDDSSlicePNG300279f9ac1f56999cc23762a0222fc3.png')}
                    />
                    <span className={`${styles['text-group_14']}`}>花园</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DDS_lanhupage_0;
