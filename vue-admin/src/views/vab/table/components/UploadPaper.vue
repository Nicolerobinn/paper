<template>
  <a-modal v-model:visible="show" 
  @cancel="afterClose"
  destroyOnClose @ok="handleOk"
    title="上传试卷">
   <a-form :model="formState" :label-col="labelCol"
    :rules="rules"
    ref="formRef" :wrapper-col="wrapperCol">
     <a-form-item label="试卷名称" name="name">
       <a-input v-model:value="formState.name" />
     </a-form-item>
     <a-form-item label="请选择学科" name="subjectId">
       <a-select v-model:value="formState.subjectId" 
         :options="subjectList"
        style="width: 200px"
         allowClear
         @change="handleChange"
       >
       </a-select>
     </a-form-item>
     <a-form-item label="请选择年级" name="gradeId">
       <a-select v-model:value="formState.gradeId" 
        style="width: 200px"
         :options="gradeList" 
         allowClear
       >
       </a-select>
     </a-form-item>
    <a-form-item name="file" ref="name" :autoLink="false">
      <a-input accept=".doc"   @change="handleFileChange" type="file"  name="file"  />
    </a-form-item>
   </a-form>
   
 </a-modal>
</template>
<script>
import { uploadWord } from '@/api/table'

import { message } from 'ant-design-vue'
export default {
 data() {
   return {
     show:false,
     formState:{
       gradeId:'',
       subjectId:'',
       name:''
     },
    rules : {
      name: [{ required: true, message: '请填写试卷名称', trigger: 'blur' }],
      subjectId: [{ required: true, message: '请选择学科', trigger: 'change' , type: 'number'}],
      gradeId: [{ required: true, message: '请选择年级', trigger: 'change' , type: 'number'}],
      file: [{ required: true, message: '请上传文件·', trigger: 'change', type: 'object'  }],
    },
     gradeList:[]
   }
 },
 props:['visible','gra','subjectList'],
 mounted() {},
 watch:{
   visible(boole){
     this.show = boole
   }
 },
 methods: {
   async submit(){
    const { file,gradeId,name,subjectId} = this.formState
    if(!file){
      message.error('请上传图片');
      return
    }
    // 上传文件 创建FormData
    const formData = new FormData()
    // upFile就是后台接收的key
    formData.append('file', file[0], file[0].name)
    formData.append('gradeId',gradeId )
    formData.append('name',name )
    formData.append('subjectId',subjectId )
    const res = await uploadWord(formData)
    if(res){
      message.succsee('上传成功！');
      this.$parent.fetch()
    }
   }, 
   handleOk(){
    this.$refs.formRef.validate()
        .then(() => {
          this.submit()
        })
        .catch((error) => {
          console.log('error', error);
        });
   },
   afterClose(){
      this.$parent.close()
      this.$refs.formRef.resetFields();
   },
  handleFileChange(e){
    const input = e.target;
    const files = input.files;
    // 判断一手是否有文件
    if (!files.length) return
    this.formState.file= files
  },
   handleChange(id){
     if(id){
     this.gradeList = this.gra[id]
     }else{
       this.gradeList = []
       this.formState.gradeld = undefined
     }
   },
 },
}
</script>
