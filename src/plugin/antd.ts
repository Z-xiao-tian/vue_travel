/**
 * @author Z-xiao-tian
 * 全局注册antd-vue组件
 */
import type { App } from "vue";
import "ant-design-vue/dist/antd.css";
import {
    Anchor,
    Avatar,
    Button,
    Carousel,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Form,
    Image,
    Input,
    Layout,
    Menu,
    Rate,
    Row,
    Select,
    SelectOption,
    Skeleton,
    Table,
    TimePicker,
    Typography
} from "ant-design-vue";

export default {
    install: (app: App) => {
        app.use(Button);
        app.use(SelectOption);
        app.use(Select);
        app.use(Avatar);
        app.use(Image);
        app.use(Input);
        app.use(Menu);
        app.use(Carousel);
        app.use(Col);
        app.use(Row);
        app.use(Layout);
        app.use(Divider);
        app.use(Skeleton);
        app.use(Table);
        app.use(TimePicker);
        app.use(DatePicker);
        app.use(Anchor);
        app.use(Typography);
        app.use(Rate);
        app.use(Form);
        app.use(Checkbox);
    }
};
