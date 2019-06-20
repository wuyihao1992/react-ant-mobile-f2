import React from 'react'
import { connect } from 'dva'
import styles from './style.less'
import { Form, Icon, Input, Button } from 'antd';
import showMessage from 'COMPONENT/utils/globalTips/showMessage'
import request from 'UTIL/http/fetch'
import { urlBase } from 'CONST/config'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { history } =  this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try{
          await request(`${urlBase}j_spring_security_check?j_username=${values.userName}&j_password=${values.password}`,{ method: 'POST'});
        }catch(e) {
          history.push('/StudentScoreTemplate')
        }
        history.push('/StudentScoreTemplate')
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.loginPage}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton} style={{width:'300px'}}>
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) =>{
  return {
    account: state.account,
  }
}

export default connect(mapStateToProps)(WrappedNormalLoginForm)