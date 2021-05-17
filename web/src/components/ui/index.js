import Scrollbar from './Scrollbar';
import { Splitpanes, Pane } from './splitpanes';
import fieldsetLegend from './fieldsetLegend';


const components = {
    Scrollbar,
    Splitpanes,
    Pane,
    fieldsetLegend
}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => { Vue.component(key, components[key]); });
};
export default install;