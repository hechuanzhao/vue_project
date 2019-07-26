<template>
    <div class="staff">
        <div class="staff-top">
            <el-form :inline="true">
                <el-form-item class="btnRight">
                    <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="onAddMoney()">Add</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tables">
            <el-table
            :data="userData"
            border
            style="width:100%">
                <el-table-column
                label="日期"
                align="center"
                width="250">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span>{{scope.row.date | moment}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="用户名"
                align="center"
                width="70">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="性别"
                align="center"
                width="70">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.sex}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="状态"
                align="center"
                width="70">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.state}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="爱好"
                align="center"
                width="70">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.hobby}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="是否已婚"
                align="center"
                width="80">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.marriage}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="生日"
                align="center"
                width="70">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.birthday | moment}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="地址"
                align="center"
                width="250">
                    <template slot-scope="scope">
                        <span style="margin-left:10px">{{scope.row.address}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作"
                fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index,scope.row)">
                            edit
                        </el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index,scope.row)">
                            delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <userdialog :dialog="dialog" :form="form" @UserData="userInfo"></userdialog>
    </div>
</template>

<script>
import userdialog from '@/components/user-dialog'
export default {
    name:'staff',
    data() {
        return {
            userData:[],
            dialog:{
                show:false,
                title:'',
                option:'eidt',
            },
            form:{
                date:'',
                name:'',
                sex:'',
                state:'',
                hobby:'',
                marriage:'',
                birthday:'',
                address:'',
            }
        }
    },
    methods: {
        userInfo(){
            this.$axios.get('/api/staff').then(res=>{
                console.log(res)
                this.userData = res.data
            }).catch(err=>{
                console.log(err)
            })
        },
        handleEdit(index,row){
            console.log(row)
            this.dialog = {
                title:'编辑信息',
                show:true,
                option:'edit'
            }
            this.form = {
                name:row.name,
                sex:row.sex,
                state:row.state,
                bobby:row.hobby,
                marrriage:row.marriage,
                birthday:row.birthday,
                address:row.address,
                id:row._id
            }
        },
        handleDelete(index,row){
            this.$confirm("文件将被永久删除，是否继续","提示",{
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:'warning'
            }).then(()=>{
                    this.$axios.delete(`/api/staff/delete/${row._id}`).then(res=>{
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                    })
                    this.userInfo()
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
            this.form={
                name:'',
                sex:'',
                state:'',
                hobby:'',
                marriage:'',
                birthday:'',
                address:'',
            }
        }
    },
    created() {
        this.userInfo()
    },
    components:{
        userdialog,
    }
}
</script>

