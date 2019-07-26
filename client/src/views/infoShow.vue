<template>
    <div class="infoShow">
        <div class="users">
            <el-row>
                <el-col :span="8">
                    <div class="box-card">
                        <div class="el-card mgb20 is-hover-shadow" style="height:250px">
                            <div class="user-info-con">
                                <span class="use-name">{{user.name}}</span>
                                <span>{{user.identity === 'manager' ? '管理员' : '员工'}}</span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>