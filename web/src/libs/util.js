import axios from 'axios';

let util = {};

/** 
 * dom节点重绘 
 * @param vm vue对象 this
 * @param dataName 控制DOM节点是否展示的DATA变量（v-if）
 * @param callBack 重绘后的回调
 **/
util.domReset = function (vm, dataName, callBack) {
    vm[dataName] = false;
    vm.$nextTick(() => {
        vm[dataName] = true;
        if (callBack) {
            callBack();
        }
    });
};

/** 
 * 日期转换 
 * @param date date对象
 * @param format 日期格式
 * @return 例如  2016-7-16 16:24:58 
 **/
util.formatDate = function (date, format) {
    let paddNum = function (num) {
        num += "";
        return num.replace(/^(\d)$/, "0$1");
    };
    //指定格式字符
    let cfg = {
        yyyy: date.getFullYear(), //年 : 4位
        yy: date.getFullYear().toString().substring(2), //年 : 2位
        M: date.getMonth() + 1, //月 : 如果1位的时候不补0
        MM: paddNum(date.getMonth() + 1), //月 : 如果1位的时候补0
        d: date.getDate(), //日 : 如果1位的时候不补0
        dd: paddNum(date.getDate()), //日 : 如果1位的时候补0
        hh: paddNum(date.getHours()), //时 : 如果1位的时候补0
        mm: paddNum(date.getMinutes()), //分 : 如果1位的时候补0
        ss: paddNum(date.getSeconds()), //秒 : 如果1位的时候补0
        ms: paddNum(date.getMilliseconds()) //毫秒 : 如果1位的时候补0
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function (m) { return cfg[m]; });
}

/**
 * @param {*} routers 路由
 * @param {*} name 路由名
 * @description 返回路由对象
 */
util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};
/**
 * @param {*} item 对象
 * @description 更新当前面包屑
 */
util.setCurrentPath = function (vm, items) {
    const name = items.name
    const homeTitle = '首页'
    let title = ''
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.showTitle(item, vm);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.showTitle(child, vm);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [{
            meta: items.meta,
            path: '',
            name: 'home_index'
        }];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [{
            title: homeTitle,
            path: '/home',
            name: 'home_index'
        },
        {
            title: items.meta.title,
            path: '',
            name: name
        }
        ];
    } else {
        currentPathArr = [{
            title: homeTitle,
            path: '/home',
            name: 'home_index'
        }];
        items.matched.forEach(item => {
            currentPathArr.push({
                title: item.meta.title,
                path: '',
                name: item.name
            })
        })
    }

    vm.$store.commit('setCurrentPath', currentPathArr);
    return currentPathArr;
};

/**
 * @param {*} from 对象
 * @param {*} vm 对象
 * @description 设置从别的页面跳转的路径
 */
util.setFromPath = (vm, from) => {
    vm.$store.commit("setFromPath", from);
}

/**
 * @param {*} item 对象
 * @param {*} vm 对象
 * @description 返回路由TITLE
 */
util.showTitle = function (item, vm) {
    let _title = '';
    if (item.meta && item.meta.title) {
        _title = item.meta.title
    } else {
        _title = item.title
    }
    return _title;
};


/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
util.objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
};


/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
util.routeEqual = function (route1, route2) {
    return route1.name === route2.name
};

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
util.getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
};

/**
 * @description 本地存储和获取标签导航列表
 */
util.setTagNavListInLocalstorage = list => {
    localStorage.tagNaveList = JSON.stringify(list)
};

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
util.getNewTagList = (list, newRoute) => {
    const { name, path, meta, params, query } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta, params, query })
    return newList
};

/**
 * @param {*} vm Vue对象
 * @param {*} name 要关闭页面NAME
 * @description 关闭页面
 */
util.colsePage = (vm, name) => {
    let itemIndex = -1
    let tagLists = vm.$store.state.app.tagNavList.filter((item, index) => {
        if (item.name == name) {
            itemIndex = index
        }
        return item.name != name
    })
    vm.$store.commit("setTagNavList", tagLists);
    if (itemIndex > -1) {
        let item = tagLists.length == itemIndex ? tagLists[tagLists.length - 1] : tagLists[itemIndex]
        vm.$router.push(item);
    }
};


/** 
 * 分页处理 
 * @param vm   Vue 对象
 * @param pagination 分页数据
 * @param page 服务器返回分页数据
 * @return data 
 **/
util.pager = function (vm, pagination, page) {
    const pager = { ...pagination };
    pager.current = page.current;
    pager.total = page.total;
    return pager;
};


/** 
 * 批量替换双引号为单引号
 * @param str   
 **/
util.replaceQuotes = function (str) {
    if (!str) return str
    str = str.toString()
    str = str.replace(/\"/g, "'");
    str = str.replace(/\s+/g, "");
    return str.replace(/\r\n/g, "");
};
export default util;