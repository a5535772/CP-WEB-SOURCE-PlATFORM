/**
 *创建时间:  2018/5/20
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Input, Icon, Form, Button } from 'antd';
import { Link } from 'dva/router';
import Config from '../../../common/config';
import styles from './style.less';

const FormItem = Form.Item;
class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleSubmit=(e) => {
    this.props.handleSubmit(e);
  }
  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <div className={styles['login-container']}>
          <h1 className={styles.mb10}>登录</h1>
          <p className={styles.mb10}>欢迎回来</p>
          <Form style={{ marginBottom: '10px' }} hideRequiredMark>
            <div>
              <FormItem
                hasFeedback
              >
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input
                    prefix={<Icon type="user" />}
                    placeholder="请输入用户名"
                  />
                )}
              </FormItem>
            </div>
            <div>
              <FormItem
                hasFeedback
              >
                {getFieldDecorator('pwd', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
              )}
              </FormItem>
            </div>
            <Button className={styles['btn-login']} loading={login.submitting} size="large" htmlType="submit" onClick={this.handleSubmit}>登录</Button>
          Or <Link to="/register">register now!</Link>
          </Form>
          <div className={styles['other-platform-login']}>
            <p>第三方平台登录</p>
            <div>
              <a href={`${Config.defaultProps.api}/login/qq/`}><img alt="qq" src={require('../../../assets/login/icon/qq.svg')} /></a>
              <a href={`${Config.defaultProps.api}/login/weibo/`}><img alt="微博" src={require('../../../assets/login/icon/weibo.svg')} /></a>
              <a href={`${Config.defaultProps.api}/login/weixin/`}><img alt="微信" src={require('../../../assets/login/icon/weixin.svg')} /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
