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
          <div className={`${styles['group_2']} flex-col`}>
            <div className={`${styles['box_1']} flex-row`}>
            </div>
            <div className={`${styles['text-wrapper_1']} flex-row`}>
              <span className={`${styles['text_2']}`}>欢迎回来！</span>
            </div>
          </div>
          <div className={`${styles['group_3']} flex-col`}>
            <div className={`${styles['group_4']} flex-col`} />
            <span className={`${styles['text_3']}`}>登录您的账号</span>
            <div className={`${styles['group_5']} flex-row`}>
              <div className={`${styles['image-text_1']} flex-row justify-between`}>
                <img
                  className={`${styles['thumbnail_2']}`}
                  src={require('./assets/img/FigmaDDSSlicePNGc6af75c9e69be82167f59e0c0a0f698e.png')}
                />
                <span className={`${styles['text-group_1']}`}>账号</span>
              </div>
            </div>
            <div className={`${styles['group_6']} flex-row`}>
              <div className={`${styles['image-text_2']} flex-row justify-between`}>
                <img
                  className={`${styles['thumbnail_3']}`}
                  src={require('./assets/img/FigmaDDSSlicePNG1bc2755ddc1fe574958e95c2833f8534.png')}
                />
                <span className={`${styles['text-group_2']}`}>密码</span>
              </div>
            </div>
            <div className={`${styles['text-wrapper_2']} flex-col`}>
              <span className={`${styles['text_4']}`}>确认</span>
            </div>
            <div className={`${styles['text-wrapper_3']} flex-row justify-between`}>
              <span className={`${styles['text_5']}`}>还没有账号？</span>
              <span className={`${styles['text_6']}`}>注册</span>
            </div>
            <div className={`${styles['group_7']} flex-col`}>
              <div className={`${styles['box_2']} flex-col`}>
                <div className={`${styles['box_3']} flex-col`}>
                  <div className={`${styles['section_1']} flex-col`} />
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
