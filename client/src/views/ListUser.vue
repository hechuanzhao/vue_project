<template>
    <div class="list">
        <div class="tab">
            <el-table
            :data="tableData"
            border
            style="width:100%"
            >
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    sortable    
                    width="70">
                </el-table-column>
                <el-table-column
                    label="昵称"
                    align="center"
                    sortable
                    width="100">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.nickname}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="投资年限"
                    align="center"
                    sortable
                    width="120">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.touziyear}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="邮箱"
                    align="center"
                    sortable
                    width="170">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.email}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="修改时间"
                    align="center"
                    sortable
                    width="210">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.modifyTime | moment}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="基本短信服务"
                    align="center"
                    sortable
                    width="200">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.baseType}}</span>
                    </template>
                </el-table-column>
                <el-table-column 
                    label="可选短信服务"
                    align="center"
                    sortable>
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.changeType}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginations.page_index"
            :page-size="paginations.page_size"
            :page-sizes="paginations.page_sizes"
            :layout="paginations.layout"
            :total="paginations.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name:'ListUser',
    data() {
        return {
            tableData:[],
            paginations:{
                page_index:1,
                total:0,
                page_size:5,
                page_sizes:[5,10,15,20],
                layout:'total,sizes,prev,pager,next,jumper',
                allTableData:[]
            }
        }
    },
    methods: {
        getInfoList(){
            this.$axios.get('https://www.easy-mock.com/mock/5cd94d93aaec51153fe0c727/example_copy/getInfoList').then(res=>{
                if(res.data.status===1){
                    const data = res.data.data 
                    this.allTableData = data 
                    this.setPaginations()
                }
            })
        },
        setPaginations(){
            this.paginations.total = this.allTableData.length //数据的数量
            this.paginations.page_index = 1 //默认显示第一页
            this.paginations.page_size = 5 //显示的页数

            this.tableData = this.allTableData.filter((item,index)=>{
                return index < this.paginations.page_size
            })
        },
        handleSizeChange(page_size){
            this.paginations.page_index = 1
            this.paginations.page_size = page_size
            this.tableData = this.allTableData.filter((item,index)=>{
                return index < page_size 
            })
        },
        handleCurrentChange(page){
            let index = this.paginations.page_size * (page - 1)
            let allData = this.paginations.page_size * page 
            let tablist = []
            for(let i = index ; i < allData; i ++){
                if(this.allTableData[i]){
                    tablist.push(this.allTableData[i])
                }
                this.tableData = tablist
            }
        }
    },
    created() {
        this.getInfoList()
    },
}
</script>

<style lang="stylus" scoped>
.list 
    margin 20px 
.page 
    float right 
    margin-top 20px
    margin-bottom 80px
</style>
