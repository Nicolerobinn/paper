<template>
  <br>
  <a-row>
    <a-col :span="8">
      <div class="queryBox">
        <div>名称:</div>
        <a-input  v-model:value="query.searchinput"/>
      </div>
    </a-col>
    <a-col :span="8">
      学科:
      <a-select
        v-model:value="query.subjectId"
        style="width: 200px"
        :options="subjectList"
        allowClear
        @change="handleChange"
        />
    </a-col>
    <a-col :span="8">
      年级:
      <a-select
      allowClear
        v-model:value="query.gradeld"
        style="width: 200px"
        :options="gradeList"
        />
    </a-col>
  </a-row>
  <br>
  <a-row>
    <a-col :span="8">
        <a-button @click="add" type="primary">上传</a-button>
    </a-col>
    <a-col :span="8">
    </a-col>
    <a-col :span="8" >
      <div class="buttonBox">
        <a-button @click="search" type="primary">搜索</a-button>
      </div>
    </a-col>
  </a-row>
  <br>
  <a-table
    :columns="columns"
    :row-key="(record) => record.id"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
     <template #operation="{ record }">
      <div class="editable-row-operations">
        <span >
          <a @click="editColumns(record)">Edit</a>
        </span> &nbsp;&nbsp;&nbsp;
        <span >
          <a style="color:red" @click="deleteColumns(record)">Delete</a>
        </span>
      </div>
    </template>
  </a-table>
  <EditModal :visible="editShow" :editData="editData"  :gra="gra" :subjectList="subjectList"/>
  <UploadModal :visible="uploadShow" :gra="gra" :subjectList="subjectList"/>
</template>
<script>
  import EditModal from './components/EditePaper'
  import UploadModal from './components/UploadPaper'
  import { getList, doDelete,getAllSubject } from '@/api/table'
  import { message } from 'ant-design-vue'
  const columns = [
    {
      title: '年级',
      dataIndex: 'gradeName',
    },
    {
      title: '学科',
      dataIndex: 'subjectName',
    },
    {
      title: '文件名称',
      dataIndex: 'fileName',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    { title: 'Action', dataIndex: '', key: 'x', slots: { customRender: 'operation' } },
  ]
  export default {
    data() {
      return {
        data: [],
        pagination: {
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true,
          current:0,
          pageSize:10
        },
        query: {
          searchinput:undefined,
          gradeld:undefined,
          subjectId:undefined
        },
        loading: false,
        columns,
        editShow: false,
        uploadShow: false,
        subjectList:[],
        gra:{},
        gradeList:[],
        editData:{}
      }
    },
    components: {
      EditModal,
      UploadModal,
    },
    mounted() {
      this.fetch()
      this.getSearchValue()
    },
    methods: {
      close(){
        this.uploadShow = false
        this.editShow = false
      },
      add(){
        this.uploadShow = true
      },
      async getSearchValue(){
        const res =   await getAllSubject()
        const {data:arr = []} = res|| {arr:[]}
        if(!(arr.length>0)) return
        const subject = []
        const gra = {}
        arr.forEach((item)=>{
          subject.push({value:item.id,label:item.name})
          const list = []
          item.gradeList.forEach((a)=>{
            list.push({value:a.id,label:a.name})
          })
          gra[item.id] = list
        })
        this.gra = gra
        this.subjectList = subject
        console.log(gra,subject)
      },
      handleChange(id){
        if(id){
        this.gradeList = this.gra[id]
        }else{
          this.gradeList = []
          this.query.gradeld = undefined
        }
      },
      editColumns(item) {
        this.editShow = true
        this.editData = item
      },
      async deleteColumns(item) {
        const res = await doDelete(item.id)
        if (res) {
          message.success('删除成功')
          this.fetch()
        }
      },
      handleTableChange(pagination) {
        const pager = { ...this.pagination }
        pager.current = pagination.current
        this.pagination = pager
        this.fetch()
      },
      search(){
        const obj = {
          pageSize: this.pagination.pageSize,
          pageNum: 1,
        }
        const {searchinput,gradeld,subjectId} = this.query
        if(searchinput){
          obj.searchinput = searchinput
        }
        if(gradeld){
          obj.gradeld = gradeld
        }        
        if(subjectId){
          obj.subjectId = subjectId
        }
        this.loading = true
        console.log(obj)
        getList(obj).then((a)=>{
          const {  list, total } = a.data
          const pagination = { ...this.pagination }
          pagination.total = total
          this.loading = false
          this.data = list
          this.pagination = pagination
        })
      },
      fetch() {
        this.loading = true
        const obj = {
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.current ||1,
        }
        getList(obj).then((a)=>{
          const {  list, total } = a.data
          const pagination = { ...this.pagination }
          pagination.total = total
          this.loading = false
          this.data = list
          this.pagination = pagination
        })
      },
    },
  }
</script>

<style lang="less">
  .queryBox{
    display: flex;
    align-items: center;
    max-width: 200px;
    div{
      width: 40px;
    }
  }
  .buttonBox{
    display: flex;
    flex-direction: row-reverse;
  }
  </style>