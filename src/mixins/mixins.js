export default {
    methods:{
        isDesktop(){
            const width = window.innerWidth
            return width > 767;
        },
        isMobile(){
            const width = window.innerWidth
            return width < 767;
        }
    }
}