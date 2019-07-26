<template>
   <div class="foundlist">
       <div>
           <el-form :inline='true' ref="search_date" :model="search_date">
               <el-form-item label="请选择时间">
                   <el-date-picker 
                   v-model="search_date.startDate"
                   type="datetime"
                   placeholder="选择开始时间">
                   </el-date-picker>
                   ---
                    <el-date-picker
                    v-model="search_date.endDate"
                    type="datetime"
                    placeholder="请选择结束时间">
                    </el-date-picker>
               </el-form-item>
               <el-form-item>
                   <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch()">search</el-button>
               </el-form-item>
               <el-form-item class="btnRight">
                   <el-button type="primary" size="small" icon="el-icon-outline" @click="onAddMoney()">Add</el-button>
               </el-form-item>
           </el-form>
       </div>
       <div class="table_container">
           <el-table
           v-if="tableData.length>0"
           :data="tableData"
           min-height="460px"
           border
           :default-sort="{prop:'date',order:'descending'}"
           style="width:100%">
                <el-table-column
                type="index"
                align="center"
                width="70"
                >
                </el-table-column>
                <el-table-column
                lable="创建时间"
                align="center"
                width="250"
                sortable
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="padding-left:10px">{{scope.row.date | moment}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="收支类型"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.type}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="收支描述"
                align="center"
                width="180"
                >
                <template slot-scope="scope">
                    <span>{{scope.row.describe}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="支出"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.expend}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="账户现金"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.cash}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="备注"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.remark}}</span>
                </template>
                </el-table-column>

                <el-table-column
                align="center"
                label="操作"
                width="200"
                >
                    <template slot-scope="scope">
                        <el-button
                        type="primary"
                        size="small"
                        @click="handleEdit(scope.$index,scope.row)">
                        Eidt
                        </el-button>
                        <el-button
                        type="primary"
                        size="small"
                        @click="handleDelete(scope.$index,scope.row)">
                        Delete
                        </el-button>
                    </template>
                </el-table-column>

           </el-table>
           <div class="txt" v-else>{{message}}</div>
           <div class="paginations">
               <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-change.sync="paginations.page_index"
               :page-sizes="paginations.page_sizes"
               :page-size="paginations.page_size"
               :layout="paginations.layout"
               :total="paginations.total">
               </el-pagination>
           </div>
        </div>
           <Dialog :dialog="dialog" :formData="formData" @update="getProfiles"></Dialog>
        </div>
</template>
<script>
import Dialog from '@/components/dialog'
export default {
    name:'FundList',
    components:{
        Dialog,
    },
    data() {
        return {
            visible:false,
            message:'数据不存在',
            search_date:{
                startDate:'',
                endDate:''
            },
            filterTabDate:[],
            paginations:{
                page_index:1,
                total:0,
                page_size:5,
                page_sizes:[5,10,15,20],
                layout:'total,sizes,prev,pager,next,jumper'
            },
            tableData:[],
            allTableData:[],
            dialog:{
                title:'',
                show:false,
                option:'edit'
            },
            formData:{
                type:'',
                describe:'',
                income:'',
                expend:'',
                cash:'',
                remark:'',
            },
        }
    },
    created() {
        this.getProfiles()
    },
    methods: {
        getProfiles(){
            this.$axios.get('/api/profiles').then(res=>{
                this.allTableData=res.data 
                this.filterTabDate=res.data
                this.setPaginations()
            }).catch(err=>{
                console.log(err)
            })
        },
        handleEdit(index,row){
            this.dialog={
                title:'编辑信息',
                show:true,
                option:'edit'
            }
            this.formData={
                type:row.type,
                describe:row.describe,
                income:row.income,
                expend:row.expend,
                cash:row.cash,
                remark:row.remark,
                id:row._id,
            }
        },
        handleDelete(index,row){
            this.$confirm("此操作将永久删除改文件，是否继续","提示",{
                confirmButton:"确定",
                cancelButton:"取消",
                type:"warning",
            }).then(()=>{
                this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res=>{
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                })
                this.getProfiles()
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'取消删除'
                })
            })
        },
        onAddMoney(){
            this.dialog={
                title:'添加信息',
                show:true,
                option:'add'
            }
            this.formData={
                type:'',
                describe:'',
                income:'',
                expend:'',
                cash:'',
                remark:'',
            }
        },
        setPaginations(){
            this.paginations.total=this.allTableData.length
            this.paginations.page_index=1
            this.paginations.page_size=5
            this.tableData=this.allTableData.filter((item,index)=>{
                return index < this.paginations.page_size
            })
        },
        handleSizeChange(page_size){
            this.paginations.page_index=1
            this.paginations.page_size=page_size 
            this.tableData=this.allTableData.filter((item,index)=>{
                return index <page_size
            })
        },
        handleCurrentChange(page){
            let index = this.paginations.page_size*(page-1)
            let mums=this.paginations.page_size*page 
            let tables=[]
            for(let i =index;i<nums;i++){
                if(this.allTableData[i]){
                    tables.push(this.allTableData[i])
                }
                this.tableData=tables
            }
        },
        handleSearch(){
            if(!this.search_date.startDate||!this.search_date.endDate){
                this.$message({
                    message:'时间不能为空',
                    type:'warning'
                })
                this.getProfiles()
                return
            }
            const sTime = this.search_date.startDate.getTime()
            const eTime = this.search_date.endDate.getTime()
            this.allTableData=this.filterTabDate.filter(item=>{
                let date=new Date(item.date)
                let timer =date.getTime()
                return timer>=sTime&&timer<=eTime
            })
            this.setPaginations()
        }
    },
}
</script>
<style>
.paginations{
    margin-bottom:60px;
}
</style>

