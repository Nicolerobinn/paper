<!--
 * @Desc:
 * @Autor: cxt
 * @Date: 2021-06-03 18:01:35
 * @LastEditors: cxt
 * @LastEditTime: 2021-06-07 15:06:23
-->
 <template>
    <div class="gradeContainer">
        <div class="inGradeBox">
            <div class="box">
                <div v-for="(item, i) in content.gradeList" class="item" :key="i" @click="go(item.id)">
                    <img :src="`http://tk.naxia100.com/wxpublic/${content.name}.png`" alt="" />
                    <div class="gradeTxt">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

 <script lang="ts">
import {
    defineComponent,
    onMounted,
    PropType,
} from "vue";

import { Button } from "vant";
import { useRouter, useRoute } from "vue-router";
interface Item {
    name: string;
    gradeList: any[];
}
export default defineComponent({
    name: "Content",
    // 父组件传子组件参数
    props: {
        content: {
            type: Object as PropType<Item>,
            default: () => [{ type: "初一" }],
        },
    },
    components: {
        Button,
    },
    emits: ["emits-name"], // 为了提示作用
    setup(props: any, context) {
        const router = useRouter();
        const route = useRoute();

        onMounted(() => { });

        const go = (i: number | string) => {
            router.push({
                name: "Examlist",
                query: {
                    gradeld: i,
                    subjectId:props.content.id
                },
            });
        };
        return {
            go,
        };
    },
});
</script>

 <style lang="scss" scoped>
.gradeContainer {
    display: -webkit-flex;
    -webkit-box-direction: normal;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100%;
    -webkit-box-orient: horizontal;
    flex-flow: row wrap;
    -webkit-flex-flow: row wrap;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    background-position: 50%;
    background-image: url(http://tk.naxia100.com/wxpublic/bk1.png);
    .inGradeBox {
        box-sizing: border-box;
        -webkit-box-orient: vertical;
        flex-flow: column wrap;
        -webkit-flex-flow: column wrap;
        -webkit-box-pack: space-evenly;
        -webkit-justify-content: space-evenly;
        justify-content: space-evenly;
        width: 90%;
        padding: 30px 10px;
        margin: 10px auto;
        background-image: url(http://tk.naxia100.com/wxpublic/bk2.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .box {
            margin: 0px auto;
            box-sizing: border-box;
            width: 100%;
            padding: 0px 10px;
            display: -webkit-flex;
            flex-flow: row wrap;
            .item {
                text-align: center;
                margin: 5px 10px;
                width: 23%;
                max-height: 18%;
                img {
                    width: 100%;
                }
                .gradeTxt {
                    font-size: 0.4rem;
                }
            }
        }
    }
}
</style>