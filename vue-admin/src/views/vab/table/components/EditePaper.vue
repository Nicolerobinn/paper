<template>
  <a-modal v-model:visible="show" 
  @cancel="afterClose"
  destroyOnClose @ok="handleOk"
    title="编辑试卷">
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
   </a-form>
   
 </a-modal>
</template>
<script>
import { doEdit } from '@/api/table'

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
      subjectId: [{ required: true, message: '请选择学科', trigger: 'change' }],
      gradeId: [{ required: true, message: '请选择年级', trigger: 'change' }],
    },
     gradeList:[]
   }
 },
 props:['visible','gra','subjectList','editData'],
 mounted() {},
 watch:{
   visible(boole){
     if(boole){
       this.formState.name = this.editData.name
       this.formState.subjectId = this.editData.subjectId
       this.formState.gradeId = this.editData.gradeId
     }
     this.show = boole
   }
 },
 methods: {
   async submit(){
    const res = await doEdit(this.formState)
    if(res){
      message.succsee('修改成功！');
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
