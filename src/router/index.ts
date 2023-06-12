import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home.vue";
// import Main from "@/views/Main.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            children: [
                {
                    path: "/",
                    component: () => import("@/views/Main.vue")
                },
                {
                    path: "/detail",
                    component: () => import("@/views/Detail.vue"),
                    props: route=>({id:route.query.id})
                }
            ]
        }
    ]
});

export default router;
