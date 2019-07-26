<template>
    <div class="nofind">
        <el-dialog
        :title="dialog.title"
        type="primary"
        size="small"
        :close-on-press-escape="false"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :visible.sync="dialog.show">
            <el-form
            :model="form"
            ref="formdialog"
            :rules="formdialog"
            label-width="80px">
                <el-form-item label="用户" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-input v-model="form.state"></el-input>
                </el-form-item>
                <el-form-item label="爱好" prop="name">
                    <el-input v-model="form.hobby"></el-input>
                </el-form-item>
                <el-form-item label="是否已婚" prop="marriage">
                    <el-input v-model="form.marriage"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-input v-model="form.birthday"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                    <el-button @click="dialog.show=false">取消</el-button>
                    <el-button @click="addHandle('formdialog')" type="primary">确定</el-button>
                </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'userdialog',
    data() {
        return {
            formdialog:{
                name:[
                    {require:true,message:'用户名不能为空',trigger:blur}
                ],
                sex:[
                    {require:true,message:"性别不能为空",trigger:blur}
                ]
            }
        }
    },
    props:{
        dialog:Object,
        form:Object,
    },
    methods: {
        addHandle(formdialog){
            this.$refs[formdialog].validate(valid=>{
                if(valid){
                    console.log(this.form)
                    let url = this.dialog.option == 'add' ? "add" : `/edit/${this.form.id}`
                    this.$axios.post(`/api/staff/${url}`,this.form).then(res=>{
                        this.$message({
                            type:'success',
                            message:'添加成功'
                        }),
                        this.dialog.show = false
                        this.$emit("UserData")
                        this.form=""
                    })
                }else{
                    console.log("error submit")
                    return false 
                }
            })
        }
    },
}
</script>