<script setup>
    import { useRoute } from 'vue-router';
    import { onMounted } from 'vue';
    const route = useRoute();

    function typeEffect(id, text, speed = 100, pause = 2000) {
    const el = document.getElementById(id);
    let i = 0;
    let deleting = false;
   

    function update() {
        if(route.path !== '/')
            return;
         el.textContent = text.slice(0, i);

        if (!deleting && i <= text.length) {
            i++;
        } else if (deleting && i >= 0) {
            i--;
        }
        
       

        // Pausa no fim
        if (i > text.length) {
            i--;
            deleting = true;
            setTimeout(update, pause);
            return;
        }

        // Pausa no começo
        if (i < 0 && deleting) {
            i++;
            deleting = false;
            setTimeout(update, pause);
            return;
        }

        setTimeout(update, speed);
    }

    update();
}

    onMounted(() => {
        typeEffect('mainSpan', 'Welcome');
    });
</script>

<template>
    <div class="root">
        <span id = "mainSpan"></span><span id = "suportSpan">_</span>
    </div>
</template>

<style scoped>
    #mainSpan{
        font-size: 3rem;
    }

    #suportSpan{
        font-size: 4rem;
        opacity: 0;
        animation: animationSpan 0.5s alternate-reverse infinite forwards;
    }

    @keyframes animationSpan {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
</style>