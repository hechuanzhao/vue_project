<template>
    <div class="mark">
        <div class="container">
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="mine-height:600px"/>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>
<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name:'markdown',
    data:function(){
        return {
            content:'',
            html:'',
            configs:{

            }
        }
    },
    components:{
        mavonEditor
    },
    methods: {
        $imgAdd(pos,$file){
            var formData=new FormData()
            formData.append('file',$file)
            this.$axios({
                url:'',
                method:'post',
                data:formData,
                headers:{'Content-Type':'multipart/form-data'}
            }).then(url=>{
                this.$refs.md.$img2Url(pos,url)
            })
        },
        change(value,render){
            this.html=render 
        },
        submit(){
            console.log(this.content)
            console.log(this.html)
            this.content=''
            this.$messag.success('提交成功')
        }
    },
}
</script>