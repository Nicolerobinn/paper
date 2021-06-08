<template>
  <a-table
    :columns="columns"
    :row-key="(record) => record.id"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #action="{ record }">
      <span>
        <a-divider type="vertical" />
        <a @click="deleteColumns(record)">删除</a>
        <a-divider type="vertical" />
        <a @click="editColumns(record)">编辑</a>
      </span>
    </template>
  </a-table>
  <EditModal v-if="editShow" @editSuccess="fetch()" />
  <UploadModal v-if="uploadShow" @uploadSuccess="fetch()" />
</template>
<script>
  import { getList, doDelete } from '@/api/table'
  import EditModal from './components/EditePaper'
  import UploadModal from './components/UploadPaper'
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
  ]

  export default {
    data() {
      return {
        data: [],
        pagination: {
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true,
        },
        query: {},
        loading: false,
        columns,
        editShow: false,
        editData: {},
        uploadShow: false,
      }
    },
    components: {
      EditModal,
      UploadModal,
    },
    mounted() {
      this.fetch()
    },
    methods: {
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
      fetch() {
        this.loading = true
        getList({
          pageSize: this.pagination.pageSize,
          current: this.pagination.current,
        }).then(({ data, total }) => {
          const pagination = { ...this.pagination }
          pagination.total = total
          this.loading = false
          this.data = data
          this.pagination = pagination
        })
      },
    },
  }
</script>
