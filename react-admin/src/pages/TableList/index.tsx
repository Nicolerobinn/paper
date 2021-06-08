import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText,
  ProFormSelect,ProFormUploadButton } from '@ant-design/pro-form';
import { rule, addPaper, updateRule,getAllSubject,deletePaper } from '@/services/ant-design-pro/api';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');

  try {
    console.log(fields)
    await addPaper(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在编辑');

  try {
    await updateRule(fields);
    hide();
    message.success('编辑成功');
    return true;
  } catch (error) {
    hide();
    message.error('编辑失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (id:string) => {
  const hide = message.loading('正在删除');

  try {
    await deletePaper(id);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [changeModalVisible, setChangeModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [subjectList, setSubjectList] = useState<any>([]);
  const [gradeList, setGradeList] = useState<any>([]);
  const [grade, setGrade] = useState<any>({});
  const [column, setColumn] = useState<any>({});
  const [file, setFile] = useState<any>(null);

  const getSubject= async ()=>{
    const res =   await getAllSubject()
    const arr = res?.data ?? []
    if(!(arr.length>0)) return
    const subject:any = []
    const gra:any = []
    arr.forEach((item:any)=>{
      subject.push({value:item.id,label:item.name})
      const list:any = []
      item.gradeList.forEach((a:any)=>{
        list.push({value:a.id,label:a.name})
      })
      gra[item.id] = list
    })
    setGrade(gra)
    setSubjectList(subject)
  }
  /** 国际化配置 */
  React.useEffect(() => {
    getSubject()
  }, [])
  const change =(a:any)=> ()=>{
    setColumn(a)
    setChangeModalVisible(true)
    }
  const deleteItem =({id}:any)=>  ()=>{
    handleRemove(id)
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '年级',
      dataIndex: 'gradeName',
      valueType: 'textarea',
    },
    {
      title: '学科',
      dataIndex: 'subjectName',
      valueType: 'textarea',
    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '文件名称',
      dataIndex: 'fileName',
      valueType: 'textarea',
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (text, record, _, action) => [<a onClick={change(record)} key="1">编辑</a>, <a key="2" onClick={deleteItem(record)} >删除</a>],
    },
  ];
  const handleFileChange = (e)=>{
    const input = e.target;
     const files = input.files;
     // 判断一手是否有文件
     if (!files.length) return
     setFile(files)
  }
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={
          params => rule(params).then((res:any) =>{
            const result = {
              data:res.data.list,
              total:res.data.total,
              success:res.success,
              pageSize:res.pageSize,
            }
            return result
          })
        }
        columns={columns}
      />
      <ModalForm
       key="1"
        title={'上传试卷'}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          if(!file){
            message.error('请上传图片');
            return
          }
          // 上传文件 创建FormData
          const formData = new FormData()
          // upFile就是后台接收的key
          formData.append('file', file[0], file[0].name)
          formData.append('gradeId',value.gradeId )
          formData.append('name',value.name )
          formData.append('subjectId',value.subjectId )
          const success = await handleAdd(formData as any);
          if (success) {
            handleModalVisible(false);
            setFile(null)

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '试卷名称为必填项',
            },
          ]}
          width="md"
          name="name"
          label="试卷名称"
        />

        <ProFormSelect
                 fieldProps={{onChange:(val) =>{
                  setGradeList(grade[val])
                 }}}
                options={subjectList}
                width="xs"
                rules={[
                  {
                    required: true,
                    message: '学科为必选项',
                  },
                ]}
                name="subjectId"
                label="请选择学科"
              />
        <ProFormSelect
                options={gradeList}
                width="xs"
                rules={[
                  {
                    required: true,
                    message: '年纪为必选项',
                  },
                ]}
                name="gradeId"
                label="请选择年级"
              />
              <input id="file"   accept=".doc"   onChange={handleFileChange} type="file"  name="file"></input>
      </ModalForm>
      <ModalForm
       key="2"
        title={ `编辑试卷:${column.name}`}
        width="400px"
        visible={changeModalVisible}
        onVisibleChange={setChangeModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate({...value,id:column.id});

          if (success) {
            setChangeModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '试卷名称为必填项',
            },
          ]}
          width="md"
          name="name"
          label="试卷名称"
        />

        <ProFormSelect
                 fieldProps={{onChange:(val) =>{
                  setGradeList(grade[val])
                 }}}
                options={subjectList}
                width="xs"
                rules={[
                  {
                    required: true,
                    message: '学科为必选项',
                  },
                ]}
                name="subjectId"
                label="请选择学科"
              />
        <ProFormSelect
                options={gradeList}
                width="xs"
                rules={[
                  {
                    required: true,
                    message: '年纪为必选项',
                  },
                ]}
                name="gradeId"
                label="请选择年级"
              />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
