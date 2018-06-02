/* eslint-disable react/no-array-index-key */
/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Collapse, Radio, Checkbox, Row, Col, Button, Input } from 'antd';
import Editor from 'react-umeditor';
import styles from './styles.less';

class BlogContainerEditorCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [],
      typeList: [],
      content: '',
      blogs: {
        data: {
          siteClass: [{
            title: '编程语言',
            subClass: ['c#', '.net', 'asp.net', 'python', 'c++'],
          },
          {
            title: 'Web前端',
            subClass: ['Html/Css', 'JavaScript', 'jQuery', 'HTML5'],
          },
          {
            title: '其他分类',
            subClass: ['非技术区', '软件测试', '代码与软件发布', '游戏开发', '读书区', '算法与数据结构', '云计算', '区块链'],
          }],
          publicItem: {
            title: '发布选项',
            subClass: ['c#', '.net', 'asp.net', 'python', 'c++'],
          },
          advancedOption: {
            title: '高级选项',
            subClass: ['发布', '置顶', '存为草稿', '取消'],
          },
        },
      },
    };
  }
  onCheckboxChange=(checkedValues) => {
    console.log('checked = ', checkedValues);
    this.setState({
      typeList: [...checkedValues],
    });
  }
  onEditorChange=(content) => {
    console.log(content);
    this.setState({
      content,
    });
  }
  onRadioChange=(e) => {
    const result = this.state.tagList.some((item) => {
      return item.value === e.target.value;
    });
    if (!result) {
      const tag = { name: e.target.name, value: e.target.value };

      this.state.tagList.push(tag);
    }
    console.log(this.state.tagList, e.target);
  }
  onPublicActicle=() => {
    this.props.onPublicActicle(this.state.typeList,
      this.titleInput.input.value,
      this.state.content);
  }
  getIcons=() => {
    const icons = [
      'source | undo redo | bold italic underline strikethrough fontborder emphasis | ',
      'paragraph fontfamily fontsize | superscript subscript | ',
      'forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ',
      'cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ',
      'horizontal date time  | image emotion spechars | inserttable',
    ];
    return icons;
  }
  getPlugins=() => {
    return {
      image: {
        uploader: {
          name: 'file',
          url: '/api/upload',
        },
      },
    };
  }
  receiveMarkdown=(content) => {
    console.log('recieved markdown content in', content);
  }
  render() {
    const icons = this.getIcons();
    const plugins = this.getPlugins();
    return (
      <div className={styles['blog-editor']}>
        <Editor
          icons={icons}
          value={this.state.content}
          defaultValue=""
          onChange={this.onEditorChange}
          plugins={plugins}
        />
        <div className={styles['blog-setting']}>
          <Collapse bordered={false} defaultActiveKey={['1', '2', '3', '4']}>
            <Collapse.Panel header="文章信息" key={1}>
              <Input ref={(input) => { this.titleInput = input; }} placeholder="输入文章标题" />
            </Collapse.Panel>
            <Collapse.Panel header="网站分类" key={2}>
              {this.state.blogs.data.siteClass.length >= 0 ?
                    this.state.blogs.data.siteClass.map(item => (
                      <div className={styles['mb-5']}>
                        <span>{item.title}：</span>
                        <Radio.Group
                          name={item.title}
                          defaultValue={1}
                          onChange={this.onRadioChange}
                        >
                          {item.subClass.map(subItem => (
                            <Radio value={subItem}>{subItem}</Radio>
                      ))}
                        </Radio.Group>
                      </div>
                  )) : ''
                  }
            </Collapse.Panel>
            <Collapse.Panel header="发布选项" key="3">
              {this.state.blogs.data.publicItem !== null ? (
                <Checkbox.Group onChange={this.onCheckboxChange}>
                  <Row>
                    {this.state.blogs.data.publicItem.subClass.map(item => (
                      <Col span={8}><Checkbox value={item}>{item}</Checkbox></Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              ) : ''
              }
            </Collapse.Panel>
            <Collapse.Panel header="高级选项" key="4">
              <div style={{ float: 'right', marginBottom: 10 }}><Button type="primary" style={{ marginLeft: 5 }}>存为草稿</Button><Button type="primary" style={{ marginLeft: 5 }}>置顶</Button><Button type="primary" style={{ marginLeft: 5 }} onClick={this.onPublicActicle}>发布</Button><Button style={{ marginLeft: 5 }}>取消</Button></div>
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default BlogContainerEditorCell;
