<template>
    <div class="dialog">
        <el-dialog
        :title="dialog.title"
        type="primary"
        size="small"
        :close-on-press-escape="false"
        :modal-append-to-body="false"
        :visible.sync="dialog.show">
        <el-form :model="formData" ref="formdialog" :rules="formdialog" label-width="100px">
            <el-form-item label="收至类型">
                <el-select v-model="formData.type" placeholder="活动区域">
                    <el-option 
                    v-for="(format,index) in format_type_list" 
                    :key="index"
                    :label="format"
                    :value="format">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
            label="收支描述"
            prop="describe">
                <el-input type="text" v-model="formData.describe"></el-input>
            </el-form-item>
            <el-form-item label="收入" prop="income">
                <el-input type="text" v-model="formData.income"></el-input>
            </el-form-item>
            <el-form-item label="支出" prop="expend">
                <el-input type="text" v-model="formData.expend"></el-input>
            </el-form-item>
            <el-form-item label="账户现金">
                <el-input type="text" v-model="formData.cash"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="formData.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="dialog.show=false">Cancel</el-button>
                <el-button type="primary" @click="dialogAdd('formdialog')">Submit</el-button>
            </el-form-item>
        </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'dialog',
    props:{
        dialog:Object,
        formData:Object
    },
    data(){
        return{
            format_type_list:[
                "提现",
                "提现手续费",
                "充值",
                "优惠券",
                "充值礼券",
                "转账",
            ],
            formdialog:{
                income:[{required:true,message:"收入不能为空",trigger:"blur"}],
                expend:[{required:true,message:"支出不能为空",trigger:"blur"}],
                cash:[{required:true,message:"账户现金不能为空",trigger:"blur"}]
            }
        }
    },
    methods: {
        dialogAdd(formdialog){
            this.$refs[formdialog].validate(valid=>{
                if(valid){
                    console.log(this.formData)
                    const url=this.dialog.option=='add' ? 'add' : `edit/${this.formData.id}`
                    this.$axios.post(`/api/profiles/${url}`,this.formData).then(res=>{
                        this.$message({
                            message:'添加信息成功',
                            type:'success'
                        })
                        this.dialog.show=false 
                        this.$emit('update')
                        this.formData=''
                    })
                }
            })
        }
    },

}
</script>