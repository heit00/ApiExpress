<script setup>
    defineProps({
        label: {
            type: String,
            default: 'Ops, algum erro ocorreu!'
        }
    })
</script>

<template>
    <div class="root">
       <div id="error-div">
            <span>{{  label  }}</span>
       </div> 
    </div>
</template>

<style scoped>
    #error-div{
        font-size: 2rem;
        background-color: rgb(230, 55, 55);
        backdrop-filter: blur(15px);
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 50px;
        padding-right: 50px;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>